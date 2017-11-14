import React, { Component } from "react";
import Avatar from "../Avatar/avatar";
import BigButton from "../Button";
import { spotifyImplicitAuth } from "../../javascripts/helpers.js";
import logo from "./synthetic-logo@2x.png";

class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <div className="app-header-title">
          <div style={{ display: "flex" }}>
            <img
              alt="synthetic logo"
              src={logo}
              style={{ height: 50, width: 200 }}
            />
          </div>
        </div>
        <div className="login-section">
          {this.props.params.access_token ? (
            <Avatar me={this.props.me} />
          ) : (
            <BigButton
              type="button"
              id="login-button"
              className="loginButton"
              value="Login"
              onClick={() => spotifyImplicitAuth(this.props.params)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Header;
