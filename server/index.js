const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '17349517',
    database: 'employeeSystem',
});

app.post('/add_new_person', (req, res) => {
    const name = req.body.name
    const gender = req.body.gender
    const age = req.body.age
    const height = req.body.height
    const weight = req.body.weight
    const hair = req.body.hair
    const race = req.body.race
    const facial_hair = req.body.facial_hair
    const belt_color = req.body.belt_color
    const other_descriptor = req.body.other_descriptor

    db.query(
        'INSERT INTO jiujitsu_people (name, gender, age, height, weight, hair, race, facial_hair, belt_color, other_descriptor) VALUES (?,?,?,?,?,?,?,?,?,?)', 
        [name, gender, age, height, weight, hair, race, facial_hair, belt_color, other_descriptor], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("New person inserted.");
            }
        }
    );
});

app.get('/view_people', (req, res) => {
    let belt_color = req.query.new_belt_color;
    let gender = req.query.new_gender;
    let weight_greater = req.query.new_weight_greater;
    let weight_less = req.query.new_weight_less;

    var addition = "";
    if (belt_color != "Any" && belt_color != null && belt_color != "") {
        if (addition == "") { addition = " WHERE ";} else {addition = addition + " AND ";}
        addition = addition + "belt_color='" + belt_color + "'";
    }
    if (weight_greater != 0 && weight_greater != null) {
        if (addition == "") { addition = " WHERE ";} else {addition = addition + " AND ";}
        addition = addition + "weight>=" + weight_greater;
    }
    if (weight_less != 0 && weight_less != null) {
        if (addition == "") { addition = " WHERE ";} else {addition = addition + " AND ";}
        addition = addition + "weight<=" + weight_less;
    }
    if (gender != "Any" && gender != null && gender != "") {
        if (addition == "") { addition = " WHERE ";} else {addition = addition + " AND ";}
        addition = addition + "gender='" + gender + "'";
    }
    console.log('SELECT * FROM jiujitsu_people'+addition);
    db.query('SELECT * FROM jiujitsu_people'+addition, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.put('/update_belt_color', (req, res) => {
    const id = req.body.id;
    const this_belt_color = req.body.belt_color;
    if (this_belt_color != "") {
        db.query('UPDATE jiujitsu_people SET belt_color = ? WHERE id = ?', [this_belt_color, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    }
});

app.put('/update_descriptor', (req, res) => {
    const id = req.body.id;
    const other_descriptor = req.body.other_descriptor;
    if (other_descriptor != "") {
        db.query('UPDATE jiujitsu_people SET other_descriptor = ? WHERE id = ?', [other_descriptor, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    }
});

app.delete("/delete_person/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM jiujitsu_people WHERE id = ?", id,  (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001");
});

