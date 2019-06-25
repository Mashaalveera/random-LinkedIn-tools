/*
You can run this anywhere on LinkedIn. 
You should avoid trying to download your entire connections list if you have more than 1000 connections.
This tool allows you to specify a date range. Use that to narrow the download. 
Not selecting a date range will get everything. (maybe... assuming you do not have a ton of connections)
The export is a TSV file. If that confuses you--you may not want to use tools like these.
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
  console.log(d.data.widgets[1].statistic.value);
  return d.data.widgets[1].statistic.value;
}


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

var connectionsContainer = [];
var basicPlusContactContainer = [['Profile Link','First Name','Last Name','Occupation','Connected Date','Emails','Phones','Twitter','websites']];

async function enrichContactData(cont){
  for(var i = 0; i<cont.length; i++){
    await delay(rando(150)+1600);
    var cc = await getContactInfo(cont[i].publicIdentifier);
    var conDate = cc ? dateString(cc.connectedAt) : '';
    var out = ['linkedin.com/in/'+cont[i].publicIdentifier,cont[i].firstName,cont[i].lastName,cont[i].occupation,conDate,cc.emailAddress,cc.phones,cc.twitters,cc.websites];
    if(cc) basicPlusContactContainer.push(out);
    gi(document,'connections_dl_loading').innerHTML = 'Getting contact information. <br>'+(i+1)+' of ' + cont.length + '<br>Do not close or do anything else with this window.';
  }
  await downloadr(basicPlusContactContainer,'_connections.tsv');
}

async function loopThroughConnections(end,before,after){
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
      if(res2.included.some(el=> el.createdAt < after)) break;
    }
  }
  var timeFiltered = connectionsContainer.filter(el=> (el.createdAt >= after && el.createdAt <= before));
  gi(document,'connections_dl_loading').innerHTML = 'Enriching '+timeFiltered.length+' connections with contact information. This will take about '+Math.round((timeFiltered.length * 3) / 60)+' minutes to complete.';
  await enrichContactData(timeFiltered);
  gi(document,'connections_dl_loading').innerHTML = 'All done! This was downloaded as a TSV file.<br>Excel will not parse this by default. Google "how to open a tsv file in excel" if you are struggling to figure it out.<br>I cannot do everything for you.<br>¯\\_(ツ)_/¯'
}

async function createHTMLSearchBox() {
  if (gi(document, 'connections_dl_container')) gi(document, 'connections_dl_container').outerHTML = '';

  var connections = await getNumberOfConnections();
  var timeEstimate = connections ? Math.round((((connections / 100) * 3) + (connections * 3)) / 60) : null;
  var connectionsMsg = connections > 1000 ? 'You have <span style="color: #004471;">'+connections+ '</span> connections.<br>You should select a date range to pull from.<br>It will take about <span style="color: #004471;">'+Math.round((timeEstimate/60)*100)/100+'</span> hours to pull all of this information at once, and you may end up in LinkedIn Jail if you try it.': 'You have <span style="color: #004471;">'+connections+ '</span> connections. You can download all of these as a TSV file in about <span style="color: #004471;">'+timeEstimate+'</span> minutes, or you can specify a date range if you do not need everything';

  var cont = ele('div');
  attr(cont, 'id', 'connections_dl_container');
  attr(cont, 'style', 'padding: 1px; position: fixed; top: 1%; left: 1%; width: 380px; z-index: 11111;');
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'id', 'connections_dl_head');
  attr(head, 'style', 'padding: 3px; background: #004471; color: #fff; border-top-left-radius: 0.2em; border-top-right-radius: 0.2em; border: 1.5px solid #004471; height: 33px; cursor: move;');
  cont.appendChild(head);
  head.addEventListener('mouseover',dragElement);

  var close = ele('div');
  attr(close, 'id', 'connections_dl_close');
  attr(close, 'style', 'padding: 0px; background: #004471; color: crimson; float: left; transform: scale(1.8, 1.1) translateX(.2em); cursor: pointer; border-radius: 50%; width: 14px; height: 22px; text-align: center;');
  close.innerText = 'X';
  head.appendChild(close);
  close.addEventListener('click',kill2xParents);
  close.addEventListener('mouseover', hoverSwitch);
  close.addEventListener('mouseout', hoverSwitch);

  var searchBtn = ele('div');
  attr(searchBtn, 'id', 'connections_dl_searchBtn');
  attr(searchBtn, 'style', 'padding: 3px; background: #fff; color: #004471; border-radius: 0.2em; border: 1.2px solid #fff; width: 94%; float: right; width: 26%; height: 28px; cursor: pointer; text-align: center;');
  searchBtn.innerText = 'Run Export';
  head.appendChild(searchBtn);
  searchBtn.addEventListener('click',runSearch);
  searchBtn.addEventListener('mouseover', hoverSwitch);
  searchBtn.addEventListener('mouseout', hoverSwitch);

  var bod = ele('div');
  attr(bod, 'id', 'connections_dl_body');
  attr(bod, 'style', 'padding: 6px; background: #fff; color: #000; border-bottom-left-radius: 0.2em; border-bottom-right-radius: 0.2em; border: 1.5px solid #004471;');
  cont.appendChild(bod);

  var loading = ele('div');
  attr(loading, 'id', 'connections_dl_loading');
  attr(loading, 'style', 'padding: 6px; background: #fff; color: #000; border-radius: 0.2em; border: 0.4px solid #004471; width: 94%; font-size: 0.9em;');
  bod.appendChild(loading);
  loading.innerHTML = connectionsMsg;

  var datebox = ele('div');
  attr(datebox,'id','connections_dateFrame');
  attr(datebox,'style',`padding: 1px; background: transparent; color: #004471; display: inline-block; font-size: 0.9em; width: 98%;`);
  bod.appendChild(datebox);  

  var defaultEnd = `${new Date().getFullYear()}-${(new Date().getMonth() + 2)}-28`;
  var dateLabel1 = ele('div');
  attr(dateLabel1,'style',`padding: 3px; background: transparent; color: #004471; font-size: 0.85em; text-align: center;`);
  dateLabel1.innerText = 'Specify Date Range';
  datebox.appendChild(dateLabel1);

  var d_input1 = ele('input');
  attr(d_input1,'id','startdate_input_data');
  attr(d_input1,'type','date');
  attr(d_input1,'min','1950-01-01');
  attr(d_input1,'max',defaultEnd);
  attr(d_input1,'style',`width: 48%; padding: 6px; background: transparent; color: #004471; border: 1px solid #004471; broder-radius: 0.15em; font-size: 0.9em;`);
  datebox.appendChild(d_input1);

  var d_input2 = ele('input');
  attr(d_input2,'id','enddate_input_data');
  attr(d_input2,'type','date');
  attr(d_input2,'min','1950-01-01');
  attr(d_input2,'max',defaultEnd);
  attr(d_input2,'style',`width: 48%; padding: 6px; background: transparent; color: #004471; border: 1px solid #004471; broder-radius: 0.15em; font-size: 0.9em;`);
  datebox.appendChild(d_input2);

  function runSearch(){
    var start = gi(document,'startdate_input_data').value;
    var end = gi(document,'enddate_input_data').value;
    var after = start ? new Date(start).getTime() : new Date('2002-01-18').getTime();
    var before = end ? new Date(end).getTime() : new Date().getTime();
    loopThroughConnections(connections, before, after);
    gi(document,'connections_dateFrame').outerHTML = '';
  }

}

createHTMLSearchBox()
