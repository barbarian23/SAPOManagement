import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./screen/home/home.screen";
import Login from "./screen/login/login.screen";
import NoMatch from "./screen/nomatch/nomatch.screen";
import { CLIENT_LOGIN, CLIENT_HOME, NO_MATCH } from "./constants/common.constants";

class MainRouter extends React.Component {
    render() {
        return (
            <>
                <Route exact path={CLIENT_LOGIN} component={Login} /> 
                <Route path={CLIENT_HOME} component={Home} />
                <Route path={NO_MATCH} component={NoMatch} />
            </>
        );
    }
}
export default MainRouter;