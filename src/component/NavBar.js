import React, { useState, useEffect, useRef } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#FFF",
    color: "#222",
  },
});

const NavBar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          自行車道地圖資訊整合網
        </Typography>
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-controls="menu-appbar"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>自行車道搜尋</MenuItem>
            <MenuItem onClick={handleClose}>我附近的 Youbike 租借站</MenuItem>
            <MenuItem onClick={handleClose}>美食與景點</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
