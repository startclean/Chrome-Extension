document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get({"l3name": "#222222"}, bgCallback);
});
var bgCallback = function(list) {
var color = list["l3name"]
document.body.style.background = color;
};
