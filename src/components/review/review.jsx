import React from 'react';
import {getRatingStarValue} from "../../utils/common";
import reviewProp from './review.prop';

const Review = ({review}) => {
  const {comment, date, rating, user} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingStarValue(rating)}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {new Date(date).toLocaleString(`en-US`, {year: `numeric`, month: `long`})}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewProp,
};

export default Review;
