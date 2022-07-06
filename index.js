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
            resp.send({ result: "No user found" })
        }
    }
    else {
        resp.send({ result: "No user found" });
    }
});

app.post("/add-products", async (req, resp) => {
    const products = new Product(req.body);
    let result = await products.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0)
        resp.send(products);
    else
        resp.send({ result: "No product found" });
});

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result)
        resp.send(result);
    else
        resp.send("result:No record found");
});

// to update data in db the standard method is put method
app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        {_id:req.params.id},                 //First is on what behalf we have to update the data
        {$set:req.body},                  //And what data we have to update, $set is the standard way to update the data
    )
    resp.send(result);
})

app.get("/product/:key", async(req, resp) => {
    let result = await Product.find({
        "$or": [                        //$or is the or operator which is used to find only those operator which specify the requirements
            {
                name :{$regex.params.key}
            },
            {
                company :{$regex.params.key}
            },
            {
                category :{$regex.params.key}
            }
        ]
    })
    resp.send(result);
})


app.listen(5000);