import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_LIST_PRODUCTS,
  HIDE_PRODUCT_POPUP,
  HIDE_DATE_RANGE_POPUP,
  DATE_RANGE_CHANGE
} from "../../action/product/product.action";
import { date2dtstr } from "../../service/util/utils.client";
import { ProductPopUp, ProduceTable, ProductDateRangePopUp } from "../../component";

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
      accessor: "created_at",
      Cell: ({ cell }) => {
        return <>{date2dtstr(new Date(cell.value))}</>
      }
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

  let { isShowProductPopup, isShowDateRangePopup, listProducts } = useSelector(state => state.product);

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
        columns={columns} 
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
