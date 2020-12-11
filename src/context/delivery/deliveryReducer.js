import { GET_ORDERS, DELIVER_SUCCESS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case DELIVER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order._id !== action.payload
        ),
      };

    default:
      break;
  }
};
