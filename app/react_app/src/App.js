import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux configuration
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

// Private Route
import PrivateRoute from "./components/common/privateRoute";

// Public Routes
import Home from "./components/pages/public/Home";
import Login from "./components/pages/public/Login";

// Articles
import Articles from "./components/pages/articles/Articles";
import NewArticle from "./components/pages/articles/NewArticle";
import Article from "./components/pages/articles/Article";
import EditArticle from "./components/pages/articles/EditArticle";

import { checkAppStatus } from "./utils/appFunctions";
checkAppStatus(store);

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>

          <Switch>
            <PrivateRoute exact path="/articulos" component={Articles} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/articulos/:id" component={Article} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/nuevo_articulo" component={NewArticle} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/editar_articulo/:id"
              component={EditArticle}
            />
          </Switch>
        </React.Fragment>
      </Router>
    </ReduxProvider>
  );
}

export default App;
