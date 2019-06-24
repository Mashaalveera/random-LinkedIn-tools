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
//   console.log(d);
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
  }
console.log(JSON.stringify(basicPlusContactContainer));
}

async function loopThroughConnections(){
  var res = await getConnections(0);
  if(res) processConnections2Container(res);
  var isfin = res ? res.data.metadata.id : null;
  if(isfin == '100'){
    for(var i=100; i<30000; i=i+100){
      await delay(rando(150)+1600);
      var res2 = await getConnections(i);
      if(res2) processConnections2Container(res2);
      var isfinished = res2 ? res2.data.metadata.id : null;
      if(isfinished != '100') break;
    }
  }
  enrichContactData(connectionsContainer);
}


loopThroughConnections();
