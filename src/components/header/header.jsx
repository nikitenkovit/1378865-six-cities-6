import React from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getUser} from "../../store/user/selectors";
import {logout} from "../../store/api-actions";

const Header = ({isFavoriteScreen}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleLogoutClick = (evt) => {
    evt.preventDefault();

    dispatch(logout());
  };

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
            <ul className="header__nav-list" style={{flexDirection: `column`, alignItems: `flex-end`}}>
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                  {user ? <div className="header__avatar-wrapper user__avatar-wrapper"
                    style={{backgroundImage: `url(${user.avatarUrl})`}}
                  >
                  </div> : null}
                  <span className="header__user-name user__name">{user ? user.email : `Sign in`}</span>
                </Link>
              </li>
              {isFavoriteScreen &&
                <li className="header__nav-item user" style={{marginLeft: `15px`}}>
                  <a className="header__nav-link header__nav-link--profile">
                    <span onClick={handleLogoutClick}
                      className="header__user-name user__name">Logout</span>
                  </a>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isFavoriteScreen: PropTypes.bool
};

export default Header;
