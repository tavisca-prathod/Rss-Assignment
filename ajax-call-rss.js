window.onload = function () {
	var urlInput = document.getElementById('urlInput');
	urlInput.addEventListener('keypress',fetchRssInfo);
}

var fetchRssInfo = function(e, txtObj, selObj) {
	var event = e || window.event;
  	var keyPressed = event.which || event.keyCode;
	if(keyPressed == 13) {
		var ajaxRequest;
		try {
			ajaxRequest = new XMLHttpRequest();
		}
		catch(e) {
			try {
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e) {
				try {

				}
				catch(e) {
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
					alert("Your browser broke!");
		     		return false;
				}
			}
		}

		ajaxRequest.onreadystatechange = function(){
		   if(ajaxRequest.readyState == 4 && ajaxRequest.status==200){
		      var resp = ajaxRequest.responseText;
		      parseJsonRespAndCreateElements(resp);
		   }
		 }

		var urlInput = document.getElementById('urlInput');
		var feedApiUrl = 'http://googlefeed.appacitive.com/?q=' + urlInput.value;

		 ajaxRequest.open("GET",feedApiUrl, true);
		 ajaxRequest.send(null); 
	}
}

var parseJsonRespAndCreateElements = function(resp) {
	var feedResponse = JSON.parse(resp);
	var containerDiv = document.getElementById('rss-feed-data-container-div');

	//Creating the feed-title div
	var feedTitleDiv = document.createElement('div');
	feedTitleDiv.className = 'row';
	feedTitleDiv.className += ' feed-title-div';
	var feedTitleTextDiv = document.createElement('div');
	feedTitleTextDiv.className = 'col';

	//Creating the field title
	var feedTitle = document.createElement('h2');
	feedTitle.innerHTML = feedResponse.responseData.feed.title;
	feedTitle.className += ' feed-title';

	//Append Feed-Title and Feed-Text to Feed Div
	feedTitleTextDiv.appendChild(feedTitle);
	feedTitleDiv.appendChild(feedTitleTextDiv);	
	
	//Creating the field description
	var feedTitleDescriptionDiv = document.createElement('div');
	feedTitleDescriptionDiv.className = 'col';
	feedTitleDescriptionDiv.innerHTML = feedResponse.responseData.feed.description;
	feedTitleDescriptionDiv.className += ' feed-title-description-div';

	//Append Feed Description to Feed Div and append Feed Div to Container Div
	feedTitleDiv.appendChild(feedTitleDescriptionDiv);
	containerDiv.appendChild(feedTitleDiv);

	//Creating the feed entry
	createFeedEntry(feedResponse,containerDiv);
}

var createFeedEntry = function(feedResponse,containerDiv) {
	for(var feedEntryCount=0; feedEntryCount < feedResponse.responseData.feed.entries.length;feedEntryCount++) {
		//ALternate color for entry feeds
		var color = feedEntryCount%2===0 ? color = '#E1E0D4' : color = '#D1D0D4';
		var entryDiv = document.createElement('div');
		entryDiv.className = 'row';
		entryDiv.className += ' entry-div';
		entryDiv.style.backgroundColor = color;

		//Div to display time stamp
		var titleAndTimeStampDiv = document.createElement('div');
		titleAndTimeStampDiv.className = 'col col-md-12 col-xs-12 col-lg-12 col-sm-12';
		titleAndTimeStampDiv.className += ' title-and-time-stamp-div';

		//Div to display Feed Entry Title
		var entryTitleDiv = document.createElement('div');
		var timeStampDiv = document.createElement('div');
		timeStampDiv.innerHTML = feedResponse.responseData.feed.entries[feedEntryCount].publishedDate;
		entryTitleDiv.className = 'pull-left';
		timeStampDiv.className = 'pull-right';
		timeStampDiv.className += ' timeStamp-div';
		var entryTitleLink = document.createElement('a');
		entryTitleLink.innerHTML = feedResponse.responseData.feed.entries[feedEntryCount].title;
		entryTitleLink.href = feedResponse.responseData.feed.entries[feedEntryCount].link;
		entryTitleLink.className += ' entry-title-link';
		
		//Div for Feed Entry Content
		var entryContent = document.createElement('div');
		entryContent.className = 'col col-md-12 col-xs-12 col-lg-12 col-sm-12';
		var contentText = feedResponse.responseData.feed.entries[feedEntryCount].content;
		contentText = contentText.substring(0,contentText.indexOf('<'));
		entryContent.innerHTML = contentText;
		entryContent.className += ' entry-content';

		//Create the break line Element
		var breakLinwOne = document.createElement('br');
		var breakLinwTwo = document.createElement('br');
		var breakLinwThree = document.createElement('br');
		var breakLinwFour = document.createElement('br');

		//Append break line element to Entry Content
		entryContent.appendChild(breakLinwOne);
		entryContent.appendChild(breakLinwTwo);
		entryContent.appendChild(breakLinwThree);
		entryContent.appendChild(breakLinwFour);

		//Appending the feed entry content, title and timestamp to parent div
		entryTitleDiv.appendChild(entryTitleLink);
		titleAndTimeStampDiv.appendChild(entryTitleDiv);
		titleAndTimeStampDiv.appendChild(timeStampDiv);
		entryDiv.appendChild(titleAndTimeStampDiv);
		entryDiv.appendChild(entryContent);

		containerDiv.appendChild(entryDiv);
	}
}