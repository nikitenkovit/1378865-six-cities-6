import React from 'react';
import {OfferTypes, PathValue} from "../../const";
import PropTypes from "prop-types";
import {Link, useRouteMatch} from "react-router-dom";
import {getRatingStarValue} from "../../utils/common";
import BookmarkButton from "../bookmark-button/bookmark-button";

const OfferCard = ({offer, handleMouseEnter, handleMouseLeave}) => {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;

  const match = useRouteMatch();
  const currentPathValue = match.path;

  const switchClassNames = () => {
    let currentClassNames = {};

    switch (currentPathValue) {
      case (PathValue.MAIN_SCREEN):
        currentClassNames = {
          articleClass: `cities__place-card`,
          wrapperClass: `cities__image-wrapper`,
          infoClass: ``
        };
        break;
      case (PathValue.FAVORITES_SCREEN):
        currentClassNames = {
          articleClass: `favorites__card`,
          wrapperClass: `favorites__image-wrapper`,
          infoClass: `favorites__card-info`
        };
        break;
      case (PathValue.ROOM_SCREEN):
        currentClassNames = {
          articleClass: `near-places__card`,
          wrapperClass: `near-places__image-wrapper`,
          infoClass: ``
        };
        break;
    }

    return currentClassNames;
  };

  return (
    <article className={`${switchClassNames().articleClass} place-card`}
      onMouseEnter={() => {
        if (currentPathValue === PathValue.MAIN_SCREEN) {
          handleMouseEnter(id);
        }
      }} onMouseLeave={() => {
        if (currentPathValue === PathValue.MAIN_SCREEN) {
          handleMouseLeave();
        }
      }}>

      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${switchClassNames().wrapperClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className={`${switchClassNames().infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite}/>
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
        <p className="place-card__type">{OfferTypes[type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.arrayOf(
        PropTypes.shape(PropTypes.string.isRequired)
    ),
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }),
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func
};

export default OfferCard;
