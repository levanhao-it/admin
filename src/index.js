import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import store from './components/app/store';

ReactDOM.render(
  <React.StrictMode>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <App />
            </SnackbarProvider>
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
