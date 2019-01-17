/*
 * Title: MongoDB application illustraing how to query a collection
 * Description: Use mongoose to connect to MongoDB and
 * query documents from a database
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Course Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Create a model from the Schema (Course is a model (Class))
const Course = mongoose.model('Course', courseSchema);

async function getAllCourses() {
    // query a collection using find
    //find all documents inside a collection
    // $eq -> equal, $ne -> not equal
    // $gt, $gte
    // $lt, $lte
    // $in -> matches values in an array
    // $nin -> not matching values in an array
    
    const courses = await Course
        .find(
            // {author: /^mubeen/i} ,//Begin with mubeen
            // {author: /Jukaku$/i}, //End with Jukaku
            // {author: /.*mubeen.*/i} // containing mubeen
            // {author: 'Mubeen'} 
            // {tags: {$size: 1}}
            // {tags: {$all: ['Mean', 'backend']}}
        )
        //.or([{tags: {$all: ['Mean', 'backend']}}])
        // .or([
        //     {isPublished: false}, //Criteria 1 or
        //     {author: 'Jayakumar'} // Criteria 2
        // ])
        // Courses not published or
        // author is Jayakumar
        // .find({
        //     //tags: {$nin: ['frontend', 'backend']}
        //     price: {$gte: 10, $lte: 20},
        //     author: 'Jayakumar'
        // })
        .select('name author tags');
        // .select({name: 1, author: 1});

    console.log(courses);
}

async function getCoursesUsingPagination(pageCount, numOfDocsPerPage) {
    const courses = await Course
        .find()
        .sort({name: 1}) // Sort by name in ascending order
        .skip((pageCount - 1) * numOfDocsPerPage ) // Skip docs to seek to a page
        .limit(numOfDocsPerPage); // Specify no. of documents
        //.count();
        // .limit(3);

    return courses;
}

async function getPublishedCourses() {
    const courses = await Course.find({isPublished: true}); //Query criteria as a parameter
    console.log(courses);
}

async function getNotPublishedCourses() {
    const courses = await Course.find({isPublished: false}); //Query criteria as a parameter
    console.log(courses);
}

async function getCourseByAuthor(author_name) {
    const courses = await Course.find({author: author_name}); //Query criteria as a parameter
    return courses;
}

getAllCourses();

// Un-comment required functions. Specify existing author
// Return course with author 'Mubeen Jukaku'
 //getCourseByAuthor('Mubeen')
   //  .then((courses) => console.log(courses));

// Return published courses
//getPublishedCourses();

// Return non published courses
//getNotPublishedCourses();

// Get courses in a page (Pagination logic is implemented by the function)
// Page - 2, No. of Docs - 3
//getCoursesUsingPagination(2, 3)
//     .then((courses) => console.log(courses));
