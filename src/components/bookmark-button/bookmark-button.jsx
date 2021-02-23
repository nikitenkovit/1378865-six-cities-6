import React, {useState} from "react";
import PropTypes from "prop-types";
import BookmarkButtonProp from "./bookmark-button.prop";

const BookmarkButton = ({isFavorite, bookmarkButtonProperty}) => {
  const [isActiveBookmark, setIsActiveBookmark] = useState(isFavorite);

  return (
    <button className={`${isActiveBookmark
      ? bookmarkButtonProperty.buttonClass + ` ` + bookmarkButtonProperty.buttonClass + `--active`
      : bookmarkButtonProperty.buttonClass} button`}
    type="button"
    onClick={() => {
      setIsActiveBookmark(!isActiveBookmark);
    }}>
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
