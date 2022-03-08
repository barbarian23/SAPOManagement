import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GET_LIST_PRODUCTS, HIDE_PRODUCT_POPUP, HIDE_TIME_RANGE_POPUP, SHOW_PRODUCT_POPUP, SHOW_TIME_RANGE_POPUP } from "../../action/product/product.action";
import { ProductPopUp, ProduceTable, TimeRangePopUp } from "../../component";

export default function SapoProduct() {
  const columns = [
    {
      Header: "Mã SKU",
      accessor: "sku",
      defaultCanSort: true
    },
    {
      Header: "Mã đơn hàng",
      accessor: "order_id"
    },
    {
      Header: "Thời gian đặt hàng",
      accessor: "created_at"
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      Cell: ({ cell: { value } }) =>
        value == "DONE" ? (
          <p className="status-bag green">Đã xử lý</p>
        ) : (
          <p className="status-bag red">Chưa xử lý</p>
        )
    }
  ];

  let dispatch = useDispatch();
  useEffect(() => dispatch({ type: GET_LIST_PRODUCTS }), []);

  let { isShowProductPopup, isShowTimeRangePopup, listProducts } = useSelector(state => state.product);

  const onProductPopupClosed = () => {
    dispatch({ type: HIDE_PRODUCT_POPUP })
  };

  const onTimeRangePopupClosed = () => {
    dispatch({ type: HIDE_TIME_RANGE_POPUP })
  };

  const onTimeRangePopupConfirmed = (startDate, endDate) => {
    console.log(startDate, endDate);
    dispatch({ type: HIDE_TIME_RANGE_POPUP });
  };

  return (
    <div style={{ height: 1000, width: "100%", marginTop: -77 }}>
      <ProduceTable columns={columns} data={listProducts} />

      <ProductPopUp open={isShowProductPopup} onClose={onProductPopupClosed} />
      <TimeRangePopUp open={isShowTimeRangePopup} onClose={onTimeRangePopupClosed} onOK={(startDate, endDate) => { onTimeRangePopupConfirmed(startDate, endDate) }} />
    </div>
  );
}
