import mongoose from "mongoose";
export const ConnectDB=async()=>{
    await mongoose.connect('mongodb+srv://MindPalette:Riya9927@cluster0.9kd3oir.mongodb.net/MindPalette');
    console.log("DB connected");   
}