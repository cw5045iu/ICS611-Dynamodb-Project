const router = require('express').Router();
const controller = require("../src/controller");
var Validator = require('jsonschema').Validator;
var validator = new Validator();
const schema = require("../models/validationSchema.json")


router.post("/", function (req, res, next) {
    const body = req.body;
    let validation = validator.validate(body, schema);

    if (validation.errors.length) {
        res.status(404).send({ "Input Error": "Check formatting od requect object" });
    } else {
        controller.insertDatabase(body).then(
            (result) => {
                res.send("Data inserted");
            },
            (_) => {
                console.error("Router: Underlying system issue");
                res.status(500).send({ "Internal Error" : "Our site encountered an issue"});
            }
        );
    }

});

module.exports = router;

