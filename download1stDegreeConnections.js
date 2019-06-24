/* 
enter the number of connections you wish to download, then press enter. The
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
var dateString = (s) => new Date(s).toString().replace(/^\S+/, '').replace(/\d\d:\d\d.+/, '').trim().replace(/(?<=[a-zA-Z]{3})\s\d+/, '');

var timeOffset = -(new Date().getTimezoneOffset() / 60);

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

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

function kill2xParents(){
  this.parentElement.parentElement.outerHTML = '';
}

function dragElement() {
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
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  elmnt.style.opacity = "0.85";
  elmnt.style.transition = "opacity 700ms";
}

function closeDragElement() {
  document.onmouseup = null;
  document.onmousemove = null;
  elmnt.style.opacity = "1";
}
}

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

function parseContactInfo(obj){
  var d = obj.data;
  var phones = d.phoneNumbers ? d.phoneNumbers.map(i=> i.number) : [];
  var twitters = d.twitterHandles ? d.twitterHandles.map(i=> i.name) : [];
  var websites = d.websites ? d.websites.map(i=> i.url) : [];
  var o = {
    connectedAt: d.connectedAt ? d.connectedAt : '',
    emailAddress: d.emailAddress ? d.emailAddress : '',
    phones: phones.toString(),
    twitters: twitters.toString(),
    websites: websites.toString()
  };
  return o;
}
async function getContactInfo(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/profileContactInfo", creds(pubId));
  var d = await res.json();
  return parseContactInfo(d);
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
  return d;
}

function parseConnectionObject(obj){
  var o = {
   firstName: obj.firstName,
   lastName: obj.lastName,
   occupation: obj.occupation,
   publicIdentifier: obj.publicIdentifier,
  };
  return o;
}

function processConnections2Container(r){
  if(r){
    r.included.filter(el=> el.firstName).forEach(el=> {
      var con = parseConnectionObject(el);
      if(connectionsContainer.every(itm=> itm.publicIdentifier != con.publicIdentifier)) connectionsContainer.push(con);
    });
  }
}

var connectionsContainer = [];
var basicPlusContactContainer = [['Profile Link','First Name','Last Name','Occupation','Connected Date','Emails','Phones','Twitter','websites']];

async function enrichContactData(cont){
  for(var i = 0; i<cont.length; i++){
    await delay(rando(150)+1600);
    var cc = await getContactInfo(cont[i].publicIdentifier);
    var conDate = cc ? dateString(cc.connectedAt) : '';
    var out = [cont[i].publicIdentifier,cont[i].firstName,cont[i].lastName,cont[i].occupation,conDate,cc.emailAddress,cc.phones,cc.twitters,cc.websites];
    if(cc) basicPlusContactContainer.push(out);
    gi(document,'connections_dl_loading').innerHTML = 'Getting contact information. '+i+' of ' + cont.length;
  }
  await downloadr(basicPlusContactContainer,'_connections.tsv');
}

async function loopThroughConnections(end){
  gi(document,'connections_dl_loading').innerHTML = 'Getting your connections. 50 of ' + end;
  var res = await getConnections(0);
  if(res) processConnections2Container(res);
  if(res && res.included.length > 0){
    for(var i=100; i<end; i=i+100){
      await delay(rando(150)+1600);
      var res2 = await getConnections(i);
      if(res2) processConnections2Container(res2);
      gi(document,'connections_dl_loading').innerHTML = 'Getting your connections. '+i+' of ' + end;
      if(res2.included.length < 1) break;
    }
  }
  await enrichContactData(connectionsContainer);
}

async function createHTMLSearchBox() {
  if (gi(document, 'trans_search_container')) gi(document, 'connections_dl_container').outerHTML = '';

  var cont = ele('div');
  attr(cont, 'id', 'connections_dl_container');
  attr(cont, 'style', 'padding: 1px; position: fixed; top: 1%; left: 1%; width: 380px; z-index: 11111;');
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'id', 'connections_dl_head');
  attr(head, 'style', 'padding: 3px; background: #004471; color: #fff; border-radius: 0.2em; border: 1.5px solid #004471; height: 26px; cursor: move;');
  cont.appendChild(head);
  head.addEventListener('mouseover',dragElement);

  var close = ele('div');
  attr(close, 'id', 'connections_dl_close');
  attr(close, 'style', 'padding: 0px; background: transparent; color: crimson; float: left; transform: scale(1.8, 1.1); cursor: pointer;');
  close.innerText = 'X';
  head.appendChild(close);
  close.addEventListener('click',kill2xParents);

  var bod = ele('div');
  attr(bod, 'id', 'connections_dl_body');
  attr(bod, 'style', 'padding: 6px; background: #fff; color: #000; border-radius: 0.2em; border: 1.5px solid #004471;');
  cont.appendChild(bod);

  var loading = ele('div');
  attr(loading, 'id', 'connections_dl_loading');
  attr(loading, 'style', 'padding: 6px; background: #fff; color: #004471; border-radius: 0.2em; border: 0.4px solid #004471; width: 94%;');
  bod.appendChild(loading);

  var searchBox = ele('input');
  attr(searchBox, 'id', 'connections_dl_searchBox');
  attr(searchBox, 'placeholder', 'How many connections?');
  attr(searchBox, 'style', 'padding: 6px; background: #fff; color: #004471; border-radius: 0.2em; border: 0.8px solid #004471; width: 94%;');
  bod.appendChild(searchBox);

  searchBox.addEventListener('keydown', (e) => {
    if (/Enter/i.test(e.key.toString())) {
      var conns = /\d/.test(searchBox.value) ? parseInt(searchBox.value.replace(/\D+/g,'')) : 500;
      loopThroughConnections(conns);
    }
  });

}

createHTMLSearchBox();
