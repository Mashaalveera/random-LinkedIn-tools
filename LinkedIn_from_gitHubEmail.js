/*/
  build and demo video:
https://youtu.be/e-GhdUJpaHc
/*/

function getEmail(){
var liTag = document.getElementsByClassName("vcard-details")[0].getElementsByTagName("li");
for(i=0; i<liTag.length; i++){
	var attr = liTag[i].getAttribute("itemprop");
		if(attr == "email"){
			return liTag[i].getElementsByTagName("a")[0].innerText;
		}
}
}
window.open("https://www.linkedin.com/sales/gmail/profile/proxy/"+getEmail());
