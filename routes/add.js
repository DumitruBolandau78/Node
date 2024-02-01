const {Router} = require('express');
const Course = require('../modules/course');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: "Add Course",
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    // const course = new Course(req.body.title, req.body.price, req.body.url);
    const course = new Course({
        title: req.body.title, 
        price: req.body.price, 
        img: req.body.url
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router