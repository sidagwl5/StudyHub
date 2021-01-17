const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const users = require("../models/user");

const authentication = asyncHandler(async (req, res, next) => {

        const token = req.cookies.token;

        if(!token) {
           res.status(401);
           throw new Error("User not authenticated");
        }
        else{

            const userId = jwt.verify(token, process.env.SECRET_KEY);
            if(!userId){
                res.status(401);
                throw new Error("User not authorized");
            }


            const userData = await users.findById(userId.id);
            if(!userData){
                res.status(401);
                throw new Error("User is not registered");
            }

            req.user = userData;
            next();
        }
})

module.exports = { authentication }