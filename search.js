document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get({"search": "google"}, searchCallback);
});

var searchCallback = function(list) {
	if (list["search"] == "duckduckgo") {
		document.getElementById("search-form").setAttribute("action", "https://duckduckgo.com/?");
	} else if (list["search"] == "yahoo") {
		document.getElementById("search-form").setAttribute("action", "https://search.yahoo.com/search?");
	} else if (list["search"] == "bing") {
		document.getElementById("search-form").setAttribute("action", "https://www.bing.com/search?");
	}
}
