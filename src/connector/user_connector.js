const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const prisma = require("../utils/prisma_utils");

const addUser = async (body) => {
  const userToInsert = body;
  try {
    userToInsert.birthday = new Date(body.birthday);
    userToInsert.join_date = new Date(body.join_date);
    userToInsert.user_type = "basic";

    const salt = await bcrypt.genSalt(10);
    userToInsert.password = await bcrypt.hash(body.password, salt);

    await prisma.userr.create({
      data: userToInsert,
    });
  } catch (e) {
    console.log(e);
    return 0;
  }
  return 1;
};

const editUser = async (id, body, token) => {
  const userToEdit = body;
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif?.user_id === id || tokenVerif?.user_type === "admin") {
      userToEdit.birthday = new Date(body.birthday);
      userToEdit.join_date = new Date(body.join_date);
      userToEdit.user_type = "basic";
      if (userToEdit.password != null) delete userToEdit.password;

      await prisma.userr.update({
        where: {
          id,
        },
        data: body,
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

const getUser = async (query) => {
  try {
    const queryDb = await prisma.userr.findFirst({
      where: query,
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
    const validPassword = await bcrypt.compare(password, queryDb.password);

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

const deleteUser = async (id, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === id || tokenVerif.user_type === "admin") {
      await prisma.userr.delete({
        where: {
          id,
        },
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

module.exports = { addUser, editUser, getUser, deleteUser, login };
