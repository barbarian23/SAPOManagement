import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_LIST_ORDERS,
  DATE_RANGE_CHANGE,
  HIDE_DATE_RANGE_POPUP,
  HIDE_ORDER_POPUP,
} from "../../action/order/order.action";
import { OrderTable, OrderDateRangePopUp, OrderPopUp } from "../../component";

export default function SapoOrder() {
  let { listOrders, isShowDateRangePopup, isShowOrderPopup } = useSelector(state => state.order);
  let dispatch = useDispatch();
  useEffect(() => dispatch({ type: GET_LIST_ORDERS }), []);

  const onDateRangePopupClosed = () => {
    dispatch({ type: HIDE_DATE_RANGE_POPUP })
  };

  const onOrderPopupClosed = () => {
    dispatch({ type: HIDE_ORDER_POPUP })
  };

  const onDateRangePopupConfirmed = (startDate, endDate) => {
    // console.log(startDate.getTime(), endDate.getTime());
    dispatch({ type: DATE_RANGE_CHANGE, value: { startDate: startDate.getTime(), endDate: endDate.getTime() } });
    dispatch({ type: HIDE_DATE_RANGE_POPUP });
  };

  return (
    <div style={{ height: 1000, width: "100%", marginTop: -77 }}>
      <OrderTable
        data={listOrders} />

      <OrderPopUp
        open={isShowOrderPopup}
        onClose={onOrderPopupClosed} />

      <OrderDateRangePopUp
        open={isShowDateRangePopup}
        onClose={onDateRangePopupClosed}
        onOK={(startDate, endDate) => { onDateRangePopupConfirmed(startDate, endDate) }} />
    </div>
  );
}
