import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import "react-image-gallery/styles/scss/image-gallery.scss";
import { PersistGate } from "redux-persist/lib/integration/react.js";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider >
  // </React.StrictMode>,
)
