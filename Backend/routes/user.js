const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { getJwtToken } = require("../utils/helperFunctions");
const users = require("../models/user");
const { authentication } = require("../middlewares/auth")


router.route("/google").get(passport.authenticate("google", { scope: ['profile'] }));

router
  .route("/google/callback")
  .get(passport.authenticate('google', { failureRedirect: '/login', session: false }),
   asyncHandler(async (req, res) => {

    const {id: gId, name, photos} = req.user;
    let user = await users.findOne({ gId });
       
        if(!user) {         
            let userData = {
                gId,
                firstName: name.givenName,
                lastName: name.familyName,
                imageUrl: photos[0].value
            } 
             
            user = await users.create(userData);
        }

        const token = getJwtToken(user._id);
        res.cookie('token', token, { maxAge: 90000, httpOnly: true });
        res.redirect("http://localhost:3000");
  
       }
  ))

  router.route("/auth").get(authentication, asyncHandler((req, res) => {

         const { firstName, lastName, imageUrl } = req.user;
         return res.json({firstName, lastName, imageUrl});
  }))


module.exports = router;  