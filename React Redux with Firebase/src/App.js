import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }


    /** We are now creating our own THUNK in cart-slice.js 
     * 
     * keeping this component clean
           * 
        const sendCartData = async () => {
    
          
          dispatch(uiAction.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Seding cart data...'
          }));
          const response = await fetch(
            'https://reactreduxproject-d734a-default-rtdb.firebaseio.com/cart.json',
            {
              method: 'PUT',
              body: JSON.stringify(cart),
            }
          );
    
          if (!response.ok) {
            throw new Error('Sending cart data failed.');
          }
    
          
    
          dispatch(
            uiAction.showNotification({
              status: 'success',
              title: 'Success!',
              message: 'Sent Cart data succcessfully'
            })
          );
    
          
  }

    
  sendCartData().catch(error => {

  });

  */
  }, [cart, dispatch]);


  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
