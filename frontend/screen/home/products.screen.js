import React, { useState } from "react";
// import styled from "styled-components";
import { PopUp, ProduceTable } from "../../component";

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
  },
  {
    Header: "Máy SX",
    accessor: "machine"
  },
  {
    Header: "TG xử lý",
    accessor: "processingTime"
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
  const [open, setOpen] = useState(false);
  // const [popupData, setPopupData] = useState({});

  const onRowClick = ({ rowData }) => {
    console.log("open", open);
    setOpen(true);
    // setPopupData(rowData);
  };

  const onBillModalClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 1000, width: "100%", marginTop: -77 }}>
      <ProduceTable columns={columns} data={data} onRowClick={onRowClick} />

      <PopUp open={open} onClose={onBillModalClose} />
    </div>
  );
}
