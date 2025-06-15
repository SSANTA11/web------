// Exercise 21-3
let express=require("express");
let app=express();
app.use(express.static("public"));
app.use(function(request,response){
    response.send("<h1>없는 파일입니다.</h1>");
});
app.listen(57113, function(){
    console.log("Server Running at http://127.0.0.1:57113");
});
