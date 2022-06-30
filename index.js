const express = require("express");
const cors = require("cors");

require("./db/config");

const User = require("./db/User");
const Product = require("./db/Product")

const app = express();

// .use shows that we are using it as middle ware
// .json() with brackets
// cors is used as a function
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    // We can't disallow to show password using -password first we have to change it with the help of .toObject in an instance.
    result = result.toObject();
    delete result.password;

    resp.send(result);

});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({result : "No user found"})
        }
    }
    else{
        resp.send({result : "No user found"});
    }
})

app.post("/add-product", (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

})


app.listen(5000);