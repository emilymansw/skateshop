import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import type { AxiosError } from 'axios';
import { auth } from '../../../../../auth/firebaseUtil';
import { LoginButton } from '../../../../shared/UI/SharedUI';
import { useAppSelector } from '../../../../../redux/hook';

import {
  CardContainer,
  LineItem,
  NameWrapper,
  ImageWrapper,
  QuantityWrapper,
  ImageContainer,
  PriceWrapper,
} from './styles';

interface IStripeResponseData {
  data: {
    sessionId: string;
  };
}

export const CheckoutForm = () => {
  const { cartItems, total, totalQuantity } = useAppSelector(
    (state) => state.cart
  );
  const { userEmail } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean | undefined>();
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    'pk_test_51Kt2hLGaoAq2Yl0pxXkEyYb7M26F67oBMQkR0usjWS87N6KP6yUrn3hQCSzs9fD2iMG4DquIL8W4BWrf3jDsrzYi00g5WRzdEI'
  );

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
    }
  }, [userEmail]);

  const getToken = async () => {
    const { currentUser } = auth;
    return currentUser!.getIdToken();
  };

  const createStripeSession = () => {
    getToken()
      .then((accessToken) => {
        setLoading(true);
        return axios.post(
          'https://ec2-34-217-26-254.us-west-2.compute.amazonaws.com:8443/checkout',
          Array.from(cartItems, (cartItem) => ({
            productName: cartItem.productName,
            productImage: cartItem.image,
            quantity: cartItem.quantity,
            price: cartItem.price,
            variantId: cartItem.variantId,
            variantOptionValues: cartItem.variantOptionValues.toString(),
          })),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      })
      .then(async (response: IStripeResponseData) => {
        localStorage.setItem('sessionId', response.data.sessionId);
        const stripe = await stripePromise;
        if (stripe) {
          stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
          });
        }
      })
      .catch((err: AxiosError) => {
        if (err.response?.data) {
          if (typeof err.response.data === 'string') {
            setError(`${err.response.data}, please edit your cart`);
          } else {
            setError('sorry, something goes wrong, please contact us');
          }
        }
      });
  };

  return (
    <CardContainer>
      <Link to="/cart"> ← Back to Cart</Link>
      <h1>Order Summary</h1>
      {cartItems.map((cartItem) => (
        <LineItem>
          <ImageWrapper>
            <ImageContainer>
              <img src={cartItem.image} alt="mainImage" />
            </ImageContainer>
          </ImageWrapper>
          <NameWrapper>
            <div>
              <h4>{cartItem.productName} </h4>
              {cartItem.variantOptionValues[0] !== 'default' &&
                cartItem.variantOptionValues.map((variantOptionValue) => (
                  <p>{variantOptionValue} </p>
                ))}
            </div>
          </NameWrapper>
          <PriceWrapper>
            <h4>${cartItem.price}</h4>
          </PriceWrapper>
          <QuantityWrapper>
            <h4>{cartItem.quantity}</h4>
          </QuantityWrapper>
        </LineItem>
      ))}
      <hr />
      <h4>Total Amount: ${total}</h4>
      <h4>Total Quantity: {totalQuantity}</h4>
      {error && <p>{error}</p>}
      <LoginButton onClick={createStripeSession} type="submit">
        {loading && !error ? (
          <span>Placing Order, please wait</span>
        ) : (
          <span>Place order and proceed to payment</span>
        )}
      </LoginButton>
      {loading && !error && (
        <div>
          <p>
            Test billing using the test card number <b>4242 4242 4242 4242</b>,
            a random three-digit CVC number, any expiration date in the future,
            and a random five-digit U.S. ZIP code.
          </p>
        </div>
      )}
    </CardContainer>
  );
};
