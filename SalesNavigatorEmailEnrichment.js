/*
This only works if you have a Sales Navigator Account. 
Do not use on more than 1200 checks in a given day.
Watch the fucking video I provided here before using this script, and certainly before contacting me with any questions. 
https://youtu.be/Xs81OtCf8wQ
*/

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var reChar = (s) => typeof s == 'string' && s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el => [el, String.fromCharCode(reg(/(?<=&#).+?(?=;)/.exec(el), 0))]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
var noHtmlEntities = (s) => typeof s == 'string' ? s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ') : s;

var firstNameCleanse = (str) => /(?<=\().+?(?=\))|(?<="|').+?(?="|')|(?<=[a-zA-Z]{1,3}\.\s)\S+/.exec(str) ? /(?<=\().+?(?=\))|(?<="|').+?(?="|')|(?<=[a-zA-Z]{1,3}\.\s)\S+/.exec(str)[0] : /\S+/.exec(str) ? /\S+/.exec(str)[0] : str;
var lastNameCleanse = (str) => str[1] && /[a-z]/.test(str[1]) ? str.replace(/\s*[,-]\s*[A-Z\s-,]{3,}/, '').replace(/\s*,.+/, '') : str;
var fixCase = (s) => s.split(/\b-\b/).map(el => el.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-');

var now = new Date().getTime();
var parseDate = (o) => o ? new Date(o).getTime() : now;
var milsec2Month = (n) => Math.round(n / 2.628e+9);

var dateString = (s) => new Date(s).toString().replace(/^\S+/, '').replace(/\d\d:\d\d.+/, '').trim().replace(/(?<=[a-zA-Z]{3})\s\d+/, '');

var timeOffset = -(new Date().getTimezoneOffset() / 60);

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);


function randomBalls() {
  var colors = ["#e3f8ff","#e3f0ff","#d4f4ff","#d6e9ff","#d6f5ff","#cfe4ff","#ccf0fc","#c4f0ff","#c2ddff","#baedff","#b5d6ff","#b0ebff","#a6e8ff","#91e3ff","#195db0","#4599ff","#4564ff","#6982ff","#879bff","#bac6ff","#c5cefc","#e6eaff","#c8c4ff","#e5e3ff",'#ff1a0a','#ff430a','#ff6a00','#ffa463','#ffceab','#ffe0ab','#ffc157','#ffa50a','#ffc60a','#ffd64f','#ffe17d','#fff1c4','#fff1c4','#ffd036','#ffc300','#ffc300','#fff694','#ffee36','#fff836','#fffdd1','#d1ffff','#42ffff','#42ffff','#e0ffff','#e0f9ff','#12d1ff','#12d1ff','#d4f6ff','#d4ecff','#57b3ff','#0f93ff','#0f93ff','#0f67ff','#f2ebff','#733dd9','#5800ff','#5800ff','#b187ff','#c978ff','#c978ff','#fdedff','#ffedff','#ff00ff','#ff00c8','#ffe6fa','#ff009d','#ff0044','#ffc7d6','#ff002f','#ffdbe2','#ff2638'];
  var circles = ``;
  for (var i = 0; i < 350; i++) {
    var startPos = 110;
    var startRad = rando(6) / 10;
    var endRad = rando(10) / 10;
    var x = rando(180);
    var y = rando(180);
    var altColor = colors[rando((colors.length-1))];
    var color = colors[rando((colors.length-1))];
    var time = (rando(50) / 10);
    circles += `<circle class="bubbles" cx="${x}" cy="${y}" r="${startRad}" fill="${altColor}">
    <animate attributeName="fill" values="${color}; ${altColor}; ${altColor};" begin="0s" dur="${time}s" repeatCount="indefinite" />
    <animate attributeName="cy" values="${startPos}; ${y-(y/10)}; ${y}; ${startPos-(y/10)}; ${startPos}" begin="0s" dur="${time}s" repeatCount="indefinite" />
    <animate attributeName="r" values="${startRad}; ${endRad}; ${endRad-(endRad/10)}; ${startRad};" begin="0s" dur="${time}s" repeatCount="indefinite" />
    <animate attributeName="cx" values="${startPos}; ${x-(x/10)}; ${x}; ${startPos-(x/10)}; ${startPos}" begin="0s" dur="${time}s" repeatCount="indefinite" />
  </circle>`;
  }
  return circles;
}

async function killthis(){
  gi(document,'celebrationParent').style.transform = 'scale(0.1, 0.1)';
  gi(document,'celebrationParent').style.transition = 'all 700ms';
  await delay(699);
  gi(document,'celebrationParent').outerHTML = '';
}

async function celebrate() {
  if(gi(document,'celebrationParent')) gi(document,'celebrationParent').outerHTML = '';
  var balls = randomBalls();
  var sv = ele('div');
  attr(sv,'id','celebrationParent');
  attr(sv,'style','position: fixed; z-index: 21111; top: 10%; left: 10%; width: 800px; height: 800px; background: transparent; clip-path: circle(30%);');
  document.body.appendChild(sv);
  sv.innerHTML = `<svg viewBox="0 0 220 220">${balls}</svg>`;
  await delay(3009);
  killthis();
}

function genTrackId(n) {
  var s = '';
  var chars = '0123456789abcdefghijklmnpoqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUVWXYZ0123456789';
  for (var i = 0; i <= n; i++) {
    s += chars[rando(72)];
  }
  return s + '==';
}

var clientVersion = reg(/(?<=voyager-web_).+?(?=%)/.exec(document.head.innerHTML), 0); /*DOM Dependancy*/

var trackingId = genTrackId(21);

function creds(pubId) {
  return {
    "credentials": "include",
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-US,en;q=0.9",
      "csrf-token": reg(/ajax:\d+/.exec(document.cookie), 0),
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;" + trackingId,
      "x-li-track": "{\"clientVersion\":\"" + clientVersion + "\",\"osName\":\"web\",\"timezoneOffset\":" + timeOffset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
      "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/in/" + pubId + "/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };
}

function parseTimePeriod(obj) {
  var startObj = obj && obj.startDate ? obj.startDate : '';
  var endObj = obj && obj.endDate ? obj.endDate : '';
  var startM = startObj.month ? startObj.month : 1;
  var startY = startObj.year ? startObj.year : new Date().getFullYear();
  var endM = endObj.month ? endObj.month : (new Date().getMonth() + 1);
  var endY = endObj.year ? endObj.year : 'Present';
  var startDate = new Date(startM + '-28-' + startY).getTime();
  var endDate = endY == 'Present' ? new Date().getTime() : new Date(endM + '-28-' + endY).getTime();
  var monthsInJob = Math.round((endDate - startDate) / 2.628e+9);
  return [dateString(startDate), dateString(endDate), monthsInJob];
}

function parseContactInfo(obj) {
  var d = obj.data;
  var phones = d.phoneNumbers ? d.phoneNumbers.map(i => i.number).toString() : '';
  var twitters = d.twitterHandles ? d.twitterHandles.map(i => i.name).toString() : '';
  var websites = d.websites ? d.websites.map(i => i.url).toString() : '';
  var o = {
    emailAddress: d.emailAddress ? d.emailAddress : '',
    phones: phones,
    twitters: twitters,
    websites: websites
  };
  return o;
}

async function getContactInfo(pubId) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + pubId + "/profileContactInfo", creds(pubId));
  var d = await res.json();
  return parseContactInfo(d);
}

async function getEmployments(pubId) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + pubId + "/positionGroups?start=0&count=20", creds(pubId));
  var d = await res.json();
  var jobs = parseEmployment(d);
  return jobs;
}

function parseEmployment(obj) {
  var arr = obj.included.filter(i => i.title);
  var temp = [];
  for (var i = 0; i < arr.length; i++) {
    var obj = {
      title: noHtmlEntities(reChar(arr[i].title)),
      companyName: arr[i].companyName ? noHtmlEntities(reChar(arr[i].companyName)) : '',
      companyLinkedinPage: arr[i].companyUrn ? 'https://www.linkedin.com/company/' + arr[i].companyUrn.replace(/\D+/g, '') : '',
      geo: arr[i].geoLocationName,
      startDate: parseTimePeriod(arr[i].timePeriod)[0],
      endDate: parseTimePeriod(arr[i].timePeriod)[1],
      monthsInJob: parseTimePeriod(arr[i].timePeriod)[2]
    };
    temp.push(obj);
  }
  temp.sort((a, b) => a.endDate - b.endDate);
  temp.reverse();
  return temp;
}


var color_p = {
  onGreen: '#07ba5b',
  offRed: '#e21212',
  btn: '#00223b',
  btnHover: '#033c66',
  headDark: '#001829',
  darkBorder: '#00090f'
};

var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="${color_p.offRed}" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 333ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 333ms";
}

function hoverSwitch() {
  var bac = this.style.background;
  var col = this.style.color;
  this.style.background = col;
  this.style.color = bac;
  this.style.transition = 'all 133ms';
}

function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

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
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

async function createTSV_UploadHTML() {

  if (gi(document, 'pop_FileUploader')) gi(document, 'pop_FileUploader').outerHTML = '';

  var popCont = ele("div");
  document.body.appendChild(popCont);
  attr(popCont, "id", "pop_FileUploader");
  attr(popCont, 'style', 'position: fixed; top: 20%; left: 10%; width: 380px; background: transparent; padding: 6px; z-index: 12000;');

  var head = ele('div');
  popCont.appendChild(head);
  attr(head, 'style', `display: grid; grid-template-columns: 88% 5% 5%; grid-gap: 1%; justify-content: space-between; background: ${color_p.headDark}; color: #fff; padding: 1px; border: 1.2px solid ${color_p.darkBorder}; border-top-right-radius: 0.3em; border-top-left-radius: 0.3em; cursor: move;`);
  head.onmouseover = dragElement;

  var closeBtn = ele("div");
  attr(closeBtn, 'style', 'background: transparent; width: 28px; height: 28px; cursor: pointer');
  head.appendChild(closeBtn);
  closeBtn.innerHTML = svgs.close;
  closeBtn.onclick = close;
  closeBtn.onmouseenter = aninCloseBtn;
  closeBtn.onmouseleave = anoutCloseBtn;

  var c_bod = ele("div");
  attr(c_bod, 'id', 'content_body_view');
  attr(c_bod, 'style', `background: #fff; padding: 16px; border: 1.2px solid ${color_p.darkBorder}; border-bottom-right-radius: 0.3em; border-bottom-left-radius: 0.3em;`);
  popCont.appendChild(c_bod);

  var uploadElm = ele("input");
  attr(uploadElm, "id", "customFileInput");
  attr(uploadElm, "type", "file");
  attr(uploadElm, "name", "file[]");
  attr(uploadElm, "multiple", "true");
  c_bod.appendChild(uploadElm);
  uploadElm.onchange = () => {
    var textFile = '';
    var files = uploadElm.files;
    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = async (e) => {
      var tableData = await get_emailColumn(e.target.result.split(/\n/).map(el => el.split(/\t/)));
      showTargetDataHTMLView(tableData);
    }
  }

  function close() {
    document.body.removeChild(popCont);
  }

}

function get_emailColumn(table) {
  var targetEmail = table[1].filter(el => /\b[\w\.\-\+]+@[\w\-]+\.[a-zA-Z]{2,13}(\.[a-zA-Z]{2,13}|\b)/.test(el))
  var index = targetEmail[0] ? table[1].indexOf(targetEmail[0]) : null;
  var targetColumn = index ? table.map(el => el[index]) : null
  return {
    table: table,
    targetColumn: targetColumn,
    targetIndex: index
  };
}

function showTargetDataHTMLView(obj) {
  var main = gi(document, 'pop_FileUploader');
  main.style.width = '75%';

  var c_bod = gi(document, 'content_body_view');

  var resCont = ele('div');
  attr(resCont, 'id', 'result_monitor_container');
  attr(resCont, 'style', `display: grid; grid-template-columns: 80% 20%`);
  c_bod.appendChild(resCont);

  var info = ele('div');
  attr(info, 'id', 'information_block');
  attr(info, 'style', `padding: 6px; color: #1c1c1c;`);
  resCont.appendChild(info);
  info.innerHTML = `${obj.targetColumn.length-1} cells found for column <b>${obj.targetColumn[0]}</b> which is assumed to hold your target emails.` /* minus 1 because the first is assumed to be the header */

  var runBtn = ele('div');
  attr(runBtn, 'style', `padding: 6px; color: #fff; border: 1.8px solid ${color_p.darkBorder}; background: ${color_p.btn}; border-radius: 0.3em; text-align: center; cursor: pointer;`);
  resCont.appendChild(runBtn);
  runBtn.innerText = 'Enrich Data';

  runBtn.onmousedown = () => {
    runBtn.style.transform = 'scale(0.95, 0.95)';
    runBtn.style.transition = 'all 60ms';
    runBtn.style.borderRadius = '0.5em';
  };

  runBtn.onmouseup = () => {
    runBtn.style.transform = 'scale(1, 1)';
    runBtn.style.transition = 'all 60ms';
    runBtn.style.borderRadius = '0.3em';
    info.innerText = 'Enriching TSV with LinkedIn Data...';
    initLinkedInDataMap(obj);
    runBtn.outerHTML = '';
    attr(resCont, 'style', `display: grid; grid-template-columns: 50% 50%`);
  };

  runBtn.onmouseenter = () => {
    runBtn.style.background = color_p.btnHover;
    runBtn.style.border = '1.8px solid ' + color_p.btn;
    runBtn.style.transition = 'all 233ms';
  };

  runBtn.onmouseleave = () => {
    runBtn.style.background = color_p.btn;
    runBtn.style.border = '1.8px solid ' + color_p.darkBorder;
    runBtn.style.transform = 'scale(1, 1)';
    runBtn.style.transition = 'all 233ms';
  };
}

async function initLinkedInDataMap(obj) {
  var table = obj.table;
  var emails = obj.targetColumn;
  var tempTable = [];
  gi(document, 'information_block').innerText = `Checking... This will take roughly ${Math.round((4*emails.length)/60)} minutes to complete.`;

  for (var i = 0; i < emails.length; i++) {
    gi(document, 'information_block').innerText = `Checking ${i+1} of ${emails.length}. This will take roughly ${Math.round((4*emails.length)/60)} minutes to complete.`;

    if (/\b[\w\.\-\+]+@[\w\-]+\.[a-zA-Z]{2,13}(\.[a-zA-Z]{2,13}|\b)/.test(emails[i]) === false && i == 0) {
      var header = table[i].concat(['LinkedIn Url', 'Job JSON Data', 'Other Email', 'Phone Numbers', 'Twitter', 'Websites', 'Current Title', 'Current Employer', 'Employer Profile', 'Current Job Location', 'Start Date', 'End Date', 'Months in Job']);
      tempTable.push(header);
    }
    if (/\b[\w\.\-\+]+@[\w\-]+\.[a-zA-Z]{2,13}(\.[a-zA-Z]{2,13}|\b)/.test(emails[i])) {
      var profileData = await salesNav(emails[i]);
      if (profileData[1] != '' && profileData[1] != 'LIMIT REACHED') {
        var contact = await getContactInfo(profileData[1]);
        var jobs = await getEmployments(profileData[1]);
        var jj = jobs[0] ? Object.entries(jobs[0]).map(job => job[1]) : ['', '', '', '', '', '', ''];
        var row = table[i].concat(['https://www.linkedin.com/in/' + profileData[1]], [JSON.stringify(jobs)], Object.entries(contact).map(itm => itm[1]), jj);
        tempTable.push(row);
      } else {
        tempTable.push(table[i]);
        console.log('not a valid email');
      }
    }
    await delay(rando(1600) + 1200);
  }

  gi(document, 'information_block').innerText = 'Enrichment Completed!';
  await delay(333);
  celebrate();
  var newTSV = '';
  for (var n = 0; n < tempTable.length; n++) {
    var setRow = '';
    for (var r = 0; r < tempTable[n].length; r++) {
      var td = tempTable[n][r] + '\t';
      setRow += td;
    }
    var tr = setRow.replace(/\\r|\r|\\n|\n/g, '') + '\r';
    newTSV += tr;
  }
  downloadr(newTSV, 'enriched_LinkedIn_data.tsv');
  //TODO: pass the filename through and name the new file accordingly
}

async function salesNav(email) {
  var res = await fetch("https://www.linkedin.com/sales/gmail/profile/proxy/" + email, {
    "credentials": "include",
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "accept-language": "en-US,en;q=0.9",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  var text = await res.text();
  var publicProfile = reg(/(?<=https:\/\/www.linkedin.com\/in\/).+?(?=&)/i.exec(text), 0);
  var upsell = /upsellOrderOrigin/.test(text);
  var output = upsell ? [email, 'LIMIT REACHED'] : [email, publicProfile];
  return output;
}

function downloadr(str, filename) {
  var data = str;
  var type = 'data:text/plain;charset=utf-8,';
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
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}


createTSV_UploadHTML();
