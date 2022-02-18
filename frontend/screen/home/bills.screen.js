import React, { useState } from "react";
// import styled from "styled-components";
import { BillPopUp, BillTable } from "../../component";

const columns = [
  {
    width: 400,
    Header: "Mã đơn hàng",
    accessor: "id",
    defaultCanSort: true
  },
  {
    width: 500,
    Header: "Thời gian đã đặt hàng",
    accessor: "time"
  },
  {
    width: 400,
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
    id: "220115URHYF0AC",
    time: "20:54 15/01/2022",
    status: 1
  },
  {
    id: "2201160J18YDR4",
    time: "15:02 16/01/2022",
    status: 0
  }
];

const data = [];
for (let i = 0; i < 10; i += 1) {
  let s = sample[Math.floor(Math.random() * sample.length)];
  data.push(s);
}

export default function SapoBill() {
  const [open, setOpen] = useState(false);
  // const [popupData, setPopupData] = useState({});

  const onRowClick = ({ rowData }) => {
    setOpen(true);
    // setPopupData(rowData);
  };

  const onBillModalClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 1000, width: "100%", marginTop: -77 }}>
      <BillTable columns={columns} data={data} onRowClick={onRowClick} />

      <BillPopUp open={open} onClose={onBillModalClose} />
    </div>
  );
}
