import Review from "../review/review";
import {nanoid} from "nanoid";
import React from "react";
import PropTypes from "prop-types";
import reviewProp from "../review/review.prop";

const ReviewsList = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={nanoid()} review={review}/>)}
      </ul>
    </>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp)
};

export default ReviewsList;
