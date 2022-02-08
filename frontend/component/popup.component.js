import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css'; 

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const sample = [
  ["Frozen CH8-140x51-DEN", "220115URHYF0AC", 6.0, "M1"],
  ["CH8-140x51-DEN", "2201160J18YDR4", 9.0, "M1"],
  ["CH8-140x51-DEN", "2201160J18YDR4", 16.0, "M2"]
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 20; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const column = [
  {
    width: 300,
    label: "Mã SKU",
    dataKey: "dessert"
  },
  {
    width: 300,
    label: "Mã đơn hàng",
    dataKey: "calories",
    numeric: true,
    textAlign: "center"
  },
  {
    width: 300,
    label: "Trạng thái",
    dataKey: "fat",
    numeric: true
  },
  {
    width: 300,
    label: "Máy sản xuất",
    dataKey: "carbs",
    numeric: true
  }
];

export default function PopUp({ open, currentSKU }) {
  const handleClose = () => (open = false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Paper style={{ height: "100%", width: "100%" }}>
            <VirtualizedTable
              rowCount={rows.length}
              rowGetter={({ index }) => rows[index]}
              columns={column}
            />
          </Paper>
        </Box>
      </Modal>
    </div>
  );
}
