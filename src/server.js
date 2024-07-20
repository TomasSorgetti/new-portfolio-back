require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
})
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/router")


const server = express();
const port = process.env.PORT || 5000


server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", router)


server.listen(port, () => {
    console.log(`- - - - - - - - - - - - - - -`);
    console.log(`Server listening on port ${port}`);
    console.log(`- - - - - - - - - - - - - - -`);
})
