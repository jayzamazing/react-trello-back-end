var React = require('react');
var router = require('react-router');
var hashHistory = router.hashHistory;
var NavBarContainer = React.createClass({
  showBoards: function() {
    hashHistory.push('/');
  },
  render: function() {
    return (
      <nav className="navBar">
        <input type="button" onClick={this.showBoards} value="&#xf181; Boards"/>
      </nav>
    );
  }
});
var NavBar = React.createClass({
  render: function() {
    return (
      <section>
        <NavBarContainer />
        {this.props.children}
      </section>
    );
  }
});
module.exports = NavBar;
