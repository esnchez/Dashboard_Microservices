// Settings
const express = require('express');
const router = express();
const dotenv = require("dotenv");
const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

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


//Init the models 

const Employee = require("../DataLayer/EmployeesModel");
const Team = require("../DataLayer/TeamsModel");
const Company = require("../DataLayer/CompaniesModel");

const DBEmployees = new Employee;
const DBTeams = new Team;
const DBCompanies = new Company;


//Routes
//Employees 

router.post("/api/employees/create", (req, res) => {
    DBEmployees.createEmployee(req, res);
});

router.post("/api/employees/create/pivot", (req, res) => {
    DBEmployees.createEmployeePivot(req, res);
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



dotenv.config();
//declare the port we gonna use
const port = process.env.SERVER_PORT;

//Then listen to the port. and console log the port which the router listen.
router.listen(port, () => console.log("listening on port " + port));

