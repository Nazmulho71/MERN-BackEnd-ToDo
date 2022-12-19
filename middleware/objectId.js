const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).send("Please enter a valid ID.");

  next();
};
