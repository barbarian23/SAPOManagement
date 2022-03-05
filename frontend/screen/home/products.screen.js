import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GET_LIST_PRODUCTS, HIDE_PRODUCT_POPUP, HIDE_TIME_RANGE_POPUP, SHOW_PRODUCT_POPUP, SHOW_TIME_RANGE_POPUP } from "../../action/product/product.action";
import { ProductPopUp, ProduceTable, TimeRangePopUp } from "../../component";

const columns = [
  {
    Header: "Mã SKU",
    accessor: "id",
    defaultCanSort: true
  },
  {
    Header: "Mã đơn hàng",
    accessor: "billID"
  },
  {
    Header: "Thời gian đặt hàng",
    accessor: "time"
  },
  {
    Header: "Trạng thái",
    accessor: "status",
    Cell: ({ cell: { value } }) =>
      value ? (
        <p className="status-bag green">Đã xử lý</p>
      ) : (
        <p className="status-bag red">Chưa xử lý</p>
      )
  }
];

const sample = [
  {
    id: "PCB273-R.150cm x C.117cm",
    billID: "2201160J18YDR4",
    time: "20:54 15/01/2022",
    status: 1,
    machine: "M1",
    processingTime: "1 giờ"
  },
  {
    id: "DCC16",
    billID: "2201160J18YDR4",
    time: "15:02 16/01/2022",
    status: 0,
    machine: "",
    processingTime: ""
  }
];

const data = [];
for (let i = 0; i < 10; i += 1) {
  let s = sample[Math.floor(Math.random() * sample.length)];
  data.push(s);
}

export default function SapoProduct() {
  let dispatch = useDispatch();
  useEffect(() => dispatch({ type: GET_LIST_PRODUCTS}), []);

  let { isShowProductPopup, isShowTimeRangePopup, listProducts } = useSelector(state => state.product);

  const onRowClicked = ({ rowData }) => {
    dispatch({ type: SHOW_PRODUCT_POPUP})
  };

  const onProductPopupClosed = () => {
    dispatch({ type: HIDE_PRODUCT_POPUP})
  };

  const onTimeRangeOptionClicked = () => {
    dispatch({ type: SHOW_TIME_RANGE_POPUP})
  };

  const onTimeRangePopupClosed = () => {
    dispatch({ type: HIDE_TIME_RANGE_POPUP})
  };

  const onTimeRangePopupConfirmed = (startDate, endDate) =>{
    console.log(startDate, endDate);
    dispatch({ type: HIDE_TIME_RANGE_POPUP});
  };

  return (
    <div style={{ height: 1000, width: "100%", marginTop: -77 }}>
      <ProduceTable columns={columns} data={data} onRowClick={onRowClicked} onTimeRangeClick={onTimeRangeOptionClicked} />

      <ProductPopUp open={isShowProductPopup} onClose={onProductPopupClosed} />
      <TimeRangePopUp open={isShowTimeRangePopup} onClose={onTimeRangePopupClosed} onOK={(startDate, endDate)=>{onTimeRangePopupConfirmed(startDate, endDate)}}/>
    </div>
  );
}
