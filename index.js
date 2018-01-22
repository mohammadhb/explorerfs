var path = require('path');
var fs = require('fs');

var explorerfs = {};

let current_location = __dirname;

explorerfs.pwd = function(){

	return current_location;

}

explorerfs.up = function(){

	current_location = path.resolve(current_location,'../');
	return explorerfs;

}

explorerfs.goto = function(folder_name){

//On Missing Parameter
	if(folder_name==undefined)
		folder_name = './';

	current_location = path.resolve(current_location,folder_name);
	return explorerfs;

}

explorerfs.isFolder = function(folder_name){

//On Missing Parameter
	if(folder_name==undefined)
		folder_name = './';

	fs.lstatSync(folder_name);
	return fs.lstatSync(folder_name).isDirectory();

}

explorerfs.search = function(paths,key_word){

	

}


module.exports = explorerfs;
