var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() * n);


function downloadr(arr2D, filename) {
  if (/\.csv$/.test(filename) === true) {
	var data = '';
	arr2D.forEach(row => {
		var arrRow = '';
		row.forEach(col => {
			col ? arrRow = arrRow + col.toString() + '\t' : arrRow = arrRow + ' \t';
        });
		data = data + arrRow + '\r'; 
	});
  }

  if (/\.json$|.js$/.test(filename) === true) {
    var data = JSON.stringify(arr2D);
    var type = 'data:application/json;charset=utf-8,';
  } else {
	var type = 'data:text/plain;charset=utf-8,';
  }
  var file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}

var el = (tag) => document.createElement(tag);
var ap2 = (p,c) => p.appendChild(c);
var attr = (elm,arr) => elm.setAttribute(arr[0], arr[1]);
var doc = document;


var popCont = el("div");
ap2(doc.body,popCont);
attr( popCont, ["id", "pop_FileUploader"] );

popCont.style.display = "inline-block";
popCont.style.position = "fixed";
popCont.style.top = "20%";
popCont.style.left = "50%";
popCont.style.width = "20%";
popCont.style.height = "11%";
popCont.style.background = "lightgrey";
popCont.style.borderRadius = "1em";
popCont.style.padding = "3px";
popCont.style.zIndex = "10000";
popCont.style.fontFamily = '"Courier New", monospace';

var closeBtn = el("button");
attr( closeBtn, ["id", "note_btn_close"] );
ap2( popCont, closeBtn );
closeBtn.innerText = "+";
closeBtn.style.position = "absolute";
closeBtn.style.background = "transparent";
closeBtn.style.display = "inline-block";
closeBtn.style.width = "1%";
closeBtn.style.height = "2%";
closeBtn.style.transform = "scale(4.5, 4.5) translate(3px, -6px) rotate(45deg)";
closeBtn.style.borderRadius = "1em";
closeBtn.style.transition = "all 366ms";
closeBtn.style.transitionTimingFunction = "cubic-bezier(1,-1.12,.18,1.93)";
closeBtn.style.padding = "0px";
closeBtn.style.boxShadow = "0px";
closeBtn.style.border = "0px";
closeBtn.style.cursor = "pointer";
closeBtn.style.userSelect = "none";
closeBtn.style.fontFamily = '"Courier New", monospace';
closeBtn.style.fontWeight = "bold";
closeBtn.style.color = "Crimson";
closeBtn.addEventListener("click", close);

var uploadElm = el("input");
attr( uploadElm, ["id", "customFileInput"] );
attr( uploadElm, ["type", "file"] );
ap2(popCont,uploadElm);
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
uploadElm.addEventListener("change", handleFiles);

function close() {
  document.body.removeChild(popCont);
}

var jdat_file = '';


function handleFiles() {
  window.FileReader ? getAsText(this.files[0]) : alert('FileReader are not supported in this browser.');
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  jdat_file = event.target.result;
  looper();
  close();
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") alert("Canno't read file !");
}

var parseGeo = (obj) => [obj.displayName, obj.id];


async function lirLocationSearch(geo){
  var res = await fetch("https://www.linkedin.com/recruiter/api/smartsearch/typeahead/bingGeo?query=atlanta&_l=en_US");
  var d = await res.json();
  console.log(d);
  return d;
}

var containArr = [['Location Name','Location ID']];

async function looper(){
  var geos = jdat_file.split(/\n/);
  for(var i=0; i<geos.length; i++){
    console.log(i);
    var dat = await lirLocationSearch(geos[i]);
    await delay(rando(120)+1220);
    if(dat) {
      dat.resultList.forEach(el=> {
        if(containArr.some(a=> a[1] == el.id) === false) containArr.push(parseGeo(el));
      });
    }
  }
  downloadr(containArr,'lir_cites.csv');
}
