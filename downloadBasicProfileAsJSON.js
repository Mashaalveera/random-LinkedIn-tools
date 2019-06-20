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
var csrf = reg(/ajax:\d+/.exec(document.body.innerHTML), 0);
var dateString = (s) => new Date(s).toString().replace(/^\S+/, '').replace(/\d\d:\d\d.+/, '').trim().replace(/(?<=[a-zA-Z]{3})\s\d+/, '');
var timeOffset = -(new Date().getTimezoneOffset() / 60);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var rando = (n) => Math.round(Math.random() * n);
function genTrackId(n) {
  var s = '';
  var chars = '0123456789abcdefghijklmnpoqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUVWXYZ0123456789';
  for (var i = 0; i <= n; i++) {
    s += chars[rando(72)];
  }
  return s + '==';
}
var clientVersion = '1.3.2326';
var trackingId = genTrackId(21);
function creds(pubId){ return {    "credentials": "include",    "headers": {      "accept": "application/vnd.linkedin.normalized+json+2.1",      "accept-language": "en-US,en;q=0.9",      "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),      "x-li-lang": "en_US",      "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;"+trackingId,      "x-li-track": "{\"clientVersion\":\""+clientVersion+"\",\"osName\":\"web\",\"timezoneOffset\":" + timeOffset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",      "x-restli-protocol-version": "2.0.0"    },    "referrer": "https://www.linkedin.com/in/" + pubId + "/",    "referrerPolicy": "no-referrer-when-downgrade",    "body": null,    "method": "GET",    "mode": "cors"  };}
function parseTimePeriod(obj){
    var startObj = obj && obj.startDate ? obj.startDate : '';
    var endObj = obj && obj.endDate ? obj.endDate : '';
    var startM = startObj.month ? startObj.month : 1;
    var startY = startObj.year ? startObj.year : new Date().getFullYear();
    var endM = endObj.month ? endObj.month : (new Date().getMonth()+1);
    var endY = endObj.year ? endObj.year : 'Present';
    var startDate = new Date(startM + '-28-' + startY).getTime();
    var endDate = endY == 'Present' ? new Date().getTime() : new Date(endM + '-28-' + endY).getTime();
    return [startDate,endDate];
}
function parseBasics(obj){
  var pub = obj.included.length > 0 ? obj.included[0].publicIdentifier : '';
  var d = obj.data;
  var o = {
    char39: reg(/.{39}$/.exec(d.entityUrn),0),
    headline: d.headline ? d.headline : '',
    firstName: d.firstName ? d.firstName : '',
    lastName: d.lastName ? d.lastName : '',
    locationName: d.locationName ? d.locationName : '',
    summary: d.summary ? d.summary : '',
    industryName: d.industryName ? d.industryName : '',
    memberId: obj.included[0].objectUrn ? obj.included[0].objectUrn.replace(/\D+/g, '') : '',
    publicId: pub
  };
  return o;
}
function parseContactInfo(obj){
  var d = obj.data;
  var phones = d.phoneNumbers ? d.phoneNumbers.map(i=> i.number) : [];
  var twitters = d.twitterHandles ? d.twitterHandles.map(i=> i.name) : [];
  var websites = d.websites ? d.websites.map(i=> i.url) : [];
  var o = {
    connectedAt: d.connectedAt ? d.connectedAt : '',
    emailAddress: d.emailAddress ? d.emailAddress : '',
    phones: phones,
    twitters: twitters,
    websites: websites
  };
  return o;
}
function parseEmployment(obj) {
  var arr = obj.included.filter(i=> i.title);
  var temp = [];
  for (var i = 0; i < arr.length; i++) {
    var obj = {
      title: arr[i].title,
      companyName: arr[i].companyName ? arr[i].companyName : '',
      companyId: arr[i].companyUrn ? arr[i].companyUrn.replace(/\D+/g, '') : '',
      geo: arr[i].geoLocationName,
      startDate: parseTimePeriod(arr[i].timePeriod)[0],
      endDate: parseTimePeriod(arr[i].timePeriod)[1],
      description: arr[i].description ? arr[i].description : ''
    };
    temp.push(obj);
  }
  temp.sort((a, b) => a.endDate - b.endDate);
  temp.reverse();
  return temp;
}
function parseEducation(obj){
  var arr = obj.included.filter(el=> el.degreeName != undefined);
  var temp = [];
  for(var i=0; i<arr.length; i++){
    var timePeriod = arr[i].timePeriod ? arr[i].timePeriod : null;
    var start = timePeriod ? timePeriod.startDate : null;
    var end = timePeriod ? timePeriod.endDate : null;
    var endY = end ? end.year : null;
    var startY = start ? start.year : null;
    var o = {
      schoolName: arr[i].schoolName ? arr[i].schoolName : '',
      degreeName: arr[i].degreeName ? arr[i].degreeName : '',
      description: arr[i].description ? arr[i].description : '',
      fieldOfStudy: arr[i].fieldOfStudy ? arr[i].fieldOfStudy : '',
      activities: arr[i].activities ? arr[i].activities : '',
      schoolId: arr[i].schoolUrn ? arr[i].schoolUrn.replace(/\D+/g, '') : '',
      fieldOfStudy: arr[i].fieldOfStudy ? arr[i].fieldOfStudy : '',
      startYear: startY ? startY : '',
      endYear: endY ? endY : ''
    };
    temp.push(o);
  }
  temp.sort((a, b) => a.endYear - b.endYear);
  return temp;
}
function parseVolunteer(obj) {
  var arr = obj.included.filter(i=> i.role);
  var temp = [];
  for (var i = 0; i < arr.length; i++) {
    var obj = {
      role: arr[i].role ? arr[i].role : '',
      companyName: arr[i].companyName ? arr[i].companyName : '',
      companyId: arr[i].companyUrn ? arr[i].companyUrn.replace(/\D+/g, '') : '',
      cause: arr[i].cause ? arr[i].cause : '',
      startDate: parseTimePeriod(arr[i].timePeriod)[0],
      endDate: parseTimePeriod(arr[i].timePeriod)[1],
      description: arr[i].description ? arr[i].description : ''
    };
    temp.push(obj);
  }
  temp.sort((a, b) => a.endDate - b.endDate);
  temp.reverse();
  return temp;
}
function parseCerts(obj){
  var arr = obj.included.filter(i=> i.companyUrn != undefined);
  var temp = [];
  for(var i=0; i<arr.length; i++){
    var o = {
      company: arr[i].authority ? arr[i].authority : '',
      companyId: arr[i].companyUrn ? arr[i].companyUrn.replace(/\D+/g, '') : '',
      name: arr[i].name ? arr[i].name : '',
      url: arr[i].url ? arr[i].url : '',
      licenseNumber: arr[i].licenseNumber ? arr[i].licenseNumber : '',
      startDate: parseTimePeriod(arr[i].timePeriod)[0],
      endDate: parseTimePeriod(arr[i].timePeriod)[1],
    };
    temp.push(o);
  }
  return temp;
}
function parseRecommendations(obj){
  var v1 = obj.included.filter(i=> i.firstName).map(el=> {
    var o = {
      firstName: el.firstName ? el.firstName : '',
      lastName: el.lastName ? el.lastName : '',
      occupation: el.occupation ? el.occupation : '',
      publicIdentifier: el.publicIdentifier ? el.publicIdentifier : '',
      char39: el.entityUrn ? reg(/.{39}$/.exec(el.entityUrn),0) : '',
      memberId: el.objectUrn ? el.objectUrn.replace(/\D+/g, '') : ''
    };
    return o;
  });
  var v2 = obj.included.filter(i=> i.created).map(el=> {
    var o = {
      entityUrn: el.entityUrn ? reg(/(?<=fs_recommendation:\().{39}/.exec(el.entityUrn),0) : '',
      created: el.created ? el.created : 0,
      lastModified: el.lastModified ? el.lastModified : '',
      relationship: el.relationship ? el.relationship.replace(/_/g, ' ') : '',
      recommendationText: el.recommendationText ? el.recommendationText : '',
    };
    return o;
  });
  var temp = [];
  for(var i=0; i<v1.length; i++){
    for(var v=0; v<v2.length; v++){
       if(new RegExp(v1[i].char39,'i').test(v2[v].entityUrn)){
          var o = {
            firstName: v1[i].firstName,
            lastName: v1[i].lastName,
            occupation: v1[i].occupation,
            publicIdentifier: v1[i].publicIdentifier,
            char39: v1[i].char39,
            memberId: v1[i].memberId,
            created: v2[v].created,
            lastModified: v2[v].lastModified,
            relationship: fixCase(v2[v].relationship),
            recommendationText: v2[v].recommendationText,
          };
         temp.push(o);
       }
    }
  }
  return temp;
}
function parseSkills(obj){
  return obj.included.length > 0 ? obj.included.map(i=> i.name) : [];
}
function parseLanguages(obj){
  return obj.included.length ? obj.included.map(i=> {
    var o = {
      name: i.name ? i.name : '',
      proficiency: i.proficiency ? i.proficiency : ''
    };
   return o;
  }) : [];
}
function parsePublications(obj){
  return obj.included.filter(el=> el.date).map(el=> {
    var dateobj = el.date ? el.date : null;
    var dateYear = dateobj ? dateobj.year : null;
    var year = dateYear ? dateYear : '';
    return {
      description: el.description ? el.description : '',
      title: el.name ? el.name : '',
      publisher: el.publisher ? el.publisher : '',
      url: el.url ? el.url : '',
      date: year ? year : '',
    };
  });
}
function parseProjects(obj){
  return obj.included.filter(el=> el.title).map(el=> {
    return {
      description: el.description ? el.description : '',
      title: el.title ? el.title : '',
      url: el.url ? el.url : '',
      startDate: parseTimePeriod(el.timePeriod)[0],
      endDate: parseTimePeriod(el.timePeriod)[1],
    };
  });
}
async function getBasics(pubId) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + pubId + "/",  creds(pubId));
  var d = await res.json();
  return parseBasics(d);
}
async function getEmployments(pubId) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + pubId + "/positionGroups?start=0&count=20", creds(pubId));
  var d = await res.json();
  return parseEmployment(d);
}
async function getContactInfo(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/profileContactInfo", creds(pubId));
  var d = await res.json();
  return parseContactInfo(d);
}
async function getEducations(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/educations?count=10&start=0", creds(pubId));
  var d = await res.json();
  return parseEducation(d);
}
async function getVolunteers(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/volunteerExperiences?count=10&start=0", creds(pubId));
  var d = await res.json();
  return parseVolunteer(d);
}
async function getCertifications(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/certifications?count=10&start=0", creds(pubId));
  var d = await res.json();
  return parseCerts(d);
}
async function getSkills(pubId){ /*only gets the first 50 skills. should look at this at a future date*/
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/skills?count=50&start=0", creds(pubId));
  var d = await res.json();
  return parseSkills(d);
}
async function getRecommendations(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/recommendations?q=received&recommendationStatuses=List(VISIBLE)", creds(pubId));
  var d = await res.json();
  return parseRecommendations(d);
}
async function getLanguages(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/languages?count=50&start=0", creds(pubId));
  var d = await res.json();
  return parseLanguages(d);
}
async function getPublications(pubId){ 
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/publications?count=50&start=0", creds(pubId));
  var d = await res.json();
  return parsePublications(d);
}
async function getProjects(pubId){
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/"+pubId+"/projects?count=50&start=0", creds(pubId));
  var d = await res.json();
  return parseProjects(d);
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
async function getFullProfileObject(pubId){
  var basics = await getBasics(pubId);
  var contact = await getContactInfo(pubId);
  var jobs = await getEmployments(pubId);
  var edus = await getEducations(pubId);
  var vols = await getVolunteers(pubId);
  var certs = await getCertifications(pubId);
  var skills = await getSkills(pubId);
  var recs = await getRecommendations(pubId);
  var langs = await getLanguages(pubId);
  var pubs = await getPublications(pubId);
  var projects = await getProjects(pubId);
  var obj = {
    basics: basics,
    contact: contact,
    jobs: jobs,
    edus: edus,
    vols: vols,
    certs: certs,
    skills: skills,
    recs: recs,
    langs: langs,
    pubs: pubs,
    projects: projects
  };
  return obj;
}
async function dl(){
  var path = reg(/linkedin\.com\/in\/(.+?)\//.exec(window.location.href),1);
  var profile = await getFullProfileObject(path);
  downloadr(profile,path.replace(/\W+/g,'')+'.json')
}
if(/linkedin\.com\/in\/(.+?)\//.test(window.location.href)) dl();
