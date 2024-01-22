const express = require("express")
const server = express()

server.use(express.json())

let userTable = []

server.get("/", (req, res) => {
  res.send ({
    message:"Hello, welcome to first server world",
  })
  
});

server.get("/ayo", (req, res) =>{
  res.send("<h1>Hello Ayo</h1> <br/> <a href='/'>Go back home</a>")
})

server.post('/register', (req, res) => {
  console.log(req.body)
  userTable.push({ id: userTable.length + 1, ...req.body})
  return res.status(201).json({
    message: 'Account successfully register',
  })
})

server.get("/user", (req, res) => {
  return res.status(200).json({
    users: userTable,
  })
})

server.listen(3000, () => {
  console.log("server is listening on port 3000")
})
