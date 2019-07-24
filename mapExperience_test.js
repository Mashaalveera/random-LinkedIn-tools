var target1 = cmgLeaders;
var target2 = flAE;

var now = new Date().getTime();

function mapPositionDetails(jobs) {
  return jobs.map(pos => {
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

target1.forEach(t1 => {
  var matches = [];
  var jobs = mapPositionDetails(t1.positions);
  jobs.forEach(pos => {
    var matchJobs = [];
    target2.forEach(t2 => {
      var cjobs = mapPositionDetails(t2.positions);
      cjobs.forEach(cpos => {
        if ((new RegExp(cpos.name, 'i').test(pos.name) || new RegExp(pos.name, 'i').test(cpos.name)) &&
          (pos.start <= cpos.end && pos.end >= cpos.start)
        ) {
          if (matchJobs.every(el => el.target.niid != t2.niid && cpos != el.target.job)) {
            matchJobs.push({
              leaderJob: pos,
              target: {
                firstName: t2.firstName,
                lastName: t2.lastName,
                niid: t2.niid,
                job: cpos
              }
            });
          }
        }
      }); //end of cjobs

    }); //end of target2
    if (matchJobs.length > 0) matches.push(matchJobs);
  }); //end of jobs
  if (matches.length > 0) table.push({
    niid: t1.niid,
    firstName: t1.firstName,
    lastName: t1.lastName,
    matches: matches
  });
}); //end of target1
