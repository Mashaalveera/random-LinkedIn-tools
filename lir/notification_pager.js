var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));

var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
  next: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 7 12" height="32px" width="7px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-619, -2862)"><g transform="translate(100, 2626)"><g transform="translate(510, 230)"><g><polygon points="0 0 24 0 24 24 0 24"/><path d="M9.31,6.71 C8.92,7.1 8.92,7.73 9.31,8.12 L13.19,12 L9.31,15.88 C8.92,16.27 8.92,16.9 9.31,17.29 C9.7,17.68 10.33,17.68 10.72,17.29 L15.31,12.7 C15.7,12.31 15.7,11.68 15.31,11.29 L10.72,6.7 C10.34,6.32 9.7,6.32 9.31,6.71 Z" fill="#ffffff"/></g></g></g></g></g></svg>`,
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
function loadingElm() {
  var loaD = document.createElement("div");
  loaD.setAttribute("id", "loader-elm");
  document.body.appendChild(loaD);
  loaD.style.top = '6%';
  loaD.style.left = '10%';
  loaD.style.position = "fixed";
  loaD.style.zIndex = new Date().getTime();
  loaD.innerHTML = '<svg version="1.1" id="Layer_1" x="0px" y="0px"     width="200px" height="200px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;">    <rect x="0" y="10" width="4" height="0" fill="#333" opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y"values="10; 5; 10" begin="0s" dur="555ms" repeatCount="indefinite" />    </rect>    <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0.15s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0.15s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y" values="10; 5; 10" begin="0.15s" dur="555ms" repeatCount="indefinite" />    </rect>    <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0.3s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0.3s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y" values="10; 5; 10" begin="0.3s" dur="555ms" repeatCount="indefinite" />    </rect>  </svg>';
}

function killLoader() {
  document.body.removeChild(document.getElementById("loader-elm"));
}

async function createChatterHTML(){
  if(gi(document,'chatters_list_box')) gi(document,'chatters_list_box').outerHTML = '';
  var rect = {top: 100, left: 0, right: 0, bottom: 0};
  var cont = ele('div');
  a(cont,[['id','chatters_list_box'],    ['style', `position: fixed; top: ${rect.top}px; left: ${(rect.left)}px; z-index: ${new Date().getTime()}; width: 400px; border: 1px solid #007862; border-radius: 0.4em; background: transparent;`]  ]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [    ['style', `display: grid; grid-template-columns: 34px minmax(260px, 1fr) 34px 34px;  background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move; padding: 4px;`]  ]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var prev = ele('div');
  a(prev, [    ['id','prev_notification'],['style', `width: 32px; height: 32px; cursor: pointer;`]  ]);
  head.appendChild(prev);
  prev.innerHTML = svgs.next;
  prev.style.transform = 'rotate(180deg)';
  prev.onclick = prevPage;

  var txt = ele('span');
  a(txt, [    ['id','current_notification'],['style', `color: #fff; font-size: 1.1em; border-radius: 0.5em; padding: 4px; text-align: center;`]  ]);
  head.appendChild(txt);
  txt.innerHTML = `Notifications - Page 0`;

  var next = ele('div');
  a(next, [    ['id','next_notification'],['style', `width: 32px; height: 32px; cursor: pointer;`]  ]);
  head.appendChild(next);
  next.innerHTML = svgs.next;
  next.onclick = nextPage;

  var cls = ele('div');
  a(cls, [    ['style', `width: 34px; height: 34px; cursor: pointer;`]  ]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod, [    ['id','chatter_search_field'],['style', `height: 500px; width: 100%; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em; background: #fff; padding 4px; overflow-y: auto;`]  ]);
  cont.appendChild(cbod);
  await page(0);
}

function nextPage(){
  var n = gi(document,'current_notification');
  var next = parseInt(reg(/\d+/.exec(n.innerText),0));
  var p = (next+1) * 10;
  console.log(p);
  page(p);
  n.innerHTML = `Notifications - Page ${(next+1)}`;

}
function prevPage(){
  var n = gi(document,'current_notification');
  var prev = parseInt(reg(/\d+/.exec(n.innerText),0));
  var p = prev > 1 ? (prev-1) * 10 : 0;
  console.log(p);
  page(p);
  n.innerHTML = `Notifications - Page ${p/10}`;
}

async function page(start){
  loadingElm();
  var res = await fetch(`https://www.linkedin.com/cap/notifications/fetchNotificationsAjax?start=${start}&count=10`);
  var text = await res.text();
  gi(document,'chatter_search_field').innerHTML= text.replace(/<h2 class="notifications-heading">NOTIFICATIONS<\/h2>/i, '');

  Array.from(cn(document,'time-ago')).forEach(el=> {
    a(el,[['style',`float: right; transform: translate(0px, 10px);`]])
  });
  Array.from(cn(document,'grouped notification  not-clicked')).forEach(el=> {
    a(el,[['style',`border-bottom: 1px solid #000; padding: 8px;`]])
  });
  Array.from(cn(document,'grouped notification  not-clicked')).forEach(el=> {
    a(tn(el,'h3')[0],[['style',`width: 86%;`]])
  });
  Array.from(cn(document,'pictures')).forEach(el=> {
    a(tn(el,'img')[0],[['width','45px'],['height','45px'],['style',`box-sizing: border-box; background-clip: content-box; border: 1px solid transparent; border-radius: 49.9%; transform: translate(0px, 5px); `]])
  });
  Array.from(cn(document,'people')).forEach(el=> {
    a(el,[['style',`float: right; transform: translate(-1px, -20px); font-size: 1.15em; color: #7c7c7c;`]])
  });
  killLoader();
}

createChatterHTML()
