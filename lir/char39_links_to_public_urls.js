var reg = (o, n) => o ? o[n] : ''; /* this is used to validate a regular expression exec function. o == the regex exec function, n == the index we wish to retreave from the regex exec funtion object */

var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() * n);

var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1])); /* this is a function which allows us to apply an array of attributes and their values to the specifiect HTML object */

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

function parseBasics(obj,char) {
  var d = obj.data;
  var o = {
    char39: char,
    headline: d.headline ? d.headline : '',
    first_name: d.firstName ? d.firstName : '',
    last_name: d.lastName ? d.lastName : '',
    geo: d.locationName ? d.locationName : '',
    summary: d.summary ? d.summary : '',
    industry_name: d.industryName ? d.industryName : '',
    member_id: obj.included[0] && obj.included[0].objectUrn ? parseInt(obj.included[0].objectUrn.replace(/\D+/g, '')) : '',
    public_id: obj.included[0] && obj.included[0].publicIdentifier ? obj.included[0].publicIdentifier : '',
  };
  return o;
}

async function getBasics(char39) {
  var res = await fetch("https://www.linkedin.com/voyager/api/identity/profiles/" + char39 + "/", creds(char39)).catch(err=> {return false});
  var d = await res.json();
  return parseBasics(d,char39);
}

function toTSV(obj, source){
  return obj && obj.public_id && obj.char39 ? 'https://www.linkedin.com/in/' + obj.public_id + '\t' + 'https://www.linkedin.com/in/' + obj.char39 + '\n' : 'failed\t' + 'https://www.linkedin.com/in/' + source + '\n';
}

async function loopThroughProfilePaths(rows){ /* This function is used to loop through the LIR profile paths, extract the JSON profile data, and download it as a TSV file*/
  var tablehead = 'public_url\tsource_url\n';
  var arr = rows.split(/\n/).map(el=> reg(/(?<=\/in\/).+/.exec(el),0));
  for(var i=0; i<arr.length; i++){
    var profile = await getBasics(arr[i]);
    await delay(rando(1666)+1666);
    console.log(i);
    tablehead = tablehead + toTSV(profile,arr[i]);
  }
  downloadText(tablehead,`convertedUrls_${new Date().getTime()}.tsv`);
}

function downloadText(text, filename) {
  var file = new Blob([text], {    type: 'data:text/plain;charset=utf-8,'  });
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

var url_rows = `https://www.linkedin.com/in/AEEAABxeokMBdA-_HRKwD680XSD9bCpEMv2lvaU
https://www.linkedin.com/in/AEEAABHwjgEBxEwH9S2L4K8Pc3QJQvKR9uV10_M
https://www.linkedin.com/in/AEEAAAWaVtUBKM1ToYIttYLmsV7X2rEQnxtealI
https://www.linkedin.com/in/AEEAABaeg-EBUZ_OLp4GS1wy8ajlm0pAn377_7E
https://www.linkedin.com/in/AEEAABwDfzcByLq4ASQxHDwD83rfrRxJjRJuauM`;

loopThroughProfilePaths(url_rows)
