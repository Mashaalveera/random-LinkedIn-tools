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
var dateString = (s) => new Date(s).toString().replace(/^\S+/, '').replace(/\d\d:\d\d.+/, '').trim().replace(/(?<=[a-zA-Z]{3})\s\d+/, '');
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var timeOffset = -(new Date().getTimezoneOffset() / 60);

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

async function downloadr(arr2D, filename) {
  if (/\.tsv$|\.csv$/.test(filename)) {
    var data = '';
    arr2D.forEach( row => {
      var arrRow = '';
      row.forEach( col => { col ? arrRow = arrRow + col.toString() + '\t' : arrRow = arrRow + ' \t'; });
      data = data + arrRow + '\r';
    });
  }
  if ( /\.json$|.js$/.test(filename) ) {
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
    await delay(11);
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}



function hoverSwitch() {
  var back = this.style.background;
  var colr = this.style.color;
  this.style.background = colr;
  this.style.color = back;
  this.style.transition = "all 173ms";
}


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

function creds(pubId){ return {    "credentials": "include",    "headers": {      "accept": "application/vnd.linkedin.normalized+json+2.1",      "accept-language": "en-US,en;q=0.9",      "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),      "x-li-lang": "en_US",      "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;"+trackingId,      "x-li-track": "{\"clientVersion\":\""+clientVersion+"\",\"osName\":\"web\",\"timezoneOffset\":" + timeOffset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",      "x-restli-protocol-version": "2.0.0"    },    "referrer": "https://www.linkedin.com/in/" + pubId + "/",    "referrerPolicy": "no-referrer-when-downgrade",    "body": null,    "method": "GET",    "mode": "cors"  };}


async function getNumberOfConnections() {
  var res = await fetch("https://www.linkedin.com/voyager/api/feed/identityModule", {
    "credentials": "include",
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-US,en;q=0.9",
      "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_flagship3_background;"+trackingId,
      "x-li-prefetch": "1",
      "x-li-track": "{\"clientVersion\":\""+clientVersion+"\",\"osName\":\"web\",\"timezoneOffset\":"+timeOffset+",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
      "x-requested-with": "XMLHttpRequest",
      "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/mynetwork/invite-connect/connections/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  var d = await res.json();
  console.log(d);
  console.log(d.data.widgets[1].statistic.value);
  return d.data.widgets[1].statistic.value;
}

async function getConnections(offset) {
  try{
    var res = await fetch("https://www.linkedin.com/voyager/api/relationships/connections?count=100&sortType=RECENTLY_ADDED&start="+offset, {
    "credentials": "include",
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-US,en;q=0.9",
      "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_flagship3_people_connections;"+trackingId,
      "x-li-track": "{\"clientVersion\":\""+clientVersion+"\",\"osName\":\"web\",\"timezoneOffset\":"+timeOffset+",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
      "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/mynetwork/invite-connect/connections/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
    });
  }
  catch(err){
    console.log([err,offset]);
    return null;
  }
  var d = await res.json();
  console.log(d);
  return d;
}

var connectionsContainer = [];

function processConnections2Container(r){
  if(r){
    var content = r.included.filter(el=> el.firstName);
    var timestamp = r.included.filter(el=> el.createdAt);
    for(var i=0; i<content.length; i++){
      for(var t=0; t<timestamp.length; t++){
        var c_id = reg(/.{39}$/.exec(content[i].entityUrn),0);
        var t_id = reg(/.{39}$/.exec(timestamp[t].entityUrn),0);
        if(c_id == t_id){
         var ob = {
           firstName: content[i].firstName,
           lastName: content[i].lastName,
           occupation: content[i].occupation,
           publicIdentifier: content[i].publicIdentifier,
           createdAt: timestamp[t].createdAt,
         };
         if(connectionsContainer.every(el=> el.publicIdentifier != ob.publicIdentifier)) connectionsContainer.push(ob);
        }
      }
    }
  }
}


async function loopThroughConnections(){
  var end = await getNumberOfConnections();
  await delay(444);
  for(var i=0; i<end; i=i+100){
    await delay(rando(150)+1600);
    var res2 = await getConnections(i);
    if(res2) processConnections2Container(res2);
    if(res2.included.length < 1) break;
  }
  downloadr(connectionsContainer,'myconnectiosn.json');
}

loopThroughConnections();

