const http = require('http');  
const url = require('url');  
const fs = require('fs');

/*
const tempOverview= fs.readFileSync(`${__dirname}/complete-node-bootcamp/1-node-farm/starter/templates/template/template-overview.html`, "utf-8",);
const tempProduct= fs.readFileSync(`${__dirname}/complete-node-bootcamp/1-node-farm/starter/templates/template-product.html`, "utf-8",);
const tempCard= fs.readFileSync(`${__dirname}/complete-node-bootcamp/1-node-farm/starter/templates/template-card.html`, "utf-8",);
*/

const replaceTemplate= (temp, product)=>{
    let output= temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output= output.replace(/{%IMAGE%}/g, product.image);
    output= output.replace(/{%PRICE%}/g, product.price);
    output= output.replace(/{%FROM%}/g, product.from);
    output= output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output= output.replace(/{%QUANTITY%}/g, product.quantity);
    output= output.replace(/{%DESCRIPTION%}/g, product.description);
    output= output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output= output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}


const tempOverview = fs.readFileSync(
  `${__dirname}/complete-node-bootcamp/1-node-farm/starter/templates/template-overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/complete-node-bootcamp/1-node-farm/starter/templates/template-product.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/complete-node-bootcamp/1-node-farm/starter/templates/template-card.html`,
  "utf-8"
);


const data= fs.readFileSync(`${__dirname}/complete-node-bootcamp/1-node-farm/final/dev-data/data.json`, "utf-8",);
const dataObj = JSON.parse(data);        

/*SERVER CODES*/ 
//1.CREATE THE SERVER
//2.RUN THE SERVER

//SERVER
const server= http.createServer((req, res)=>{
    console.log(req.url);
    const pathName=  req.url;

//ROUTING 

    //OVERVIEW PAGE
    if(pathName === '/' || pathName === '/overview' ){
        res.writeHead(200, {'Content-type':'text/html'});
        const cardsHtml= dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        //console.log(cardsHtml);
        const output= tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
        return
    }


    //PRODUCT PAGE
    else if(pathName === '/product'){
        res.writeHead(200, {'Content-type':'text/html'});
        const productHtml= dataObj.map(el => replaceTemplate(tempProduct, el)).join('');
        //console.log(cardsHtml);
        const output= tempProduct.replace('{%PRODUCT_CARDS%}',productHtml);
        res.end(output);
        return
    }

    //API PAGE
    else if(pathName=== '/api'){
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
        return 
    }

    //NOT FOUND PAGE
    else{
        res.writeHead(404, {
            'Content-type':'text/html', 
            'my-own-header':'Hello-world'
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




