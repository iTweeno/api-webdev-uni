import { genSalt, hash, compare } from "bcrypt";

import jwt from "jsonwebtoken";

import prisma from "../utils/prisma_utils.js";

const addUser = async (body) => {
  const userToInsert = body;
  try {
    userToInsert.birthday = new Date(body.birthday);
    userToInsert.join_date = new Date();
    userToInsert.user_type = "basic";

    const salt = await genSalt(10);
    userToInsert.password = await hash(body.password, salt);

    await prisma.userr.create({
      data: userToInsert,
    });
  } catch (e) {
    return 0;
  }
  return 1;
};

const editUser = async (id, body) => {
  const userToEdit = body;
  try {
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

    if (userToEdit.password != null) delete userToEdit.password;

    await prisma.userr.update({
      where: {
        id,
      },
      data: userToEdit,
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
