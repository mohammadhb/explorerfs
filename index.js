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

explorerfs.search = function(path,key_word,level){

	console.log(`exploring : ${path}`);

	return new Promise((reject,resolve)=>{

		if(fs.lstatSync(path).isDirectory()) {

			fs.readdir(path,'utf8',(error,files)=>{

				for (file of files)
					return explorerfs.search(file,key_word,level--);

			});

		}

	});

}

explorerfs.expressfs = function(router,start_path){



}

explorerfs.restifyfs = function(router,start_path){



}

explorerfs.hapifs = function(router,start_path){



}

explorerfs.httpfs = function(router,start_path){



}

module.exports = explorerfs;
