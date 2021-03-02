import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUser} from "../../store/user/selectors";
import headerProptypes from './header.props';

const Header = ({user}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                  {user ? <div className="header__avatar-wrapper user__avatar-wrapper"
                    style={{backgroundImage: `url(${user.avatarUrl})`}}
                  >
                  </div> : null}
                  <span className="header__user-name user__name">{user ? user.email : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: headerProptypes
};

const mapStateToProps = (state, props) => ({
  ...props,
  user: getUser(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
