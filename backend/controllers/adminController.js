const user = require("../models/user");

exports.fetchUser = (req, res) => {
    user.find()
        .select("-password")
        .select("-image")
        .then(fetchedUser => res.status(200).json(fetchedUser));
}