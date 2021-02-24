const router = require('express');
const controller = require("../src/controller")


router.post("/", function (req, res, next) {
    const body = request.body;
    if (body) {
        controller.insertDatabase(body).then(
            (results) => {
                res.send();
            },
            (error) => {
                res.send();
            }
        );
    } else {
        next(); // Use next middleware in stack
    }
});

module.exports = router;

