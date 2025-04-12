import React from 'react'
import s from '../ImageGallery/ImageGallery.module.css'
const ImageGallery = ({results}) => {
  return (
    <div>
      <ul className={s.wrapper}>
        {results.map(item => (
          <li key={item.id}>
            <img src = {item.urls.small} alt={item.alt_description} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery
