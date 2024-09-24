import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/db.json";

// ============== Get User  ================
export async function GET() {
  return NextResponse.json({ db });
}

// =====================Create User  ===============

export async function POST(request: NextRequest) {
  const body = await request.json();
  db.push({
    id: db.length,
    name: body.name,
    username: body.username,
    email: body.email,
  });
  return NextResponse.json({
    status: "successfully created",
  });
}

// =====================Delete User  =================

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  let id = body.id;
  let isHave = db.find((item) => item.id === id);
  if (isHave) {
    db.filter((item) => item.id !== id);
    return NextResponse.json({
      status: "successfully deleted",
    });
  } else {
    return NextResponse.json({
      status: "User Not exist",
    });
  }
}

// =====================Update User  =================

export async function PUT(request: NextRequest) {
  const body = await request.json();
  let id = body.id;
  let isHave = db.find((item) => item.id === id);
  if (isHave) {
    let curentIndex = db.findIndex((item) => item.id === body.id);
    db[curentIndex] = body;
    return NextResponse.json({
      status: "successfully update",
    });
  } else {
    return NextResponse.json({
      status: "User Not exist",
    });
  }
}
