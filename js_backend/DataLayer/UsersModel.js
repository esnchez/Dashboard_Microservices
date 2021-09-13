//IMPORT DB CONNECTION
const db = require("./DBConnection");

// import jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');
const secret = 'superSecret'

class User {
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

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
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

    getIncoming(req, res) {
        if (this.checkParam(req, res)) {
            db.query(
                `select * from users where incoming = 1 and author_id=${req.params.id}`, (err, result) => {
                    this.queryResult(err, result, res);
                }
            );
        }
    }

    getUsers(req, res) {
        if (req.params.id !== undefined) { //Get one user
            db.query(
                `select * from users where id=${req.params.id}`, (err, result) => {
                    this.queryResult(err, result, res);
                }
            );
        }
        else { //Get all users
            db.query(
                "select * from users", (err, result) => {
                    this.queryResult(err, result, res);
                }
            );
        }
    }

    loginUser(req, res) {
        if (this.checkLoginInfo(req, res)) {
            const name = req.body.name;
            const password = req.body.password;
            db.query(
                `select * from users where name = "${name}" and password = "${password}" `, (err, result) => {
                    this.loginQueryResult(err, result, res);
                }
            );
        }
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
    createUser(req, res) {
        const create = true;
        const email = req.body.email;
        db.query(
            `insert into users (email) values ("${email}")`, (err, result) => {
                if (this.userExist(err, res)) {
                    this.queryResult(err, result, res, create);
                }
            }
        );
    }

    getUserByMail(req, res) {
        db.query(
            `select * from users where email = "${req.params.email}"`, (err, result) => {
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

    updateUser(req, res) {

        if (this.checkBodyId(req, res) && this.checkAllParams(req, res) && this.userAuth(req, res)) {
            //Better on an array/object --> const user = req.body --> user.name
            const id = req.body.id;
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const address = req.body.address;
            const cp = req.body.cp;
            const author_id = req.body.author_id;
            const role = req.body.role;
            db.query(
                `update users set name = "${name}", email = "${email}", password = "${password}", address = "${address}", cp = "${cp}", author_id = "${author_id}", role = "${role}" where id=${id}`, (err, result) => {
                    if (this.userExist(err, res)) {
                        this.queryResult(err, result, res);
                    }
                }
            );
        }


    }

    getToken(req, res) {
        db.query(
            `select * from users where email = "${req.body.email}" and password = "${req.body.password}" `, (err, result) => {
                var user = {};
                user.email = result[0].email;
                user.password = result[0].password;

                if (user.email != req.body.email) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }
                else if (user) {
                    // check if password matches
                    if (user.password != req.body.password) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.json({
                            success: true,
                            data: { email: user.email, name: user.name },
                            token: token
                        });
                    }
                }
            }
        );
    }

    auth(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    // next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
        res.json({
            success: true,
            data: req.decoded
        })
    }
}

module.exports = User;

