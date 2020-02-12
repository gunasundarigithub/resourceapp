import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CallbackPage from "./Components/callback";
import App from './App';


function App() {
  return (
    <div className="App container">
      <div className="jumbotron">
        <Router>
          <Switch>
            <Route path="/App" component={App}/>
            <Route path="/callback" component={CallbackPage}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;