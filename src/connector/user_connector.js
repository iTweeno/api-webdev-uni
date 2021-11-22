const bcrypt = require("bcrypt");

const prisma = require("../utils/prisma_utils");

const addUser = async (body) => {
  try {
    body.birthday = new Date(body.birthday);
    body.join_date = new Date(body.join_date);
    const salt = bcrypt.genSalt(10);
    body.password = bcrypt.hash(body.password, salt);
    await prisma.userr.create({
      data: body,
    });
  } catch (e) {
    return 0;
  }
  return 1;
};

const editUser = async (id, body) => {
  body.birthday = new Date(body.birthday);
  body.join_date = new Date(body.join_date);
  try {
    await prisma.userr.update({
      where: {
        id,
      },
      data: body,
    });
    return 1;
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

module.exports = { addUser, editUser, getUser, deleteUser };
