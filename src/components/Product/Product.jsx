import React from 'react'
import ReactStars from 'react-stars'
import './Product.scss'

function Product() {
  return (
    <div className='product-box'>
      <div className="product-name"> Name</div>
      <div className="product-img"><img src="" alt="" /></div>
        <ReactStars
          count={5}
          size={24}
          color2={'#ffd700'} />

        <div className="reviews">(256 reviews)</div>
        <div className="offer">20% off</div>
      </div>
  )
}

export default Product