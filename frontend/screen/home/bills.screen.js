import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css'; 

const sample = [
  ["220115URHYF0AC", "20:54 15/01/2022", "Đã xử lý"],
  ["2201160J18YDR4", "15:02 16/01/2022", "Đã xử lý"]
];

function createData(id, dessert, calories) {
  return { id, dessert, calories };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const column = [
  {
    width: 400,
    label: "Mã đơn hàng",
    dataKey: "dessert"
  },
  {
    width: 500,
    label: "Thời gian đã đặt hàng",
    dataKey: "calories"
  },
  {
    width: 400,
    label: "Trạng thái",
    dataKey: "fat"
  }
];

export default function Bill() {
  return (
    <Paper style={{ height: 1000, width: "100%" }}>
      <MUIVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={column}
      />
    </Paper>
  );
}
