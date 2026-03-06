const http=require('http')
const fs=require('fs')

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);
    // res.setHeader('Content-Type','text/plain');
    res.setHeader('Content-Type','text/html');
    // res.setHeader('Content-Type','application/json');

    // res.write('<h1>Hello World</h1>');
    // res.write('<h1>Hello ANT</h1>');
    // res.write('<h1d>Hello RUPP</h1d>');

    let url=req.url;
    let path='';

    switch (url) {
        case '/': path='./index.html';

            break;
        case '/contact': path = './contact.html';
            break;
    
        default:
            path='./404.html';
            break;
    }

    fs.readFile(path,(err,data)=>{
        if(err)console.log(err);

        res.end(data);
        
    })
})

server.listen(3000,()=>{
    console.log('server is running on port 3000');
})


