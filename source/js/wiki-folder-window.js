/*
Class for wiki folder windows
*/

(function(){

/*jslint browser: true */
"use strict";

var windowBase = require("../js/window-base.js");

// Constructor
function WikiFolderWindow(options) {
	options = options || {};
	// Save the options
	this.windowList = options.windowList;
	this.info = options.info || {};
	this.pathname = options.info.pathname;
	// Save the wiki list tiddler
	this.saveWikiListTiddler();
	// Open the window
	this.window_nwjs = $tw.desktop.gui.Window.open("app://foobar/html/wiki-folder-window.html?pathname=" + encodeURIComponent(this.pathname),{
		toolbar: false,
		show: true,
		"new-instance": true,
		nodejs: true,
		icon: "images/app_icon.png"
	});
	this.window_nwjs.once("loaded",this.onloaded.bind(this));
	this.window_nwjs.on("close",this.onclose.bind(this));
}

// Static method for getting the identifier for the specified info
WikiFolderWindow.getIdentifierFromInfo = function(info) {
	return "wikifolder://" + info.pathname;
};

// Static method for getting the path for the specified info
WikiFolderWindow.getPathnameFromInfo = function(info) {
	return info.pathname;
};

windowBase.addBaseMethods(WikiFolderWindow.prototype);

// Returns true if the provided parameters are the same as the ones used to create this window
WikiFolderWindow.prototype.matchInfo = function(info) {
	return info.pathname === this.pathname;
};

// The identifier for wiki file windows is the prefix `wikifolder://` plus the pathname of the file
WikiFolderWindow.prototype.getIdentifier = function() {
	return "wikifolder://" + this.pathname;
};

// Load handler for window
WikiFolderWindow.prototype.onloaded = function(event) {
	console.log("WikiFolderWindow.prototype.onloaded");
};

// Get the wiki title
WikiFolderWindow.prototype.getWikiTitle = function() {
	return "";
};

// Extract the wiki favicon text
WikiFolderWindow.prototype.getWikiFavIconText = function() {
	return "";
};

// Extract the wiki favicon type
WikiFolderWindow.prototype.getWikiFavIconType = function() {
	return "";
};

// Close handler for window
WikiFolderWindow.prototype.onclose = function(event) {
console.log("WikiFolderWindow.prototype.onclose")
	// Close the window, remove it from the window list and exit if there are no windows open
	this.windowList.handleClose(this);
};

// Save a tiddler to the backstage wiki describing this wiki file
WikiFolderWindow.prototype.saveWikiListTiddler = function() {
	var fields = {
		title: this.getIdentifier(),
		tags: ["wikilist","wikifolder"],
		text: ""
	}
	$tw.wiki.addTiddler(new $tw.Tiddler($tw.wiki.getCreationFields(),fields,$tw.wiki.getModificationFields()))
};

exports.WikiFolderWindow = WikiFolderWindow;

})();