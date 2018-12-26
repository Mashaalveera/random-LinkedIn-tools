var doc = document;

var socialBar = doc.getElementsByClassName('feed-shared-social-actions feed-shared-social-action-bar ember-view');

function getJobPostingObj(obj, n) {
      setTimeout(() => {
        doc.getElementById(obj.getAttribute('id')).scrollIntoView();

        obj.getElementsByClassName('job-card-search--clickable')[0].click();
      }, ((n + 1) * 1800));
    }

for(i=0; i<socialBar.length; i++){
	getJobPostingObj(socialBar[i], i);
}
