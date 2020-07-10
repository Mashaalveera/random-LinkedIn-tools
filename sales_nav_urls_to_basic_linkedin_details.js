var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var tsvready = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, '↵').replace(/"/g, "'") : s;
var reChar = (s) => typeof s == 'string' && s.match(/&#\d+;/g) && s.match(/&#\d+;/g).length > 0 ? s.match(/&#\d+;/g).map(el => [el, String.fromCharCode(reg(/(?<=&#).+?(?=;)/.exec(el),0))]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
var fixNameCase = (s) => s.split(/(?=[^áàâäãåÁÀÂÄÃæéèêëÉÈÊËíìîïñÑóòôöõøœÓÒÔÖÕØŒßÚÙÛÜúùûüa-zA-Z])\b/).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t=> t.charAt(0).toUpperCase());

function convert2TsvAndDownload(records, named_file){
    var fileArray = records;
    var tsvReady = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, '↵').replace(/"/g, "'") : s;
    var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
    var str = (o) => typeof o == 'object' ? tsvReady(JSON.stringify(o).replace(/\n|\r/g, ' ')) : o;
    var firstLevel = fileArray.map(el => Object.entries(el));
    var header = unqHsh(firstLevel.map(el => el.map(itm => itm[0])).flat(),{});
    var table = [header];
    for (var i = 0; i < firstLevel.length; i++) {
      var arr = [];
      var row = [];
      var record = firstLevel[i];
      for (var s = 0; s < record.length; s++) {
        var record_kv = record[s];
        var col_key = record_kv[0];      
        var place = header.indexOf(col_key);
        arr[place] = record_kv[1];
      }
      for (var a = 0; a < arr.length; a++) {
        if (arr[a]) {
          row.push(arr[a]);
        } else {
          row.push('');
        }
      }
      table.push(row);
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
    var output_ = table.map(el => el.map(itm => str(itm)));
    downloadr(output_, named_file);
}

async function handleFetch(url,params_obj,type){ //all arguments are required
  if(params_obj && url){
    var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
    if(res.status > 199 && res.status < 300){
      if(type == 'json'){
        var d = await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
      }else{
        var d = await res.text().catch(err=> { console.log([err,url,params_obj]); return false });  
      }
      return d;
    }
    if(res.status == 429) {
      await delay(140000);
      var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return {} });
      if(res.status > 199 && res.status < 300){
        if(type == 'json'){
          var d = await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
        }else{
          var d = await res.text().catch(err=> { console.log([err,url,params_obj]); return false });  
        }
        return d;
      }else{
        return {download_now: true, status: res.status};
      }
    }
    if(res.status > 499 && res.status < 900) {
      await delay(3110);
      var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
      if(res.status > 199 && res.status < 300){
        if(type == 'json'){
          var d = await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
        }else{
          var d = await res.text().catch(err=> { console.log([err,url,params_obj]); return false });  
        }
        return d;
      }else{
        return {download_now: true, status: res.status};
      }
    }
    if(res.status > 899) {
      // console.log('you have been logged out');
      return {download_now: true, status: res.status};
    }
  } else {return false;}
}

async function getCredentials(){
  var reg = (o, n) => o ? o[n] : '';
  var genTrackId = ()=> '0123456789012345678901'.split('').map(s=> '0123456789abcdefghijklmnpoqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUVWXYZ0123456789'[Math.floor(Math.random() * 72)]).reduce((a,b)=> a+b)+'==';
  var credentials = {
    csrf: reg(/ajax:\d+/.exec(document.cookie), 0),
    tracking_id: genTrackId(),
    time_offset: (-(new Date().getTimezoneOffset() / 60)),
    client_version: (reg(/(?<=voyager-web_).+?(?=%)/.exec(document.head.innerHTML), 0) ? reg(/(?<=voyager-web_).+?(?=%)/.exec(document.head.innerHTML), 0) : '1.5.*')
  };
  if(credentials.csrf){
    return credentials;
  }else{
    var res = await fetch("https://www.linkedin.com/psettings/")
    var text = await res.text();
    credentials.csrf = reg(/ajax:\d+/.exec(text), 0);
    return credentials;
  }
}

function creds(creds) {
    return {
      "credentials": "include",
      "headers": {
        "accept": "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": creds.csrf,
        "x-li-lang": "en_US",
        "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;" + trackingId,
        "x-li-track": "{\"clientVersion\":\"" + creds.client_version + "\",\"osName\":\"web\",\"timezoneOffset\":" + timeOffset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
        "x-restli-protocol-version": "2.0.0"
      },
      "referrer": "https://www.linkedin.com/feed/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    };
  }
function parseBasics(obj) {
      var d = obj ? obj.data : null;
      if (d) {
        var public_id = obj.included && obj.included.length && obj.included[0].publicIdentifier ? obj.included[0].publicIdentifier : '';
        var pict_obj = obj.included && obj.included.length && obj.included.filter(r=> r.publicIdentifier == public_id).length && obj.included.filter(r=> r.publicIdentifier == public_id)[0].picture ? obj.included.filter(r=> r.publicIdentifier == public_id)[0].picture : null;
        var img = pict_obj && pict_obj.rootUrl && pict_obj.artifacts && pict_obj.artifacts.length ? pict_obj.rootUrl + pict_obj.artifacts[1].fileIdentifyingUrlPathSegment : '';  
        var o = {
          img: img,
          basic_niid: reg(/.{39}$/.exec(d.entityUrn), 0),
          headline: d.headline ? tsvready(d.headline) : '',
          first_name: d.firstName ? fixNameCase(tsvready(reChar(d.firstName))) : '',
          last_name: d.lastName ? fixNameCase(tsvready(reChar(d.lastName))) : '',
          full_geo: d.locationName ? reChar(d.locationName) : '',
          city_state: d.geoLocationName ? reChar(d.geoLocationName) : '',
          country: d.geoCountryName ? reChar(d.geoCountryName) : '',
          fs_geo_code: d.geoLocation && d.geoLocation.geoUrn ? reg(/(?<=fs_geo:).+/.exec(d.geoLocation.geoUrn), 0) : '',
          fs_city_code: d.location && d.location.preferredGeoPlace ? reg(/(?<=fs_city:).+/.exec(d.location.preferredGeoPlace), 0) : '',
          summary: d.summary ? tsvready(d.summary) : '',
          industry_name: d.industryName ? d.industryName : '',
          industry_urn: d.industryUrn ? reg(/(?<=fs_industry:).+/.exec(d.industryUrn), 0) : '',
          public_id: public_id ? public_id : '',
          public_url: public_id ? 'https://www.linkedin.com/in/' + public_id + '/' : '',
          member_id: obj.included[0].objectUrn ? obj.included[0].objectUrn.replace(/\D+/g, '') : ''
        };
        return o;
      } else {
        return false;
      }
    }

async function profileByPath(pubPath,credentials) {
  var text = await handleFetch("https://www.linkedin.com/voyager/api/identity/profiles/" + pubPath + "/profileActions",creds(credentials), 'text');
  var doc = new DOMParser().parseFromString(text, 'text/html');
  try {
    var j = JSON.parse(doc.body.innerText);
    var char39 = reg(/.{39}$/.exec(j.data.entityUrn),0);
    console.log(char39);
    return char39;
  }
 catch(err){
   return false;
 }
}

async function getBasics(char39,credentials) {
  var d = await handleFetch(`https://www.linkedin.com/voyager/api/identity/profiles/${char39}/`, creds(credentials), 'json');
  return parseBasics(d);
}


async function getBasicProfileFromSalesNavLink(url,credentials){
  var parseSalesNavLink = (url) => reg(/(?<=\/people\/).{39}/.exec(url),0);
  var char39 = await profileByPath(parseSalesNavLink(url),credentials);
  if(char39){
    var basics = await getBasics(char39,credentials);
    return basics;
  }else{
    return false;
  }
}

async function loopThroughSalesNavLinks(arr){
  var contain_arr = [];
  var credentials = await getCredentials();
  for(var i=0; i<arr.length; i++){
    var profile = await getBasicProfileFromSalesNavLink(arr[i],credentials);
    await delay(rando(1400)+1222);
    if(profile && profile.download_now != true){
      profile['sales_nav'] = arr[i];
      contain_arr.push(profile);
    }else{
      break;
    }
  }
  return contain_arr;
}

async function initSaleNavConverter(all_urls){
  var arr = all_urls.split(/\n/).map(r=> r.trim()).filter(r=> r);
  var all_profiles = await loopThroughSalesNavLinks(arr);
  console.log(all_profiles);
  convert2TsvAndDownload(all_profiles,'converted_profiles.tsv');
}

/*
DROP ALL OF YOUR URLS in the "all_urls" variable. Run this in the dev console.
*/

var all_urls = `https://www.linkedin.com/sales/people/ACwAAAA0NiQBtrOQhXlqwO2sCz7WHxVW23I-k3M,name,CFdk
https://www.linkedin.com/sales/people/ACwAAAA0NiQBtrOQhXlqwO2sCz7WHxVW23I-k3M,name,CFdk
https://www.linkedin.com/sales/people/ACwAAAA0NiQBtrOQhXlqwO2sCz7WHxVW23I-k3M,name,CFdk
https://www.linkedin.com/sales/people/ACwAAAA0NiQBtrOQhXlqwO2sCz7WHxVW23I-k3M,name,CFdk`;

initSaleNavConverter(all_urls)
