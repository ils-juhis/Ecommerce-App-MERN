import React from 'react'
import ReactStars from 'react-stars'
import './Product.scss'
import image from '../../assets/images/sliderBG.jpg'

function Product({product}) {
  return (
    <div className='product-box border m-md-2'>
      <div className="img"><img src={product.images[0].url} alt="" /></div>
      <div className='content'>
        <div className="name"> {product.name}</div>
        <div className="description">{product.description} </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="offer">20% off</div>
          <div className="price">$ {product.price}</div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <ReactStars
            count={5}
            value={product.rating}
            size={20}
            color2={'#ffd700'} />
            <div className="reviews">({product.numOfReviews} reviews)</div>
        </div>
      </div>
    </div>
  )
}

export default Product


// {"_id":{"$oid":"64be33adbc66599fc6f5ec38"},
//   "name": "iPhone 9",
//   "description": "An apple mobile which is nothing like apple",
//   "price": 80000,
//   "rating": 4.5,
//   "images": [
//     {"url": "https://i.dummyjson.com/data/products/1/1.jpg"},
//     {"url": "https://i.dummyjson.com/data/products/1/2.jpg"},
//     {"url": "https://i.dummyjson.com/data/products/1/3.jpg"},
//     {"url": "https://i.dummyjson.com/data/products/1/4.jpg"},
//     {"url": "https://i.dummyjson.com/data/products/1/thumbnail.jpg"},
//   ],
  
//   "category": "smartphones",
//   "stock": 94,
//   "numOfReviews": 0,
//   "reviews": [],
//   "user":{"$oid":"64a4216550a7e7d3b57a316c"}
// }