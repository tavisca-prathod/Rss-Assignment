google.load("feeds", "1");
window.onload = function() {
	var urlInput = document.getElementById('urlInput');
	urlInput.addEventListener('keypress',fetchRssInfo);
}

var fetchRssInfo = function(event) {
	if(event.keyCode == 13) {
		var urlInput = document.getElementById('urlInput');
      	//var feed = new google.feeds.Feed(urlInput.value);
      	//feed.load(rssHandler);
      	google.feeds.findFeeds(urlInput.value,rssHandler);
	}
}

var rssHandler = function(result) {
	var container1 = document.getElementById('feed');
	if (!result.error) {	  
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(entry.title));
        container1.appendChild(div);
      }
    }
}