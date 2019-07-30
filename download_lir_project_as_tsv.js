async function initProjectDownloader(){
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

var ascii = [["&#32;"," "],["&#33;","!"],["&#34;","\""],["&#35;","#"],["&#36;","$"],["&#37;","%"],["&#38;","&"],["&#39;","'"],["&#40;","("],["&#41;",")"],["&#42;","*"],["&#43;","+"],["&#44;",","],["&#45;","-"],["&#46;","."],["&#47;","/"],["&#48;","0"],["&#49;","1"],["&#50;","2"],["&#51;","3"],["&#52;","4"],["&#53;","5"],["&#54;","6"],["&#55;","7"],["&#56;","8"],["&#57;","9"],["&#58;",":"],["&#59;",";"],["&#60;","<"],["&#61;","="],["&#62;",">"],["&#63;","?"],["&#64;","@"],["&#65;","A"],["&#66;","B"],["&#67;","C"],["&#68;","D"],["&#69;","E"],["&#70;","F"],["&#71;","G"],["&#72;","H"],["&#73;","I"],["&#74;","J"],["&#75;","K"],["&#76;","L"],["&#77;","M"],["&#78;","N"],["&#79;","O"],["&#80;","P"],["&#81;","Q"],["&#82;","R"],["&#83;","S"],["&#84;","T"],["&#85;","U"],["&#86;","V"],["&#87;","W"],["&#88;","X"],["&#89;","Y"],["&#90;","Z"],["&#91;","["],["&#92;",""],["&#93;","]"],["&#94;","^"],["&#95;","_"],["&#97;","a"],["&#98;","b"],["&#99;","c"],["&#100;","d"],["&#101;","e"],["&#102;","f"],["&#103;","g"],["&#104;","h"],["&#105;","i"],["&#106;","j"],["&#107;","k"],["&#108;","l"],["&#109;","m"],["&#110;","n"],["&#111;","o"],["&#112;","p"],["&#113;","q"],["&#114;","r"],["&#115;","s"],["&#116;","t"],["&#117;","u"],["&#118;","v"],["&#119;","w"],["&#120;","x"],["&#121;","y"],["&#122;","z"],["&#123;","{"],["&#124;","|"],["&#125;","}"],["&#126;","~"],["&#127;",""],["&#128;","€"],[" "," "],["&#130;","‚"],["&#131;","ƒ"],["&#132;","„"],["&#133;","…"],["&#134;","†"],["&#135;","‡"],["&#136;","ˆ"],["&#137;","‰"],["&#138;","Š"],["&#139;","‹"],["&#140;","Œ"],[" "," "],["&#142;","Ž"],[" "," "],[" "," "],["&#145;","‘"],["&#146;","’"],["&#147;","“"],["&#148;","”"],["&#149;","•"],["&#150;","–"],["&#151;","—"],["&#152;","˜"],["&#153;","™"],["&#154;","š"],["&#155;","›"],["&#156;","œ"],[" "," "],["&#158;","ž"],["&#159;","Ÿ"],["&#160;"," "],["&#161;","¡"],["&#162;","¢"],["&#163;","£"],["&#164;","¤"],["&#165;","¥"],["&#166;","¦"],["&#167;","§"],["&#168;","¨"],["&#169;","©"],["&#170;","ª"],["&#171;","«"],["&#172;","¬"],["&#173;",""],["&#174;","®"],["&#175;","¯"],["&#176;","°"],["&#177;","±"],["&#178;","²"],["&#179;","³"],["&#180;","´"],["&#181;","µ"],["&#182;","¶"],["&#183;","·"],["&#184;","¸"],["&#185;","¹"],["&#186;","º"],["&#187;","»"],["&#188;","¼"],["&#189;","½"],["&#190;","¾"],["&#191;","¿"],["&#192;","À"],["&#193;","Á"],["&#194;","Â"],["&#195;","Ã"],["&#196;","Ä"],["&#197;","Å"],["&#198;","Æ"],["&#199;","Ç"],["&#200;","È"],["&#201;","É"],["&#202;","Ê"],["&#203;","Ë"],["&#204;","Ì"],["&#205;","Í"],["&#206;","Î"],["&#207;","Ï"],["&#208;","Ð"],["&#209;","Ñ"],["&#210;","Ò"],["&#211;","Ó"],["&#212;","Ô"],["&#213;","Õ"],["&#214;","Ö"],["&#215;","×"],["&#216;","Ø"],["&#217;","Ù"],["&#218;","Ú"],["&#219;","Û"],["&#220;","Ü"],["&#221;","Ý"],["&#222;","Þ"],["&#223;","ß"],["&#224;","à"],["&#225;","á"],["&#226;","â"],["&#227;","ã"],["&#228;","ä"],["&#229;","å"],["&#230;","æ"],["&#231;","ç"],["&#232;","è"],["&#233;","é"],["&#234;","ê"],["&#235;","ë"],["&#236;","ì"],["&#237;","í"],["&#238;","î"],["&#239;","ï"],["&#240;","ð"],["&#241;","ñ"],["&#242;","ò"],["&#243;","ó"],["&#244;","ô"],["&#245;","õ"],["&#246;","ö"],["&#247;","÷"],["&#248;","ø"],["&#249;","ù"],["&#250;","ú"],["&#251;","û"],["&#252;","ü"],["&#253;","ý"],["&#254;","þ"],["&#255;","ÿ"],["&amp;","&"],["&quot;","\""],["&gt;",">"],["&lt;","<"],["&euro;","€"],["&sbquo;","‚"],["&fnof;","ƒ"],["&bdquo;","„"],["&hellip;","…"],["&dagger;","†"],["&Dagger;","‡"],["&circ;","ˆ"],["&permil;","‰"],["&Scaron;","Š"],["&lsaquo;","‹"],["&OElig;","Œ"],["&lsquo;","‘"],["&rsquo;","’"],["&ldquo;","“"],["&rdquo;","”"],["&bull;","•"],["&ndash;","–"],["&mdash;","—"],["&tilde;","˜"],["&trade;","™"],["&scaron;","š"],["&rsaquo;","›"],["&oelig;","œ"],["&Yuml;","Ÿ"],["&nbsp;"," "],["&iexcl;","¡"],["&cent;","¢"],["&pound;","£"],["&curren;","¤"],["&yen;","¥"],["&brvbar;","¦"],["&sect;","§"],["&uml;","¨"],["&copy;","©"],["&ordf;","ª"],["&laquo;","«"],["&not;","¬"],["&shy;",""],["&reg;","®"],["&macr;","¯"],["&deg;","°"],["&plusmn;","±"],["&sup2;","²"],["&sup3;","³"],["&acute;","´"],["&micro;","µ"],["&para;","¶"],["&middot;","·"],["&cedil;","¸"],["&sup1;","¹"],["&ordm;","º"],["&raquo;","»"],["&frac14;","¼"],["&frac12;","½"],["&frac34;","¾"],["&iquest;","¿"],["&Agrave;","À"],["&Aacute;","Á"],["&Acirc;","Â"],["&Atilde;","Ã"],["&Auml;","Ä"],["&Aring;","Å"],["&AElig;","Æ"],["&Ccedil;","Ç"],["&Egrave;","È"],["&Eacute;","É"],["&Ecirc;","Ê"],["&Euml;","Ë"],["&Igrave;","Ì"],["&Iacute;","Í"],["&Icirc;","Î"],["&Iuml;","Ï"],["&ETH;","Ð"],["&Ntilde;","Ñ"],["&Ograve;","Ò"],["&Oacute;","Ó"],["&Ocirc;","Ô"],["&Otilde;","Õ"],["&Ouml;","Ö"],["&times;","×"],["&Oslash;","Ø"],["&Ugrave;","Ù"],["&Uacute;","Ú"],["&Ucirc;","Û"],["&Uuml;","Ü"],["&Yacute;","Ý"],["&THORN;","Þ"],["&szlig;","ß"],["&agrave;","à"],["&aacute;","á"],["&acirc;","â"],["&atilde;","ã"],["&auml;","ä"],["&aring;","å"],["&aelig;","æ"],["&ccedil;","ç"],["&egrave;","è"],["&eacute;","é"],["&ecirc;","ê"],["&euml;","ë"],["&igrave;","ì"],["&iacute;","í"],["&icirc;","î"],["&iuml;","ï"],["&eth;","ð"],["&ntilde;","ñ"],["&ograve;","ò"],["&oacute;","ó"],["&ocirc;","ô"],["&otilde;","õ"],["&ouml;","ö"],["&divide;","÷"],["&oslash;","ø"],["&ugrave;","ù"],["&uacute;","ú"],["&ucirc;","û"],["&uuml;","ü"],["&yacute;","ý"],["&thorn;","þ"],["&yuml;","ÿ"],["&#12497;","パ"],["&#12470;","ザ"],["&#12491;","ニ"],["&#12521;","ラ"],["&#12464;","グ"],["&#12490;","ナ"],["&#12479;","タ"],["&#12531;","ン"]];

var cleanASCII = (s) => { ascii.forEach( el=> s = s.replace( new RegExp(el[0],'ig'), el[1] ) ); return s};

function getStatus(obj, id) {
var status = obj.projectStatuses;
if (status) {
  for (var i = 0; i < status.length; i++) {
    if (status[i].projectId == id) {
      return status[i].status.text;
    }
  }
} else {
  return '';
}
}
function getTimeInJob(job) {
  var start = job ? parseDate(job.i18nStartDate) : now;
  var end = job ? parseDate(job.i18nEndDate) : now;
  var timeInJob = milsec2Month(end - start) ? milsec2Month(end - start) : 0;
  return timeInJob;
}
function tocsv(obj) {
var curUrl = window.location.href;
var projectId = reg(/(?<=projectId=)\d+/.exec(curUrl), 0);
var status = getStatus(obj, projectId);
var csvReady = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
var validx = (el) => el ? el : null;
var seekingJob = obj.isJobSeeker || obj.careerInterests ? 'yes' : 'no';
var seekingTitleArr = obj.careerInterests ? obj.careerInterests.interestedTitles : null;
var seekingTitles = seekingTitleArr ? seekingTitleArr.toString() : '';

var lirPathLink = 'https://www.linkedin.com/recruiter/profile/' + obj.memberId + ',' + obj.authToken + ',' + obj.authType;

var job1 = obj.positions ? validx(obj.positions[0]) : null;
var job2 = obj.positions ? validx(obj.positions[1]) : null;
var jobTime1 = job1 ? getTimeInJob(job1) : 0;
var jobTime2 = job2 ? getTimeInJob(job2) : 0;
var empl1 = job1 ? noHTML(job1.companyName) : ' ';
var empl2 = job2 ? noHTML(job2.companyName) : ' ';
var title1 = job1 ? noHTML(job1.title) : ' ';
var title2 = job2 ? noHTML(job2.title) : ' ';
var publink = 'www.linkedin.com/in/' + obj.niid;
var edu1 = obj.educations && obj.educations[0] ? obj.educations[0].schoolName : ' ';
var edu2 = obj.educations && obj.educations[1] ? obj.educations[1].schoolName : ' ';
var edu1end = obj.educations && obj.educations[0] ? obj.educations[0].i18nEndDate : ' ';
var edu2end = obj.educations && obj.educations[1] ? obj.educations[1].i18nEndDate : ' ';

var emailArr = obj.contactEmails ? obj.contactEmails : [];
var emails = emailArr.length > 0 ? emailArr.map(m => m.email).toString() : null;
var phoneArr = obj.contactPhones ? obj.contactPhones : [];
var phones = phoneArr.length > 0 ? phoneArr.map(m => m.phone).toString() : null;
var appArr = obj.jobApplications ? obj.jobApplications : [];
var apps = appArr.length > 0 ? appArr.map(m => m.applyStarterJobId).toString() : null;
var noteArr = obj.notes ? obj.notes : [];
var notes = noteArr.length > 0 ? noHTML(noteArr.map(m => m.note.replace(/\n/g, ' _ ')).toString()) : null;

var emailX = /[\w|\.]+@\S+\.[a-zA-Z]+/;
var phoneX = /((\d+\W*)\d*|)\d{3}\W*\d{3}\W*\d{4}/;
var em = (emailX.test(notes) === true && emailX.test(emails) === false) ? reg(emailX.exec(notes), 0) : emails;
var ph = (phoneX.test(notes) === true && phoneX.test(phones) === false) ? reg(phoneX.exec(notes), 0) : phones;

return [
  publink,
  lirPathLink,
  cleanASCII(fixCase(obj.firstName)),
  cleanASCII(fixCase(obj.lastName)),
  csvReady(obj.location),
  cleanASCII(csvReady(empl1)),
  jobTime1,
  cleanASCII(csvReady(title1)),
  cleanASCII(csvReady(empl2)),
  jobTime2,
  cleanASCII(csvReady(title2)),
  cleanASCII(csvReady(edu1)),
  edu1end,
  cleanASCII(csvReady(edu2)),
  edu2end,
  status,
  seekingJob,
  seekingTitles,
  em,
  ph,
  apps,
  notes
];
}

async function getPeopleFromProject(id, p) {
  var res = await fetch("https://www.linkedin.com/recruiter/api/projects/" + id + "/profiles?count=25&start=" + p);
  var d = await res.json();
  console.log(d);
  return d;
}

async function getAllPeopleFromProject() {
  var cont = ele('div');
  attr(cont,'id', 'searchResultsDL_cont');
  attr(cont,'style', 'position: fixed; top: 10%; right: 30%; width: 200px; padding: 6px; background: #fff; border: 1.5px solid #004471; border-radius: 0.25em; color: #004471; z-index: 122222;');
  document.body.appendChild(cont);
  cont.innerText = 'Downloanding...';
  var temp_csv_dl = [
    ['Public Profile', 'LIR Profile', 'First Name', 'Last Name', 'Location', 'Current Employer', 'Months In Job 1', 'Current Title', 'Previous Employer', 'Months In Job 2', 'Previous Title', 'University 1', 'Graduation Date 1', 'University 2', 'Graduation Date 2', 'Project Status', 'Open To Opportunities', 'Desired Titles', 'Emails', 'Phones', 'Job App Ids', 'Notes']
  ];
  var projectId = reg(/(?<=projectId=)\d+/.exec(window.location.href), 0);
  var res1 = await getPeopleFromProject(projectId, 0);
  var searchHits2 = res1.result.searchHits;
  var total = res1.result.paging.total;
  if (searchHits2.length > 0) searchHits2.forEach(el => temp_csv_dl.push(tocsv(el)));
  for (var i = 25; i < total; i = i + 25) {
    gi(document, 'searchResultsDL_cont').innerText = (Math.round((i/total)*10000)/100) + '% complete';
    var res = await getPeopleFromProject(projectId, i);
    var searchHits = res.result.searchHits;
    if (searchHits.length > 0) searchHits.forEach(el => temp_csv_dl.push(tocsv(el)));
    await delay(rando(1420));
  }
  gi(document, 'searchResultsDL_cont').innerText = 'completed';  
  downloadr(temp_csv_dl, reg(/(?<=projectId=)\d+/.exec(window.location.href), 0) + '.tsv');
  gi(document, 'searchResultsDL_cont').outerHTML = '';
}


function downloadr(arr2D, filename) {
  var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el => el.reduce((a, b) => a + '\t' + b)).reduce((a, b) => a + '\r' + b);
  var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
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
getAllPeopleFromProject();
}
initProjectDownloader();
