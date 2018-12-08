/*/
This has a bug that I do not feel like fixing, but it works. 
Build video: https://youtu.be/e7WHLnGxcLU
/*/

var pubLink = document.getElementsByClassName('public-profile searchable')[0].getElementsByTagName('a')[0].href;

function connectInNewTab(link) {

  var w = window.open(link);

  setTimeout(() => {
    var buttonList = w.document.getElementsByClassName('pv-top-card-v2-section__actions')[1].getElementsByTagName('button');;

function clk(){
	setTimeout(() => {
          w.document.getElementsByClassName('button-primary-large ml1')[0].click();
	}, 2800);
}

    function moreActions(obj) {
      obj.click();
      setTimeout(() => {
        var list = w.document.getElementsByClassName('pv-s-profile-actions__overflow-dropdown artdeco-dropdown-menu')[0].getElementsByTagName('li');
        for (i = 0; i < list.length; i++) {
          if (/Connect/.test(list[i].innerText)) {
            var f = new Promise(res=>{res(list[i].getElementsByTagName('button')[0].click());});
            f.then(clk());
          }
        }
      }, 1100);
    }

    function clickConnect(obj) {
      obj.click();
      setTimeout(() => {
        w.document.getElementsByClassName('button-primary-large ml1')[0].click();
      }, 1400);
    }

    for (b = 0; b < buttonList.length; b++) {
      let btxt = buttonList[b].innerText;
      if (btxt == 'More actions') {
        moreActions(buttonList[b]);
      }
      if (/Connect/.test(btxt)) {
        clickConnect(buttonList[b]);
      }
    }
  }, 3600);

  setTimeout(() => {
    w.close()
  }, 7800);

}

connectInNewTab(pubLink)
