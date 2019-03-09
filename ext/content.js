async function initContent(){
var reg = (elm, n) => elm != null ? elm[n] : '';
  var cn = (ob, nm) => ob ? ob.getElementsByClassName(nm) : console.log(ob);
  var tn = (ob, nm) => ob ? ob.getElementsByTagName(nm) : console.log(ob);
  var gi = (ob, nm) => ob ? ob.getElementById(nm) : console.log(ob);
  var noHTML = (str) => str.replace(/<.+?>/g, '').replace(/\s+/g, ' ').replace(/&.+?;/g, '');
  var delay = (ms) => new Promise(res => setTimeout(res, ms));
  var cleanName = (s) => s.replace(/(?<=^.+?)\s+-\s+.+|(?<=^.+?)\s*[sSJj][Rr].+|(?<=^.+?)\s*(III|IV|II).*|(?<=^.+?)\b,.*|(?<=^.+?)\s*\(.*/, '');
  var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  var timer = new Date().getTime().toString().replace(/\d{4}$/, '0000');
  var rando = (n) => Math.round(Math.random()*n);
  await delay(933);
function genTrackId(n){
  var output = '';
  var chars = '0123456789abcdefghijklmnpoqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUVWXYZ0123456789';
  for(var i=0; i<=n; i++){
	output = output + chars[rando(73)];
  }
  return output+'==';
}
  function skillsCleaner(arr) {
    if (arr == null) return null;
    var temp = [];
    arr.forEach(itm => /,/.test(itm) ? itm.split(',').forEach(elm => temp.push(elm)) : temp.push(itm));
    return temp;
  }

  function normalize(str) {
    var arr = Array.from(str);
    var temp = '';
    arr.forEach(itm => /[A-Z]/.test(itm) ? temp = temp + ' ' + itm : temp = temp + itm);
    return temp;
  }

  function fixDate(str) {
    if (str == null) return '';
    var three = str.replace(/(?<=[a-zA-Z]{3}).+/g, '');
    return str.replace(/[a-zA-Z]+/, three);
  }


  /*
  everything above this line 
  	can be globally scoped. 
  	can be run prior to any DOM calls  
  */
  //   await delay(1331); this is needed because of shit implementation if these scripts. 

  var curUrl = window.location.href;
  var lirProfileXD = /(?<=recruiter\/profile\/)\d+,.+?,.+?(?=\?|$)/;

  var curUrl = window.location.href;
  var lirProfileXD = /(?<=recruiter\/profile\/)\d+,.+?,.+?(?=\?|$)/;
  var isSmartSearch = gi(document, 'smart-search-header');
  var isCsrf = gi(document, 'jet-csrfToken');
  var csrf_id = isCsrf ? isCsrf.getAttribute('content') : '';
  var userJdata = isSmartSearch ? JSON.parse(isSmartSearch.getAttribute('data-meta')) : '';
  /*
  above block
  	scoped globally, but only once the window has loaded. 
  	will need additional conditions for load onscroll portions (outside of LIR)
  */
  var projectId = reg(/(?<=projectId=)\d+/.exec(curUrl), 0);

  var isLirProfile = lirProfileXD.test(curUrl);
  var lirId = isLirProfile ? lirProfileXD.exec(curUrl)[0] : undefined;
  var pubId = isLirProfile ? tn(cn(document, 'public-profile searchable')[0], 'a')[0].href : '';

  var degreeDist = cn(cn(document, 'info-container')[0], 'degree-icon badge__seperator')[0].innerText;
  var is1st = /1st/.test(degreeDist);
  var is2nd = /2nd/.test(degreeDist);
  var is3rd = /3rd/.test(degreeDist);

  var projectName = cn(document, 'subtitle')[0] ? cn(document, 'subtitle')[0].innerText.replace(/^from\s+/i, '') : '';


  function clickNext() {
    document.getElementsByClassName('next') ? document.getElementsByClassName('next')[0].getElementsByTagName('a')[0].click() : console.log('nothing next');
  }

  function hoverOutBtn() {
    this.style.background = "#000";
    this.style.transform = "scale(.85, .85) translate(4px, -4px)";
    this.style.transition = "all 173ms";
  }

  function hoverInBtn() {
    this.style.background = "#2d2d2d";
    this.style.transform = "scale(.9, .9) translate(4px, -5px)";
    this.style.transition = "all 173ms";
  }

  function getGeos() {
    var cont = cn(document, 'location searchable')[0];
    var atag = cont ? tn(cont, 'a')[0] : null;
    var href = atag ? atag.href : null;
    var postal = href ? reg(/(?<=postalCode\=)\d+/.exec(href), 0) : '';
    var zip = /\d{5}/.test(postal) ? '&radiusMiles=50&countryCode=us&postalCode=' + postal : '';
    return zip;
  }

  async function getNotes(path) {
    var res = await fetch("https://www.linkedin.com/recruiter/api/profile/" + path + "/fetchRecruitingActivity?activityType=NOTE");
    var jdat = await res.json();
    var notes = jdat.result.recruiterActivity ? jdat.result.recruiterActivity.map(txt => txt.note.note) : [];
    return notes;
  }

  function loadingElm() {
    var loaD = document.createElement("div");
    loaD.setAttribute("id", "loader-elm");
    document.body.appendChild(loaD);
    loaD.style.top = '6%';
    loaD.style.right = '7%';
    loaD.style.position = "fixed";
    loaD.style.zIndex = "10001";
    loaD.innerHTML = '<svg version="1.1" id="Layer_1" x="0px" y="0px"     width="200px" height="200px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;">    <rect x="0" y="10" width="4" height="0" fill="#333" opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y"values="10; 5; 10" begin="0s" dur="555ms" repeatCount="indefinite" />    </rect>    <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0.15s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0.15s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y" values="10; 5; 10" begin="0.15s" dur="555ms" repeatCount="indefinite" />    </rect>    <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0.3s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0.3s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y" values="10; 5; 10" begin="0.3s" dur="555ms" repeatCount="indefinite" />    </rect>  </svg>';
  }

  function killLoader() {
    document.body.removeChild(document.getElementById("loader-elm"));
  }
  function close_pop() {
    document.body.removeChild(document.getElementById("pop_container"));
  }

  function dragElement() {
    this.style.transition = 'all 106ms';
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
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      elmnt.style.opacity = "0.85";
      elmnt.style.transition = "opacity 1300ms";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      elmnt.style.opacity = "1";
    }
  }

  function nodrag() {
    this.style.transition = 'all 566ms';
  }


  async function getFullProfileDetails(path) {
    var res = await fetch("https://www.linkedin.com/recruiter/profile/" + path);
    var textBod = await res.text();
    var dat = await JSON.parse(reg(/\{"data":\{"breadcrumbs":.+?"contractId":\d+,"memberId":\d+\}\}\}/.exec(textBod.replace(/\n|\u{2028}/gu, '')), 0));
    console.log(dat);
    return dat;
  }
  // getFullProfileDetails(lirId)


  async function checkPending(pubPath) {
    var res = await fetch("https://www.linkedin.com/in/" + pubPath + "/");
    var dat = await res.text();
    var pending = /InvitationPending/.test(dat);
    console.log(pending);
    return pending;
  }

  // checkPending(pubId);

  async function sendInvite(uid, pid) {
    var res = await fetch("https://www.linkedin.com/voyager/api/growth/normInvitations", {
      "credentials": "include",
      "headers": {
        "accept": "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json; charset=UTF-8",
        "csrf-token": csrf_id,
        "x-li-lang": "en_US",
        "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;FxFij54nQ5mf2+p2sLXoqg==",
        "x-li-track": "{\"clientVersion\":\"1.2.7817.1\",\"osName\":\"web\",\"timezoneOffset\":-5,\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
        "x-restli-protocol-version": "2.0.0"
      },
      "referrer": "https://www.linkedin.com/in/" + pid + "/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"emberEntityName\":\"growth/invitation/norm-invitation\",\"invitee\":{\"com.linkedin.voyager.growth.invitation.InviteeProfile\":{\"profileId\":\"" + uid + "\"}},\"trackingId\":\"s5gxQ19lQzGtBS5CiZWi7Q==\"}",
      "method": "POST",
      "mode": "cors"
    });
    console.log(res);
  }


  async function initInviter() {
    removeInvt();
    var invCheck = await checkPending(pubId, lirId);
    if (invCheck === false) {
      var profDat = await getFullProfileDetails(lirId);
      var char39 = profDat.data.profile.niid;
      var degree = profDat.data.profile.degree;
      await sendInvite(char39, pubId);
    }
  }

  async function removeInvt() {
    var t = gi(document, 'spec_invite')
    if (t) {
      t.style.opacity = '.01';
      t.style.transform = "scale(.1, .1) translate(4px, -4px)";
      t.style.transition = "all 473ms";
      await delay(490);
      t.outerHTML = '';
    }
  }


  function initToolbar() {
    var fixedToolbar = cn(gi(document, 'secondary-content'), 'module-header')[0];
    var dlAsPdf = document.createElement('div');
    dlAsPdf.setAttribute('id', 'pdfDownloader');
    dlAsPdf.style.float = 'right';
    dlAsPdf.innerText = 'Invite';
    dlAsPdf.style.borderRadius = '.15em';
    dlAsPdf.style.width = '40px';
    dlAsPdf.style.height = '10px';
    dlAsPdf.style.textAlign = 'center';
    dlAsPdf.style.cursor = 'pointer';
    dlAsPdf.style.background = '#000';
    dlAsPdf.style.color = 'white';
    dlAsPdf.style.padding = '6px';
    dlAsPdf.style.border = '2px solid #424242';
    dlAsPdf.style.transform = "scale(.85, .85) translate(4px, -4px)";
    dlAsPdf.innerText = "PDF";
    dlAsPdf.addEventListener('click', initPdfDownloader);
    dlAsPdf.addEventListener('mouseover', hoverInBtn);
    dlAsPdf.addEventListener('mouseout', hoverOutBtn);
    fixedToolbar.insertBefore(dlAsPdf, fixedToolbar.firstChild);

    if (is1st === false) {
      var inv = document.createElement('div');
      inv.setAttribute('id', 'spec_invite');
      inv.style.float = 'right';
      inv.innerText = 'Invite';
      inv.style.borderRadius = '.15em';
      inv.style.width = '40px';
      inv.style.height = '10px';
      inv.style.textAlign = 'center';
      inv.style.cursor = 'pointer';
      inv.style.background = '#000';
      inv.style.color = 'white';
      inv.style.padding = '6px';
      inv.style.border = '2px solid #424242';
      inv.style.transform = "scale(.85, .85) translate(4px, -4px)";
      inv.addEventListener('click', initInviter);
      inv.addEventListener('mouseover', hoverInBtn);
      inv.addEventListener('mouseout', hoverOutBtn);
      fixedToolbar.insertBefore(inv, fixedToolbar.firstChild);
    }
    if (document.getElementsByClassName('next')[0]) {
      var nxtBtn = document.createElement('div');
      nxtBtn.setAttribute('id', 'spec_next');
      nxtBtn.style.float = 'right';
      nxtBtn.innerText = 'Next';
      nxtBtn.style.borderRadius = '.15em';
      nxtBtn.style.width = '40px';
      nxtBtn.style.height = '10px';
      nxtBtn.style.textAlign = 'center';
      nxtBtn.style.cursor = 'pointer';
      nxtBtn.style.background = '#000';
      nxtBtn.style.color = 'white';
      nxtBtn.style.padding = '6px';
      nxtBtn.style.border = '2px solid #424242';
      nxtBtn.style.transform = "scale(.85, .85) translate(4px, -4px)";
      nxtBtn.addEventListener('click', clickNext);
      nxtBtn.addEventListener('mouseover', hoverInBtn);
      nxtBtn.addEventListener('mouseout', hoverOutBtn);
      fixedToolbar.insertBefore(nxtBtn, fixedToolbar.firstChild);
    }
  }




  async function initPdfDownloader() {
    var noteData = await getNotes(lirId);
    var profileObj = await getFullProfileDetails(lirId);

    function parseProfData(obj, notes) {
      var firstName = fixCase(obj.data.profile.firstName);
      var lastName = fixCase(cleanName(obj.data.profile.lastName));
      var emails = obj.data.profile.contactEmails ? obj.data.profile.contactEmails.map(itm => itm.email) : '';
      var phones = obj.data.profile.contactPhones ? obj.data.profile.contactPhones.map(itm => itm.phone) : '';
      var zip = reg(/(?<=postalCode\=)\d+/.exec(obj.data.profile.geoRegionSearchUrl), 0);
      var geo = obj.data.profile.location ? obj.data.profile.location.replace(/, United States/, '') + ', ' + zip : '' + zip;
      var pubLink = obj.data.profile.publicLink;
      var summary = obj.data.profile.summary;
      var skills = skillsCleaner(obj.data.profile.skills);
      var cares = obj.data.profile.volunteeringInterests ? obj.data.profile.volunteeringInterests.supportedPredefinedCauses : null;
      var websites = obj.data.profile.websites ? obj.data.profile.websites
        .map(itm => '<a href="' + itm.url + '">' + itm.url.replace(/http:\/\/(www\.|\b)/, '') + '</a>') : null;
      var orgs = obj.data.profile.organizations ? obj.data.profile.organizations
        .map(itm => itm.position ? itm.name + ', ' + itm.position + '<i style="float: right"> ' + fixDate(itm.i18nStartDate) + '</i>' : itm.name + '<i style="float: right"> ' + fixDate(itm.i18nStartDate) + '</i>') : null;
      var langs = obj.data.profile.languages ? obj.data.profile.languages
        .map(itm => itm.proficiency ? itm.languageName + ' - ' + itm.proficiency.replace(/_/g, ' ') : itm.languageName) : null;
      var certs = obj.data.profile.certifications ? obj.data.profile.certifications
        .map(itm => itm.i18nStartDate ? itm.name + '<i style="float: right"> ' + fixDate(itm.i18nStartDate) + '</i>' : itm.name) : null;
      var refs = obj.data.referencesView ? obj.data.referencesView : null;
      var volunteer = obj.data.profile.volunteeringExperiences;
      var employment = obj.data.positions;
      var edu = obj.data.profile.educations;
      var basicArr = [firstName, lastName, geo, phones, emails, pubLink, summary, skills, orgs, langs, certs, websites, employment, edu, refs, cares, volunteer, notes];
      var parser = new DOMParser();
      var html = tempDivElm(basicArr);
      var doc = parser.parseFromString(html, "text/html");
      printDiv(html);
    }

    function tempDivElm(arr) {
      var noteDump = arr[17].length > 0 ? 'Note:\n' + arr[17].toString().replace(/,/g, '\n') : '';
      var noteRows = arr[17].length ? arr[17].length : 1;
      var contactLine = arr[4] ? '<br>' + arr[3] + ' | ' + arr[4] : arr[3] ? '<br>' + arr[3] : '';
      var temp = '<html><head><title>' + arr[0] + ' ' + arr[1] + '</title><body>' +
        '<div id="printPage" style="text-size: 3em; width: 5%; text-align: center; border-radius: .25em; border-color: white; border-width: 5px; color: white; background: #2d2d2d; padding: 6px; display: inline-block;">print</div>' +
        '<div id="sendToAvature" style="text-size: 3em; width: 10%; text-align: center; border-radius: .25em; border-color: white; border-width: 5px; color: white; background: #2d2d2d; padding: 6px; display: inline-block;">Send to Avature</div>' +
        '<div id="print_Temp" style="color: #2b3442; padding: 10px;">' +
        '<div id="notes-cont" style="text-align: left; font-size: 1.15em;"><div id="notes-text">' + noteDump +
        '</div></div>' +
        '<div id="basic-cont" style="text-align: right; font-size: 1.15em;"><div id="basic-text">' +
        '<a href="' + arr[5] + '">' +
        arr[0] + ' ' + arr[1] +
        '</a>' +
        '<br>' +
        arr[2] +
        contactLine.replace(/\+1\s+/g, "").replace(/,/g, ", ") +
        '<br>' +
        reg(/(?<=www\.).+/.exec(arr[5]), 0) +
        '<br>' +
        '</div></div>' +
        buildPara(arr[6], 'summary') +
        buildEmpl(arr[12]) +
        buildVol(arr[16]) +
        buildEdu(arr[13]) +
        gridmaker(arr[7], 3, 'skills') +
        gridmaker(arr[15], 3, 'Causes ' + arr[0] + ' cares about') +
        buildList(arr[8], 'organizations') +
        buildList(arr[9], 'languages') +
        buildList(arr[10], 'certifications') +
        recBuilder(arr[14]) +
        buildList(arr[11], 'websites') +
        '</div>' +
        '<script>' +
        `function addToAvature() {  var iatsUrl = "https://cox.avature.net/";  var doc = top.document,    body = doc.body,    sel, ifr, version = 4,    $ = function(s) {      return doc.querySelector(s);    };  function indexOf(needle, haystack) {    for (var i = 0; i < haystack.length; i++) {      if (haystack[i] === needle) {        return i;      }    }    return -1;  }  function buildPath(node) {    var p = [];    while (node.nodeName != "HTML") {      var i = indexOf(node, node.parentNode.childNodes);      p.splice(0, 0, i);      node = node.parentNode;    }    return p;  }  function getFrameSelection(frame) {    try {      var rangeCount = frame.getSelection().rangeCount;      if (!rangeCount) {        return null;      }      var paths = [];      for (var i = 0; i < rangeCount; i++) {        var range = frame.getSelection().getRangeAt(i);        var pathI = {          start: buildPath(range.startContainer),          end: buildPath(range.endContainer)        };        pathI.start.push(range.startOffset);        pathI.end.push(range.endOffset);        paths.push(pathI);      }      var markup = doc.getElementsByTagName("html")[0].cloneNode(true);      trimSubtree(markup, [], paths);      return markup.innerHTML;    } catch (e) {}    return document.documentElement.outerHTML;  }  function trimSubtree(node, nodePath, includedPaths) {    var lvl = inclusionLevel(nodePath, includedPaths, node);    if (lvl == "n") {      node.parentNode.removeChild(node);    } else {      if (lvl == "f") {} else {        if (node.nodeName == "#text") {          node.nodeValue = node.nodeValue.substring(lvl[0] == null ? 0 : lvl[0], lvl[1] == null ? undefined : lvl[1]);        } else {          for (var i = node.childNodes.length - 1; i >= 0; i--) {            trimSubtree(node.childNodes[i], nodePath.concat([i]), includedPaths);          }        }      }    }  }  function inclusionLevel(path, paths, node) {    if (node.nodeName == "SCRIPT") {      return "n";    }    for (var i = 0; i < paths.length; i++) {      var pI = paths[i];      var compStart = comparePaths(pI.start, path);      var compEnd = comparePaths(pI.end, path);      if ((compStart == 0 && pI.start.length > path.length) || (compEnd == 0 && pI.end.length > path.length)) {        return [compStart == 0 && pI.start.length > path.length ? pI.start[path.length] : null, compEnd == 0 && pI.end.length > path.length ? pI.end[path.length] : null];      } else {        if (compStart <= 0 && compEnd >= 0) {          return "f";        }      }    }    return "n";  }  function comparePaths(p1, p2) {    for (var s = 0; s < p1.length && s < p2.length; s++) {      if (p1[s] != p2[s]) {        return p1[s] > p2[s] ? 1 : -1;      }    }    return 0;  }  function post() {    ifr.contentWindow.postMessage(JSON.stringify({      "url": "www.bradtraverse.com",      "value": sel,      "ver": version    }), iatsUrl);  }  function init() {    try {      body.removeChild($("#__avtsbmtr"));    } catch (e) {}    body.insertAdjacentHTML("beforeEnd", '<div id="__avtsbmtr" style="width:100%;height:100%;overflow:hidden;position:fixed;top:0;z-index:99999"><iframe style="width:100%;height:100%"></iframe><span style="position:absolute;right:35%;top:32%;cursor:pointer"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwHDxEDQztRDQAAAe5JREFUOMu11cuLT2EYwPHPnH5KsWEsZOGS/AE2ZHteKUxZDE2RJRlpUozkVm7ZaFbKQpTGJRnXZul5t5iNspVRFrIgG8llzM/mHR0/My7FU6dOz+V7np7b6Wq32zolR8zDdvRgJRYU0xs8wSiG65TedcZW08D2YBwbcBfrsKg864puI8aL7w/S1cwwR9zCchzGI3zAxzqldrF3YTbmYDVO43mdUu9PwBxxE/PQjxd1ShN+ITmihWU4j3d1Slu+A3PEDuxHT53SM38hOWJFqenZOqULVY6YgxMYbMJyxNJfQJZMvZeYQZzIEXMrbMar8pWpgApDOeLINLABXMwRsxrq0cLordCHq3VKkw2HNq5ja4441oDtxQCuYLKR5SSuoq+FVTjYzKJ09WaOmMCpHPEZ77ETx+uUhqepxAMcaqEbL6erVZ3SnRzxCdeKqr9O6foMpX2J7tYfNLIbbzGB+b9zrorz4hm6uQuHyhQcxO4cMTgDazHetjCGtXjaAHWVeu3DmTqlyw39mRwBQ3VKXxvAtRircAPbyqh83yCsx6k6pUuNmt7GgbLTVceYbcONCiNl8Xs6xqB3KrOORt3DhjqlLw11T2GM/PPV+z/H4b+cr44DexKPcR8P8bqYF2INNpUNO1qndG7GA/svfgHfAOI79Clw//vnAAAAAElFTkSuQmCC" alt="X"></span></div>');    ifr = $("#__avtsbmtr iframe");    if (null !== ifr) {      if (doc.all) {        ifr.attachEvent("onload", post);      } else {        ifr.onload = post;      }      ifr.src = iatsUrl + "bookmarklet";      $("#__avtsbmtr span").onclick = function() {        body.removeChild(this.parentNode);      };    }  }  if (body) {    var sel = "";    if ("" == window.getSelection().toString()) {      var iframe = document.activeElement;      try {        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;        sel = iframeDocument.body.innerHTML;      } catch (e) {        sel = document.documentElement.outerHTML;      }    } else {      var i = 0;      sel = getFrameSelection(top);      while (!sel && i < frames.length) {        sel = getFrameSelection(frames[i++]);      }    }    init();  }}` +
        'var delay = (ms) => new Promise(res => setTimeout(res, ms));' +
        'function creDiv(thisId){' +
        'var lines = document.getElementById(thisId).innerText.match(new RegExp("\\n", "g"));' +

        'var numLines = lines ? lines.length > 2 ? lines.length * 4 : 12 : 12;' +

        'var topPos = thisId == "summary-text" ? "100px" : "14px";' +

        'var cDiv = document.createElement("div");' +
        'cDiv.setAttribute("id", "pop_container");' +
        'document.body.appendChild(cDiv);' +
        'cDiv.style.display = "inline-block";' +
        'cDiv.style.position = "fixed";' +
        'cDiv.style.top = topPos;' +
        'cDiv.style.width = "98%";' +
        'cDiv.style.height =  numLines + "%";' +
        'cDiv.style.border = "1px solid Transparent";' +
        'cDiv.style.background = "Transparent";' +
        'cDiv.style.padding = "3px";' +
        'cDiv.style.zIndex = "10000";' +

        'var clsBtn = document.createElement("button");' +
        'document.getElementById("pop_container").appendChild(clsBtn);' +
        'clsBtn.setAttribute("id", "btn_close_"+thisId);' +
        'clsBtn.innerText = "+";' +
        'clsBtn.style.position = "absolute";' +
        'clsBtn.style.background = "transparent";' +
        'clsBtn.style.height = "0px";' +
        'clsBtn.style.width = "0px";' +
        'clsBtn.style.display = "inline-block";' +
        'clsBtn.style.transform = "scale(3.9, 3.9) translate(7px, -10px) rotate(45deg)";' +
        'clsBtn.style.borderRadius = "3em";' +
        'clsBtn.style.padding = "0px";' +
        'clsBtn.style.boxShadow = "0px";' +
        'clsBtn.style.border = "0px";' +
        'clsBtn.style.cursor = "pointer";' +
        'clsBtn.style.userSelect = "none";' +
        'clsBtn.style.fontWeight = "bold";' +
        'clsBtn.style.color = "Crimson";' +

        'var textbox_1 = document.createElement("textarea");' +
        'textbox_1.setAttribute("id", "textbox_code");' +
        'textbox_1.setAttribute("placeholder", "Add Summary Information");' +
        'document.getElementById("pop_container").appendChild(textbox_1);' +
        'textbox_1.style.width = "100%";' +
        'textbox_1.style.height = "100%";' +
        'textbox_1.style.padding = "6px";' +
        'textbox_1.style.border = "1px solid #293242";' +
        'textbox_1.style.color = "#2b3442";' +
        'textbox_1.innerText = document.getElementById(thisId).innerText;' +
        'textbox_1.style.textAlign = thisId == "basic-text" ? "right" : "left";' +

        'function updateBox_s(){' +
        'document.getElementById(thisId).innerText = textbox_1.value;' +
        '}' +
        'function close_s(){' +
        'if(document.getElementById("textbox_code").value == false){ document.getElementById(thisId).innerText = "";}' +
        'document.body.removeChild(document.getElementById("pop_container"));' +
        'if(document.getElementById("printPage") != null) document.getElementById("printPage").outerHTML = "";' +
        'window.print();' +
        '}' +
        'function close_pop(){' +
        'if(document.getElementById("textbox_code").value == false){ document.getElementById(thisId).innerText = "";}' +
        'document.body.removeChild(document.getElementById("pop_container"));' +
        '}' +
        'document.getElementById("textbox_code").addEventListener("keyup", updateBox_s);' +
        'document.getElementById("btn_close_"+thisId).addEventListener("click", close_s);' +
        'document.getElementById("textbox_code").addEventListener("blur", close_pop);' +
        '}' +

        'function popper(){' +
        'if(document.getElementById("pop_container") == null && document.getElementById("btn_close_"+this.getAttribute("id")) == null){' +
        'creDiv(this.getAttribute("id").replace(new RegExp("cont"), "text"))' +
        '}' +
        'if(document.getElementById("pop_container") != null && document.getElementById("btn_close_"+this.getAttribute("id")) == null){' +
        'document.body.removeChild(document.getElementById("pop_container"));' +
        'creDiv(this.getAttribute("id").replace(new RegExp("cont"), "text"))' +
        '}' +
        'if(document.getElementById("pop_container") == null ){document.body.removeChild(document.getElementById("pop_container"));}' +
        '}' +
        'function printPage(){' +
        'document.getElementById("printPage").outerHTML = "";' +
        'document.getElementById("sendToAvature").outerHTML = "";' +
        'if(document.getElementById("addNotes"))  document.getElementById("addNotes").outerHTML = "";' +
        'window.print();' +
        '}' +
        'function hoverO(){' +
        'this.style.background = "#2d2d2d";' +
        'this.style.transform = "scale(1, 1) ";' +
        'this.style.transition = "all 173ms";' +
        '}' +
        'function hoverI(){' +
        'this.style.background = "#424242";' +
        'this.style.transform = "scale(1.1, 1.1) translate(4px, 0px)";' +
        'this.style.transition = "all 173ms";' +
        '}' +
        'document.getElementById("printPage").addEventListener("click", printPage);' +
        'document.getElementById("sendToAvature").addEventListener("click", addToAvature);' +
        'document.getElementById("notes-text").addEventListener("click", popper);' +
        'document.getElementById("summary-cont").addEventListener("click", popper);' +
        'document.getElementById("basic-cont").addEventListener("click", popper);' +
        'document.getElementById("printPage").addEventListener("mouseover", hoverI);' +
        'document.getElementById("printPage").addEventListener("mouseout", hoverO);' +
        'document.getElementById("sendToAvature").addEventListener("mouseover", hoverI);' +
        'document.getElementById("sendToAvature").addEventListener("mouseout", hoverO);' +
        '</script></body></head></html>';
      return temp;
    }

    function buildPara(str, cname) {
      var front = '<br><div id="' + cname + '-cont"><div style="text-align: center; font-size: 1.15em">' + fixCase(cname) + '</div><div id="' + cname + '-text">  ';
      return str ? front + str.replace(/\n/g, '<br>') + '</div></div>' : front + '</p></div>';
    }

    function buildEmpl(arr) {
      if (arr == null) return '';
      var start = '<br><div id="employment-cont"><div style="text-align: center; font-size: 1.15em">Employment<br></div>';
      var link = '<a href="https://www.linkedin.com/company/';
      var cont = '';
      for (i = 0; i < arr.length; i++) {
        var pos = arr[i].position;
        var logo = pos.companyVectorLogo;
        var img = logo ? '<img class="company-logo" style="float: right; overflow: auto;" src="' + logo.rootUrl + logo.artifacts[1].fileIdentifyingUrlPathSegment + '" width="30" height="30">' : '';
        var company = pos.companyUrl ? link + pos.companyUrl + '">' + pos.companyName + '</a>' : '<u>' + pos.companyName + '</u>';
        var endDate = pos.i18nEndDate ? fixDate(pos.i18nEndDate) : 'Present';
        var startDate = pos.i18nStartDate ? fixDate(pos.i18nStartDate) + ' - ' : '';
        var summary = pos.positionSummary ? pos.positionSummary.trim().replace(/\n/g, '<br>') : '';
        var geo = pos.location ? pos.location : null;
        var dateCity = geo ? geo + '<i style="float: right">' + startDate + endDate + '</i>' : '<i style="float: right">' + startDate + endDate + '</i>';
        var title = pos.title ? pos.title : '';
        var job = '<div>' + company +
          img + '</div>' +
          '<div>' + title +
          '</div>' +
          '<span style="color: #495972;">' + dateCity +
          '</span>' +
          '<div style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: #e8eef7;">' + summary +
          '</div><br>';
        cont = cont + job;
      }
      var end = '</div>';
      return start + cont + end;
    }

    function buildEdu(arr) {
      if (arr == null) return '';
      var start = '<br><div style="text-align: center; font-size: 1.15em">Education</div><br><div>';
      var cont = '';
      for (i = 0; i < arr.length; i++) {
        var institute = arr[i].educationId ? '<a href="https://www.linkedin.com/school/' + arr[i].educationId + '">' + arr[i].schoolName + '</a>' : arr[i].schoolName;
        var endDate = arr[i].i18nEndDate ? fixDate(arr[i].i18nEndDate) : '';
        var startDate = arr[i].i18nStartDate ? fixDate(arr[i].i18nStartDate) + ' - ' : '';
        var fieldOfStudy = arr[i].fieldOfStudy ? arr[i].fieldOfStudy : '';
        var degree = arr[i].degree ? '<span>' + arr[i].degree + '</span> ' + fieldOfStudy : fieldOfStudy;
        var item = '<div>' + institute +
          '</div>' +
          '<div style="color: #495972;">' + degree +
          '<i style="float: right">' + startDate + endDate + '</i>' +
          '</div>' +
          '<div style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: #e8eef7;"></div>' +
          '<br>';
        cont = cont + item;
      }
      var end = '</div>';
      return start + cont + end;
    }

    function gridmaker(arr, len, cname) {
      if (arr == null) return '';
      var tempArr = '';
      for (i = 0; i < arr.length; i = i + len) {
        var tArr = '';
        for (d = i; d < (i + len); d++) {
          if (arr[d] != undefined) {
            tArr = tArr + '<div>' + fixCase(normalize(arr[d])) + '</div>';
          }
        }
        tempArr = tempArr + tArr;
      }
      return '<br><div id="' + cname + '-cont"><div style="text-align: center; font-size: 1.15em">' + fixCase(cname) + '<br></div><div id="' + cname + '-info" style="display: grid;  grid-template-columns: auto auto auto; align-content: space-evenly;">' + tempArr + '</div></div><br>';
    }

    function buildList(arr, cname) {
      if (arr == null) return '';
      var list = '';
      arr ? arr.forEach(itm => list = list + '<p>' + itm + '</p>') : '';
      var out = '<div style="text-align: center; font-size: 1.15em">' + fixCase(cname) + '</div><div>' +
        '<div>' +
        list +
        '</div>' +
        '</div><br>';
      arr ? out = out : out = '';
      return out;
    }

    function buildVol(arr) {
      if (arr == null) return '';
      var start = '<br><div style="text-align: center; font-size: 1.15em">Volunteer Experience<br></div><div>';
      var cont = '';
      for (i = 0; i < arr.length; i++) {
        var org = arr[i].companyName ? '<div><u>' + arr[i].companyName + '</u></div>' : '';
        var role = arr[i].role ? arr[i].role : '';
        var time = arr[i].current ? '<i style="float: right;">Present</i>' : '';
        cont = cont + org + '<div>' + role + time + '</div>' + '<div style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: #e8eef7;"></div><br>';
      }
      var end = '</div>';
      return start + cont + end;
    }

    function recBuilder(arr) {
      if (arr == null) return '';
      var start = '<br><div style="text-align: center; font-size: 1.15em">Recommendations<br></div><div>';
      var list = '';
      for (i = 0; i < arr.length; i++) {
        var ref = arr[i].reference;
        var desc = ref.description;
        var rec = ref.recommender;
        var recName = fixCase(rec.firstName) + ' ' + fixCase(cleanName(rec.lastName));
        var recLink = 'https://www.linkedin.com/in/' + rec.niid;
        var recTitle = ref.recommenderTitle ? ref.recommenderTitle : '';
        var recRel = fixCase(ref.relationship.replace(/_/g, ' '));
        var cont = '<div><div><a href="' +
          recLink + '">' + recName + '</a>' +
          '</div>' +
          '<div>' +
          recTitle +
          '</div>' +
          '<div style="font-size: .9em"><i>' +
          recRel +
          '</i></div>' +
          '<div style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: #e8eef7;">' +
          desc +
          '</div><br>' +
          '</div>';
        list = list + cont;
      }
      var end = '</div>';
      return start + list + end;
    }

    function printDiv(tempDiv, title) {
      var mywin = window.open('', 'PRINT', 'height=800, width=1200,top=10,left=5');
      mywin.document.write(tempDiv);
      mywin.document.close();
      mywin.focus();
      return true;
    }
    parseProfData(profileObj, noteData);
  }

  /*
  end of toolbar functions.
  */


  async function initOtherBtnScr() {
    async function buildTitleSearch(keyword) {
      var res = await fetch('https://www.linkedin.com/recruiter/api/smartsearch/typeahead/title?query=' + keyword);
      var jdat = await res.json();
      var results = jdat.resultList;
      var matched = results.some(itm => itm.displayName.toLowerCase() == keyword.toLowerCase());
      if (matched) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].displayName.toLowerCase() == keyword.toLowerCase()) {
            console.log(output);
            var output = '&jobTitleTimeScope=C&jobTitleEntities=' + results[i].displayName.replace(/\s+/g, '+').replace(/\|/g, '%7C').replace(/\+&\+/g, '+%26+') + '_' + results[i].id;
            return output;
          }
        }
      } else {
        var output = '&jobTitleTimeScope=C&jobTitleEntities=' + keyword.replace(/\s*-\s*|\s*\/\s*|\s*\|\s*/g, ' OR ').replace(/\s+at\s.+$/i, '').replace(/\d+.+/, '').replace(/,/g,'').trim().replace(/\s+/g, '+');
        console.log(output)
        return output;
      }
    }
    async function searchCompanyEntities(str, id) {
      var res = await fetch('https://www.linkedin.com/recruiter/api/smartsearch/typeahead/company?query=' + encodeURIComponent(str) + '&_l=en_US');
      var dat = await res.json();
      var list = dat ? dat.resultList : [];
      console.log(dat);
      return list;
    }
    async function getCompanySearch(str, id) {
      var arr = await searchCompanyEntities(str, id);
      var updateString = str.replace(/\s*\d.+|,.+|\s*-.+/, '');
      var x = arr.length < 1 ? new RegExp(updateString, 'i') : new RegExp(str, 'i');
      var list = arr.length < 1 ? await searchCompanyEntities(updateString, id) : arr;
      for (var i = 0; i < list.length; i++) {
        if (x.test(list[i].displayName)) {
          var entity = list[i].displayName.replace(/\s+/g, '+').replace(/\|/g, '%7C').replace(/\+&\+/g, '+%26+') + '_' + list[i].id;
          console.log(entity);
          return entity;
        }
      }
    }
    async function buildCompanySearch(jobObj) {
      var id = jobObj.position.companyId;
      var name = jobObj.position.companyName;
      var coEntity = id ? await getCompanySearch(name, id) : null;
      var companySearch = coEntity ? '&companyTimeScope=C&companyEntities=' + coEntity :
        '&companyTimeScope=C&company=' + name.replace(/\s+/g, '+');
      var output = await companySearch;
      return output;
    }

    async function parseSearch4AllJobs(jdat) {
      var searchArr = [];
      var specLocal = getGeos();
      var alljobs = jdat.data ? jdat.data.positions : null;
      if (alljobs != null) {
        for (var j = 0; j < alljobs.length; j++) {
          var specJob = alljobs[j] ? alljobs[j] : null;
          var companyEntSearch = await buildCompanySearch(specJob);
          var specTitle = noHTML(specJob.position.title).replace(/\./g, '').replace(/\b[a-zA-Z]{1,3}\b/g, '').replace(/\(.+?\)\s*/, '').replace(/,/g, '').replace(/\s+/g, ' ').replace(/Sr\s*|Senior\s*/, '').trim();
console.log('specTitle: '+ specTitle);
          var titleEntSearch = await buildTitleSearch(specTitle);
          var apiSearch = 'https://www.linkedin.com/recruiter/api/search?' + companyEntSearch.replace(/^&/, '') + titleEntSearch + getGeos() + '&start=0';
          searchArr.push(apiSearch);
        }
      }
      return searchArr;
    }

    async function matchOnJobs() {
      var profileObj = await getFullProfileDetails(lirId);
      var jobs = await parseSearch4AllJobs(profileObj);
      console.log(jobs);
      return jobs;
    }

    async function getOtherEmployees(str) {
      var res = await fetch(str);
      var jdat = await res.json();
	  console.log(jdat);
      return [jdat.result.searchResults, jdat.meta.total];
    }

    async function runThroughHTMLPositions() {
      var expCont = gi(document, 'profile-experience');
      var positions = cn(expCont, 'position');
      var searches = await matchOnJobs();
      for (var i = 0; i < positions.length; i++) {
        var others = document.createElement('div');
        others.setAttribute('searchapi-data', encodeURIComponent(searches[i]));
        others.innerText = 'others';
        others.style.borderRadius = '.15em';
        others.style.width = '40px';
        others.style.height = '10px';
        others.style.textAlign = 'center';
        others.style.cursor = 'pointer';
        others.style.background = '#000';
        others.style.color = 'white';
        others.style.padding = '6px';
        others.style.border = '2px solid #424242';
        others.style.transform = "scale(.85, .85) translate(4px, -4px)";
        others.addEventListener('click', runSearch);
        others.addEventListener("mouseover", hoverInBtn);
        others.addEventListener("mouseout", hoverOutBtn);
        positions[i].insertBefore(others, positions[i].firstChild);
      }
      async function runSearch() {
        if (document.getElementById("pop_container")) close_pop();
        loadingElm();
        var search = decodeURIComponent(this.getAttribute('searchapi-data'));
        var dat = await getOtherEmployees(search);
        var resInfo = dat[0] < 1 ? await getOtherEmployees(search.replace(/(?<=jobTitleEntities=)\w+\+/, '')) : dat;
        var other = resInfo[0].map(itm => [parseProfData(itm), resInfo[1], search]);
        createPOPhtml(other);
      }
    }

    function parseProfData(obj) {
      var firstName = fixCase(obj.firstName);
      var lastName = fixCase(cleanName(obj.lastName));
      var lir_link = 'https://www.linkedin.com/recruiter/profile/' + obj.findAuthInputModel.asUrlParam;
      var geo = obj.location.replace(/, United States/, '');
      var employment = obj.positions;
      var curJobTitle = employment[0].title ? employment[0].title : '';
      var curCo = employment[0].companyName ? employment[0].companyName : '';
      var curJobStart = employment[0].i18nStartDate ? employment[0].i18nStartDate : 'Some time ago';
      var curJobEnd = employment[0].i18nEndDate ? employment[0].i18nEndDate : 'Now';
      var photo = obj.vectorImage ? obj.vectorImage.rootUrl + obj.vectorImage.artifacts[0].fileIdentifyingUrlPathSegment : 'https://static.licdn.com/sc/h/euf48or6d74p938p90d6pjwkj';
      var basicObj = {
        "niid": obj.niid,
        "firstname": noHTML(firstName),
        "lastname": noHTML(lastName),
        "employment": employment,
        "citystate": geo,
        "url": lir_link,
        "photo": photo,
        "title": noHTML(curJobTitle),
        "company": noHTML(curCo),
        "start": curJobStart,
        "end": curJobEnd
      };
      return basicObj;
    }

    function buildOtherProfsHTML(arr) {
      return '<div id="' + arr.niid + '" style="padding: 8px; width: 90%; background: white;">' +
        '<img src=' + arr.photo + ' width="50px" height="50px" style="float: right; color: #0b868e"></img>' +
        '<div><a class="proflinker" style="cursor: pointer;" data-url="' + arr.url + '">' + arr.firstname + ' ' + arr.lastname + '</a></div>' +
        '<div style="font-size: .9em;">' + arr.title + '</div>' +
        '<div style="font-size: .9em; color: #2d2d2d;">' + arr.company + '</div>' +
        '<div style="font-size: .9em; color: #515151;">' + arr.start + ' - ' + arr.end + '</div>' +
        '<div style="font-size: .9em; color: grey;">' + arr.citystate + '</div>' +
        '</div><br>';
    }

    function createPOPhtml(peopleObj) {
      killLoader();
      var slink = peopleObj.length > 0 ? encodeURIComponent(peopleObj[0][2]) : '';
      var html = '';
      peopleObj.forEach(itm => html = html + buildOtherProfsHTML(itm[0]));

      var len = peopleObj.length > 3 ? 65 : peopleObj.length < 1 ? 22 : (peopleObj.length * 20);

      var cDiv = document.createElement("div");
      cDiv.setAttribute("id", "pop_container");
      document.body.appendChild(cDiv);
      cDiv.style.display = "inline-block";
      cDiv.style.position = "fixed";
      cDiv.style.top = "20%";
      cDiv.style.right = ".5%";
      cDiv.style.width = "22%";
      cDiv.style.height = len + "%";
      cDiv.style.padding = "3px";
      cDiv.style.background = "white";
      cDiv.style.boxShadow = "1px 1px 1px 1px #888888";
      cDiv.style.zIndex = "10000";

      var mDiv = document.createElement("div");
      mDiv.setAttribute("id", "mover_div");
      document.getElementById("pop_container").appendChild(mDiv);
      mDiv.style.width = "98%";
      mDiv.style.height = "22px";
      mDiv.style.border = "1px solid #1c1c1c";
      mDiv.style.backgroundColor = '#1c1c1c';
      mDiv.style.padding = "3px";
      mDiv.style.fontFamily = '"Courier New", monospace';
      mDiv.style.cursor = 'move';
      mDiv.addEventListener('mouseout', nodrag);
      mDiv.addEventListener('mouseover', dragElement);

      var clsBtn = document.createElement("button");
      mDiv.appendChild(clsBtn);
      clsBtn.setAttribute("id", "btn_close");
      document.getElementById("btn_close").innerText = "+";
      clsBtn.style.background = "Transparent";
      clsBtn.style.display = "inline-block";
      clsBtn.style.transform = "scale(2.9, 2.9) rotate(45deg)";
      clsBtn.style.float = "left";
      clsBtn.style.borderRadius = "1em";
      clsBtn.style.boxShadow = "0px";
      clsBtn.style.border = "0px";
      clsBtn.style.cursor = "pointer";
      clsBtn.style.userSelect = "none";
      clsBtn.style.fontSize = '1em';
      clsBtn.style.fontWeight = "bold";
      clsBtn.style.color = "Crimson";
      clsBtn.addEventListener("click", close_pop);

      var otherS = document.createElement("button");
      mDiv.appendChild(otherS);
      otherS.setAttribute("id", "btn_others");
      document.getElementById("btn_others").innerText = peopleObj.length > 0 ? "View Search" : 'no results';
      otherS.setAttribute('searchDataLink', slink);
      otherS.style.background = "#000";
      otherS.style.display = "inline-block";
      otherS.style.borderRadius = ".2em";
      otherS.style.border = "1px solid #1c1c1c";
      otherS.style.float = "right";
      otherS.style.cursor = "pointer";
      otherS.style.userSelect = "none";
      otherS.style.fontWeight = "bold";
      otherS.style.color = "white";
      otherS.addEventListener("click", viewOtherSearch);
      otherS.addEventListener("mouseover", hoverInBtn);
      otherS.addEventListener("mouseout", hoverOutBtn);

      var holder = document.createElement("div");
      document.getElementById("pop_container").appendChild(holder);
      holder.style.height = "84%";
      holder.style.width = "100";
      holder.style.background = 'white';
      holder.style.overflowY = "scroll";
      holder.innerHTML = peopleObj.length > 0 ? html : 'no results';

      Array.from(document.getElementsByClassName("proflinker")).forEach(itm => itm.addEventListener('click', opener));

      function opener() {
        window.open(this.getAttribute("data-url"));
      }
    }

    function viewOtherSearch(str) {
      window.open(decodeURIComponent(this.getAttribute('searchDataLink')).replace(/api\//, ''));
    }
    runThroughHTMLPositions();
  }

/*
end of other search
*/

async function popViewProfiles(){

function close_pop() {
  document.body.removeChild(document.getElementById("pop_container_whoview"));
}

function parseprofile(obj){
  var img = obj.picture ? obj.picture.rootUrl + obj.picture.artifacts[0].fileIdentifyingUrlPathSegment : 'https://static.licdn.com/sc/h/euf48or6d74p938p90d6pjwkj';
  var output = {"niid": reg(/(?<=fs_miniProfile:).+/.exec(obj.entityUrn),0),
		"firstName": obj.firstName,
		"lastName": obj.lastName,
		"occupation": obj.occupation,
		"publicIdentifier": obj.publicIdentifier,
		"picture": img,
		"trackingId": obj.trackingId,
  };
  return output;
}

async function whoViewed(csrf,time) {
  var temp = [];
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/cards?count=9&endTime="+time+"&model=identity%2Fme%2Fcard&q=profileViewCards&start=0", {
    "credentials": "include",
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-US,en;q=0.9",
      "csrf-token": csrf,
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_flagship3_me_wvm_v2;0/"+genTrackId(20),
      "x-li-track": "{\"clientVersion\":\"1.2.7961\",\"osName\":\"web\",\"timezoneOffset\":-5,\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
      "x-restli-protocol-version": "2.0.0"
    },
    "referrer": "https://www.linkedin.com/me/profile-views/urn:li:wvmp:summary/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  var dat = await res.json();
console.log(dat);
  var included = dat.included;
  included.forEach(itm=> {
	if(itm.firstName){
	  temp.push(parseprofile(itm));
	}
  });
  return temp;
}

function buildProfHTML(arr) {
  return '<div id="' + arr.niid + '" style="padding: 8px; width: 90%; background: white;">' +
  '<img src=' + arr.picture + ' width="50px" height="50px" style="float: right; color: #0b868e"></img>' +
  '<div><a class="proflinker" style="cursor: pointer;" data-url="' + '/in/'+arr.publicIdentifier + '">' + arr.firstName + ' ' + arr.lastName + '</a></div>' +
  '<div style="font-size: .9em;">' + arr.occupation + '</div>' +
  '</div><br>';
}

async function createPopHtml(){
  var html = '';
  var arr = await whoViewed(csrf_id, timer);
  await arr.forEach(itm => html = html + buildProfHTML(itm));

var cDiv = document.createElement("div");
cDiv.setAttribute("id", "pop_container_whoview");
document.body.appendChild(cDiv);
cDiv.style.display = "inline-block";
cDiv.style.position = "fixed";
cDiv.style.top = "66%";
cDiv.style.left = "1%";
cDiv.style.width = "15%";
cDiv.style.height = "30%";
cDiv.style.padding = "3px";
cDiv.style.background = "white";
cDiv.style.transform = "scale(.99, .99)";
  cDiv.style.boxShadow = '1px 1px 1px 1px #888888';
cDiv.style.zIndex = "10000";

var mDiv = document.createElement("div");
cDiv.appendChild(mDiv);
mDiv.style.width = "98%";
mDiv.style.height = "25px";
mDiv.style.border = "1px solid #1c1c1c";
mDiv.style.backgroundColor = '#1c1c1c';
mDiv.style.color = "white";
mDiv.style.textAlign = "right";
mDiv.style.padding = "3px";
mDiv.innerText = 'Viewed your profile';

var clsBtn = document.createElement("button");
mDiv.appendChild(clsBtn);
clsBtn.innerText = "+";
clsBtn.style.background = "Transparent";
clsBtn.style.display = "inline-block";
clsBtn.style.transform = "scale(2.9, 2.9) rotate(45deg)";
clsBtn.style.float = "left";
clsBtn.style.borderRadius = "1em";
clsBtn.style.boxShadow = "0px";
clsBtn.style.border = "0px";
clsBtn.style.cursor = "pointer";
clsBtn.style.userSelect = "none";
clsBtn.style.fontSize = '1em';
clsBtn.style.fontWeight = "bold";
clsBtn.style.color = "Crimson";
clsBtn.addEventListener("click", close_pop);

var holder = document.createElement("div");
cDiv.appendChild(holder);
holder.style.height = "94%";
holder.style.width = "100";
holder.style.background = 'white';
holder.style.overflowY = "scroll";
holder.innerHTML = arr.length > 0 ? html : 'no results';

Array.from(document.getElementsByClassName("proflinker")).forEach(itm => itm.addEventListener('click', opener));

function opener() {
  window.open(this.getAttribute("data-url"));
}

}
await delay(633);
isCsrf ? createPopHtml() : console.log('This only works on Recruiter Profiles.');
}

  popViewProfiles();  
  initToolbar();
  initOtherBtnScr();
}
initContent();
