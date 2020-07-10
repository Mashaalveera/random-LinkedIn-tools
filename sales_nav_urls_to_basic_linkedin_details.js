var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : false;
var tn = (o, s) => o ? o.getElementsByTagName(s) : false;
var gi = (o, s) => o ? o.getElementById(s) : false;
var rando = (n) => Math.round(Math.random() * n);

var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t); 
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

var tsvready = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, '↵').replace(/"/g, "'") : s;
var reChar = (s) => typeof s == 'string' && s.match(/&#\d+;/g) && s.match(/&#\d+;/g).length > 0 ? s.match(/&#\d+;/g).map(el => [el, String.fromCharCode(reg(/(?<=&#).+?(?=;)/.exec(el),0))]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
var fixNameCase = (s) => s.split(/(?=[^áàâäãåÁÀÂÄÃæéèêëÉÈÊËíìîïñÑóòôöõøœÓÒÔÖÕØŒßÚÙÛÜúùûüa-zA-Z])\b/).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t=> t.charAt(0).toUpperCase());


var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};
  
  function aninCloseBtn() {
    var l1 = tn(this, 'path')[0];
    var l2 = tn(this, 'path')[1];
    l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
    l1.style.transition = "all 233ms";
    l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
    l2.style.transition = "all 233ms";
  }
  
  function anoutCloseBtn() {
    var l1 = tn(this, 'path')[0];
    var l2 = tn(this, 'path')[1];
    l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l1.style.transition = "all 233ms";
    l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l2.style.transition = "all 233ms";
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
  
  
  async function createUploadHTML(form_name){
    var cont_id = 'form_upload_elm';
    if(gi(document,cont_id)) gi(document,cont_id).outerHTML = '';
    var rect = document.body.getBoundingClientRect();
    var cont = ele('div');
    a(cont,[['id',cont_id],['style', `padding: 0; position: fixed; top: ${rect.top+15}px; left: ${rect.left+35}px; z-index: ${new Date().getTime()}; width: ${rect.width*0.8}px; border: 1px solid #004471; border-radius: 0.4em; background: rgba(5, 37, 51, 0.6);`]]);
    document.body.appendChild(cont);
  
    var head = ele('div');
    a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; width: 100%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]]);
    cont.appendChild(head);
    head.onmouseover = dragElement;
  
    var txt = ele('div');
    a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; padding: 4px;`]]);
    head.appendChild(txt);
    txt.innerText = form_name;
  
    var cls = ele('div');
    a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
    head.appendChild(cls);
    cls.innerHTML = svgs.close;
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
    cls.onclick = () => cont.outerHTML = '';
  
    var cbod = ele('div');
    a(cbod,[['style',`background: #0a1114; display: grid; grid-template-rows: auto; grid-gap: 6px; padding: 2px; max-height: ${(screen.availHeight*0.75)}px; overflow-y: auto;`]]);
    cont.appendChild(cbod);
    
    
    var textarea = ele('textarea');
    a(textarea,[['id', 'url_list_from_user_input'],['style',`height: 300px; padding: 6px; border-radius: 0.4em; background: #f1f1f1; color: #004471;`]]);
    cbod.appendChild(textarea);

    var btn = ele('div');
    a(btn,[['style',`padding: 6px; border-radius: 0.4em; background: #004471; color: #f1f1f1; cursor: pointer; text-align: center;`]]);
    cbod.appendChild(btn);
    btn.innerText = 'Convert URLs';
    btn.onclick = runConverter;
}  


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
        "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;" + creds.tracking_id,
        "x-li-track": "{\"clientVersion\":\"" + creds.client_version + "\",\"osName\":\"web\",\"timezoneOffset\":" + creds.time_offset + ",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}",
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

async function profileByPath(obj,credentials) {
  var text = await handleFetch(`https://www.linkedin.com/voyager/api/identity/profiles/${obj.target_path}/profileActions`,creds(credentials), 'text');
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


async function getBasicProfileFromSalesNavLink(obj,credentials){
  var char39 = await profileByPath(obj,credentials);
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
    if(arr[i].run){
      var profile = await getBasicProfileFromSalesNavLink(arr[i],credentials);
      await delay(rando(1400)+1222);
      if(profile && profile.download_now != true){
        var merged = {...arr[i],...profile};
        contain_arr.push(merged);
      }else{
        break;
      }
    }else{
        contain_arr.push(arr[i]);
    }
  }
  return contain_arr;
}

async function initSaleNavConverter(query_objects){
  var all_profiles = await loopThroughSalesNavLinks(query_objects);
  console.log(all_profiles);
  convert2TsvAndDownload(all_profiles,'converted_profiles.tsv');

}



var linkedinType = (s) => s && s.length ? s.map(url=> 
        /recruiter\/profile\/\d+,\w+,\w+/.test(url)
            ? {run: false, target_path: reg(/(?<=recruiter\/profile\/)\d+,\w+,\w+/.exec(url),0),url: url}
            : {run: true, target_path: reg(/(?<=\/in\/|\/recruiter\/profile\/|\/sales\/people\/).+?(?=,|\/|\s|$)/.exec(url),0),url: url}
) : [];

function runConverter(){
  var unqTargetpath = (a, o) => a.filter(i => o.hasOwnProperty(i.target_path) ? false : (o[i.target_path] = true));
  var textarea = gi(document,'url_list_from_user_input');
  if(textarea.value && /linkedin\.com\/(in|recruiter|sales)/.test(textarea.value)){
    var paths = textarea.value.match(/linkedin\.com\/(in|recruiter\/profile|sales\/people)\/\S+/g);
    var convert_these = unqTargetpath(linkedinType(paths),{});

    initSaleNavConverter(convert_these)
  }
}


createUploadHTML('LinkedIn URL converter');
