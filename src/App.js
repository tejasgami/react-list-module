import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/reduction.css";
import store from "./store";
import Users from "./pages/Users";
import PublicRoute from './routes/PublicRoute';

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <PublicRoute exact path="/" component={Users} />
                        <PublicRoute exact path="/users" component={Users} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
