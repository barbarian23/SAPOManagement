import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_LIST_ORDERS,
  DATE_RANGE_CHANGE,
  HIDE_DATE_RANGE_POPUP
} from "../../action/order/order.action";
import { OrderTable, OrderDateRangePopUp } from "../../component";

export default function SapoOrder() {
  let { listOrders, isShowDateRangePopup } = useSelector(state => state.order);
  let dispatch = useDispatch();
  useEffect(() => dispatch({ type: GET_LIST_ORDERS }), []);

  const onDateRangePopupClosed = () => {
    dispatch({ type: HIDE_DATE_RANGE_POPUP })
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

      <OrderDateRangePopUp
        open={isShowDateRangePopup}
        onClose={onDateRangePopupClosed}
        onOK={(startDate, endDate) => { onDateRangePopupConfirmed(startDate, endDate) }} />
    </div>
  );
}
