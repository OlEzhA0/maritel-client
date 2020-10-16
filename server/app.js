require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const schema = require("./schema/schema");
const app = express();
const PORT = process.env.PORT || 5000;
const orderRouter = require("./routes/order");
const authRouter = require("./routes/auth");
const isAuth = require("./helpers/isAuth");

app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

app.use(express.static("build"));

app.use(cors({ credentials: true, origin: process.env.REACT_APP }));

app.use(isAuth);

app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(orderRouter);
app.use(authRouter);

mongoose.connect(
    `mongodb+srv://admin:EoRHh9rzLTEJHmXA@maritelgeneral.llqa9.gcp.mongodb.net/maritel?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const dbContection = mongoose.connection;
dbContection.on("error", (err) => console.log(`Contection error: ${err}`));
dbContection.once("open", () => console.log("Connected to DB"));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log("Server started!");
});
