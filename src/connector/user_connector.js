import { genSalt, hash, compare } from "bcrypt";

import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";

import prisma from "../utils/prisma_utils.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const addUser = async (body, file) => {
  const userToInsert = body;
  try {
    userToInsert.birthday = new Date(body.birthday);
    userToInsert.join_date = new Date(Date.now());
    userToInsert.user_type = "basic";
    userToInsert.profile_picture = file?.filename;
    const salt = await genSalt(10);
    userToInsert.password = await hash(body.password, salt);

    await prisma.userr.create({
      data: userToInsert,
    });

    if (process.env.NODE_ENV === "prod") {
      transporter.sendMail({
        from: process.env.EMAIL,
        to: userToInsert.email,
        subject: "Welcome to Job Finder!",
        text: "Welcome to the best place to find jobs!",
      });
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
  return 1;
};

const editUser = async (id, body, file) => {
  const userToEdit = body;
  try {
    userToEdit.profile_picture = file?.filename;
    userToEdit.birthday = new Date(body.birthday);
    const user = await prisma.userr.findFirst({
      where: {
        id,
      },
    });
    userToEdit.join_date = new Date(user.join_date);

    if (user.user_type === "basic") {
      userToEdit.user_type = "basic";
    }

    const salt = await genSalt(10);
    userToEdit.password = await hash(body.password, salt);

    await prisma.userr.update({
      where: {
        id,
      },
      data: userToEdit,
    });

    transporter.sendMail({
      from: process.env.EMAIL,
      to: userToEdit.email,
      subject: "Profile edited",
      text: "Your profile was recently edited,if you did not do this please contact us",
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

const getUser = async (query) => {
  try {
    const queryDb = await prisma.userr.findFirst({
      where: {
        id: query,
      },
    });
    delete queryDb.password;
    return queryDb;
  } catch (e) {
    return null;
  }
};

const login = async (email, password) => {
  try {
    const queryDb = await prisma.userr.findFirst({
      where: {
        email,
      },
    });
    const validPassword = await compare(password, queryDb.password);
    if (validPassword) {
      const token = jwt.sign({ user_id: queryDb.id, user_type: queryDb.user_type }, process.env.TOKEN, {
        expiresIn: "30d",
      });
      return token;
    }
  } catch (e) {
    return null;
  }

  return null;
};

const deleteUser = async (id) => {
  try {
    await prisma.userr.delete({
      where: {
        id,
      },
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

export default { addUser, editUser, getUser, deleteUser, login };
