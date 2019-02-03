var isRecruiter = /\/recruiter|\/cap/i.test(window.location.href);

function dragElement() {
  this.style.background = 'rgb(85, 41, 135)';
  this.style.transition = 'all 566ms';
  var elmnt = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) {
    document.getElementById(this.id).onmousedown = dragMouseDown;
  } else {
    this.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.opacity = "0.85";
    elmnt.style.transition = "opacity 1300ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.opacity = "1";
  }
}

var cDiv = document.createElement("div");
cDiv.setAttribute("id", "pop_container");
document.body.appendChild(cDiv);
cDiv.style.display = "inline-block";
cDiv.style.position = "fixed";
cDiv.style.top = "300px";
cDiv.style.left = "50%";
cDiv.style.width = "16%";
cDiv.style.height = "35%";
cDiv.style.border = "1px solid Transparent";
cDiv.style.background = "Transparent";
cDiv.style.borderRadius = "1em";
cDiv.style.padding = "3px";
cDiv.style.zIndex = "10000";
cDiv.style.fontFamily = '"Courier New", monospace';

var mDiv = document.createElement("button");
mDiv.setAttribute("id", "mover_div");
document.getElementById("pop_container").appendChild(mDiv);
mDiv.style.width = "100%";
mDiv.style.height = "10%";
mDiv.style.border = "1px solid rgb(85, 41, 135)";
mDiv.style.backgroundColor = 'rgb(94, 47, 147)';
mDiv.style.borderTopLeftRadius = "1em";
mDiv.style.borderTopRightRadius = "1em";
mDiv.style.padding = "3px";
mDiv.style.fontFamily = '"Courier New", monospace';
mDiv.style.cursor = 'move';

var clsBtn = document.createElement("div");
document.getElementById("mover_div").appendChild(clsBtn);
clsBtn.setAttribute("id", "btn_close");
document.getElementById("btn_close").innerText = "+";
clsBtn.style.position = "absolute";
clsBtn.style.background = "transparent";
clsBtn.style.height = "0px";
clsBtn.style.width = "0px";
clsBtn.style.display = "block";
clsBtn.style.transform = "scale(3.9, 3.9) translate(7px, -10px) rotate(45deg)";
clsBtn.style.borderRadius = "1em";
clsBtn.style.padding = "0px";
clsBtn.style.boxShadow = "0px";
clsBtn.style.border = "0px";
clsBtn.style.cursor = "pointer";
clsBtn.style.userSelect = "none";
clsBtn.style.fontSize = '1em';
clsBtn.style.fontFamily = '"Courier New", monospace';
clsBtn.style.fontWeight = "bold";
clsBtn.style.color = "Crimson";

var expBtn = document.createElement("div");
document.getElementById("mover_div").appendChild(expBtn);
expBtn.setAttribute("id", "btn_expand");
document.getElementById("btn_expand").innerText = "-";
expBtn.style.position = "absolute";
expBtn.style.background = "transparent";
expBtn.style.height = "0px";
expBtn.style.width = "0px";
expBtn.style.display = "block";
expBtn.style.transform = "scale(3.9, 3.9) translate(11px, -10px) rotate(0deg)";
expBtn.style.fontSize = "1.2em";
expBtn.style.borderRadius = "1em";
expBtn.style.padding = "0px";
expBtn.style.boxShadow = "0px";
expBtn.style.border = "0px";
expBtn.style.cursor = "pointer";
expBtn.style.userSelect = "none";
expBtn.style.fontSize = '1em';
expBtn.style.fontFamily = '"Courier New", monospace';
expBtn.style.fontWeight = "bold";
expBtn.style.align = "right";
expBtn.style.color = "lightgrey";

var textbox_1 = document.createElement("textarea");
textbox_1.setAttribute("id", "textbox_code");
textbox_1.setAttribute("placeholder", "Titles Search");
document.getElementById("pop_container").appendChild(textbox_1);
textbox_1.style.width = "99%";
textbox_1.style.height = "14%";
textbox_1.style.padding = "6px";
textbox_1.style.border = "1px solid rgb(85, 41, 135)";
textbox_1.style.background = isRecruiter ? "rgb(19, 25, 35)" : "rgb(193, 183, 204)";
textbox_1.style.display = "block";
textbox_1.style.fontSize = "1.2em";
textbox_1.style.userSelect = "none";
textbox_1.style.fontFamily = '"Courier New", monospace';
textbox_1.style.color = isRecruiter ? "white" : "black";


var textbox_2 = document.createElement("textarea");
textbox_2.setAttribute("id", "textbox_code2");
textbox_2.setAttribute("placeholder", "saveAs filename");
document.getElementById("pop_container").appendChild(textbox_2);
textbox_2.style.width = "99%";
textbox_2.style.height = "14%";
textbox_2.style.padding = "6px";
textbox_2.style.border = "1px solid rgb(85, 41, 135)";
textbox_2.style.background = isRecruiter ? "rgb(19, 25, 35)" : "rgb(193, 183, 204)";
textbox_2.style.display = "block";
textbox_2.style.fontSize = "1.2em";
textbox_2.style.userSelect = "none";
textbox_2.style.fontFamily = '"Courier New", monospace';
textbox_2.style.color = isRecruiter ? "white" : "black";

var dlBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(dlBtn);
dlBtn.setAttribute("id", "dl_box");
document.getElementById("dl_box").innerText = "Save Logs";
dlBtn.style.background = "rgb(94, 47, 147)";
dlBtn.style.border = "1px solid rgb(85, 41, 135)";
dlBtn.style.width = "100%";
dlBtn.style.height = "10%";
dlBtn.style.borderBottomRightRadius = "1em";
dlBtn.style.borderBottomLeftRadius = "1em";
dlBtn.style.cursor = "pointer";
dlBtn.style.color = "white";
dlBtn.style.textAlign = "center";

function clearSearchRes() {
  if (document.getElementById('resultsBox') != null) document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
}

function searchResults(arr) {
    if (arr.length > 0 && arr.length < 12) {
      clearSearchRes();
      createSearchResElms(arr);
    }
	if (arr.length > 11) {
		clearSearchRes();
		showNumRes(arr)
	}
  }
function showNumRes(arr){
	var resultsBox = document.createElement("div");
      resultsBox.setAttribute("id", "resultsBox");
      document.getElementById("pop_container").appendChild(resultsBox);
      resultsBox.style.width = "92%";
      resultsBox.style.height = "12%";
      resultsBox.style.padding = "6px";
      resultsBox.style.border = "1px solid rgb(94, 47, 147)";
      resultsBox.style.background = "rgb(19, 25, 35)";
      resultsBox.style.display = "block";
      resultsBox.style.fontSize = "1em";
      resultsBox.style.borderRadius = "1em";
      resultsBox.style.fontFamily = '"Courier New", monospace';
      resultsBox.style.color = "white";
		resultsBox.innerText = arr.length + ' titles ready for download in JSON file';
}
function createSearchResElms(arr){
	var resultsBox = document.createElement("div");
      resultsBox.setAttribute("id", "resultsBox");
      document.getElementById("pop_container").appendChild(resultsBox);
      resultsBox.style.width = "100%";
      resultsBox.style.height = "100%";
      resultsBox.style.padding = "6px";
      resultsBox.style.border = "1px solid transparent";
      resultsBox.style.background = "transparent";
      resultsBox.style.display = "block";
      resultsBox.style.fontSize = "1em";
      resultsBox.style.borderRadius = "1em";
      resultsBox.style.fontFamily = '"Courier New", monospace';
      resultsBox.style.color = "white";
	for (i = 0; i < arr.length; i++) {
        var resItm = document.createElement("div");
        resItm.setAttribute("id", "resItm_" + i);
        document.getElementById("resultsBox").appendChild(resItm);
        resItm.style.width = "50%";
        resItm.style.height = "10%";
        resItm.style.padding = "6px";
        resItm.style.border = "1px solid rgb(94, 47, 147)";
        resItm.style.background = "rgb(19, 25, 35)";
        resItm.style.display = "inline-block";
        resItm.style.fontSize = ".9em";
        resItm.style.borderRadius = "1em";
        resItm.style.fontFamily = '"Courier New", monospace';
        resItm.style.color = "white";
		resItm.innerText = arr[i].displayName;
      }
}

function close() {
  document.body.removeChild(document.getElementById("pop_container"));
}

function nodrag() {
  this.style.background = 'rgb(94, 47, 147)';
  this.style.transition = 'all 566ms';
}

function shrinker() {
  cDiv.style.opacity = ".77", cDiv.style.transition = 'all 566ms';
}

function expander() {
  cDiv.style.opacity = "1", cDiv.style.transition = 'all 566ms';
}

function expandPop() {
  if (cDiv.style.width == "16%") {
    cDiv.style.width = "35%";
  } else {
    cDiv.style.width = "16%";
  }
}

cDiv.addEventListener('mouseover', expander);
mDiv.addEventListener('mouseout', nodrag);
mDiv.addEventListener('mouseover', dragElement);
clsBtn.addEventListener("click", close);
expBtn.addEventListener("click", expandPop);
dlBtn.addEventListener("click", downloadr);
textbox_1.addEventListener("keyup", searchTerm);


var containArr = [];

var delay = (ms) => new Promise(res => setTimeout(res, ms));

var unqObj = (arr,obj) => {
  if (arr.some(itm => itm.displayName == obj.displayName) === false && arr.length > 0) arr.push(obj);
  if (arr.length == 0) arr.push(obj);
};

async function downloadr() {
  var data = JSON.stringify(containArr);
  var type = 'data:application/json;charset=utf-8,';
  var filename = textbox_2.value + '_LIR.json';
		
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

async function titleSearch(term,arr) {
  var res = await fetch('https://www.linkedin.com/recruiter/api/smartsearch/typeahead/title?query=' + term + '&_l=en_US');
  var jdat = await res.json();
  jdat.resultList.forEach(itm => unqObj(arr,itm));
}

async function searchTerm() {
	var arr = [];
	if(textbox_1.value.length > 4){
		await titleSearch(textbox_1.value, containArr);
		containArr.forEach(itm=> arr.push(itm));
	}
	searchResults(arr); 
}
