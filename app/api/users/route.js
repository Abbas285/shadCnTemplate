import { NextRequest, NextResponse } from "next/server";
import user from "@/db/Models/Users";
import connectDB from "@/db/connectionConfig";
import cors from "cors"
// ============== Get User  ================
export async function GET() {

  const client = await connectDB;
  const db = client.db("testproject");
  const users = await db.collection("users").find({}).toArray();

  if (users) {
    return NextResponse.json({
      status: 200,
      res: users,
    });
  } else {
    return NextResponse.json({
      status: 5000,
      message: "server Errors",
    });
  }
}

// =====================Create User  ===============

export async function POST(request) {
  const body = await request.json();
  const { name, email, username, id } = body;

  if (!name || !email) {
    return NextResponse.json({
      status: 400,
      message: "Name and email are required",
    });
  }
  try {
    const client = await connectDB;
    const db = client.db("testproject");
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      return NextResponse.json({
        status: 400,
        message: "User already exists",
      });
    }
    const result = await db.collection("users").insertOne({
      id,
      name,
      email,
      username,
      createdAt: new Date(),
    });
    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
}
// =====================Delete User  =================
export async function DELETE(request) {
  const body = await request.json();
  const client = await connectDB;
  const db = client.db("testproject");
  try {
    const userExist = await db.collection("users").findOne({ id: body.id });
    console.log({ userExist });
    if (userExist !== null) {
      await db.collection("users").deleteOne({ id: body.id });
      return NextResponse.json({
        status: 200,
        message: "User Successfully Deleted",
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "User not found or already deleted",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      error: err.message,
    });
  }
}

// =====================Update User  =================
export async function PUT(request) {
  const body = await request.json(); 
  const { name, email, username, id } = body; 

  if (!id || !name || !email) {
    return NextResponse.json({
      status: 400,
      message: "ID, name, and email are required",
    });
  }
  try {
    const client = await connectDB;
    const db = client.db("testproject");
    const userExists = await db.collection("users").findOne({ id });
    if (!userExists) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    await db
      .collection("users")
      .updateOne(
        { id },
        { $set: { name, email, username, updatedAt: new Date() } }
      );
    return NextResponse.json({
      status: 200,
      message: "User updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
}
