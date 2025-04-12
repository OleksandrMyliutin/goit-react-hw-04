import React from 'react'
import s from '../ImageGallery/ImageGallery.module.css'
import ImageCard from './ImageCard/ImageCard';
const ImageGallery = ({results}) => {
  return (
    <div>
      <ul className={s.wrapper}>
        {results.map(item => (
          <li key={item.id}>
            <ImageCard item={item}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery
