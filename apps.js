document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(getAllCallback);
  });
  
  var getAllCallback = function(list) {
	chrome.storage.sync.get({
	"showApps": true
	}, function(items) {
		if (items["showApps"] == true) {
			var apps = document.getElementById("apps");

			function isEnabledApp(x) {
				 return x.isApp;
			}
			list = list.filter(isEnabledApp);
			for(var i=0;i<list.length;i++) {
			  // we don't want to do anything with extensions
			  var extInf = list[i];
			  if(extInf.isApp && extInf.enabled) {
				var app = document.createElement("div");

				var img = new Image();
				img.className = "image";
				img.src = find128Image(extInf.icons);
				img.addEventListener("click", (function(ext) {
				  return function() {
				    chrome.management.launchApp(ext.id);
					window.close();
				  };
				})(extInf));

				var name = document.createElement("div");
				name.className = "name";
				name.textContent = extInf.name;

				app.className = "app";
			app.setAttribute("data-id", i+1);
				app.appendChild(img);
				app.appendChild(name);
				apps.appendChild(app);
			  }
			}
		}
	});
  };

  var find128Image = function(icons) {
    for(var icon in icons) {
      if(icons[icon].size == "128") {
        return icons[icon].url;
      }
    }

    return "/noicon.png";
};
