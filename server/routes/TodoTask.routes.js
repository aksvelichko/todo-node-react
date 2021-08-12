const todoTasks = require("../controllers/TodoTask.controllers.js");

module.exports = app => {

    let router = require("express").Router();

    // Create a new TodoTask
    router.post("/", todoTasks.create);

    // Retrieve all todoTasks
    router.get("/", todoTasks.findAll);

    // Retrieve all published TodoTasks
    router.get("/published", todoTasks.findAllPublished);

    // Retrieve a single TodoTask with id
    router.get("/:id", todoTasks.findOne);

    // Update a TodoTask with id
    router.put("/:id", todoTasks.update);

    // Delete a TodoTask with id
    router.delete("/:id", todoTasks.delete);

    // Create a new TodoTask
    router.delete("/", todoTasks.deleteAll);

    app.use("/api/todoTasks", router);
};