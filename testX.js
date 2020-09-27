

async function x(){
    
    b = 2;
    while(b--){

        console.log(`B = ${b}`)
        x = setTimeout(h=>console.log(`B = ${b}`),1000);

    }

    // return new Promise()

}



// console.log(x());