/*
This script takes a CSV or TSV or any simple txt file, 
extracts the LinkedIn Recruiter URLs, 
and returns a TSV file with the corresponding public profile URLs
output TSV header:
First Name,	Last Name,	Location,	Postal Code,	Public URL,	LIR URL,	Source URL (this is the input URL. it may or may not match the output LIR URL)
*/

var reg = (o, n) => o ? o[n] : ''; /* this is used to validate a regular expression exec function. o == the regex exec function, n == the index we wish to retreave from the regex exec funtion object */

var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() * n);

var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1])); /* this is a function which allows us to apply an array of attributes and their values to the specifiect HTML object */

async function getFullProfileDetails(path) { /* this is used to call the LIR profile data. It requests the HTML text, then converts some hidden JSON data within the HTML file. This is where we find the public profile URL and other inforamtion */
  var res = await fetch("https://www.linkedin.com/recruiter/profile/" + path).catch(err=> console.log([path, err]));
  var textBod = await res.text().catch(err=> console.log([path, res, err]));
  var jj = reg(/\{"data":\{"breadcrumbs":.+?"contractId":\d+,"memberId":\d+\}\}\}/.exec(textBod.replace(/\n|\u{2028}/gu, '')), 0);
  try {
    var dat = await JSON.parse(jj);
    return dat;
  } catch (err) {
    console.log([err, path, jj])
    return null;
  }
}


function createUploadHTML() { /* This function creates the HTML to upload your files. It will accept multiple text/csv/tsv files */
  if (gi(document, 'pop_FileUploader')) gi(document, 'pop_FileUploader').outerHTML = '';

  var popCont = ele('div');
  a(popCont, [['id', 'pop_FileUploader'],['style', 'position: fixed; top: 20%; left: 20%; width: 280px; height: 100px; background: lightgrey; border: 1px solid #616161; border-radius: .5em; padding: 6px; z-index: 12000;']]);
  document.body.appendChild(popCont);

  var closeBtn = ele('div');
  a(closeBtn, [['id', 'note_btn_close'],['style', 'float: right; background: transparent; width: 35px; height: 35px; cursor: pointer']]);
  popCont.appendChild(closeBtn);
  closeBtn.innerHTML = `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
  closeBtn.addEventListener("click", close);

  var uploadElm = ele("input");
  a(uploadElm, [["id", "customFileInput"],["type", "file"],["name", "file[]"],["multiple", "true"],['style',`transform: scale(1.1, 1.1) translate(5%, 80%)`]]);
  popCont.appendChild(uploadElm);
  uploadElm.addEventListener("change", handleFiles);

  function close() {
    document.body.removeChild(popCont);
  }
}

var textFile = '';
var loadHandleText = (e) => textFile = textFile + e.target.result;
var parseLIRPATHS = (text) => text.match(/(?<=linkedin.com\/recruiter\/profile\/)\d+,\w+,\w+/gi);

async function handleFiles() { /* this function runs once you upload the file(s). It processes the text data and runs the functions to extract the LinkedIn Recruiter URLs and then runs the function to loop through those URLs*/
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    await getAsText(files[i]);
  }
  gi(document, 'pop_FileUploader').outerHTML = '';
  await delay(1111);
  var lir_paths = parseLIRPATHS(textFile);
  loopThroughProfilePaths(lir_paths);
}

function getAsText(f) { /* this function runs the FileReader function https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
  var reader = new FileReader();
  reader.readAsText(f);
  reader.onload = loadHandleText;
}

async function loopThroughProfilePaths(arr){ /* This function is used to loop through the LIR profile paths, extract the JSON profile data, and download it as a TSV file*/
  var containArr = []; /* holds the JSON profile data */
  var tablehead = 'First Name\tLast Name\tLocation\tPostal Code\tPublic URL\tLIR URL\tSource URL\n';
  for(var i=0; i<arr.length; i++){
    var profile = await getFullProfileDetails(arr[i]);
    await delay(rando(1666)+1666);
    console.log(i);
    if(profile) {
      tablehead = tablehead + lirFullJSON2TSV(profile,arr[i]);
    }
  }
  downloadText(tablehead,`convertedUrls_${new Date().getTime()}.tsv`);
}

var firstNameCleanse = (str) => /(?<=\().+?(?=\))|(?<="|').+?(?="|')|(?<=[a-zA-Z]{1,3}\.\s)\S+/.exec(str) ? /(?<=\().+?(?=\))|(?<="|').+?(?="|')|(?<=[a-zA-Z]{1,3}\.\s)\S+/.exec(str)[0] : /\S+/.exec(str) ? /\S+/.exec(str)[0] : str;
var lastNameCleanse = (str) => str[1] && /[a-z]/.test(str[1]) ? str.replace(/\s*[,-]\s*[A-Z\s-,]{3,}/,'').replace(/\s*,.+/, '') : str;
var fixCase = (s) => s.split(/\b-\b/).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-');
var reChar = (s) => typeof s == 'string' && s.match(/&#\d+;/g) && s.match(/&#\d+;/g).length > 0 ? s.match(/&#\d+;/g).map(el => [el, String.fromCharCode(reg(/(?<=&#).+?(?=;)/.exec(el),0))]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;

function lirFullJSON2TSV(obj,path){ /* this function is used to parse the JSON data and returns it as a tab seperated row*/
  var profile = obj.data && obj.data.profile ? obj.data.profile : null;
  var firstname = profile && profile.firstName ? fixCase(firstNameCleanse(reChar(profile.firstName))).replace(/\t/g,'') : '';
  var lastname = profile && profile.lastName ? fixCase(lastNameCleanse(reChar(profile.lastName))).replace(/\t/g,'') : '';
  var lir_ = profile && profile.findAuthInputModel && profile.findAuthInputModel.asUrlParam ? 'https://www.linkedin.com/recruiter/profile/'+profile.findAuthInputModel.asUrlParam : '';
  var publicUrl = profile && profile.publicLink ? profile.publicLink : '';
  var fullgeo = profile && profile.location ? profile.location : '';
  var postalcode = profile && profile.geoRegionSearchUrl ? reg(/(?<=postalCode\=)\d+/.exec(profile.geoRegionSearchUrl),0) : ''; 
  return `${firstname}\t${lastname}\t${fullgeo}\t${postalcode}\t${publicUrl}\t${lir_}\t${'https://www.linkedin.com/recruiter/profile/'+path}\n`;
}

function downloadText(text, filename) {
  var file = new Blob([text], {    type: 'data:text/plain;charset=utf-8,'  });
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


createUploadHTML();

