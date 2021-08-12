const express = require("express");
const cors = require("cors");
// const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();
const db = require("./model");

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, '../client/build')));

db.mongoose
    .connect(db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.get("/api", (req, res) => {
    res.json({ message: ` on ` });
});

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

require("./routes/TodoTask.routes")(app);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
