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
	//if (y == 1) {
    //	domain = domain.split('.')[0];
	//}

	if (y == 1) {
		d = splitHostname(domain);
		if (d.subdomain != "www" && d.subdomain != "") {
			return d.subdomain;
		} else {
			return d.domain;
		}
	} else {
		return domain;
	}
} //from lewdev on stackoverflow

function addhttp(url) {
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}

function splitHostname(h) {
    var result = {};
    var regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$');
    var urlParts = regexParse.exec(h);
    result.domain = urlParts[1];
    result.type = urlParts[2];
    result.subdomain = h.replace(result.domain + '.' + result.type, '').slice(0, -1);;
    return result;
}

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
// ronmurphy start
    var img = document.createElement("img");
          img.className = "icon";
          img.src = "http://www.google.com/s2/favicons?domain="+siteurl+"";
	  li.insertAdjacentHTML("beforeend", "<a href="+siteurl+"> <img src="+img.src+" alt="+extractDomain(siteurl,1)+"/> "+extractDomain(siteurl,1)+"</a>");
// ronmurphy end

    //li.appendChild("extractDomain(info[i].url)");
    ul.appendChild(li);
	}
	});
}
