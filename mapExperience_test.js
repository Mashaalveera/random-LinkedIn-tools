var now = new Date().getTime();

function mapPositionDetails(jobs){
    return jobs.map(pos=> {
		return {
			name: pos.companyName,
			id: pos.companyId ? pos.companyId : 0,
			title: pos.title,
			start: pos.i18nStartDate ? new Date(pos.i18nStartDate).getTime() : now,
			end: pos.i18nEndDate ? new Date(pos.i18nEndDate).getTime() : now
    	}
	});
}

var table = [];
teradata_leaders.forEach(tera=> {
  var matches = [];
 	var jobs = mapPositionDetails(tera.data.profile.positions);
	jobs.forEach(pos=> {
      var matchJobs = [];
		cto_targets.forEach(cto=> {
			var cjobs =  mapPositionDetails(cto.data.profile.positions);
			cjobs.forEach(cpos=> {
				if( (new RegExp(cpos.name,'i').test(pos.name) || new RegExp(pos.name,'i').test(cpos.name)) && 
					(pos.start <= cpos.end && pos.end >= cpos.start )
				){
					if(matchJobs.every(el=> el.target.publicLink != cto.data.profile.publicLink && cpos != el.target.job)){
						matchJobs.push({leaderJob: pos, target: {firstName: cto.data.profile.firstName, lastName: cto.data.profile.lastName, targetId: cto.data.profile.niid, publicLink: cto.data.profile.publicLink, job: cpos}});
                    }
              	}
			}); //end of cto jobs
			
		}); //end of cto_targets
		if(matchJobs.length > 0) matches.push(matchJobs);
	}); //end of leader jobs
	if(matches.length > 0) table.push({leaderId: tera.data.profile.niid, firstName: tera.data.profile.firstName, lastName: tera.data.profile.lastName, publicLink: tera.data.profile.publicLink, matches: matches})
});//end of leaders
