const db = require("../model");

const TodoTask = db.todoTasks;

// Create and Save a new TodoTask
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a TodoTask
    const todoTask = new TodoTask({
        title: req.body.title,
        isComplete: req.body.isComplete,
        color: req.body.color,
        published: req.body.published ? req.body.published : false
    });

    // Save TodoTask in the database
    todoTask
        .save(todoTask)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TodoTask."
            });
        });
};

// Retrieve all TodoTasks from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    TodoTask.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todoTasks."
            });
        });
};

// Find a single TodoTask with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TodoTask.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found TodoTask with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving TodoTask with id=" + id });
        });
};

// Update a TodoTask by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    TodoTask.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update TodoTask with id=${id}. Maybe TodoTask was not found!`
                });
            } else res.send({ message: "TodoTask was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating TodoTask with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    TodoTask.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete TodoTask with id=${id}. Maybe TodoTask was not found!`
                });
            } else {
                res.send({
                    message: "TodoTask was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete TodoTask with id=" + id
            });
        });
};

// Delete all TodoTasks from the database.
exports.deleteAll = (req, res) => {
    TodoTask.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} TodoTasks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all todoTasks."
            });
        });
};

// Find all published TodoTasks
exports.findAllPublished = (req, res) => {
    TodoTask.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todoTasks."
            });
        });
};