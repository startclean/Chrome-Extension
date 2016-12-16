// Saves options to chrome.storage.sync.
function save_options() {
	var l1name = document.getElementById('l1').value;
	var l2name = document.getElementById('l2').value;
    var l3name = document.getElementById('l3').value;
    
	var bgvalue = document.getElementById('bg').value;
    console.log(bgvalue);
	var showApps = document.getElementById('apps').checked;
	var showTop = document.getElementById('top').checked;

	chrome.storage.sync.set({
	"l1name": l1name,
	"l2name": l2name,
    "l3name": l3name,
	"bgvalue": bgvalue,
	"showApps": showApps,
	"showTop": showTop
	}, function() {
	// Update status to let user know options were saved.
	var status = document.getElementById('status');
	status.textContent = 'Options saved.';
	setTimeout(function() {
	  status.textContent = '';
	}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    "l1name": "productivity",
	"l2name": "subreddits",
    "l3name": "distros",
	"bgvalue": "#222222",
	"showApps": true,
	"showTop": true
  }, function(items) {
	document.getElementById('l1').value = items["l1name"];
	document.getElementById('l2').value = items["l2name"];
    document.getElementById('l3').value = items["l3name"];
      
	document.getElementById('bg').value = items["bgvalue"];
	document.getElementById('apps').checked = items["showApps"];
    document.getElementById('top').checked = items["showTop"];
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
