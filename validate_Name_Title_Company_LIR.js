var reg = (el, n) => el ? el[n] : '';
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() + n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var splitName = (s) => [reg(/^\S+/.exec(s),0), reg(/\S+$/.exec(s),0)];
var titleClean = (s) => encodeURIComponent(s.replace(/&/, '').replace(/\s*-.+/, ''));

var FLTC = (arr) => 'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[1]) + '&jobTitleTimeScope=CP&jobTitleEntities=' + titleClean(arr[2]) + '&firstName=' + splitName(arr[0])[0] + '&lastName=' + splitName(arr[0])[1] +'&start=0';

var FTC = (arr) => 'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[1]) + '&jobTitleTimeScope=CP&jobTitleEntities=' + titleClean(arr[2]) + '&firstName=' + splitName(arr[0])[0] + '&lastName='+'&start=0';

var LTC = (arr) =>  'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[1]) + '&jobTitleTimeScope=CP&jobTitleEntities=' + titleClean(arr[2]) + '&firstName=&lastName=' +splitName(arr[0])[1]+'&start=0';

var FLC = (arr) => 'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[1]) + '&jobTitleTimeScope=CP&jobTitleEntities='+'&firstName=' + splitName(arr[0])[0] + '&lastName=' + splitName(arr[0])[1]+'&start=0';

var containArr = [];

async function searchBy(url){
  var res = await fetch(url);
  var jdat = await res.json();
  return jdat;
}

async function looper(arr){
  for(var i=0; i<arr.length; i++){ 
	var res = await checker(arr[i]);
    var linked = res ? res.result.searchResults.map(id=> 'www.linkedin.com/in/'+id.niid) : [];
    var obj = {
		firstName: splitName(arr[i][0])[0], 
		lastName: splitName(arr[i][0])[1],
		company: arr[i][1], 
		title: arr[i][2], 
		linkedIn: linked
	};
    containArr.push(obj);
    await delay(rando(150)+1500);
  }
  console.log(containArr);
}

async function checker(arr){
  var s1 = await searchBy(FLTC(arr));
  if(s1.meta.total < 1){
    var s2 = await searchBy(FTC(arr));
    if(s2.meta.total < 1){
      var s3 = await searchBy(LTC(arr));
      if(s3.meta.total < 1){
        var s4 = await searchBy(FLC(arr));
        if(s4.meta.total < 1){
          return null;
        }else{
          return s4;
        } //s4
      }else{
		return s3;
      } //s3
    }else{
      return s2;
    } //s2
  }else{
    return s1
  } //s1
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
  jdat_file = event.target.result.split(/\r/).map(row=> row.split(/\t/).map(c=> c.trim()));;
  close();
  alert('this will take about '+(Math.round( (jdat_file.length * 1.7) / 60 ))+' minutes to complete');
  looper(jdat_file);
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") alert("Canno't read file !");
}
