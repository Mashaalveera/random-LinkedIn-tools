var reg = (o, n) => o ? o[n] : '';
var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var containArr = [];

/*drop your emails from a spreadsheet here, replacing these emails*/
var emailTable = `email@email.com
email@email.net
email@email.org`; 

async function salesNav(email){
  var res = await fetch("https://www.linkedin.com/sales/gmail/profile/proxy/"+email, {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3","accept-language":"en-US,en;q=0.9","sec-fetch-mode":"navigate","sec-fetch-site":"none","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
  var text = await res.text();
  var publicProfile = reg(/(?<=voyager\/api\/identity\/profiles\/).+?(?=\/memberConnections|\/privacySettings|\/memberBadges|\/networkinfo|\/profileActions)/i.exec(text),0);
  var pubLink = publicProfile ? 'https://www.linkedin.com/in/'+publicProfile : '';
  containArr.push([email,pubLink]);
  return [email,pubLink];
}

async function emailLooper(emailTable){
  var arr = emailTable.split(/\n/).filter(el=> el != '');
  for(var i=0; i<arr.length; i++){
    var res = await salesNav(arr[i]);
    await delay(rando(2222)+1200);
    console.log(i);
  }
  var output = containArr.map(el=> el.reduce((a,b)=> a+'\t'+b)).reduce((a,b)=> a+'\n'+b);
  console.log(output);
}

emailLooper(emailTable);
