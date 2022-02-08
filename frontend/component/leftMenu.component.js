import { useState } from "react";
import { Link } from "react-router-dom";

export default function LeftMenu() {
  //mặc định chọn trang sản xuất, index  = 0
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemText id="header-menu" primary="SAPO admin" />
        <Divider />
        <Link to="/product">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sản xuất" />
          </ListItemButton>
        </Link>
        <Link to="/bill">
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Đơn hàng" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}
