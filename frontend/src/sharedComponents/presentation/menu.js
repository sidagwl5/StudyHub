import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "./button";

export default function SimpleMenu({ items = [], title="Options" }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button title={title} textColor="black" handleClick={handleMenuClick} />
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {items.map((item, index) => (
            <MenuItem 
            key={index} 
            onClick={item.operation}
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
