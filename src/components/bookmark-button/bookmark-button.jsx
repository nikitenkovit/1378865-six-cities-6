import React from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {FavoriteStatus} from "../../const";
import BookmarkButtonProp from "./bookmark-button.prop";
import {sendFavoriteStatus} from "../../store/api-actions";

const BookmarkButton = ({id, isFavorite, bookmarkButtonProperty}) => {
  const setStatus = (status) => {
    return status ? FavoriteStatus.FALSE : FavoriteStatus.TRUE;
  };

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(sendFavoriteStatus(id, setStatus(isFavorite)));
  };

  return (
    <button className={`${isFavorite
      ? bookmarkButtonProperty.buttonClass + ` ` + bookmarkButtonProperty.buttonClass + `--active`
      : bookmarkButtonProperty.buttonClass} button`}
    type="button"
    onClick={handleButtonClick}>
      <svg className={`${bookmarkButtonProperty.iconClass}`}
        width={bookmarkButtonProperty.iconWidth}
        height={bookmarkButtonProperty.iconHeight}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

BookmarkButton.propTypes = {
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  bookmarkButtonProperty: BookmarkButtonProp
};

export default BookmarkButton;
