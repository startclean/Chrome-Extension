function extractDomain(url, y) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    //find & remove tld
	if (y == 1) {
    	domain = domain.split('.')[0];
	}

    return domain;
} //from lewdev on stackoverflow

document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get({
		"showTop": true
	}, function(items) {
		if (items["showTop"] == true) {
			listTopSites();
		}
	});
});

function listTopSites() { //get the top 5 sites from chrome
	var ul = document.getElementById("topsites");
	document.getElementById("topsites-list").style = 'display: block !important';
	chrome.topSites.get(function(info){
	for(var i=0;i<5;i++) {
	  var li = document.createElement("li");
	  var siteurl = info[i].url;
	  li.insertAdjacentHTML("beforeend", "<a href="+siteurl+">"+extractDomain(siteurl,1)+"</a>");
	  //li.appendChild("extractDomain(info[i].url)");
	  ul.appendChild(li);
	}
	});
}



