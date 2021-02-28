const router = require('express').Router();
const controller = require("../src/controller");


router.post("/", function (req, res, next) {
    const body = req.body;
    if (body) {
        controller.insertDatabase(body).then(
            (result) => {
                res.send(result);
            },
            (error) => {
                res.send(error);
            }
        );
    } else {
        next(); // Use next middleware in stack
    }
});

module.exports = router;

