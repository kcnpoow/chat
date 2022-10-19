const React = require('react');
const ReactDOM = require('react-dom/client');
const { BrowserRouter } = require('react-router-dom');

const App = require('./src/App');

ReactDOM.createRoot(
  document.getElementById('app')
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);