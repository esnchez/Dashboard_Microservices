//IMPORT DB CONNECTION
const db = require("./DBConnection");


class Employee {
    constructor() {}

    //report the error and prevent crashing my server. SUPER IMPORTANT 
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

    createEmployee(req, res) {
        const create = true;
        const name = req.body.Name;
        const surname = req.body.Surname;
        const dni = req.body.DNI;
        const salary = req.body.Salary;

        db.query(
            `INSERT INTO employees (Name, Surname, DNI, Salary) VALUES ("${name}","${surname}","${dni}","${salary}")`
            , (err, result) => {
                
                this.queryResult(err, result, res, create);
            }
        );
    }

    createEmployeePivot(req, res) {
        const create = true;
        const teamId = req.body.TeamId;
        const employeeId = req.body.EmployeeId;
        
        db.query(
            `INSERT INTO teams_employees (TeamId, EmployeeId) VALUES ("${teamId}","${employeeId}")`
            , (err, result) => {
                this.queryResult(err, result, res, create);
            }
        );
    }
}

module.exports = Employee;

