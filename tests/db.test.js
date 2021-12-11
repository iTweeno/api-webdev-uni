const mocked_db = {
  user: [{ id: 1, first_name: "Joao", last_name: "Silva" }],
};

it("Find User", async () => {
  let user_details = {
    id: 1,
  };

  let user = mocked_db.user.find((e) => e.id === user_details.id);

  expect(user.first_name).toBe("Joao");
});

it("Insert user", async () => {

  let user = { id: 2, first_name: "Andre", last_name: "Ferreira" };

  mocked_db.user.push(user);

  expect(user.first_name).toBe("Andre");
});

it("Remove user", async () => {
  let user_details = {
    id: 1,
  };

  mocked_db.user.splice(mocked_db.user.indexOf(mocked_db.user.find((e) => e.id === user_details.id)), 1);

  expect(mocked_db.user).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: 1,
      })
    ])
  );
});
