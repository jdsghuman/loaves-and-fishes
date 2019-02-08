const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('user ----', req.user);
  if(req.isAuthenticated) {
      const queryText = `INSERT INTO "count" ("meal_count", "timestamp", "summer", "farm", "location_id", "gender_id", "race_id", "age_id")
                      VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;

      const newCount = req.body;
      console.log('newCount ---- ', newCount);
      const queryValues = [
        newCount.count, 
        newCount.time, 
        newCount.summer,
        newCount.farm, 
        newCount.location,
        newCount.selectedGender,
        newCount.selectedRace,
        newCount.selectedAge,
    ];
      pool.query(queryText, queryValues).then(result => {
          res.sendStatus(204);
      }).catch(error => {
          console.log(`Error adding meal counts ${error}`);
          res.sendStatus(500);
      })
  } else {
      res.sendStatus(403);
  }
})

router.post('/adult', rejectUnauthenticated, (req, res) => {
    if(req.isAuthenticated) {
        const queryText = `INSERT INTO "count" ("meal_count", "timestamp", "summer", "farm", "location_id", "gender_id", "race_id", "age_id")
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
  
        const newCount = req.body;
        console.log('newCount ---- ', newCount);
        const queryValues = [
          newCount.count = newCount.genericAdult, 
          newCount.time, 
          newCount.summer,
          newCount.farm, 
          newCount.location,
          newCount.selectedGender,
          newCount.selectedRace,
          newCount.selectedAge = newCount.selectedAgeAdult
      ];
      console.log('query values ------ ', queryValues);
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log(`Error adding meal counts ${error}`);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

router.post('/child', rejectUnauthenticated, (req, res) => {
    if(req.isAuthenticated) {
        const queryText = `INSERT INTO "count" ("meal_count", "timestamp", "summer", "farm", "location_id", "gender_id", "race_id", "age_id")
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
  
        const newCount = req.body;
        console.log('newCount ---- ', newCount);
        const queryValues = [
          newCount.count = newCount.genericChild, 
          newCount.time, 
          newCount.summer,
          newCount.farm, 
          newCount.location,
          newCount.selectedGender,
          newCount.selectedRace,
          newCount.selectedAge = newCount.selectedAgeChild
      ];
      console.log('query values ------ ', queryValues);
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log(`Error adding meal counts ${error}`);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router; 