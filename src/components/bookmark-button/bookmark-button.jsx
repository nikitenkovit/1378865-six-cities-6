import React, {useState} from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import BookmarkButtonProp from "./bookmark-button.prop";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {AuthorizationStatus} from "../../const";
import browserHistory from "../../history";

const BookmarkButton = ({isFavorite, bookmarkButtonProperty}) => {
  const [isActiveBookmark, setIsActiveBookmark] = useState(isFavorite);

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isNotAuthorized = authorizationStatus !== AuthorizationStatus.AUTH;

  const handleButtonClick = () => {
    if (isNotAuthorized) {
      browserHistory.push(`/login`);

      return;
    }
    setIsActiveBookmark(!isActiveBookmark);
  };

  return (
    <button className={`${isActiveBookmark
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
  isFavorite: PropTypes.bool.isRequired,
  bookmarkButtonProperty: BookmarkButtonProp
};

export default BookmarkButton;
