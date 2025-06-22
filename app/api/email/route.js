// import { ConnectDB } from "@/lib/config/db";
// import EmailModel from "@/lib/models/EmailModel";
// import { NextResponse } from "next/server";

// const LoadDB = async () => {
//     await ConnectDB();
// }

// LoadDB();

// export async function POST(request) {
//     const formData = await request.formData();
//     const emailData = {
//         email: `${formData.get('email')}`,
//     }
//     await EmailModel.create(emailData);
//     return NextResponse.json({ success: true, msg: "Email subscribed" });
// }

// export async function GET(request) {
//     const emails = await EmailModel.find({});
//     return NextResponse.json({ emails });
// }

// export async function DELETE(request) {
//     const id = await request.nextUrl.searchParams.get("id");
//     await EmailModel.findByIdAndDelete(id);
//     return NextResponse.json({ success: true, msg: "Email Deleted" })
// }
import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email subscribed" });
}

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
}

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" })
}

export async function PUT(request) {
    try {
        const { id, email } = await request.json();
        
        if (!id || !email) {
            return NextResponse.json({ 
                success: false, 
                msg: "ID and email are required" 
            }, { status: 400 });
        }

        const updatedEmail = await EmailModel.findByIdAndUpdate(
            id,
            { email: email },
            { new: true, runValidators: true }
        );

        if (!updatedEmail) {
            return NextResponse.json({ 
                success: false, 
                msg: "Email not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            msg: "Email updated successfully",
            email: updatedEmail
        });
    } catch (error) {
        console.error('Error updating email:', error);
        return NextResponse.json({ 
            success: false, 
            msg: "Error updating email" 
        }, { status: 500 });
    }
}