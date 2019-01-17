/*
 * Title: MongoDB application to update a document
 * Description: Use mongoose to connect to MongoDB and
 * update a document by its id.
 * Direct update approach is used here.
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
// async function updateCourse(id) {
//     // Approach 2: Update first (Direct update)
//     // Directly update the document
//     const result = await Course.update({ _id: id },
//     {
//         $set: {
//             author: "Satya",
//             isPublished: true
//         }
//     });
//     // Optionally get the updated document
//     console.log(result);

// }

// Update a course document
// updateCourse('5b5eadc2e23eee558af5b9dd');

async function updateCourse(id) {
    // Approach 2: Update first (Direct update)
    // Directly update the document
    const course = await Course.findByIdAndUpdate(id,
    {
        $set: {
            author: "Mubeen-Patil",
            isPublished: false
        }
    }, {new: true});
    // Optionally get the updated document
    console.log(course);
}

// update course and print updated course
updateCourse('5c3768eb5fee45152a8e41f3');





