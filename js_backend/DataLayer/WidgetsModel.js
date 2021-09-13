//IMPORT DB CONNECTION
const db = require("./DBConnection");

// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');
const secret = 'superSecret'

class Widget {
    constructor() {

    }
    //CREATE THE FUNCTIONS

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

    loginQueryResult(err, result, res) {
        const answer = {
            data: null,
            status: 200,
            error: null,
        }
        if (err) {
            res.status(400).json(err);
            return;
        }
        if (result.length == 0) {
            res.status(204).json();
            return;
        }
        answer.data = result; //Result of the query
        res.status(answer.status).json(answer); //Server response (status and answer)
    }


    checkBodyId(req, res) {
        let err = { "code": 500, "msg": "" };
        if (req.body.id == undefined) {
            err["msg"] = "missing params"
            res.status(400).json(err);
            return false;
        }
        return true;
    }

    checkParam(req, res) {
        let err = { "code": 500, "msg": "" };
        if (req.params.id == undefined) {
            err["msg"] = "missing params"
            res.status(400).json(err);
            return false;
        }
        return true;
    }

    checkAllParams(req, res) {
        let err = { "code": 500, "msg": "" };
        if (req.body.name === undefined || req.body.email == undefined || req.body.password == undefined || req.body.password1 == undefined || req.body.address == undefined || req.body.cp == undefined || req.body.author_id == undefined || req.body.role == undefined) {
            err["msg"] = "missing params"
            res.status(400).json(err);
            return false;
        }
        return true;
    }



    userExist(err, res) {
        if (err) {
            if (err.errno === 1062) {
                const msg = { code: 200, msg: { exist: "User already exists" } }
                res.status(200).json(msg);
                return false;
            }
        }
        return true;
    }

    checkLoginInfo(req, res) {
        // err instanceof SyntaxError && err.status === 400 && 'body' in err
        let err = { "code": 400, "msg": "" };
        if (req.body.name == undefined || req.body.password == undefined) {
            err["msg"] = "missing params"
            res.status(400).json(err);
            return false;
        }
        return true;
    }



    getWidgets(req, res) {
        if (req.params.id !== undefined) { //Get one user
            db.query(
                `select * from widgets where id=${req.params.id}`, (err, result) => {
                    this.queryResult(err, result, res);
                }
            );
        }
        else { //Get all widgets
            db.query(
                "select * from widgets", (err, result) => {
                    this.queryResult(err, result, res);
                }
            );
        }
    }


    getOneWidget(req, res) {
        db.query(
            `select name, uri, apiKey, param_name, param_value from widgets left join widget_param on widgets.id=widget_param.widget_id where widgets.name = "${req.params.name}" `, (err, result) => {
                this.queryResult(err, this.parseToJson(result), res);
            }
        );
    }


    getAllWidgets(req, res) {
        db.query(
            `select id, name, uri, apiKey, param_name, param_value from widgets left join widget_param on widgets.id=widget_param.widget_id `, (err, result) => {
                this.queryResult(err, this.parseToJson(result), res);
            }
        );
    }

    getWidgetsByUser(req, res) {
        db.query(
            `select name from widgets inner join widget_user on widgets.id=widget_user.id_widget where widget_user.user_id=${req.params.id}`, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //Get last id
    getLastId(res) {
        db.query(
            "select id from users order by id desc limit 1", (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //create a single user to database.
    insertWidgetUser(req, res) {
        const create = true;
        db.query(
            `insert into widget_user (user_id,  id_widget) values (${req.body.user_id}, ${req.body.id_widget})`, (err, result) => {
                this.queryResult(err, result, res, create);
            }
        );
    }

    deleteWidgetUser(req, res) {
        db.query(
            `delete from widget_user where user_id = ${req.body.user_id} and id_widget = ${req.body.id_widget}`, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }


    deleteUser(req, res) {
        if (this.checkBodyId(req, res)) {
            const id = req.body.id;
            db.query(
                `delete from users where id=${id}`, (err, result) => {
                    this.queryResult(err, result, res);
                    if (result.affectedRows === 1) {
                        this.deletePivot(id);
                    }
                }
            );
        }
    }


    parseToJson(data) {
        let json = {
            widgets: []
        };
        for (let i = 0; i < data.length; i++) {
            data[i]["params"] = [];
            let obj = { [data[i].param_name]: data[i].param_value };
            for (let tr = 0, j = i + 1; j < data.length; j++) {
                if (data[i].name === data[j].name) {

                    obj[data[j].param_name] = data[j].param_value;
                    data.splice(j, 1);
                    j--;
                    tr++;
                }
            }
            data[i]["params"] = obj;
            json.widgets = data;
        }
        //Delete the Keys that we dont want
        for (let i = 0; i < json.widgets.length; i++) {
            delete json.widgets[i].param_name;
            delete json.widgets[i].param_value;
        }
        return json;
    }
}

module.exports = Widget;

