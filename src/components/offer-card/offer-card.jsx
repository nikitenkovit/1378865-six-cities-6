import React from 'react';
import {OfferType, BookmarkButtonProperty} from "../../const";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getRatingStarValue} from "../../utils/rating-star-value";
import BookmarkButton from "../bookmark-button/bookmark-button";
import roomScreenProp from '../room-screen/room-screen.prop';

const OfferCard = ({offerCardClassName, offer, isHoverHandler, onMouseEnter, onMouseLeave}) => {
  const {articleClass, wrapperClass, infoClass} = offerCardClassName;
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type, location} = offer;

  return (
    <article className={`${articleClass} place-card`}
      onMouseEnter={() => {
        if (isHoverHandler) {
          onMouseEnter(location);
        }
      }}
      onMouseLeave={() => {
        if (isHoverHandler) {
          onMouseLeave();
        }
      }}>

      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${wrapperClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className={`${infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite} bookmarkButtonProperty={BookmarkButtonProperty.OFFER_CARD}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{width: getRatingStarValue(rating)}}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OfferType[type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offerCardClassName: PropTypes.shape({
    articleClass: PropTypes.string.isRequired,
    wrapperClass: PropTypes.string.isRequired,
    infoClass: PropTypes.string.isRequired
  }).isRequired,
  offer: roomScreenProp,
  isHoverHandler: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default OfferCard;
