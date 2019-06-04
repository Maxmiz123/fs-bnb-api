const express = require("express");

const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var users = new Array();

app.post("/read/file", (req, res) => {
    fs.readFile("./data/file.json", function(err, data) {
        if (err) {
            return res.status(500).json({message: "Unable to open the file"});
        }

        var jsonFromString = JSON.parse(data);

        jsonFromString.users.push({id: 1});

        fs.writeFile("./data/file.json", JSON.stringify(jsonFromString), function(err) {
            if (err) {
                return res.status(500).json({message: "Unable to write the file"});
            }

            return res.status(200).json(jsonFromString);
        });
    });
});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    const numberUserId = parseInt(userId);
    if(isNaN(numberUserId)) {
        return res.status(400).json({message: "I am expecting an integer"});
    }

    if (!userId) {
        return res.status(400).json({message: "Please pass in a userId"});
    }

    for (var k = 0; k < users.length; k++) {
        const aUser = users[k];
        if (aUser.id == userId) {
            return res.status(200).json(aUser);
        }
    }

    return res.status(404).json({message: "User not found"});
});

app.post("/api/users", (req, res) => {
    const user = req.body;
    const bodyFirstname = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    var errors = [];
    if (!bodyFirstname) {
        errors.push({message: "Invalid firstname"});
    }

    if (!bodyEmail) {
        errors.push({message: "Invalid firstname"});
    }

    if (errors.length > 0) {
        return res.status(400).json({errorMessages: errors});
    }

    for (var k = 0; k < users.length; k++) {
        const aUser = users[k];
        if (aUser.email === bodyEmail) {
            return res.status(400).json({message: "User exists with that email"});
        }
    }

    var newUser = {
        id: users.length + 1,
        firstname: bodyFirstname,
        lastname: bodyLastname,
        email: bodyEmail,
        password: bodyPassword
    };

    users.push(newUser);
    res.json(newUser);
});

app.post("/api/auth", (req, res) => {
    res.send("POST Auth api");
});

const PropertyRouter = express.Router();
PropertyRouter.post("/api/properties", (req, res) => {
    res.send("POST Properties api");
});
app.use("/parent", PropertyRouter);

app.listen(3000, () => {
    console.log("Server is running");
});