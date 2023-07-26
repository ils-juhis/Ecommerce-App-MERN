import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {CiSearch} from 'react-icons/ci'
import './Home.scss'
import { Col, Row } from 'react-bootstrap';
import { servicesData } from '../../data/servicesData';
import Product from '../../components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/actions/productAction';

function Home() {
  const dispatch = useDispatch();
  const {loading, error, products, productsCount}= useSelector(state => state.products)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])
  return (
    <div className='home-container'>
      <div className='carousel-bg py-5'>
        <div className='carousel-container text-center'>
          
          <div className='d-flex search mx-auto rounded-2 overflow-hidden shadow-sm'>
            <input type="text" className='px-3' placeholder='Search'/>
            <span className="px-3" to=""><CiSearch className='my-auto'/></span>
          </div>

          <div>
            <Carousel data-bs-theme="dark"  controls={false}>
              <Carousel.Item>
                <div> <div className='first-heading'>Sale 20% Off</div> <div className="second-heading">On Everything</div></div>
                <div className='content'>Nulla vitae elit libero, a pharetra augue mollis interdum.</div>
              </Carousel.Item>
              <Carousel.Item>
                <div> <div className='first-heading'>Sale 20% Off</div> <div className="second-heading">On Everything</div></div>
                <div className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </Carousel.Item>
              <Carousel.Item>
                <div> <div className='first-heading'>Sale 20% Off</div> <div className="second-heading">On Everything</div></div>
                <div className='content'>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </div>
              </Carousel.Item>
            </Carousel>
          </div>

          <div>
            <button className='shop'>Shop Now</button>
          </div>
        </div>
      </div>

      <div className="service-box my-5 p-3 p-lg-5">
        <Row style={{gridRowGap: "15px"}}>
        {
          servicesData.map((item, index)=>{
            return(
              <Col sm="6" xl="3" className='align-items-center' key={index}>
              <div className="service-item rounded-2 d-flex align-items-center">
                <div className="icon animated pe-3">{item.icon}</div>
                <div className="content">
                  <div className="heading">{item.title}</div>
                  <div className="description">
                    {item.description}
                  </div>
                </div>
              </div>
            </Col>
            )
          })
        }
        </Row>
      </div>

      <div className="products-box">
        {
          products && products.map((elem, index)=>{
            return(
              <Product product={elem} key={index}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home