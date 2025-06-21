import mongoose from "mongoose";

const categories = ['All', 'Lifestyle', 'Motivation', 'Technology', 'Startup'];

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: categories
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    authImg: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;

// import mongoose from "mongoose";

// const Schema= new mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:String,
//         required:true
//     },
//     image:{
//         type:String,
//         required:true
//     },
//     authImg:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         default:Date.now()
//     }
// })

// const BlogModel = mongoose.model('blog',Schema);

// export default BlogModel;