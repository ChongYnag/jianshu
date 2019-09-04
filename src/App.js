import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./components/header";
import { Provider } from 'react-redux';
import store from "./store/index";
import Home from './pages/home';
import Detail from './pages/detail';
import Login from './pages/login';
import Write from './pages/write';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
          <Route path="/detail/:id" exact component={Detail} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
