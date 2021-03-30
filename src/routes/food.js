'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Food = require('../models/food.js');
const food = new Food();
const router = express.Router();

router.post('/food',validator.typeValidator,createfood);
router.get('/food',getfood);
router.get('/food/:id',validator.idValidator, getfoodById);
router.put('/food/:id',validator.idValidator,validator.typeValidator, updatefood);
router.delete('/food/:id',validator.idValidator, deletefood);

//Controller
function createfood(req, res) {
  const foodObject = req.body;
  const resObj = food.create(foodObject);
  res.status(201).json(resObj);
}

function getfood(req, res) {
  const resObj = food.read();
  res.json(resObj);
}

function getfoodById(req, res) {
  const resObj = food.read(req.params.id);
  res.json(resObj);
}

function updatefood(req, res) {
  const foodObject = req.body;
  const resObj = food.update(req.params.id, foodObject);
  res.json(resObj);
}

function deletefood(req, res) {
  const resObj = food.delete(req.params.id);
  res.json(resObj);
}

module.exports = router;