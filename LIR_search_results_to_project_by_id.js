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
var parseDate = (o) => o ? new Date(o).getTime() : now;
var milsec2Month = (n) => Math.round(n / 2.628e+9);
var now = new Date().getTime();

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var getLIRpathIdsFromArrOfResults = (arr) => JSON.stringify(arr.map(r => r.memberId + ',' + r.authToken + ',' + r.authType));

async function getSearchResults(p) {
  var apiLink = window.location.href.replace(/smartsearch/, 'api/smartsearch').replace(/\/history/, '').replace(/\/project\/\d+/, '');
  var url = apiLink.replace(/&start=\d+/, '&start=' + p);
  var res = await fetch(url);
  var jdat = await res.json();
  return jdat;
}

async function loopThroughSearchRes(projectId) {
  var pathContainer = [];
  var firstRes = await getSearchResults(0);
  var resArr1 = firstRes.result.searchResults;
  var stringPaths_1 = getLIRpathIdsFromArrOfResults(resArr1);
  pathContainer.push(stringPaths_1);
  await addArrToProject(projectId, stringPaths_1);
  var numRes = firstRes.meta.total;
  if (numRes > 24) {
    for (var i = 25; i < 1000; i=i+25) { 
      var res = await getSearchResults(i); 
      var searchRes = res.result.searchResults;
      if (searchRes) {
        var stringPaths_2 = getLIRpathIdsFromArrOfResults(searchRes);
        pathContainer.push(stringPaths_2)
        await addArrToProject(projectId, stringPaths_2);
        numRes = res.meta.total;
        await delay(rando(1222));
        if (numRes < 25) break;
      }
    }
  }
  alert('all set!');
}

async function addArrToProject(projId, recs) {
  var res = await fetch("https://www.linkedin.com/recruiter/api/profile/save", {
    "credentials": "include",
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),
      "x-li-page-instance": "urn:li:page:cap-fe-desktop-smart-search;IVUurDH0QmSsNoU7prVhlA==",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": window.location.href,
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"projectIds\":[" + projId + "],\"profileIds\":" + recs + "}",
    "method": "POST",
    "mode": "cors"
  });
}
function initSearch2Proj(){
  var id = prompt('drop your project id here');
  if(/\d+/.test(id)){
    loopThroughSearchRes(id.trim());
  }else{
    alert('nope. that is not a project id');
  }
}
initSearch2Proj()
