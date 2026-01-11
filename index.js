import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
  },
  { id: 2, name: "Jane Smith", age: 25 },
];

app.get("/users", (req, res) => {
  res.json({
    success: true,
    data: users,
  });
});

app.post("/users", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body || !body.name || !body.age) {
    return res.json({
      success: false,
      message: "Give all data",
    });
  }

  if (typeof body.name === "number" || typeof body.age === "string") {
    return res.json({
      success: false,
      message: "Validation error",
    });
  }
  const user = {
    id: users.length + 1,
    name: body.name,
    age: body.age,
  };
  users.push(user);
  return res.json({
    success: true,
    data: user,
  });
});

app.get("/users/abc", (req, res) => {
  return res.json({
    success: true,
    message: "abc",
  });
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const user = users.find((u) => u.id === id);

  if (!user)
    return res.json({
      success: false,
      message: "User not found",
    });

  console.log("user is ", user);
  return res.json({
    success: true,
    data: user,
  });
});

app.put("/users/:id", (req, res) => {
  // get the id to be updated
  const id = Number(req.params.id);
  //get the user by id
  const user = users.find((u) => u.id === id);
  const idx = users.findIndex((u) => u.id === id);
  // get the data from body
  const { name, age } = req.body;
  // make the new user object
  const updatedUser = {
    id: user.id,
    name: name || user.name,
    age: age || user.age,
  };
  // replace that object in original aaray
  users[idx] = updatedUser;
  return res.json({
    success: true,
    data: users,
  });
});

app.delete("/users/:id", (req, res) => {
  //get the id
  const id = Number(req.params.id);
  // get the index accordingly
  const idx = users.findIndex((u) => u.id === id);
  // set that idex value as null
  users.splice(idx, 1);
  return res.json({
    success: true,
    data: users,
  });
});

app.listen(8000, () => {
  console.log("Server is runnnig at http://localhost:8000");
});
