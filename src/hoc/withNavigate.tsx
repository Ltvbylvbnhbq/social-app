import React from "react";
import { useNavigate } from 'react-router-dom';

export function  withNavigate <WCP> (WrappedComponent: React.ComponentType<WCP>) {
    let RedirectTo = (props: WCP) => {
        return < WrappedComponent {...props} navigate={useNavigate() } />
    }
    return RedirectTo;
}