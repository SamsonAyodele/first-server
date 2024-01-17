const express = require("express")
const server = express()

server.get("/", function(req, res){
  res.send("<h1>Hello World</h1> <br/> <a href='/ayo'>Visit Ayo</a>")
})

server.get("/ayo", function(req, res){
  res.send("<h1>Hello Ayo</h1> <br/> <a href='/'>Go back home</a>")
})

server.listen(3000, function(){
  console.log("server is listening on port 3000")
})
