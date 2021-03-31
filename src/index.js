import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store"
import { BrowserRouter as Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  // this gives any component that needs the state accessto it
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
