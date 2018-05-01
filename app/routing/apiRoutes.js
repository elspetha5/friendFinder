var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friendslist", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friendslist", function (req, res) {
        friends.push(req.body);
        res.json(true);
    });
};