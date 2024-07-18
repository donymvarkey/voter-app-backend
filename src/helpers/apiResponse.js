const returnResponse = ({ code, msg, data }, res) => {
  res.status(code).json({
    status: code === 200 ? true : false,
    code,
    msg,
    data,
  });
};

module.exports = returnResponse;
