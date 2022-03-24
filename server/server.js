const express = require("express");
const cors = require("cors");
const dbConfig = require("../server/config/db.config");
const app = express();
require('dotenv').config();

/*var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
*/

//gives access to every URL and request method
app.use(cors())
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("../server/model");
const Role = db.role;

db.mongoose
  .connect("mongodb+srv://admin:adminpassword1234@greenbank.kmn0d.mongodb.net/bank?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Cant connect to database.", err);
    process.exit();
  });

// Home
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Green Mountain Bank!" });
});

// routes
require("../server/routes/auth.routes")(app);
require("../server/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || '3001';
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "USER",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added to database!");
      });

      new Role({
        name: "ADMIN",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added to database!");
      });
    }
  });
}
