var React = require('react');
var ReactDOM = require('react-dom');
//function to render text
var Card = function(props) {
    return (
        <div className="card">
            <div className="card-text">
                {props.text}
            </div>
        </div>
    );
};
//function to create an input component
var Input = function(props) {
  return <input type="text" onChange={props.onChange} placeholder={props.placeholder} name={props.name}></input>;
};
//function to create submit input component
var Submit = function(props) {
  return <input type="submit" onClick={props.onClick}></input>;
};
//function to render multiple cards
var List = React.createClass({
  onAddInputChanged: function() {
    console.log('inside onaddinputchanged');
  },
  onAddSubmit: function() {
    console.log('inside onaddsubmit');
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    var cards = this.props.card.map((elem, index) => {
        return (<Card key={elem.key} text={elem.text}/>)
    });
    return (
      <div className="list">
          <div className="list-name">
              <h3>{this.props.title}</h3>
          </div>
          <div className="list-cards">
              {cards}
          </div>
          <div className="list-form-section" onSubmit={this.handleSubmit}>
            <form className="list-form">
              <Input onChange={this.onAddInputChanged} />
              <Submit onClick={this.onAddSubmit} />
            </form>
          </div>
      </div>
    );
  }
})
//function to render multiple lists of cards
var Board = function(props) {
    var list = props.cardsList.map((elem) => {
        return (<List title={elem.title} card={elem.cards} key={elem.key}/>)
    });
    return (
        <div className="board">
            <div className="board-name">
                <h1>{props.title}</h1>
            </div>
            <div className="board-list">
                {list}
            </div>
        </div>
    );
};
Board.defaultProps = {
    title: 'blah',
    cardsList: [
        {
            key: 1,
            title: 'something',
            cards: [
                {
                    key: 1,
                    text: 'ummmm'
                }, {
                    key: 2,
                    text: 'food'
                }
            ]
        },
        {
            key: 2,
            title: 'hungry',
            cards: [
                {
                    key: 1,
                    text: 'special'
                }, {
                    key: 2,
                    text: 'taco'
                }
            ]
        }
    ]
};
//render the data onto div with id app
document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Board />, document.getElementById('app'));
});
