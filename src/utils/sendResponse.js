// SEND RESPONSE
const sendResponse = (status, statusCode, keyname, data, res) => {
  res.status(statusCode).json({
    success: status,
    [keyname]: data,
  });
};

module.exports = sendResponse;
