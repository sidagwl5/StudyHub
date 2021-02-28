const users = require("../models/user");
const uploads = require("../models/upload");
const asyncHandler = require("express-async-handler");


// PURPOSE: after succesfull authentication returns user data
// TYPE: get
// FOR: both admin and default
const authenticate = asyncHandler(async (req, res) => {
  let notifications = [];
  if (req.user.isAdmin) {
    const allNotifications = await users.find({}).select(["notifications"]);
    notifications = allNotifications.reduce((prev, curr) => {
      prev.push(
        ...curr.notifications.reduce((prev, current) => {    
          if(current.admin.message){
            prev.push({
              data: current.admin,
              userId: curr._id,
              id: current._id,
              specificId: current.specificId
            })
          }
          return prev;
        }, [])
      );
      return prev;
    }, []);
  } 
  else {
    notifications = req.user.notifications.reduce((prev, current) => {    
      if(current.user.message){
        prev.push({
          data: current.user,
          id: current._id,
          specificId: current.specificId
        })
      }
      return prev;
    }, []);
  }

  req.user._doc.notifications = notifications;
  return res.json(req.user);
});


// PURPOSE: get all default users data
// TYPE: get
// FOR: admin
const getAllUserDetails = asyncHandler(async (_, res) => {
  const allUsersData = await users
    .find({ isAdmin: false })
    .select(["name", "imageUrl"]);

  return res.json(allUsersData);
});


// PURPOSE: delete user
// TYPE: delete
// FOR: for both admin and default
const deleteUser = asyncHandler(async (req, res) => {

  const userData = await users.findById(req.params.id);
  const usersfavouritesData = await users.find({}).select(["favourites"]);
  await uploads.deleteMany({ _id: { $in: [...userData.uploadsApproved, ...userData.uploadsPending] } });

  // also delete favourites of other users with these uploads!
  for (let i = 0; i < usersfavouritesData.length; i++) {
    const filteredFavourites = usersfavouritesData[i].favourites.filter(
      (uploadId) => !userData.uploadsApproved.includes(uploadId)
    );
    if (filteredFavourites.length !== usersfavouritesData[i].favourites.length) {
      usersfavouritesData[i].favourites = filteredFavourites;
      await usersfavouritesData[i].save();
    }
  }

  await userData.delete();
  return res.json({
    message: `User deleted Successfully!`,
  });
});


// PURPOSE: update user
// TYPE: patch
// FOR: for both admin and default
const updateUser = asyncHandler(async (req, res) => {
  await users.findByIdAndUpdate(req.params.id, req.body);
  return res.json({
    message: `User updated successfully!`,
  });
});


// PURPOSE: get specific user data
// TYPE: get
// FOR: admin
const getSpecificUser = asyncHandler(async (req, res) => {
  const usersData = await users
    .findById(req.params.id)
    .select(["-notifications"]);
  return res.json(usersData);
});


// PURPOSE: request admin role
// TYPE: get
// FOR: default
const adminRoleRequest = asyncHandler(async (req, res) => {
  const notificationsData = {
    admin: {
      message: `User ${req.user.name} has requested for an admin role!`,
      path: "/request",
    },
    user: {
      message: `Your admin role request has been sent succesfully!`,
      status: "Success",
    },
  };

  req.user.notifications.push(notificationsData);
  req.user.save();
  return res.json({ message: "Your request has been sent successfully!" });
});

// PURPOSE: log out
// TYPE: get
// FOR: both admin and default
const logOut = asyncHandler((_, res) => {
  res.clearCookie("token");
  return res.status(200).end();
});

module.exports = {
  logOut,
  authenticate,
  getAllUserDetails,
  deleteUser,
  updateUser,
  getSpecificUser,
  adminRoleRequest,
};
