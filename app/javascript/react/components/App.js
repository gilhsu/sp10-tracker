import React from "react";
import "babel-polyfill";
import { browserHistory, Router, Route, Redirect } from "react-router";
import { HomeContainer } from "../containers/HomeContainer";

export const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={HomeContainer} />
      <Redirect from="*" to="/" />
    </Router>
  );
};

export default App;
