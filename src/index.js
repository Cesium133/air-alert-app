import React from 'react';
import ReactDOM from 'react-dom';
import CalciteThemeProvider from 'calcite-react/CalciteThemeProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CalciteThemeProvider>
      <App />
    </CalciteThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
