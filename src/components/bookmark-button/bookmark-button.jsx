import React, {useState} from "react";
import {useRouteMatch} from "react-router-dom";
import {PathValue} from "../../const";
import PropTypes from "prop-types";

const bookmarkButtonClickHandler = (evt, className) => {
  const clickedElement = evt.target.closest(`button`);

  clickedElement.classList.toggle(className);
};

const BookmarkButton = ({isFavorite}) => {
  const [bookmark, setBookmark] = useState(isFavorite);

  const match = useRouteMatch();
  const currentPathValue = match.path;

  const switchProperty = () => {
    let currentClassNames;

    switch (currentPathValue) {
      case (PathValue.ROOM_SCREEN):
        currentClassNames = {
          buttonClass: `property__bookmark-button`,
          iconClass: `property__bookmark-icon`,
          iconWidth: `31`,
          iconHeight: `33`
        };
        break;
      default:
        currentClassNames = {
          buttonClass: `place-card__bookmark-button`,
          iconClass: `place-card__bookmark-icon`,
          iconWidth: `18`,
          iconHeight: `19`
        };
    }

    return currentClassNames;
  };

  return (
    <button className={`${switchProperty().buttonClass}
     ${isFavorite && `${switchProperty().buttonClass}--active`} button`}
    type="button"
    onClick={(evt) => {
      setBookmark(!bookmark);
      bookmarkButtonClickHandler(evt, `${switchProperty().buttonClass}--active`);
    }}>
      <svg className={`${switchProperty().iconClass}`}
        width={switchProperty().iconWidth}
        height={switchProperty().iconHeight}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

BookmarkButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired
};

export default BookmarkButton;
