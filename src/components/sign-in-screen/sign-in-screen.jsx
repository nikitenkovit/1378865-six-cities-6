import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Header from "../header/header";
import {useDispatch} from "react-redux";
import {login} from "../../store/api-actions/login/login";
import {AppRoute} from "../../const";
import '../reviews-form/style.css';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: ``,
    password: ``
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(login(formValue.email, formValue.password));
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue((state) => ({...state, [name]: value}));
  };

  const validateEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return reg.test(email);
  };

  const isValidityEmail = validateEmail(formValue.email);
  const isValidityPassword = formValue.password.length > 0;

  let needButtonDisable = !isValidityEmail || !isValidityPassword;

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post"
              onChange={handleFieldChange} onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email"
                  placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password"
                  name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button"
                type="submit" disabled={needButtonDisable}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.MAIN}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SignInScreen;
