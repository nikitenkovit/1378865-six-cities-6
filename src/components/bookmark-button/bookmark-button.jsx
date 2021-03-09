import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import BookmarkButtonProp from "./bookmark-button.prop";
import {getIsNotAuthorized} from "../../store/user/selectors";
import RedirectActionCreator from "../../store/middlewares/action-creator";

const BookmarkButton = ({isFavorite, bookmarkButtonProperty}) => {
  const [isActiveBookmark, setIsActiveBookmark] = useState(isFavorite);

  const isNotAuthorized = useSelector(getIsNotAuthorized);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (isNotAuthorized) {
      dispatch(RedirectActionCreator.redirectToRoute(`/login`));

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
