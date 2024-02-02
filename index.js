const express = require('express');
const hbsrs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const hbs = hbsrs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

const PORT = 3000 || process.env.PORT;

async function start(){
    try {
        const password = 'oQmOnUfZLCyjreKa';
        const url = `mongodb+srv://dimabolandau0:${password}@cluster0.80zcank.mongodb.net/shop`;
        await mongoose.connect(url)

        app.listen(PORT);
    } catch (error) {
        console.log(error);
    }
}

start();