import {NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import React, { ComponentType } from "react";

export type WithRouteComponentProps<P> = {
    router: router<P>
    location: Location
    navigate:NavigateFunction
}

export type router<P> = {
    params: P
}

export function withRouter<WCP> (WrappedComponent: ComponentType<WCP>) {

    let ComponentWithRouterProp = (props:WCP) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <WrappedComponent
                {...props}
                router={{location, navigate, params}}
            />
        );
    }
    return ComponentWithRouterProp;
}
