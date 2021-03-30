'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Clothes = require('../models/clothes.js');
const clothes = new Clothes();
const router = express.Router();

router.post('/clothes',validator.typeValidator,createClothes);
router.get('/clothes',getClothes);
router.get('/clothes/:id',validator.idValidator, getClothesById);
router.put('/clothes/:id',validator.idValidator,validator.typeValidator, updateClothes);
router.delete('/clothes/:id',validator.idValidator, deleteClothes);

//Controller
function createClothes(req, res) {
  const clothesObject = req.body;
  const resObj = clothes.create(clothesObject);
  res.status(201).json(resObj);
}

function getClothes(req, res) {
  const resObj = clothes.read();
  res.json(resObj);
}

function getClothesById(req, res) {
  const resObj = clothes.read(req.params.id);
  res.json(resObj);
}

function updateClothes(req, res) {
  const clothesObject = req.body;
  const resObj = clothes.update(req.params.id, clothesObject);
  res.json(resObj);
}

function deleteClothes(req, res) {
  const resObj = clothes.delete(req.params.id);
  res.json(resObj);
}

module.exports = router;