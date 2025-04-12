import React from 'react'

const ImageCard = ({item}) => {
  return (
    <div>
      <img src = {item.urls.small} alt={item.alt_description} />
    </div>
  )
}

export default ImageCard
