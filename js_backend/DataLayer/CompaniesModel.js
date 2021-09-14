const db = require("./DBConnection");

class Company {
    constructor() { }

    queryResult(err, result, res, create) {
        //200 OK, 201 Created, 403 Forbidden, 500 Internal Server Error, 400 Bad Request
        let a = 200;
        if (create) {
            a = 201;
        }
        const answer = {
            data: null,
            status: a,
            error: null,
        }
        if (err) {
            res.status(400).json(err);
            return;
        }
        answer.data = result; //Result of the query
        res.status(answer.status).json(answer); //Server response (status and answer) 
    }

    getCompanies(req, res) {
        db.query("select * from companies", (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    getCompanyTeams(req, res) {
        db.query(`SELECT * FROM teams LEFT JOIN companies_teams ON teams.TeamId = companies_teams.TeamId WHERE companies_teams.CompanyId = "${req.params.id}"`, (err, result) => {
            this.queryResult(err, result, res);
        })
    }
}

module.exports = Company;
