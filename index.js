const express = require("express");
const server = express();
const { signUpSchema, loginSchema } = require("./validators/user.validators");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let userData = [];

server.get("/", (req, res) => {
  res.send({
    message: "Hello, welcome to first server world",
  });
});

server.post("/signUp", (req, res) => {
  // Validate user input
  const userCheck = signUpSchema.validate(req.body);
  if (userCheck.error) {
    return res.status(400).json({
      message: userCheck.error.message,
    });
  }

  // Check if user already exists
  const userExist = userData.find(
    (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
  );
  if (userExist) {
    return res.status(400).json({
      message: `User ${req.body.name} already exists`,
    });
  }

  // Create a new user
  const newUser = { id: userData.length, ...req.body };
  userData.push(newUser);

  // Respond with success
  return res.status(201).json({
    message: "User created successfully",
    userData: newUser,
  });
});

server.post("/login", (req, res) => {
  // Validate user input
  const loginCheck = loginSchema.validate(req.body);
  if (loginCheck.error) {
    return res.status(400).json({
      message: loginCheck.error.message,
    });
  }

  // Check if user exists
  const user = userData.find(
    (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
  );
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Check if the password is correct
  if (user.password !== req.body.password) {
    return res.status(401).json({
      message: "Password does not match",
    });
  }

  // Respond with success
  return res.status(200).json({
    message: "Login successful",
    userData: user,
  });
});

server.delete("/delete-account/:userId", (req, res) => {
  let userId = req.params.userId;
  const user = userData.findIndex((u) => u.id === userId);

  // find the user
  if (user !== -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // delete user
  userData.splice(user, 1);

  return res.status(200).json({
    message: "User deleted successfully",
  });
});

server.put("/update-user/:userId", (req, res) => {
  const userId = req.params.userId;

  const updateUser = req.body;

  const user = userData.findIndex((u) => u.id === userId);
  if (user !== -1) {
    userData[user] = { ...userData[user], ...updateUser };
    return res.status(200).json({
      message: "User updated successfully",
      updateUser: userData[user],
    });
  } else {
    return res.status(400).json({
      message: "User not found",
    });
  }
});

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
