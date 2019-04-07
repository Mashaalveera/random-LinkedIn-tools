var reg = (el, n) => el ? el[n] : '';
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() + n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var splitName = (s) => [reg(/^\S+/.exec(s),0), reg(/\S+$/.exec(s),0)];
var titleClean = (s) => encodeURIComponent(s.replace(/&/, '').replace(/\s*-.+/, ''));

var FLTC = (arr) => 'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[2]) + '&jobTitleTimeScope=CP&jobTitleEntities=' + titleClean(arr[1]) + '&firstName=' + splitName(arr[0])[0] + '&lastName=' + splitName(arr[0])[1] +'&start=0';

var FTC = (arr) => 'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[2]) + '&jobTitleTimeScope=CP&jobTitleEntities=' + titleClean(arr[1]) + '&firstName=' + splitName(arr[0])[0] + '&lastName='+'&start=0';

var LTC = (arr) =>  'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[2]) + '&jobTitleTimeScope=CP&jobTitleEntities=' + titleClean(arr[1]) + '&firstName=&lastName=' +splitName(arr[0])[1]+'&start=0';

var FLC = (arr) => 'https://www.linkedin.com/recruiter/api/smartsearch?companyTimeScope=C&companyEntities=' + encodeURIComponent(arr[2]) + '&jobTitleTimeScope=CP&jobTitleEntities='+'&firstName=' + splitName(arr[0])[0] + '&lastName=' + splitName(arr[0])[1]+'&start=0';


async function checker(arr){
  var s1 = await searchBy(FLTC(arr));
  console.log(s1.meta.total);
  if(s1.meta.total < 1){
    var s2 = await searchBy(FTC(arr));
    console.log(s2.meta.total);
    if(s2.meta.total < 1){
      var s3 = await searchBy(LTC(arr));
      console.log(s3.meta.total);
      if(s2.meta.total < 1){
        var s4 = await searchBy(FLC(arr));
        console.log(s4.meta.total);
        console.log(s4);
      }
    }
  }
}

async function searchBy(url){
  var res = await fetch(url);
  var jdat = await res.json();
  return jdat;
}

async function looper(arr){
  for(var i=0; i<arr.length; i++){
	checker(arr[i]);
  }
}

  looper([['Ashley Burke','DynCorp International','Senior Vice President- Communications']])
