const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

const DEFAULT_PROFILE_IMAGE_URL = "https://meetbook-mern.s3.us-west-1.amazonaws.com/public/blank-profile-picture-973460_1280.png";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber,
    birthdate: req.user.birthdate,
    city: req.user.city,
    bio: req.user.bio,
    status: req.user.status,
    profileImageUrl: req.user.profileImageUrl
  });
});

// Search route
router.get('/search', async(req, res, next) => {
  const { name, lastname } = req.query;
  try {
    let users;
    if (!lastname){
      users = await User.find({
        $or: [
          { name: { $regex: name, $options: 'i' }},
          { lastname: { $regex: name, $options: 'i' }}
        ]
      });
    } else {
      users = await User.find({ 
        name: { $regex: name, $options: 'i' },
        lastname: { $regex: lastname, $options: 'i' }
      });
    }
    return res.json(users);
  } catch (err){
    next(err);
  }
});

// GET to user clicked on search
router.get('/:userId', async (req, res, next) => {
  try{
    const { userId } = req.params;

    const user = await User.findById(userId)
                           .select('-hashedPassword -createdAt -updatedAt -__v');

    if(!user){
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log(user);
  
    return res.json(user);
  } catch(err){
    next(err);
  }
});

router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the email
  const user = await User.findOne({
    $or: [{ email: req.body.email }]
  });

  if (user) {
    // Throw a 400 error if the email address already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) errors.email = "A user has already registered with this email.";

    err.errors = errors;
    return(next);
  }

  // Otherwise create a new user
  const profileImageUrl = req.file ? 
    await singleFileUpload({ file: req.file, public: true }) : 
    DEFAULT_PROFILE_IMAGE_URL;
  const newUser = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthdate: req.body.birthdate,
    city: req.body.city,
    bio: req.body.city,
    status: req.body.status,
    profileImageUrl
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try{
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err){
        next(err);
      }
    })
  });
});

router.post('/login', singleMulterUpload(""), validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.patch('/:id', singleMulterUpload("image"), requireUser, async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  try{
    const { bio, birthdate, city, email, lastname, 
      name, phoneNumber, status, _id, profileImageUrl } = req.body;
    let user = await User.findById(_id);

    let newProfileImageUrl; 
    
    if(req.file) newProfileImageUrl = await singleFileUpload({ file: req.file, public: true });

    if(!user) return res.status(404).json({ message: 'User not found.' });

    user.bio = bio;
    user.birthdate = birthdate;
    user.city = city;
    user.email = email;
    user.lastname = lastname;
    user.name = name;
    user.phoneNumber = phoneNumber;
    if(req.file) {
      user.profileImageUrl = newProfileImageUrl
    } else { user.profileImageUrl = profileImageUrl }
    user.status = status;

    user = await user.save();

    return res.json(user);
  } catch (err){
    next(err);
  }
});

module.exports = router;
