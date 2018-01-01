var path = require('path');
var fs = require('fs');

var explorerfs = {};

let current_location = __dirname;

explorerfs.pwd = function(){

	return current_location;

}

explorerfs.up = function(){

	current_location = path.resolve(current_location,'../');
	return explorerjs;

}

explorerfs.goto = function(folder_name){

	current_location = path.resolve(current_location,folder_name);
	return explorerjs;

}

explorerfs.isFolder = function(folder_name){

	fs.lstatSync(folder_name);
	return fs.lstatSync(folder_name).isDirectory();

}

explorerfs.search = function(paths,key_word){

	//open paths
	for(path in paths){

		//look for folder
		return new Promise((resolve,reject)=>{
			
			return resolve(explorerfs(paths,key_word));

		});

	}

}


module.exports = explorerfs;
