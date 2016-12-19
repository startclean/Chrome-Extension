document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get({"search": "google", "searchplace": "bottom"}, searchCallback);
});

var jsonmain;

function jsonparse(json) {
	jsonmain = json;
	searchbox = document.getElementById("search-box");
	if (json.AbstractSource == "Wikipedia") {
		document.getElementById("duckduckres").innerHTML = "";
		var script = document.createElement("script");
		script.setAttribute("src", "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+json.AbstractURL.split('/')[json.AbstractURL.split('/').length-1]+"&callback=wikicallback");
		//script.setAttribute("src", "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&prop=extracts&exintro=&explaintext=&callback=wikicallback&srsearch="+searchbox.value);
		document.body.appendChild(script);
		script.outerHTML = "";
		script.delete;
		
		if (typeof json.RelatedTopics[0] != "undefined") {
			var div = document.createElement('div');
			div.innerHTML = json.RelatedTopics[0].Result;
			var a = div.getElementsByTagName("a")[0];
			a.className = "extrares";
			document.getElementById("duckduckres").appendChild(a);

			div.innerHTML = json.RelatedTopics[1].Result;
			var a = div.getElementsByTagName("a")[0];
			a.className = "extrares";
			document.getElementById("duckduckres").appendChild(a);

			div.innerHTML = json.RelatedTopics[2].Result;
			var a = div.getElementsByTagName("a")[0];
			a.className = "extrares";
			document.getElementById("duckduckres").appendChild(a);
		}
	}
}

function wikicallback(json) {
	var page = json.query.pages[Object.keys(json.query.pages)[0]];
	//console.log(json.query.pages);
	var a = document.createElement('a');
	a.href = "http://en.wikipedia.org/?curid="+page.pageid;
	a.innerText = page.title + " - "+page.extract;
	if (page.extract != "") {
		a.innerText = page.title + " - "+page.extract;
	} else {
		a.innerText = page.title;
	}
	a.className = "mainres";
	[].forEach.call(document.querySelectorAll('.mainres'),function(e){
	  e.parentNode.removeChild(e);
	});
	document.getElementById("wikires").appendChild(a);
}

var searchCallback = function(list) {
	var form;
	var searchbox;

	var searchplace = list["searchplace"];
	var formstring = "<form id=\"search-form\" method=\"get\" action=\"https://google.com/search?\">\
			<input id=\"search-box\" name=\"q\" type=\"text\" placeholder=\"search\" autofocus autocomplete='on'/>\
		</form>";

	if (searchplace == "top") {
		document.getElementById("search1").className += " active";
		document.getElementById("search1").insertAdjacentHTML("beforeend", formstring);
	} else if (searchplace == "middle") {
		document.getElementById("search2").className += " active";
		document.getElementById("search2").insertAdjacentHTML("beforeend", formstring);
	} else {
		document.getElementById("search3").className += " active";
		document.getElementById("search3").insertAdjacentHTML("beforeend", formstring);
	}
	
	form = document.getElementById("search-form");
	searchbox = document.getElementById("search-box");

	searchbox.onkeyup = function(){
		var val = searchbox.value;
		if (val.length > 1) {
			var script = document.createElement('script');
			script.src = 'https://api.duckduckgo.com/?q='+searchbox.value+'&format=json&callback=jsonparse';
			document.body.appendChild(script);
			script.outerHTML = "";
			script.delete;
		}
	}

	if (list["search"] == "duckduckgo") {
		form.setAttribute("action", "https://duckduckgo.com/?");
	} else if (list["search"] == "yahoo") {
		form.setAttribute("action", "https://search.yahoo.com/search?");
	} else if (list["search"] == "bing") {
		form.setAttribute("action", "https://www.bing.com/search?");
	}

	form.addEventListener("submit", 
	function(e){
		var value = searchbox.value;
		e.preventDefault();
		var value = searchbox.value;
		if (value.indexOf(".") >= 0) {
			window.location = addhttp(value);;
		} else {
			form.submit();
		}
	}, false);
}

