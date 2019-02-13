const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userListRouter = require('./routes/userList.router');
const userRouter = require('./routes/user.router');
const onSiteRouter = require('./routes/onsite.router');
const mealCount = require('./routes/mealCount.router');
const reportRouter = require('./routes/report.router');
const locationRouter = require('./routes/location.router');
const categoryRouter = require('./routes/category.router');
const subCategoryRouter = require('./routes/subcategory.router');
const templateRouter = require('./routes/template.router');
const bulkDataRouter = require('./routes/bulkdata.router'); // stretch goal 

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/template', templateRouter);
app.use('/api/userList', userListRouter);
app.use('/api/user', userRouter);
app.use('/api/onsite', onSiteRouter);
app.use('/api/count', mealCount);
app.use('/api/report', reportRouter);
app.use('/api/category', categoryRouter);
app.use('/api/location', locationRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/bulkdata', bulkDataRouter); // empty for now stretch goal

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
