import React from 'react';
import {Link} from 'react-router-dom';
import {OfferType, BookmarkButtonProperty} from '../../const';
import {getRatingStarValue} from "../../utils/common";
import {nanoid} from "nanoid";
import PropTypes from "prop-types";
import ReviewForm from "../reviews-form/review-form";
import BookmarkButton from "../bookmark-button/bookmark-button";
import roomScreenProp from './room-screen.prop';
import reviewProp from '../review/review.prop';
import ReviewsList from "../reviews-list/reviews-list";
import Map from "../map/map";
import {OffersListClassName} from "../../const";
import OffersList from "../offers-list/offers-list";

const RoomScreen = ({offer, reviews, nearestOffers}) => {
  const {
    images,
    isPremium,
    title,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    location} = offer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((picture) =>
                <div key={nanoid()} className="property__image-wrapper">
                  <img className="property__image" src={picture} alt="Photo studio"/>
                </div>
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <BookmarkButton isFavorite={isFavorite} bookmarkButtonProperty={BookmarkButtonProperty.ROOM_SCREEN}/>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingStarValue(rating)}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferType[type.toUpperCase()]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedroom${parseInt(bedrooms, 10) > 1 ? `s` : ``}`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) =>
                    <li key={nanoid()} className="property__inside-item">
                      {item}
                    </li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro && `property__avatar-wrapper--pro`}`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <ReviewsList reviews={reviews}/>

                <ReviewForm/>

              </section>
            </div>
          </div>
          <section className="property__map map">

            <Map
              roomScreenOfferLocation={location}
              isRoomScreenMap={true}
              roomScreenOfferDescription={description}
            />

          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OffersList offers={nearestOffers} offersListClassName={OffersListClassName.NEAR_PLACES}/>

          </section>
        </div>
      </main>
    </div>
  );
};

RoomScreen.propTypes = {
  offer: roomScreenProp,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  nearestOffers: PropTypes.arrayOf(roomScreenProp)
};

export default RoomScreen;
