var inputData = prompt('drop your titles here. quote anything you want as a whole title match');

var searchArr = parseSearchString(inputData);

var saveAs = '';
searchArr.forEach(itm => saveAs = saveAs + '_' + itm.replace(/\s+/g, ''));

var containArr = [];

var delay = (ms) => new Promise(res => setTimeout(res, ms));

var parseSearchString = (userInput) => {
  var clean = userInput.replace(/\band\b|\bor\b/gi, '');
  var quoted = clean.match(/(?<="\b).+?(?=\b")/g);
  var alone = clean.replace(/"\b.+?\b"/g, '').replace(/\)|\(/g, '').match(/\S+/g);
  alone != null ? alone : [];
  quoted != null ? quoted : [];
  alone.push.apply(alone, quoted);
  return alone;
} 

var unqObj = (arr,obj) => {
  if (arr.some(itm => itm.displayName == obj.displayName) === false && arr.length > 0) arr.push(obj);
  if (arr.length == 0) arr.push(obj);
}

async function titleSearch(type,term,arr) {
  var res = await fetch('https://www.linkedin.com/'+type+'?query=' + term + '&_l=en_US');
  var jdat = await res.json();
  jdat.resultList.forEach(itm => unqObj(arr,itm));

}

async function searchloop(type,arr) {
  for (i = 0; i < searchArr.length; i++) {
    await delay(600 + Math.round(Math.random() * 100));
    titleSearch(type,searchArr[i],arr);
  }
  return await containArr;
}

async function downloadr(filename) {
  var jdat = await searchloop('recruiter/api/smartsearch/typeahead/title', containArr);
  var data = JSON.stringify(jdat);
  var type = 'data:application/json;charset=utf-8,';
	
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a');
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}


downloadr(saveAs+'.json')
