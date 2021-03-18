import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/api-actions/login/login";
import {getIsNeedShowError} from "../../store/user/selectors/selectors";
import {AppRoute} from "../../const";
import {showError} from "../../utils/show-error/show-error";
import './error.css';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const formRef = useRef();
  const needShowError = useSelector(getIsNeedShowError);

  const [isNoRequestError, setIsNoRequestError] = useState(true);

  const [formValue, setFormValue] = useState({
    email: ``,
    password: ``
  });

  const validateEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return reg.test(email);
  };

  const isValidityEmail = validateEmail(formValue.email);
  const isValidityPassword = formValue.password.length > 0;

  let isFormValid = isValidityEmail && isValidityPassword;

  useEffect(() => {
    if (needShowError) {
      setIsNoRequestError(false);
      showError(formRef.current);
    }
    setIsNoRequestError(true);
  }, [needShowError]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (isNoRequestError && isFormValid) {
      dispatch(login(formValue.email, formValue.password));
    }
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue((state) => ({...state, [name]: value}));
  };

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form ref={formRef} className="login__form form" action="#" method="post"
              onChange={handleFieldChange} onSubmit={handleFormSubmit}>
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
                type="submit">Sign in</button>
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
