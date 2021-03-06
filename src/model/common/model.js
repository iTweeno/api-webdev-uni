const Created = (res) => {
  return res.status(201).json();
};

const Ok = (res, data) => {
  return res.status(200).json({
    data,
  });
};

const NoContent = (res) => {
  return res.status(204).json();
};

const BadRequest = (res) => {
  return res.status(400).json({
    code: 400,
    message: "git gud",
  });
};

const NotAcceptable = (res, message) => {
  return res.status(406).json({
    code: 406,
    message,
  });
};

const InternalServerError = (res) => {
  return res.status(500).json();
};

const Unauthorized = (res) => {
  return res.status(401).json();
};

export { Created, Ok, NoContent, BadRequest, InternalServerError, Unauthorized, NotAcceptable };
