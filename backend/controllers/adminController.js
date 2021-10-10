const user = require("../models/user");

exports.fetchUser = (req, res) => {
    user.find()
        .select("-password")
        .then(fetchedUser => res.json(fetchedUser));
}