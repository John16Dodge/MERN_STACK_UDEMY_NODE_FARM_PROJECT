const http = require('http');  
const url = require('url');  

/*SERVER CODES*/
//1.CREATE THE SERVER
//2.RUN THE SERVER


const server= http.createServer((req, res)=>{
    console.log(req.url);

    const pathName=  req.url;

    if(pathName === '/' || pathName === '/overview' ){
        res.end('<h1>THIS IS THE OVERVIEW PAGE !!</h1>');
        return
    }
    else if(pathName === '/product'){
        res.end('<h1>THIS IS THE HOME PAGE !!!</h1>');
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
    res.end('Hello From Server');
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Server is listening at 8000");
});


//ROUTING 

