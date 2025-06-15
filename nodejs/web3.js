// Exercise 21-4
let express=require("express");
let app=express();
app.all("/login",function(request,response){
    response.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <form name="로그인" action="/register" method="get" >
            아이디<input name="id" type="text" value=""><br>
            패스워드<input name="password" type="password" value=""><br>
            <input name="submit" type="submit" value="제출">
            </form>
        </body>
        </html>
        `);
});
app.all("/register", function(request,response){response.send(`<h1>등록되었습니다.</h1>`)});
app.listen(50503, function(){
    console.log("Server Running at http://127.0.0.1:50503/login");
});