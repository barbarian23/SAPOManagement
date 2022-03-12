import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_LIST_ORDERS,
  DATE_RANGE_CHANGE,
  HIDE_DATE_RANGE_POPUP
} from "../../action/order/order.action";
import { date2dtstr } from "../../service/util/utils.client";
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

  const columns = [
    {
      Header: "Mã đơn hàng",
      accessor: "id",
      defaultCanSort: true
    },
    {
      Header: "Thời gian đã đặt hàng",
      accessor: "created_at",
      Cell: ({ cell }) => {
        return <>{date2dtstr(new Date(cell.value))}</>
      }
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      Cell: ({ cell: { value } }) =>
        value == 'DONE' ? (
          <p className="status-bag green">Đã xử lý</p>
        ) : (
          <p className="status-bag red">Chưa xử lý</p>
        )
    }
  ];

  return (
    <div style={{ height: 1000, width: "100%", marginTop: -77 }}>
      <OrderTable 
        columns={columns} 
        data={listOrders} />

      <OrderDateRangePopUp
        open={isShowDateRangePopup}
        onClose={onDateRangePopupClosed}
        onOK={(startDate, endDate) => { onDateRangePopupConfirmed(startDate, endDate) }} />
    </div>
  );
}
