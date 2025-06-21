import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { writeFile } from 'fs/promises'
const fs = require('fs');

const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();

//API ENDPOINT TO GET ALL BLOGS
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json(blogs)
    }
}

//API ENDPOINT FOR UPLOADING BLOGS
export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    const blogData = {
        title: `${formData.get('title')}'`,
        description: `${formData.get('description')}`,
        content: `${formData.get('content')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authImg: `${formData.get('authImg')}`
    }
    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "BLog Added" });
}

// Creating API Endpoint to delete Blog
// export async function DELETE(request) {
//     const id = await request.nextUrl.searchParams.get('id');
//     const blog = await BlogModel.findById(id);
//     fs.unlink(`./public${blog.image}`, () => {});
//     await BlogModel.findByIdAndDelete(id);
//     return NextResponse.json({ msg: "Blog Deleted" })
// }

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete the image from the public folder
    const imagePath = `./public${blog.image}`;
    try {
      await unlink(imagePath);
      console.log("Image deleted:", imagePath);
    } catch (imgErr) {
      console.warn("Image not found or already deleted:", imagePath);
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error("Error in DELETE blog API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}