var case1 = {

	name:"root",
	level:1,
	type:"dir",
	value:"/",

	subdirs:[

		{
			name:"usr",
			level:2,
			type:"dir",
			value:"/usr",
			subdirs:[
				{
					name:"bin",
					level:3,
					type:"dir",
					value:"/usr/bin",
					subdirs:[


					]
				},
				{
					name:"local",
					level:3,
					type:"dir",
					value:"/usr/local",
					subdirs:[
						{
							name:"test.js",
							level:4,
							type:"file",
							value:"/usr/local/test.js",
							subdirs:[]
						},
						{
							name:"test2.js",
							level:4,
							type:"file",
							value:"/usr/local/test2.js",
							subdirs:[]
						},
					]
				}

			]
		},
		{
			name:"var",
			level:2,
			type:"dir",
			value:"/var",
			subdirs:[]
		},
		{
			name:".bashrc",
			level:2,
			type:"file",
			value:"/.bashrc",
			subdirs:[]
		}

	]

}

var path = require('path');
var fs = require('fs');


function dfs(paths,key_word,level){

	return new Promise((resolve,reject)=>{

		//object
		if(paths.length == undefined) {

			console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@exploring : ${paths.name}`);
			console.log(paths);

			if (paths.subdirs.length < 1 ) {

				console.log(`*********************************************exploring dirs (last) : ${paths.name}`);
				console.log(paths);
				return resolve(paths.subdirs);

			}

			return dfs(paths.subdirs,key_word,level).then((result)=>{

				console.log(`----------------------------------------------------Result : ${result}`);
				resolve(paths.subdirs);

			});

		} else {

			if(paths.length<1)
				resolve();

			console.log(`----------------------------------------------------exploring dirs : ${paths[0].name}`);
			console.log(paths)
			const subdirs = paths[0].subdirs;
			paths.splice(0,1);
			paths = subdirs.concat(paths);

			return dfs(paths,key_word,level).then((result)=>{
				console.log(`----------------------------------------------------Result : ${result}`);
				resolve();

			});

		}

	});

}

function bfs(paths,key_word,options={}){

	if(options.level && !options.start){

		options.start = paths;

	}

	return new Promise((resolve,reject)=>{

		console.log(typeof paths);
		console.log(paths.length);
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		//object
		if(typeof paths == "oject" && paths.length) {

			if(paths.length<1)
				resolve([]);

			console.log(`----------------------------------------------------exploring dirs : ${path.basename(path[0])}`);
			const subdirs = fs.readdirSync(paths[0]);
			subdirs.filter(dir=>fs.lstatSync(dir).isDirectory());
			const resoved_name = paths.basename(paths[0]);
			//
			paths.splice(0,1);
			paths = paths.concat(subdirs);

			return bfs(paths,key_word,options.level).then((result)=>{
				console.log(`----------------------------------------------------Result : ${result}`);
				resolve(result.concat(resoved_name));

			})
			.catch((error)=>{

				console.log(error);
				//resolve(result.concat(resoved_name));

			});

		} else {

			console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@exploring : ${paths.name}`);
			console.log(typeof paths);
			console.log(paths.length);

			if (paths.subdirs.length < 1 ) {

				console.log(`*********************************************exploring dirs (last) : ${paths.name}`);
				console.log(paths);
				return resolve([paths.name]);

			}

			console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@exploringghgggggg : ${paths.name}`);
			console.log(paths.subdirs);

			const resoved_name = paths.name;

			return bfs(paths.subdirs,key_word,options.level)
			.then((result)=>{

				console.log(`----------------------------------------------------Result : ${result}`);
				resolve(result.concat(resoved_name));

			})
			.catch((error)=>{

				console.log(error);
				//resolve(result.concat(resoved_name));

			});

		}

	});

}

function getUnifiedRegex(key_word){

	if( typeof key_word ==="object" && input.exec && input.text)
		return key_word;
	else if (typeof key_word ==="string")
		return new RegExp(key_word,'iy');

}

bfs(case1,'var',{level:3})
.then((data)=>{
	
	console.log(date);

})
.catch((error)=>{

	console.log(error)

})


// console.log(fs.lstatSync('/Users/mohammadhb/Desktop').isDirectory())
// console.log(fs.readdirSync('/Users/mohammadhb/Desktop'))
// console.log(path.basename('/Users/mohammadhb/Desktop'))
