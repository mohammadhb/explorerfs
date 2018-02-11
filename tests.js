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


function dfs(paths,key_word,level){

	return new Promise((resolve,reject)=>{

    //object
		if(paths.length == undefined) {

      console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@exploring : ${paths.name}`);
      console.log(paths);

      if (paths.subdirs.length < 1 ) {

        console.log(`*********************************************exploring dirs (last) : ${paths.name}`);
        console.log(paths);
        return resolve();

      }

      return dfs(paths.subdirs,key_word,level).then((result)=>{

        console.log(`----------------------------------------------------Result : ${result}`);
        resolve();

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

function bfs(paths,key_word,level){

	return new Promise((resolve,reject)=>{

    //object
		if(paths.length == undefined) {

      console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@exploring : ${paths.name}`);
      console.log(paths);

      if (paths.subdirs.length < 1 ) {

        console.log(`*********************************************exploring dirs (last) : ${paths.name}`);
        console.log(paths);
        return resolve([paths.name]);

      }

      const resoved_name = paths.name;

      return bfs(paths.subdirs,key_word,level).then((result)=>{

        console.log(`----------------------------------------------------Result : ${result}`);
        resolve(result.concat(resoved_name));

      });

    } else {

      if(paths.length<1)
        resolve([]);

      console.log(`----------------------------------------------------exploring dirs : ${paths[0].name}`);
      const resoved_name = paths[0].name;
      console.log(paths)
      const subdirs = paths[0].subdirs;
      console.log(subdirs)
      paths.splice(0,1);
      paths = paths.concat(subdirs);

      return bfs(paths,key_word,level).then((result)=>{
        console.log(`----------------------------------------------------Result : ${result}`);
        resolve(result.concat(resoved_name));

      });

    }

	});

}

bfs(case1,'var',3).then((resolve,reject)=>{

  console.log(resolve)

});
