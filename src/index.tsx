import React from "react";
import ReactDom from 'react-dom/client';
import './index.css';
import SocialJSApp from "./App";

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);
    root.render(<SocialJSApp/>);


