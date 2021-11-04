import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import RTL from './components/RTL';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline />
        <App />
      </RTL>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
