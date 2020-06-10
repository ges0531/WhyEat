import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Main from "./Main";
import Information from "../src/components/UserPage/01Information";
import PriceResult from "../src/components/UserPage/02PriceResult";
import History from "../src/components/UserPage/03History";
import Logout from "../src/components/UserPage/Logout";
import "./App.css";
import "./Page.css";
interface State {
  isLogin: boolean;
  actions: {
    onLogin: () => void;
    // onLogout: (string:string) => void,
  };
}
// export const contextStorage = React.createContext({});
class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: this.isLogin(),
      actions: {
        onLogin: this.onLogin,
        // onLogout: this.onLogout,
      },
    };
  }
  setStateAsync(state: object) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  isLogin = (): boolean => {
    const _id = window.sessionStorage.getItem("id");
    if (_id) {
      return true;
    }
    return false;
  };

  onLogin = async () => {
    sessionStorage.setItem("mode", "home");
    await this.setStateAsync({
      isLogin: this.isLogin(),
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Main} />
        <Route path="/information" component={Information} />
        <Route path="/history" component={History} />
        <Route path="/priceresult" component={PriceResult} />
        <Route path="/logout" component={Logout} />
      </div>
    );
  }
}
export default withRouter(App);
