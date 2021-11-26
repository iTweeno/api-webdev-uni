import { prismaMock, createMockContext } from "./singleton";
//const {prismaMock, createMockContext} = require("./singleton")
let mockCtx;
let ctx;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx;
});

describe("Create User", () => {
  const user = {
    first_name: "a",
    last_name: "b",
    password: "b",
    phone_number: "b",
    email: "aa@test.com",
    birthday: new Date("2001-03-03"),
    join_date: new Date("2001-01-03"),
    company: "Globaldata",
    profile_picture: "asd",
    user_type: "basic",
  };
  it("creates new user correctly", async () => {
    prismaMock.userr.create(user);

    const savedUser = await prismaMock.userr.findFirst({
      where: { email: user.email },
    });

    expect(savedUser.email).toBe(user.email);
  });

  it("fails if tries to create records with the same user twice", async () => {
    await prismaMock.userr.create({ data: user });

    const savedUser = await prismaMock.userr.findFirst({
      where: { email: user.email },
    });

    expect(savedUser.email).toBe(user.email);

    await expect(async () => prismaMock.userr.create({ data: user })).rejects.toThrow(
      "Unique constraint failed on the constraint: `email_unique`"
    );
  });
});
