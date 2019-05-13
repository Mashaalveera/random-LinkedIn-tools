var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() * n);


async function locationSearch(geo){
  var res = await fetch("https://www.linkedin.com/voyager/api/typeahead/hits?q=federated&query="+geo+"&shouldUseSchoolParams=false&types=List(REGION)", {"credentials":"include","headers":{"accept":"application/vnd.linkedin.normalized+json+2.1","accept-language":"en-US,en;q=0.9","csrf-token":reg(/ajax:\d+/.exec(document.cookie),0),"x-li-lang":"en_US","x-li-page-instance":"urn:li:page:d_flagship3_search_srp_people;vBLue9LtQtON6bVErtbbbw==","x-li-track":"{\"clientVersion\":\"1.3.794\",\"osName\":\"web\",\"timezoneOffset\":-4,\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\"}","x-restli-protocol-version":"2.0.0"},"referrer":"https://www.linkedin.com/search/results/people/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
  var d = await res.json();

  var arr = d.data.elements.map(el=> [el.hitInfo.id,el.text.text]);
  console.log(arr);
}



locationSearch('atlanta')
