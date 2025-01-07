const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../../03-mongo/db");
const router = Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    //check if a user with this username exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username,
        },JWT_SECRET)
        res.json({
            token,
        })
    } else {
        res.status(411).json({
            message: "Invalid username or password",
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price,
    })

    res.json({
        message:'Course created successfully',
        newCourse: newCourse._id,
    })
});

router.get('/courses', adminMiddleware,async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })
});

module.exports = router;