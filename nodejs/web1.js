// Exercise 21-2 
let express=require("express");
let app=express();

app.use(function(request,response){
    response.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <h1>안녕하세요.<br> 노현수의 홈페이지1에 오신 것을 환영합니다.</h1>
        </body>
        </html>`);
    });
app.listen(52273, function(){
    console.log("Server Running at http://127.0.0.1:52273");
});

