var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriendArray = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            var num = parseInt(req.body.scores[i]);
            newFriendArray.push(num);
        };

        var bestMatchName = "";
        var bestMatchPicture = "";

        var bestMatchDiff = 100;
        for (var i = 0; i < friends.length; i++) {

            var totalDifference = 0;
            var friendScore = friends[i].scores;

            for (var j = 0; j < friendScore.length; j++) {
                var num = parseInt(friendScore[j]);
                var diff = Math.abs(num - newFriendArray[j]);
                totalDifference = totalDifference + diff;
            };

            if (totalDifference < bestMatchDiff) {
                bestMatchDiff = totalDifference;

                bestMatchName = friends[i].name;
                bestMatchPicture = friends[i].picture;
            };
        };

        friends.push(req.body);

        var bestMatch = {
            name: bestMatchName,
            picture: bestMatchPicture
        };

        res.json(bestMatch);
        
    });
};