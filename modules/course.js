const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, url){
        this.title = title;
        this.price = price;
        this.url = url;
        this.id = uuid();
    }

    async save(){
        const courses = await Course.getAll();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    toJSON(){
        return ({
            title: this.title,
            price: this.price,
            url: this.url,
            id: this.id
        });
    }

    static getAll(){
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..' , 'data', 'courses.json'),
                'utf-8',
                (err, data) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(data));
                    }
                }
            );
        });
    }

    static async getById(id){
        const courses = await Course.getAll();
        return courses.find(c => c.id === id);
    }

    static async update(course){
        const courses = await Course.getAll();

        const idx = courses.findIndex(c => c.id === course.id);
        courses[idx] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = Course