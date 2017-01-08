var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var NavBar = require('./navbar');
var Boards = require('./boards');
var Cardslist = require('./cardslist');
var store = require('./store');
//render the data onto div with id app
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <Provider store={store}>
          <Router history={hashHistory}>
            <Route path='/' component={NavBar}>
              <IndexRoute component={Boards.Container} />
              // <Route path='/:boardId/:boardName' component={Cardslist.Container} />
            </Route>
          </Router>
      </Provider>,
      document.getElementById('app'));
});
