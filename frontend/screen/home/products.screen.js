import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_LIST_PRODUCTS,
  HIDE_PRODUCT_POPUP,
  HIDE_DATE_RANGE_POPUP,
  DATE_RANGE_CHANGE,
} from "../../action/product/product.action";
import { ProductPopUp, ProduceTable, ProductDateRangePopUp } from "../../component";

export default function SapoProduct() {
  let { isShowProductPopup, isShowDateRangePopup, listProducts } = useSelector(state => state.product);
  let dispatch = useDispatch();
  useEffect(() => dispatch({ type: GET_LIST_PRODUCTS }), []);

  const onProductPopupClosed = () => {
    dispatch({ type: HIDE_PRODUCT_POPUP })
  };

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
      <ProduceTable 
        data={listProducts} />

      <ProductPopUp
        open={isShowProductPopup}
        onClose={onProductPopupClosed} />

      <ProductDateRangePopUp
        open={isShowDateRangePopup}
        onClose={onDateRangePopupClosed}
        onOK={(startDate, endDate) => { onDateRangePopupConfirmed(startDate, endDate) }} />
    </div>
  );
}
