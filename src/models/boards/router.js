'use strict';

import express from 'express';
import Board from './model';
import bodyParser from 'body-parser';
import {authenticated} from '../auth';
const Router = express.Router();
Router.use(bodyParser.json());


Router.post('/', authenticated, (req, res) => {
  if(!req.body) {
    res.status(400).json({message: 'No request body'});
  }
  if (!('title' in req.body)) {
    res.status(422).json({message: 'Missing field: title'});
  }
  let {title} = req.body;
  if (typeof title !== 'string') {
    res.status(422).json({message: 'Invalid field type: title'});
  }
  title = title.trim();
  if (title === '') {
    res.status(422).json({message: 'Incorrect field length: title'});
  }
  //store board title along with the owner of the board
  Board.
  create({title: title, owner: req.user._id})
  .then(board => {
    res.status(201).json(board.apiRepr());
  })
  .catch(err => {
    res.status(500).json({message: err});
  });
});
Router.get('/', authenticated, (req, res) => {
  //get all the boards that belong to this user
  Board
  .find({owner: req.user._id})
  .exec()
  .then(board => {
    res.json({
      board: board.map(
        (board) => board.apiRepr()
      )
    });
  })
  .catch(err => {
    res.status(500).json({message: err});
  });
});

Router.put('/:id', authenticated, (req, res) => {
  if (!req.params.id) {
    res.status(400).json({message: 'id field missing'});
  }
  //update a board that belongs to this user
  Board
  .findByIdAndUpdate(req.params.id, {$set: {title: req.body.title, updatedAt: Date.now()}})
  .exec()
  .then(() => {
    res.status(204).end();
  })
  .catch(err => {
    res.status(500).json({message: err});
  });
});

Router.delete('/:id', authenticated, (req, res) => {
  Board.findByIdAndRemove(req.params.id)
  .exec()
  .then(() => res.status(204).end())
  .catch((err) => res.status(500).json({message: err}));
});

Router.patch('/:id', authenticated, (req, res) => {
  //update only a part of the board
  Board
  .findByIdAndUpdate(req.params.id, {$push: {cardsList: req.body.id, updatedAt: Date.now()}})
  .exec()
  .then(() => {
    res.status(204).end();
  })
  .catch(err => {
    res.status(500).json({message: err});
  });
});
module.exports = Router;
