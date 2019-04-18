import React, { Component } from "react";
import "./App.css";
import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductsList from "./containers/products-list";
import EditProduct from "./containers/edit-product";

const store = createStore(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ProductsList} />
            <Route path="/edit-product/:id" component={EditProduct} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
