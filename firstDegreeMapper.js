/*
Work in progress. Not ready for producation
*/
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
var now = new Date().getTime();
var parseDate = (o) => o ? new Date(o).getTime() : now;
var milsec2Month = (n) => Math.round(n / 2.628e+9);
var apiLink = window.location.href.replace(/smartsearch/, 'api/smartsearch').replace(/\/history/, '').replace(/\/project\/\d+/, '');

var dateString = (s) => new Date(s).toString().replace(/^\S+/, '').replace(/\d\d:\d\d.+/, '').trim().replace(/(?<=[a-zA-Z]{3})\s\d+/, '');
var presentCheck = (d) => d > new Date().getTime() ? 'Present' : dateString(d);

var timeOffset = -(new Date().getTimezoneOffset() / 60);

function genTrackId(n) {
  var s = '';
  var chars = '0123456789abcdefghijklmnpoqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUVWXYZ0123456789';
  for (var i = 0; i <= n; i++) {
    s += chars[rando(72)];
  }
  return s + '==';
}

var clientVersion = reg(/(?<=voyager-web_).+?(?=%)/.exec(document.head.innerHTML),0);
var trackingId = genTrackId(21);


var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

async function basicSearch(char39,lastname) {
  var res = await fetch("https://www.linkedin.com/voyager/api/search/blended?count=40&filters=List(network-%3EF%7CS,connectionOf-%3E"+char39+",resultType-%3EPEOPLE,lastName-%3E"+lastname+")&origin=FACETED_SEARCH&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=0", {
  "credentials": "include",
  "headers": {
    "accept": "application/vnd.linkedin.normalized+json+2.1",
    "accept-language": "en-US,en;q=0.9",
    "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),
    "x-li-lang": "en_US",
    "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_people;"+trackingId,
    "x-li-track": "{\"clientVersion\":\""+clientVersion+"\",\"osName\":\"web\",\"timezoneOffset\":" + timeOffset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
    "x-restli-protocol-version": "2.0.0"
  },
  "referrer": window.location.href,
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors"
});
  var d = await res.json();
  var searchRes = d.included.filter(i=> i.influencer === true || i.influencer === false)
  console.log(searchRes);
  console.log(d.data);
}

async function getBasicBy(path) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + path + "/", {
    "credentials": "include",
    "headers": {
    "accept": "application/vnd.linkedin.normalized+json+2.1",
    "accept-language": "en-US,en;q=0.9",
    "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),
    "x-li-lang": "en_US",
    "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_people;"+trackingId,
    "x-li-track": "{\"clientVersion\":\""+clientVersion+"\",\"osName\":\"web\",\"timezoneOffset\":" + timeOffset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
    "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/in/" + path + "/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  var d = await res.json();
  var out = parseBasics(d);
  console.log(out);
  return out;
}

function parseBasics(obj){
  var d = obj.data;
  var o = {
    char39: reg(/.{39}$/.exec(d.entityUrn),0),
    headline: d.headline ? d.headline : '',
    firstName: d.firstName ? d.firstName : '',
    lastName: d.lastName ? d.lastName : '',
    locationName: d.locationName ? d.locationName : '',
    summary: d.summary ? d.summary : '',
    industryName: d.industryName ? d.industryName : '',
    memberId: obj.included[0].objectUrn ? obj.included[0].objectUrn.replace(/\D+/g, '') : ''
  };
  return o;
}

async function get39charsByPaths(links){
  var char39Arr = [];
  var paths = links.map(el=> reg(/(?<=linkedin.com\/in\/).+?(?=\/|$)/.exec(el),0)); 
  console.log(paths);
  for(var i=0; i<paths.length; i++){
    var d = await getBasicBy(paths[i]);
    char39Arr.push(d.char39);
    await delay(rando(121)+1200);
  }
  console.log(char39Arr);
  return char39Arr;
}

async function loopThroughTargetsVsleaders(){
  var leader39chars = get39charsByPaths(['www.linkedin.com/in/kellybryan48/','www.linkedin.com/in/lisahovagimyan/']);
  for(var i=0; i<leader39chars.length; i++){
	var search = await basicSearch(leader39chars[i],'');
    await delay(rando(121)+1200);
  }
// basicSearch('ACoAAAAZRV8Bm8t4FEX5kFNw3Aka1GO6wYDGVF0')
// getBasicBy('kellybryan48')

}

loopThroughTargetsVsleaders()
