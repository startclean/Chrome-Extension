document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get({"search": "google", "searchplace": "bottom"}, searchCallback);
});

var searchCallback = function(list) {
	var form;
	var searchbox;
	console.log(list);

	var searchplace = list["searchplace"];
	var formstring = "<form id=\"search-form\" method=\"get\" action=\"https://google.com/search?\">\
			<input id=\"search-box\" name=\"q\" type=\"text\" placeholder=\"search\" autofocus/>\
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

