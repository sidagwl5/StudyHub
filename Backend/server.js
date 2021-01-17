const express = require("express");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const databaseConfig = require("./utils/databaseConfig");
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");

const app = express();
require("dotenv").config();
databaseConfig();
require("./utils/passportConfig")(passport);


const PORT = process.env.PORT || 5001;

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);

app.use((err, req, res, next) => {
    console.log(err.message);
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    if (err.message === 'jwt expired') statusCode = 401;
    
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: err.stack,
    });

    next();
  });
  

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));