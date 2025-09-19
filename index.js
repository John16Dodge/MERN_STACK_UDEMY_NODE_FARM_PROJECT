const http = require('http');  
const url = require('url');  
const fs = require('fs');

//SERVER

const data= fs.readFileSync(`${__dirname}/complete-node-bootcamp/1-node-farm/final/dev-data/data.json`, "utf-8",);
const dataObj = JSON.parse(data);        

/*SERVER CODES*/ 
//1.CREATE THE SERVER
//2.RUN THE SERVER


const server= http.createServer((req, res)=>{
    console.log(req.url);
    const pathName=  req.url;

//ROUTING 

    if(pathName === '/' || pathName === '/overview' ){
        res.end('<h1>THIS IS THE OVERVIEW PAGE !!</h1>');
        return
    }


    else if(pathName === '/product'){
        res.end('<h1>THIS IS THE HOME PAGE !!!</h1>');
        return
    }


    else if(pathName=== '/api'){
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
        return
    }

    else{
        res.writeHead(404, {
            'Content-type':'text/html'
        });
        res.end('<h1>Page not Found</h1>');
        return
    }

    //console.log(req); //just for knowledge 
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Server is listening at 8000");
});

//API 




