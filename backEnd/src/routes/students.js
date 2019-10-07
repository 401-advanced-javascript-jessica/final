'use strict';

const express = require('express');
const studentRouter = express.Router();
const uuid = require('uuid/v1');

function compare(a, b) {
    a = a.score;
    b = b.score;
    if (a > b) {
        return -1;
    } else if (b > a) {
        return 1;
    }
}

let students = [
    {
        _id: '1',
      name: 'Jessica',
      score: 100
    },
    {
        _id: '2',
        name: 'Not Jessica',
        score: 80
    },
    {
        _id: '3',
        name: 'Also not Jessica',
        score: 90
    }

];

studentRouter.get('/scores', (req, res, next) => {
    students = students.sort(compare);
    console.log(students);
    res.status(200).send(students);
});

studentRouter.post('/scores', (req, res, next) => {
    req.body.score = parseInt(req.body.score, 10);
    let newStudent = req.body;
    newStudent._id = uuid();
    students.push(newStudent);
    let results = students.filter( (student) => req.params.value <= student.score);
    res.status(200).send(results);
});

studentRouter.delete('/scores/:id', (req, res, next) => {
    students = students.filter( (student) => req.params.id != student._id);
    res.send(students);
});

studentRouter.get('/scores-bigger-than/:value', (req, res, next) => {
    let results = students.filter( (student) => req.params.value <= student.score);
    res.status(200).send(results);
});

module.exports = studentRouter;