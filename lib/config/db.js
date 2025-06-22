// import mongoose from "mongoose";
// export const ConnectDB=async()=>{
//     await mongoose.connect('mongodb+srv://MindPalette:Riya9927@cluster0.9kd3oir.mongodb.net/MindPalette');
//     console.log("DB connected");   
// }

import mongoose from "mongoose";

export const ConnectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("DB connected");
};
