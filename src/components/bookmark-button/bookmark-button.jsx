import React, {useState} from "react";
import PropTypes from "prop-types";
import BookmarkButtonPropertyProp from "./bookmark-button-property.prop";

const bookmarkButtonClickHandler = (evt, className) => {
  const clickedElement = evt.target.closest(`button`);

  clickedElement.classList.toggle(className);
};

const BookmarkButton = ({isFavorite, bookmarkButtonProperty}) => {
  const [bookmark, setBookmark] = useState(isFavorite);

  return (
    <button className={`${bookmarkButtonProperty.buttonClass}
     ${isFavorite && `${bookmarkButtonProperty.buttonClass}--active`} button`}
    type="button"
    onClick={(evt) => {
      setBookmark(!bookmark);
      bookmarkButtonClickHandler(evt, `${bookmarkButtonProperty.buttonClass}--active`);
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
  bookmarkButtonProperty: BookmarkButtonPropertyProp
};

export default BookmarkButton;
