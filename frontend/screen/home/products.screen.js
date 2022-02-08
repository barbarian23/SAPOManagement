import Paper from "@mui/material/Paper";
import { MUIVirtualizedTable, PopUp} from "../../component";
import { useState } from "react";

const sample = [
  [
    "CH8-140x51-DEN",
    "220115URHYF0AC",
    "20:54 15/01/2022",
    "Chưa xử lý",
    "",
    ""
  ],
  ["DCC16", "2201160J18YDR4", "15:02 16/01/2022", "Chưa xử lý", "", ""],
  [
    "PCB273-R.150cm x C.117cm",
    "2201160J18YDR4",
    "15:02 16/01/2022",
    "Chưa xử lý",
    "",
    ""
  ]
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const column = [
  {
    width: 400,
    label: "Mã SKU",
    dataKey: "sku"
  },
  {
    width: 300,
    label: "Mã đơn hàng",
    dataKey: "billCode"
  },
  {
    width: 400,
    label: "Thời gian đặt hàng",
    dataKey: "time"
  },
  {
    width: 200,
    label: "Trạng thái",
    dataKey: "status"
  },
  {
    width: 200,
    label: "Máy sản xuất",
    dataKey: "machine"
  },
  {
    width: 200,
    label: "TG xử lý",
    dataKey: "timeWork"
  }
];

export default function Product() {
  const [open, setOpen] = useState(false);
  const [currentSKU, setCurrentSKU] = useState("");

  const onRowClick = ({ rowData }) => {
    setOpen(true);
    setCurrentSKU(rowData.sku);
  };

  return (
    <Paper style={{ height: 1000, width: "100%" }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={column}
        onRowClick={onRowClick}
      />
      <PopUp open={open} currentSKU={currentSKU} />
    </Paper>
  );
}
