import Review from "../review/review";
import React from "react";
import PropTypes from "prop-types";
import reviewProp from "../review/review.prop";
import {MAX_REVIEWS} from "../../const";

const ReviewsList = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">
        {Math.min(reviews.length, MAX_REVIEWS)}</span></h2>
      <ul className="reviews__list">
        {reviews
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .slice(0, MAX_REVIEWS)
          .map((review) => <Review key={review.id} review={review}/>)}
      </ul>
    </>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp)
};

export default ReviewsList;
