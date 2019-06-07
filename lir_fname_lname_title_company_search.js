var reg = (o, n) => o ? o[n] : '';
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

async function getJSON(url) { /* used_in: [] */
  try {
    var res = await fetch(url);
    try {
      var d = await res.json();
      return d;
    } catch (err) {
      console.log([res, err]);
      return null;
    }
  } catch (err) {
    console.log([url, err]);
    return null;
  }
}

function convertSearchParam(type, arr) { /* { used_in: ['getFacetTitles, getFacetCompanies'] } */
  var str = '';
  if (arr.length > 0 && type != '&companyEntities=' && type != '&jobTitleEntities=') arr.forEach(itm => Array.isArray(itm) ? str = str + type + itm[1] : str = str + type + itm);
  if (arr.length > 0 && (type == '&companyEntities=' || type == '&jobTitleEntities=' || type == '&skillEntities=')) arr.forEach(itm => Array.isArray(itm) ? str = str + type + encodeURIComponent(itm[0]).replace(/%20/g, '+') + '_' + itm[1] : str = str + type + itm);
  return str;
} /* takes type array of [displayName, id] for company, title, or skills, Returns facetStringSearch or NULL */


async function titleSearch_api(kw) { /* { used_in: ['titleSearch_tryVariant'] } */
  var res = await fetch('https://www.linkedin.com/recruiter/api/smartsearch/typeahead/title?query=' + kw);
  var d = await res.json();
  return d.resultList;
} 

async function titleSearch_tryVariant(kw) { /* { used_in: ['getFacetTitles'] } */
  var res = await titleSearch_api(kw);
  if (res.length < 1) {
    var variant = titleVariants(kw);
    for (var i = 0; i < variant.length; i++) {
      var res2 = await titleSearch_api(variant[i]);
      if (res2.length > 0) return res2.map(i => [i.displayName, i.id]);
    }
  } else {
    return res.map(i => [i.displayName, i.id]);
  }
} /* takes title from position api response and searches for the faceted API code. Returns array, will be empty if no match after variant attempt */

function titleVariants(str) { /* { used_in: ['titleSearch_tryVariant'] } */
  var kw = str.replace(/\bdir\b/i, 'director').replace(/\bmgr\b/i, 'manager').replace(/\bmanger\b/i, 'manager').replace(/exec/i, 'executive').replace(/\bSr.\s*|senior|\bsr\b|\blead\b/i, '').replace(/\b[a-z]{2,3}\b/i, '').replace(/\(.+?\)/, '').trim();
  var out = unq([kw.replace(/,.+/, '').trim(), kw.replace(/\/.+/, '').trim(), kw.replace(/.+?,/, '').trim(), kw.replace(/.+?\//, '').trim()]);
return out;
} /* takes title string, cleans it, creates variants */

async function getFacetTitles(kw) { /* { used_in: [''] } */
  var titles = await titleSearch_tryVariant(kw);
  var facetTitles = titles && titles.length > 0 ? '&jobTitleTimeScope=C' + convertSearchParam('&jobTitleEntities=', titles) : null;
  return facetTitles;
} /* takes title from position api response and searches for the faceted API code. Returns facetStringSearch or NULL */

async function buildTitleSearch(kw){
  var title = '';
  var facetTitles = await getFacetTitles(kw);
  titleVariants(kw).length > 1 ? titleVariants(kw).forEach(t=> title = title + t +' OR ') : title = title + titleVariants(kw).toString();
  var titleSearch = facetTitles ? facetTitles : '&jobTitleTimeScope=C&jobTitleEntities=' + encodeURIComponent(title.trim().replace(/\s*OR$/,'').replace(/\s+/g, ' '));
  return titleSearch;
}


async function companySearch_api(kw) { /* { used_in: ['companySearch_tryVariant'] } */
  var res = await fetch('https://www.linkedin.com/recruiter/api/smartsearch/typeahead/company?query=' + encodeURIComponent(kw) + '&_l=en_US');
  var d = await res.json();
  return d.resultList;
}

async function companySearch_tryVariant(kw) { /* { used_in: ['getFacetCompanies'] } */
  var res = await companySearch_api(kw);
  if (res.length < 1) {
    var variant = [kw.replace(/\s*\d.+|,.+|\s*-.+/, '')]; /* this needs to be examined further */
    for (var i = 0; i < variant.length; i++) {
      var res2 = await companySearch_api(variant[i]);
      if (res2.length > 0) return res2.map(i => [i.displayName, i.id]);
    }
  } else {
    return res.map(i => [i.displayName, i.id]);
  }

}
async function getFacetCompanies(kw) { /* { used_in: [''] } */
  var companies = await companySearch_tryVariant(kw);
  var facetCompanies = companies && companies.length > 0 ? '&companyTimeScope=C' + convertSearchParam('&companyEntities=', companies) : null;
  return facetCompanies;
}

async function buildCompanySearch(kw){
  var facetCompanies = await getFacetCompanies(kw);
  var companySearch = facetCompanies ? facetCompanies : '&companyTimeScope=C&companyEntities=' + encodeURIComponent('"'+kw.trim()+'"');
  return companySearch;
}

async function buildFullNameTitleCompanySearchFacets(searchArray){
  var api = 'https://www.linkedin.com/recruiter/api/smartsearch?';
  var firstName = `firstName=%22${searchArray[0]}%22`;
  var lastName = `&firstName=%22${searchArray[1]}%22`;
  var titleSearch = await buildTitleSearch(searchArray[2]);
  var companySearch = await buildCompanySearch(searchArray[3]);
  var searchUrl = api+firstName+lastName+companySearch+titleSearch;
  return searchUrl;
}

function buildFullNameTitleCompanySearchBoolean(searchArray){
  var api = 'https://www.linkedin.com/recruiter/api/smartsearch?';
  var firstName = `firstName=%22${searchArray[0]}%22`;
  var lastName = `&firstName=%22${searchArray[1]}%22`;
  var title = '';
  titleVariants(searchArray[2]).length > 1 ? titleVariants(searchArray[2]).forEach(t=> title = title + t +' OR ') : title = title + titleVariants(searchArray[2]).toString();
  var titleSearch = '&jobTitleTimeScope=C&jobTitleEntities=' + encodeURIComponent(title.trim().replace(/\s*OR$/,'').replace(/\s+/g, ' '));
  var companySearch = '&companyTimeScope=C&companyEntities=' + encodeURIComponent('"'+searchArray[3]+'"');
  var searchUrl = api+firstName+lastName+companySearch+titleSearch;
  return searchUrl;
}

async function runFullNameTitleCompanySearches(searchArray){
  var fnX = new RegExp(searchArray[0],'i'); /* converts first name to regex*/
  var lnX = new RegExp(searchArray[1],'i'); /* converts last name to regex*/

  var facetUrl = await buildFullNameTitleCompanySearchFacets(searchArray);
  var boolUrl = buildFullNameTitleCompanySearchBoolean(searchArray);

  var search1 = await getJSON(facetUrl);
  var search2 = await getJSON(boolUrl);

  var arr1 = search1.result.searchResults ? search1.result.searchResults : [];
  var arr2 = search2.result.searchResults ? search2.result.searchResults : [];

  var output = [];
  
  /*pushes search results into output array if the first and last name matches. Also removes duplicates*/
  [arr1,arr2].forEach(array=>{
    if(array.length > 0){ 
      array.forEach(el=> {
        if(output.length == 0 && fnX.test(el.firstName) && lnX.test(el.lastName)) output.push(el);
        if((output.length > 0) && fnX.test(el.firstName) && lnX.test(el.lastName) && output.some(i=> i.niid == el.niid) === false) output.push(el);
      });
    }
  });
  console.log(output);
  return output;
}

var searchData = ['Todd','Baller','Director, Sales Operations','Google'];

runFullNameTitleCompanySearches(searchData)

