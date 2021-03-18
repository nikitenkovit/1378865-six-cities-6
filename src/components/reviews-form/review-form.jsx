import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {sendComment} from "../../store/api-actions/send-comment/send-comment";
import {UserCommentLength, SHAKE_ANIMATION_TIMEOUT} from "../../const";
import {getStatus, getIsNeedDisableForm,
  getIsNeedToClearForm, getIsNeedShowError} from "../../store/comment-status/selectors/selectors";
import './style.css';

const ReviewForm = ({id}) => {
  const dispatch = useDispatch();

  const formRef = useRef();
  const sendingStatus = useSelector(getStatus);
  const needDisableForm = useSelector(getIsNeedDisableForm);
  const needToClearForm = useSelector(getIsNeedToClearForm);
  const needShowError = useSelector(getIsNeedShowError);

  const [formValue, setFormValue] = useState({
    review: ``,
    rating: ``
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(sendComment(id, formValue.review, formValue.rating));
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;

    setFormValue((state) => ({...state, [name]: value}));
  };

  const showError = (element) => {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      element.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  useEffect(() => {
    if (needToClearForm) {
      formRef.current.reset();
    }

    if (needShowError) {
      showError(formRef.current);
    }
  }, [sendingStatus]);

  const needButtonDisable = formValue.review.length < UserCommentLength.MIN
    || formValue.review.length > UserCommentLength.MAX || formValue.rating.length === 0;

  return (
    <form
      style={{pointerEvents: `${needDisableForm ? `none` : `auto`}`}}
      ref={formRef}
      onChange={handleFieldChange}
      onSubmit={handleSubmit}
      className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden"
          name="rating" value="5" id="5-stars" type="radio" required={true}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating" value="4" id="4-stars" type="radio" required={true}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating" value="3" id="3-stars" type="radio" required={true}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating" value="2" id="2-stars" type="radio" required={true}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating" value="1" id="1-star" type="radio" required={true}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        minLength={UserCommentLength.MIN}
        maxLength={UserCommentLength.MAX}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          type="submit" disabled={needButtonDisable}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired
};

export default ReviewForm;
