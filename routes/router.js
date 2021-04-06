const router = require('express').Router();
const controller = require("../src/controller");
var Validator = require('jsonschema').Validator;
var validator = new Validator();
const schema = require("../models/validationSchema.json")

/*
    Add new entry to database
*/

router.post("/", function (req, res, next) {
    const body = req.body;
    let validation = validator.validate(body, schema);

    if (validation.errors.length) {
        res.status(404).send({ "Input Error": "Check formatting of request object" });
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

/*
    Retrieve high over period
*/
router.get("/getMaxTemp", function (req, res, next) {
    controller.getMaxTempOnRange(req.body.start, req.body.end).then(
        (result) => {


            res.send({
                startDate: req.body.start, 
                endDate: req.body.end,
                maxTemp: result
            });
        },
        (_) => {
            console.error("Router: Underlying system issue");
            res.status(500).send({ "Internal Error" : "Our site encountered an issue"});
            next();
        }
    );
});

/*
    Retrieve Min/Max temps of day
*/
router.get("/getMinMaxTemp", function (req, res, next) {
    controller.getMinMaxTemp(req.body.date).then(
        (temp) => {
            res.send({
                min: temp.min, 
                max: temp.max,
                date: req.body.date
            });
        },
        (_) => {
            console.error("Router: Underlying system issue");
            res.status(500).send({ "Internal Error" : "Our site encountered an issue"});
            next();
        }
    );
});

/*
    Retrieve high over period
*/
router.get("/getMaxTemp", function (req, res, next) {
    controller.getMaxTempOnRange(req.body.start, req.body.end).then(
        (result) => {
            res.send({
                startDate: req.body.start, 
                endDate: req.body.end,
                maxTemp: result
            });
        },
        (_) => {
            console.error("Router: Underlying system issue");
            res.status(500).send({ "Internal Error" : "Our site encountered an issue"});
            next();
        }
    );
});

module.exports = router;

