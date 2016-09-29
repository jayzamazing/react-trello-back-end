var chai = require('chai');
import actions from '../../../public/js/actions';
import reducer from '../../../public/js/reducers';
//use should
var should = chai.should();
    describe('trello reducer', () => {
      var boards;
      before(() => {
        boards =
            [{
                "_id": 1,
                "title": "blah",
                "cardsList": [{
                    "_id": 1,
                    "title": "something",
                    "cards": [{
                        "_id": 1,
                        "text": "ummmm"
                    }, {
                        "_id": 2,
                        "text": "food"
                    }]
                }, {
                    "_id": 2,
                    "title": "hungry",
                    "cards": [{
                        "_id": 3,
                        "text": "special"
                    }, {
                        "_id": 4,
                        "text": "taco"
                    }]
                }]
            }, {
                "_id": 2,
                "title": "shopping list",
                "cardsList": [{
                    "_id": 3,
                    "title": "groceries",
                    "cards": [{
                        "_id": 5,
                        "text": "apple"
                    }, {
                        "_id": 6,
                        "text": "pie"
                    }]
                }, {
                    "_id": 4,
                    "title": "clothes",
                    "cards": [{
                        "_id": 7,
                        "text": "pants"
                    }, {
                        "_id": 8,
                        "text": "shirt"
                    }]
                }]
            }];
      });
      after(() => {
        boards = [];
      })
        describe('BOARD_DESERIALIZATION', () => {
            let state;
            before(() => {
                state = reducer.trelloReducer(undefined, actions.boardDeserialization(boards));
            });
            it('should exist', () => {
              should.exist(state.boards);
              should.exist(state.cardsList);
              should.exist(state.cards);
            });
            it('should have properties', () => {
              state.boards.should.have.property('1');
              state.boards['1'].should.have.property('title');
              state.boards['1'].should.have.property('cardsList');
              state.cardsList.should.have.property('1');
              state.cardsList['1'].should.have.property('_id');
              state.cardsList['1'].should.have.property('title');
              state.cardsList['1'].should.have.property('cards');
              state.cards.should.have.property('1');
              state.cards['1'].should.have.property('_id');
              state.cards['1'].should.have.property('text');
            });
            it('should deserialize the order', () => {
              state.boards['1']._id.should.equal(1);
              state.boards['2'].title.should.equal('shopping list');
              state.boards['2'].cardsList.should.be.an('array')
                .to.include.members([3, 4]);
              state.cardsList['3']._id.should.equal(3);
              state.cardsList['3'].title.should.equal('groceries');
              state.cardsList['4'].cards.should.be.an('array')
                .to.include.members([7, 8]);
            });
        });
        describe('CREATE_BOARD_SUCCESS', () => {
            let state;
            before(() => {
                state = reducer.trelloReducer(undefined, actions.createBoardSuccess(boards));
            });
            it('should exist', () => {
              should.exist(state.boards);
              should.exist(state.cardsList);
              should.exist(state.cards);
            });
            it('should have properties', () => {
              state.boards.should.have.property('1');
              state.boards['1'].should.have.property('title');
              state.boards['1'].should.have.property('cardsList');
              state.cardsList.should.have.property('1');
              state.cardsList['1'].should.have.property('_id');
              state.cardsList['1'].should.have.property('title');
              state.cardsList['1'].should.have.property('cards');
              state.cards.should.have.property('1');
              state.cards['1'].should.have.property('_id');
              state.cards['1'].should.have.property('text');
            });
            it('should deserialize the order', () => {
              state.boards['1']._id.should.equal(1);
              state.boards['2'].title.should.equal('shopping list');
              state.boards['2'].cardsList.should.be.an('array')
                .to.include.members([3, 4]);
              state.cardsList['3']._id.should.equal(3);
              state.cardsList['3'].title.should.equal('groceries');
              state.cardsList['4'].cards.should.be.an('array')
                .to.include.members([7, 8]);
            });
        });
      });