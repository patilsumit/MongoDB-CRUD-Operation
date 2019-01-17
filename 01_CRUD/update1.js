/*
 * Title: MongoDB application to update a document
 * Description: Use mongoose to connect to MongoDB and
 * update a document by its id.
 * Query first approach is used here.
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'play'
mongoose.connect('mongodb://localhost:27017/play')
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

// Function to update a course
async function updateCourse(id) {
    // Approch 1: Query first
    // find the document - findById()
    let course = await Course.findById(id);
    if (!course) {
        console.log("Error: Cannot find course with ID: ", id);
        return;
    }
    // Modify its properties
    // course.isPublished = true;
    // course.author = "Another Author";

    course.set({
        name : "sam pat",
        isPublished: true,
        author: "Another Author"
    });

    // save the document - save()
    const result = await course.save();
    console.log(result);
}

// Update a course document
updateCourse('5c3768eb5fee45152a8e41f3');







// Query 1st approach is useful, if you want to implement some
// business logic before updating
// For example, you want to prevent update for published docs