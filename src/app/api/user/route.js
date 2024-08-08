// app/api/user/route.js
import User from "../../models/UserSchema";
import { connectToDB } from "../../../../libs/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDB();

  try {
    const countUsers = await User.countDocuments();

    if (countUsers > 0) {
      const findUser = await User.findOne();
      return NextResponse.json({
        message: "User already exists",
        user: findUser,
      });
    }

    const { name, isLogged } = await request.json();
    const newUser = await User.create({ name, isLogged });
    return NextResponse.json({
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectToDB();
  try {
    const id = request.nextUrl.searchParams.get("id");
    let userUpdate = await User.findById(id);

    const { updateUser } = await request.json();
    userUpdate.isLogged = updateUser.isLogged;

    await userUpdate.save();
    return NextResponse.json({ message: "user saved" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
