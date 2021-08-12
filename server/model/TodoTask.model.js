module.exports = mongoose => {
    const todoTaskSchema = mongoose.Schema(
        {
            title: String,
            published: Boolean,
            description: String,
            required: Boolean
        },
        { timestamps: true }
    );

    todoTaskSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const TodoTask = mongoose.model("todoTask", todoTaskSchema);
    return TodoTask;
};