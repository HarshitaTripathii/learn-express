import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

const user = [
  {
    name: "John Doe",
    age: 30,
  },
  {
    name: "Jane Smith",
    age: 25,
  },
];

app.get("/users", (req, res) => {
  res.json({
    success: true,
    data: user,
  });
});

app.listen(8000, () => {
  console.log("Server is runnnig at http://localhost:8000");
});
