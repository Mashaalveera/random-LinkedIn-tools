var doc = document;

var socialBar = doc.getElementsByClassName('feed-shared-social-actions feed-shared-social-action-bar ember-view');

function getJobPostingObj(obj, n) {
      setTimeout(() => {
        doc.getElementById(obj.getAttribute('id')).scrollIntoView();
        var likeBtn = obj.getElementsByTagName('button')[0];
		var btnStatus = obj.getElementsByClassName('visually-hidden')[0].innerText;
		if(btnStatus == 'Like'){
			likeBtn.click()
		}
      }, ((n + 1) * 1800));
    }
for(i=0; i<1001; i++){
	getJobPostingObj(socialBar[i], i);
}
