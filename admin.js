var mainlist;

//chrome.tabs.create({ url: chrome.extension.getURL("newtab.html") });
//window.close();

document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get(
{"lists": [[["drive","http://drive.google.com/"],["gmail","http://mail.google.com/"],["github","https://github.com/"],["todoist","http://todoist.com/"],["syncthing","https://localhost:8384/"]], 					[["news","http://reddit.com/r/news"], ["unixporn","http://reddit.com/r/unixporn"],["funny","http://reddit.com/r/funny"], ["linux","http://reddit.com/r/linux"], ["all","http://reddit.com/r/all"]]],
"l1name": "productivity",
"l2name": "subreddits"},
	userListsCallback);
});

function listToArray(list) {
	var l = [];
	var elem = list.getElementsByTagName("li");
	for (var i = 0; i < elem.length; ++i) {
	  l[i] = [elem[i].getElementsByTagName("a")[0].innerText, elem[i].getElementsByTagName("a")[0].getAttribute("href")];
	}
	return l;
}

var userListsCallback = function(lists) {
	mainlist = [lists["l1name"],lists["l2name"]]
	for(var i=0;i<lists["lists"].length;i++) {
		var div = document.createElement("div");
		div.setAttribute("class", "favorites-list users-list");
		document.getElementById("links").appendChild(div);

		var ul = document.createElement("ul");
		ul.setAttribute("id", mainlist[i]);
		div.appendChild(ul);
		
		var title = document.createElement("div");
		title.setAttribute("class", "title");
		ul.appendChild(title);

		var p = document.createElement("p");
		p.innerText = mainlist[i];
		title.appendChild(p);

		title.insertAdjacentHTML("beforeend", "<span id='add-"+mainlist[i]+"'>+</span>");

		var list = lists["lists"][i];
		for(var j=0;j<lists["lists"][i].length;j++) {
			var li = document.createElement("li");
			li.setAttribute("id", mainlist[i]+"-"+j);
			var siteurl = list[j][1];
			var name = list[j][0];
			li.insertAdjacentHTML("beforeend", "<a href="+siteurl+">"+name+"</a>");
			li.insertAdjacentHTML("beforeend", "<span id='delete-"+j+"-"+mainlist[i]+"'>-</span>");
			ul.appendChild(li);
		}
		
		var sortable = Sortable.create(ul, {
			group: "userlists",
			onUpdate: function (evt) {
				save();
			}
		});
	}
	
	menu();
	
};

function listen(li) {
	li.addEventListener('click', function(event){
		var r = event.target.id.split("-");
		if (r[0] == "delete") {
			var el = document.getElementById(r[2]+"-"+r[1]);
			el.outerHTML = "";
			delete el;
			save();
		} else {
			var ul = document.getElementById(r[1]);
			ul.insertAdjacentHTML("beforeend", "<div class='inp' id='div-"+listToArray(ul).length.toString()+"'><input style='width:35%' type='text' class='name' value='' placeholder='name'><input style='width:47%' type='text' class='url' value='' placeholder='url' id='form-"+listToArray(ul).length.toString()+"'><span id='input-"+listToArray(ul).length.toString()+"'>s</span></div>");
			var inp = document.getElementById("div-"+listToArray(ul).length.toString());
			var span = document.getElementById("input-"+listToArray(ul).length.toString());
			var form = document.getElementById("form-"+listToArray(ul).length.toString());

			form.addEventListener('keyup', function(event){
				if (event.keyCode == 13) {
					span.click();
				}
			});

			span.addEventListener('click', function(event){
				inp.outerHTML = "";
				delete inp;

				if (inp.getElementsByClassName("name")[0].value != "" || inp.getElementsByClassName("url")[0].value != "") {
					var li = document.createElement("li");
					li.setAttribute("id",r[1]+"-"+listToArray(ul).length.toString());
					//var splitted = splitHostname(inp.getElementsByClassName("url")[0].value); fix later
					var siteurl = addhttp(inp.getElementsByClassName("url")[0].value);
					var name = inp.getElementsByClassName("name")[0].value;

					li.insertAdjacentHTML("beforeend", "<a href="+siteurl+">"+name+"</a>");
					li.insertAdjacentHTML("beforeend", "<span id='delete-"+listToArray(ul).length.toString()+"-"+r[1]+"'>-</span>");
					document.getElementById(r[1]).appendChild(li);
					save();
					listen(li);
				}
			});
		}
	}, false);
}

function menu() {
	var allUserLi = document.querySelectorAll('.users-list > ul > li > span, .users-list > ul > .title > span');

	allUserLi.forEach(function(li, p_index){
    	listen(li);
    });
}

function save(l) {
	var set = l || JSON.parse(JSON.stringify(mainlist));
	d = []
	d = set;
	for (var i = 0; i < set.length; ++i) {
		e = document.getElementById(set[i]);
		d[i] = listToArray(e);
	}
	chrome.storage.sync.set( {"lists": d} );
}


