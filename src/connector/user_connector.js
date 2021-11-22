const prisma = require("../utils/prisma_utils");

const addUser = async (body) => {
  body.birthday = new Date(body.birthday);
  body.join_date = new Date(body.join_date);
  try {
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

const getUser = async (body) => {
  try {
    const query = await prisma.userr.findFirst({
      where: body,
    });
    delete query.password;
    return query;
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
