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

const todos = [
  {
    id: 1,
    task: "dsa",
    complete: true,
  },
  {
    id: 2,
    task: "development",
    complete: false,
  },
];

///todos -> GET-> getAllTodo
app.get("/todos", (req, res) => {
  return res.json({
    success: true,
    data: todos,
  });
});

///todos -> POST-> createNewTodo
app.post("/todos", (req, res) => {
  const body = req.body;

  //empty data check
  if (!body || !body.task || !body.complete) {
    return res.json({
      success: false,
      message: "provide complete info",
    });
  }

  //validation check
  if (typeof body.task === Number || typeof body.complete === String) {
    return res.json({
      success: false,
      message: "Enter valid data",
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task: body.task,
    complete: body.complete,
  };
  todos.push(newTodo);
  return res.json({
    success: true,
    data: todos,
  });
});

// /todos/:id -> GET-> getTodoById
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((u) => u.id === id);
  if (!todo)
    return res.json({
      success: false,
      message: "todo does not exists",
    });
  return res.json({
    success: true,
    data: todo,
  });
});

// /todos/:id -> PUT-> updateTodoById
app.put("/todos/:id", (req, res) => {
  //get the id from url
  const id = Number(req.params.id);
  //get the index using id
  const ind = todos.findIndex((u) => u.id === id);
  //get the todo on this index "ind"
  const todo = todos.find((u) => u.id === id);
  //destructuring req.body object
  const { task, complete } = req.body;
  // create updated todo
  const updatedTodo = {
    id: todo.id,
    task: task || todo.task,
    complete: complete || todo.complete,
  };
  // set this updated todo in orginal todos array using indexing
  todos[ind] = updatedTodo;
  return res.json({
    success: true,
    data: todos[ind],
  });
});

// /todos/:id/toggle -> PUT-> toggleTodoById
app.put("/todos/:id/toggle", (req, res) => {
  //get the id from url
  const id = Number(req.params.id);
  //get the todo using this id
  const todo = todos.find((t) => t.id === id);

  console.log("Before Complete : ", todo.complete);
  //update the todo with opposite of its orginal value using not
  todo.complete = !todo.complete;
  console.log("After Complete : ", todo.complete);

  return res.json({
    success: true,
    data: todos[ind],
    allTodos: todos,
  });
});

// /todos/:id -> DELETE-> deleteTodoById
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  // const todo = todos.find((t) => t.id === id);
  const ind = todos.findIndex((t) => t.id === id);
  todos.splice(ind, 1);
  return res.json({
    success: true,
    data: todos,
  });
});

app.listen(8000, () => {
  console.log("Server is runnnig at http://localhost:8000");
});
