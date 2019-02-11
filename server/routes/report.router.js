const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const moment = require('moment')

//GET Total
router.get('/total', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT SUM("count".meal_count) FROM "count"
WHERE "count".timestamp BETWEEN $1 AND $2;`;
    const queryValues = [
        report.startDate,
        report.endDate
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all meals


// Get all meals
router.get('/all', rejectUnauthenticated, (req, res) => {
        console.log('authenticated', req.isAuthenticated());
        const report=req.query;
        console.log(report);  
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
ORDER BY "count".timestamp ASC;`;
        const queryValues = [
            report.startDate,
            report.endDate
        ];
        pool.query(queryText, queryValues)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in reports GET error', error);
                res.sendStatus(500);
            })
});//end Get all meals

// Get all location meals
router.get('/alllocation', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".location_id = $3
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedLocation
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get location meals

// Get all category meals
router.get('/allcategory', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "meal_outlet_category".id = $3
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedCategory
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get category meals

// Get all location category meals
router.get('/alllocationcategory', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".location_id = $3 
AND "meal_outlet_category".id = $4
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedLocation,
        report.selectedCategory
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get location category meals

// Get all farm meals
router.get('/allfarm', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".farm = true
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all farm meals

// Get all farm location meals
router.get('/allfarmlocation', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".farm = true
AND "count".location_id = $3
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedLocation
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all farm location meals

// Get all farm category meals
router.get('/allfarmcategory', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".farm = true
AND "meal_outlet_category".id = $3
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedCategory
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all farm category meals

// Get all farm location category meals
router.get('/allfarmlocationcategory', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".farm = true
AND "count".location_id = $3 
AND "meal_outlet_category".id = $4
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedLocation,
        report.selectedCategory
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all farm location category meals




// Get all summer meals
router.get('/allsummer', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".summer = true
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all farm meals

// Get all summer location meals
router.get('/allsummerlocation', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".summer = true
AND "count".location_id = $3
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedLocation
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all summer location meals

// Get all summer category meals
router.get('/allsummercategory', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".summer = true
AND "meal_outlet_category".id = $3
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedCategory
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all summer category meals

// Get all summer location category meals
router.get('/allsummerlocationcategory', rejectUnauthenticated, (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const report = req.query;
    console.log(report);
    const queryText = `SELECT "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
AND "count".summer = true
AND "count".location_id = $3 
AND "meal_outlet_category".id = $4
ORDER BY "count".timestamp ASC;`;
    const queryValues = [
        report.startDate,
        report.endDate,
        report.selectedLocation,
        report.selectedCategory
    ];
    pool.query(queryText, queryValues)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});//end Get all summer location category meals

module.exports = router;