
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

var reChar = (s) => typeof s == 'string' && s.match(/&#\d+;/g) && s.match(/&#\d+;/g).length > 0 ? s.match(/&#\d+;/g).map(el => [el, String.fromCharCode(reg(/(?<=&#).+?(?=;)/.exec(el),0))]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
var noHTML = (s) => typeof s == 'string' ? s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ') : s;

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

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

function getTimeInJob(job) {
  var start = job ? parseDate(job.i18nStartDate) : now;
  var end = job ? parseDate(job.i18nEndDate) : now;
  var timeInJob = milsec2Month(end - start) ? milsec2Month(end - start) : 0;
  return timeInJob;
}

function tocsv(obj) {
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

var emailX = /\b[\w\.\-\+]+@[\w\-]+\.[a-zA-Z]{2,13}(\.[a-zA-Z]{2,13}|\b)/;
var phoneX = /((\d+\W*)\d*|)\d{3}\W*\d{3}\W*\d{4}/;
var em = (emailX.test(notes) && emailX.test(emails) === false) ? reg(emailX.exec(notes), 0) : emails;
var ph = (phoneX.test(notes) && phoneX.test(phones) === false) ? reg(phoneX.exec(notes), 0) : phones;

return [
  publink,
  lirPathLink,
  reChar(fixCase(obj.firstName)) +' '+ reChar(fixCase(obj.firstName)),
  reChar(fixCase(obj.firstName)),
  reChar(fixCase(obj.lastName)),
  csvReady(obj.location),
  reChar(csvReady(title1)),
  reChar(csvReady(title2)),
  reChar(csvReady(empl1)),
  reChar(csvReady(empl2)),
  jobTime1,
  jobTime2,
  reChar(csvReady(edu1)),
  edu1end,
  reChar(csvReady(edu2)),
  edu2end,
  seekingJob,
  seekingTitles,
  em ? em : '',
  ph ? ph : '',
  apps ? apps : '',
  notes ? notes : ''
];
}

async function getSearchResults(p) {
  var apiLink = window.location.href.replace(/talent\//, 'talent/api/');
  var url = apiLink.replace(/&start=\d+/, '&start=' + p);
  var res = await fetch(url);
  var jdat = await res.json();
  console.log(jdat);
  return jdat;
}


async function loopThroughSearchRes() {
  var temp_csv_dl = [
    ['Public Profile', 'LIR Profile', 'Full Name', 'First Name', 'Last Name', 'Location', 'Current Title', 'Previous Title', 'Current Employer', 'Previous Employer', 'Months In Job 1', 'Months In Job 2', 'University 1', 'Graduation Date 1', 'University 2', 'Graduation Date 2', 'Open To Opportunities', 'Desired Titles', 'Emails', 'Phones', 'Job App Ids', 'Notes']
  ];
  var firstRes = await getSearchResults(0);
  var resArr1 = firstRes.result.searchResults;
  resArr1.forEach(itm => temp_csv_dl.push(tocsv(itm)));
  var numRes = firstRes.meta.total;
  if (numRes > 24) {
    for (var i = 25; i < 1000; i=i+25) {
      var res = await getSearchResults(i);
      var searchRes = res.result.searchResults;
      if (searchRes) {
        searchRes.forEach(itm => temp_csv_dl.push(tocsv(itm)));
        numRes = res.meta.total;
        await delay(rando(1222)+333);
        if (numRes < 25) break;
        console.log(i);
      }
    }
  }
 downloadr(temp_csv_dl, 'LIR_search_res.tsv');
}
loopThroughSearchRes()

