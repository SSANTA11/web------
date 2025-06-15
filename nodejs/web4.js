// Exercise 21-7
let express=require("express");
let app=express();
let bodyParser=require("body-parser");
app.use(express.static("public"));
let menu=[{
    name:'김밥',
    price:'2000'
},{
    name:'우동',
    price:'4000'
},{
    name:'제육덮밥',
    price:'6000'
}]

app.all('/menu.json', function(request,response){
    response.type('application/json');
    response.send(menu);
});
app.listen(50501, function(){
    console.log("Server Running at http://127.0.0.1:50501/menu.json");
});