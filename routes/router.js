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
                console.error("Router: Underlying system issue");
                res.status(500).send({ });
            }
        );
    } else {
        next(); // Use next middleware in stack
    }
});

module.exports = router;

