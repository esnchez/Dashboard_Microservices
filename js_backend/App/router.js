//use express
const express = require('express');
const router = express();

// import compression from 'compression' //auth
// import morgan from 'morgan' //auth

const compression = require('compression');
const morgan = require('morgan');
const dotenv = require("dotenv");
const helmet = require("helmet");
const { checkJwt } = require('../auth/check-jwt');



const User = require("../DataLayer/UsersModel");
const Widget = require("../DataLayer/WidgetsModel");
const Employee = require("../DataLayer/EmployeesModel");
const Team = require("../DataLayer/TeamsModel");
const Company = require("../DataLayer/CompaniesModel");




const DBusers = new User;
//const DBwidgets = new Widget;
const DBEmployees = new Employee;
const DBTeams = new Team;
const DBCompanies = new Company;



router.use(helmet());

const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.use(compression()) //auth
router.use(morgan('dev')) //auth

router.use(cors({ origin: true }));


router.use((err, req, res, next) => {

    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        let err = { "code": 400, "msg": "Invalid JSON" }
        return res.status(err.code).json(err); // Bad request
    }
    next();
});





router.get("/api/users/id/:id", (req, res) => {
    DBusers.getUsers(req, res);
});
router.get("/api/users/email/:email", (req, res) => {
    DBusers.getUserByMail(req, res);
});
router.get("/api/users/last-id", (req, res) => {
    DBusers.getLastId(res);
});
router.get("/api/users/incoming/author/:id", (req, res) => {
    DBusers.getIncoming(req, res);
});
router.post('/api/users/create', (req, res) => {
    DBusers.createUser(req, res);
});
router.delete('/api/users/delete', (req, res) => {
    DBusers.deleteUser(req, res);
});
router.post('/api/users/update', (req, res) => {
    DBusers.updateUser(req, res);
});

router.post('/api/users/login', (req, res) => {
    DBusers.loginUser(req, res);
});

router.post('/api/users/token', (req, res) => {
    DBusers.getToken(req, res);
});

router.post("/api/users/auth", (req, res) => {
    DBusers.auth(req, res);
});

//Employees 
router.get("/api/employees", (req, res) => {
    DBEmployees.getEmployees(req, res);
});

router.post("/api/employees/create", (req, res) => {
    DBEmployees.createEmployee(req, res);
});


//Teams

router.get("/api/teams", (req, res) => {
    DBTeams.getTeams(req, res);
});

router.get("/api/teams/:id", (req, res) => {
    DBTeams.getTeamEmployees(req, res);
});

//Companies

router.get("/api/companies", (req, res) => {
    DBCompanies.getCompanies(req, res);
});

router.get("/api/companies/:id", (req, res) => {
    DBCompanies.getCompanyTeams(req, res);
});


//Widgets
// router.get("/api/widgets/", (req, res) => {
//     DBwidgets.getAllWidgets(req, res);
// });
// router.get("/api/widgets/:name", (req, res) => {
//     DBwidgets.getOneWidget(req, res);
// });
// router.get("/api/widgets/user/:id", (req, res) => {
//     DBwidgets.getWidgetsByUser(req, res);
// });
// router.post("/api/widgets/insert", (req, res) => {
//     DBwidgets.insertWidgetUser(req, res);
// });
// router.post("/api/widgets/delete", (req, res) => {
//     DBwidgets.deleteWidgetUser(req, res);
// });



dotenv.config();
//declare the port we gonna use
const port = process.env.SERVER_PORT;

//Then listen to the port. and console log the port which the router listen.
router.listen(port, () => console.log("listening on port " + port));


// module.exports = router;