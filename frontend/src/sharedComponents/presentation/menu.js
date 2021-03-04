import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu({ items = [], Source }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Source handleClick={handleMenuClick} />
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setAnchorEl(null);
                item.operation();
              }}
              disabled={item.disabled || false}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}
