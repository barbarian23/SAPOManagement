import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home, Login } from "./screen";
import { CLIENT_LOGIN, CLIENT_HOME, NO_MATCH } from "./constants/common.constants";

class MainRouter extends React.Component {
    render() {
        return (
            <>
                <Route path={CLIENT_HOME} component={Home} />
                <Route exact path={CLIENT_LOGIN} component={Login} /> 
                {/* dùng khi router không match, để pending  <Route path={NO_MATCH} component={NoMatch} /> */}
            </>
        );
    }
}
export default MainRouter;