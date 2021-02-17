import React from 'react';
import {OfferType, PathValue, BookmarkButtonProperty} from "../../const";
import PropTypes from "prop-types";
import {Link, useRouteMatch} from "react-router-dom";
import {getRatingStarValue, getOfferCardClassNames} from "../../utils/common";
import BookmarkButton from "../bookmark-button/bookmark-button";
import roomOfferProp from '../room-screen/room-offer-prop';
import BookmarkButtonPropertyProp from "../bookmark-button/bookmark-button-property.prop";

const OfferCard = ({offer, onMouseEnter, onMouseLeave}) => {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;

  const match = useRouteMatch();
  const currentPathValue = match.path;

  return (
    <article className={`${getOfferCardClassNames(currentPathValue).articleClass} place-card`}
      onMouseEnter={() => {
        if (currentPathValue === PathValue.MAIN_SCREEN) {
          onMouseEnter(id);
        }
      }} onMouseLeave={() => {
        if (currentPathValue === PathValue.MAIN_SCREEN) {
          onMouseLeave();
        }
      }}>

      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${getOfferCardClassNames(currentPathValue).wrapperClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className={`${getOfferCardClassNames(currentPathValue).infoClass} place-card__info`}>
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
  offer: roomOfferProp,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
BookmarkButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  bookmarkButtonProperty: BookmarkButtonPropertyProp
};

export default OfferCard;
