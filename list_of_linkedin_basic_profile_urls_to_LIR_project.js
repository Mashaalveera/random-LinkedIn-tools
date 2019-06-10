//This script must be run on the Project Page for which you wish the urls to be added.
//URLs are entered into the prompt upon executing the script.
//URLs MUST be in comma seperated format, e.g, www.linkedin.com/in/someoneperson,www.linkedin.com/in/someotherperson,www.linkedin.com/in/andanotherperson  
//WARNING: Do not abuse this. Running more than a couple hundred URLs through this will likely get you in trouble. 

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var noHTML = (s) => s.replace(/<.+?>/g, '').replace(/\s+/g, ' ').replace(/&.+?;/g, '');
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var cleanName = (s) => s.replace(/(?<=^.+?)\s+-\s+.+|(?<=^.+?)\s*[sSJj][Rr].+|(?<=^.+?)\s*(III|IV|II).*|(?<=^.+?)\b,.*|(?<=^.+?)\s*\(.*/, '');
var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
var timer = new Date().getTime().toString().replace(/\d{4}$/, '0000');
var rando = (n) => Math.round(Math.random() * n);
var fixDate = (s) => s ? s.replace(/[a-zA-Z]+/, s.replace(/(?<=[a-zA-Z]{3}).+/g, '')) : '';

var csrf_id = reg(/ajax:\d+/.exec(document.cookie), 0);

var timezone = -Math.abs(new Date().getTimezoneOffset() / 60);

var lirProjectId = reg(/(?<=projects\/)\d+/.exec(window.location.href),0);

function from1d2(arr, len) {
  var t = [];
  for (i = 0; i < arr.length; i = i + len) {
    var tArr = [];
    for (d = i; d < (i + len); d++) {
      if (arr[d] != undefined) {
        var d2 = tArr.push(arr[d]);
      }
    }
    t.push(tArr);
  }
  return t;
}


async function profileByPath(pubPath) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + pubPath + "/profileActions", {
    "credentials": "include",
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-US,en;q=0.9",
      "csrf-token": csrf_id,
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;6COzu7kOSrixlUAcbcWkOA==",
      "x-li-track": "{\"clientVersion\":\"1.3.140\",\"osName\":\"web\",\"timezoneOffset\":" + timezone + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
      "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  var text = await res.text();
  var lir = /recruiter\/profile\/.+?"/.exec(text)
  var doc = new DOMParser().parseFromString(text, 'text/html');
  var j = JSON.parse(doc.body.innerText);
try{
  var auth = j.data.secondaryAction.action.legacyAuthToken;
  var path = auth ? auth.viewee.replace(/\D+/g, '') + ',' + auth.token + ',' + auth.type : null;
  console.log(path);
  return path;
}
catch(err){
console.log([err,j]);
}
}
// profileByPath('basants');

async function addArrToProject(projId, lirIds) {
  try{
  var res = await fetch("https://www.linkedin.com/recruiter/api/profile/save", {
    "credentials": "include",
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "csrf-token": csrf_id,
      "x-li-page-instance": "urn:li:page:cap-fe-desktop-smart-search;IVUurDH0QmSsNoU7prVhlA==",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.linkedin.com/recruiter/hiring-dashboard",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"projectIds\":[" + projId + "],\"profileIds\":" + JSON.stringify(lirIds) + "}",
    "method": "POST",
    "mode": "cors"
  });
  }
  catch(err){
    console.log(err);
    console.log(lirIds);
  }
}

async function loopThroughBasicProfileUrls(urls){
  var lirPaths = [];
  var publicPaths = urls.map(i=> reg(/(?<=\/in\/).+?(?=\/|$)/.exec(i),0).trim()).filter(el=> el != '');
  for(var i=0; i<publicPaths.length; i++){
    var p = await profileByPath(publicPaths[i]);
    if(p) lirPaths.push(p);
    await delay(rando(201)+2201);
  }

  await delay(rando(201)+2201);
  loopThroughLirIds(lirPaths)
}

async function loopThroughLirIds(paths){
  var chopped = from1d2(paths,25);
  for(var i=0; i<chopped.length; i++){
    await addArrToProject(lirProjectId,chopped[i]);
    await delay(rando(201)+2201);
  }
}

async function initMainScript(){
  var userinput = prompt('Drop your comma seperated links here');
  var urldata = await userinput.split(',').map(i=> i.trim());
  if(urldata.constructor === Array && urldata.length > 1){
    loopThroughBasicProfileUrls(urldata);
  }else{
	alert('bad data. Please enter LinkedIn profile URLs seperated by a comma, and nothing else');
  }
}
initMainScript();
