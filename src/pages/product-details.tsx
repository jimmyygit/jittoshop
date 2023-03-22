import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../components/layouts/default-layout';
import { Product } from '../components/product-card';
import Loader from '../components/UI/loader';
import Message from '../components/UI/message';
import Rating from '../components/UI/rating';
import RedButton from '../components/UI/red-button';
import { useAppDispatch, useAppSelector } from '../redux';
import { addToCart } from '../redux/cart/cart-slice';
import { getProductById } from '../redux/products/slice-details';
import authAxios from '../utils/auth-axios';
import { setError } from '../utils/error';
import { formatCurrencry, getDate } from '../utils/helper';

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.productDetail);
  const { userInfo } = useAppSelector((state) => state.login);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);

  const onAdd = () => {
    dispatch(addToCart(product as Product));
    navigate('/cart');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review = {
      comment,
      rating,
    };
    authAxios
      .post(`/products/${product?._id}/reviews`, review)
      .then((res) => {
        toast.success('thank you for the comment 🙂');
        setRefresh((prev) => (prev = !prev));
      })
      .catch((err) => toast.error(setError(err)));
  };

  useEffect(() => {
    dispatch(getProductById(id));
    window.scrollTo(0, 0);
  }, [id, dispatch, refresh]);

  return (
    <DefaultLayout title={product?.name}>
      {loading || !product ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col md={7}>
              <Card className='shadow'>
                <Image
                  className=' p-2'
                  rounded
                  src={product?.image}
                  style={{ width: '600px', height: '100%' }}
                />
              </Card>
            </Col>
            <Col md={5}>
              <ListGroup
                variant='flush'
                className='shadow p-5 bg-white rounded'
              >
                <ListGroup.Item>
                  <h2>{product?.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  {' '}
                  <h5 className=' d-flex justify-content-between align-items-center'>
                    <span>Price:</span>
                    <span>{formatCurrencry(product.price)}</span>
                  </h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h5 className=' d-flex justify-content-between align-items-center'>
                    <span>Category:</span>
                    <span>{product.category}</span>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className=' d-flex justify-content-between align-items-center'>
                    <span>Brand:</span>
                    <span>{product.brand}</span>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
                <ListGroup.Item>
                  <RedButton onClick={onAdd} className='w-full'>
                    Add To Cart
                  </RedButton>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default ProductDetails;
