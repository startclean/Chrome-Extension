(function(opts_) {
    window.__gcse = window.__gcse || {};
    window.__gcse.ct = (new Date).getTime();
    window.__gcse.scb = function() {
        var a = window.__gcse;
        a.plainStyle && delete opts_.rawCss;
        google.search.cse.element.init(opts_) && ("explicit" != a.parsetags ? "complete" == document.readyState || "interactive" == document.readyState ? (google.search.cse.element.go(), a.callback && a.callback()) : google.setOnLoadCallback(function() {
            google.search.cse.element.go();
            a.callback && a.callback()
        }, !0) : a.callback && a.callback())
    };
    var b = document.createElement("script"),
        c = opts_.protocol + "://" + opts_.uds + "/jsapi?autoload=",
        d = encodeURIComponent,
        e = '{"name":"search","version":"1.0","callback":"__gcse.scb"',
        f = window.__gcse;
    if (!f || !f.plainStyle) var g = opts_.protocol + (opts_.uiOptions && opts_.uiOptions.enableMobileLayout ? "://www.google.com/cse/style/look/mobile/" : "://www.google.com/cse/style/look/") + opts_.theme.toLowerCase().replace("v2_", "v2/") + ".css",
        e = e + (',"style":"' + g + '"');
    opts_.language && (e += ',"language":"' + opts_.language + '"');
    e += "}";
    //b.src = c + d('{"modules":[' + e + "]}") + "";
    //b.type = "text/javascript";
    //document.getElementsByTagName("head")[0].appendChild(b);
})({
    "cx": "007893109997094852463:-p_khyo1kgw",
    "language": "en",
    "theme": "MINIMALIST",
    "uiOptions": {
        "resultsUrl": "",
        "enableAutoComplete": true,
        "autoCompleteMatchType": "any",
        "enableImageSearch": false,
        "imageSearchLayout": "classic",
        "resultSetSize": "small",
        "enableOrderBy": true,
        "orderByOptions": [{
            "label": "Relevance",
            "key": ""
        }, {
            "label": "Date",
            "key": "date"
        }],
        "overlayResults": false,
        "enableMobileLayout": false,
        "numTopRefinements": -1,
        "isSitesearch": false,
        "enableSpeech": false
    },
    "protocol": "https",
    "uds": "www.google.com",
    "rawCss": "\n"
});

window.onload = function () { 
document.getElementById("gsc-i-id1").onkeyup=function(){
  if (document.getElementById("gsc-i-id1").value == "") {
    document.getElementsByClassName("gsc-wrapper")[0].style.height = "0";
  } else {
    document.getElementsByClassName("gsc-wrapper")[0].style.height = "auto";
  }
};
document.getElementById("gsc-i-id1").focus();
}
