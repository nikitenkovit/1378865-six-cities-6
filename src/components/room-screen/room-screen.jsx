import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import * as redux from 'react-redux';
import {OfferType, BookmarkButtonProperty} from '../../const';
import {getRatingStarValue} from "../../utils/rating-star-value";
import {nanoid} from "nanoid";
import ReviewForm from "../reviews-form/review-form";
import BookmarkButton from "../bookmark-button/bookmark-button";
import ReviewsList from "../reviews-list/reviews-list";
import Map from "../map/map";
import {OffersListClassName, MAX_GALLERY_IMAGES} from "../../const";
import OffersList from "../offers-list/offers-list";
import Header from "../header/header";
import {fetchCurrentOffer} from "../../store/api-actions";
import SpinerScreen from "../spiner-screen/spiner-screen";
import {getIsNeedShowSpiner, getCurrentOffer, getOfferId, getReviews,
  getNearestOffers, getIsNeedShowNotFoundScreen} from "../../store/current-offer/selectors";
import {getIsAuthorized} from "../../store/user/selectors";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const RoomScreen = (props) => {
  const dispatch = redux.useDispatch();

  const needShowSpinner = useSelector(getIsNeedShowSpiner);
  const needShowNotFoundScreen = useSelector(getIsNeedShowNotFoundScreen);
  const id = getOfferId(props);
  const offer = useSelector(getCurrentOffer);
  const reviews = useSelector(getReviews);
  const nearestOffers = useSelector(getNearestOffers);
  const isAuthorized = useSelector(getIsAuthorized);

  useEffect(() => {
    dispatch(fetchCurrentOffer(id));
  }, [id]);

  if (needShowSpinner) {
    return (
      <SpinerScreen/>
    );
  } else if (needShowNotFoundScreen) {
    return (
      <NotFoundScreen/>
    );
  }

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
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_GALLERY_IMAGES).map((picture) =>
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
                <BookmarkButton
                  id={id}
                  isFavorite={isFavorite}
                  bookmarkButtonProperty={BookmarkButtonProperty.ROOM_SCREEN}
                />
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

                {isAuthorized && <ReviewForm id={id}/>}

              </section>
            </div>
          </div>
          <section className="property__map map">

            <Map
              offers={nearestOffers}
              isRoomScreenMap={true}
              currentCity={location}
              roomScreenOfferLocation={location}
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

export default RoomScreen;
