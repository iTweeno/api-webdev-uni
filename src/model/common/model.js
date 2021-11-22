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
  return res.status(400).json();
};

const InternalServerError = (res) => {
  return res.status(500).json();
};

const Unauthorized = (res) => {
  return res.status(401).json();
};

module.exports = { Created, Ok, NoContent, BadRequest, InternalServerError, Unauthorized };
