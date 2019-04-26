const express = require('express');
const morgan = require('morgan');

const app = express();

// add your code here
const mockData = [
  {
    todoItemId: 0,
    name: "an item",
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: "another item",
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: "a done item",
    priority: 1,
    completed: true
  }
];

app.get("/", (req, res) => {
  res.status(200).send({ status: "OK" });
});

app.get("/api/TodoItems", (req, res) => {
  res.status(200).send(mockData);
});

app.get("/api/TodoItems/:number", (req, res) => {
  let id = req.params.number;
  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i]["todoItemId"] == id) {
      res.status(200).send(mockData[i]);
    }
  }
});

app.post("/api/TodoItems/", (req, res) => {
  let newData = {
    todoItemId: 0,
    name: "rush",
    priority: 3,
    completed: false
  };

  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i]["todoItemId"] == newData["todoItemId"]) {
      mockData[i] = newData;
      return res.status(201).send(newData);
    }
  }
  mockData.push(newData);
  return res.status(201).send(newData);
});

app.delete("/api/TodoItems/:number", (req, res) => {
  let id = req.params.number;
  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i]["todoItemId"] == id) {
      let deleteditem = mockData[i];
      mockData.splice(i, 1);
      res.send(deleteditem);
    }
  }
});

module.exports = app;
