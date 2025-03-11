import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./Components/redux/store.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    <Toaster position='top-right'/>
    </Provider>
 
)
