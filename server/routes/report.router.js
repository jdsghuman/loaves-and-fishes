const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const moment = require('moment')

// Get reports will need to change !!
router.get('/all', rejectUnauthenticated, (req, res) => {
    
        console.log('authenticated', req.isAuthenticated());
        const report=req.query;
        console.log(report);
        
    const queryText = `SELECT "meal_outlet_category".category_name, "count".timestamp, "count".meal_count, "count".farm, "count".summer, "location".location_name,
 "age".age_category, "gender".gender_name, "race".race_name FROM "count"
JOIN "location" ON "count".location_id = "location".id
LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
LEFT JOIN "age" ON "count".age_id = "age".id
LEFT JOIN "gender" ON "count".gender_id = "gender".id
LEFT JOIN "race" ON "count".race_id = "race".id
WHERE "count".timestamp BETWEEN $1 AND $2
ORDER BY "meal_outlet_category".id ASC;`;
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
      
        
    
});

// MULTIPLE GET ROUTES may be needed!!


module.exports = router;