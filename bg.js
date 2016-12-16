document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get({"bgvalue": "#222222"}, bgCallback);
});
var bgCallback = function(list) {
var color = list["bgvalue"];
console.log(color);
document.body.style.background = color;
};
