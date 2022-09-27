import React from 'react';
import { 
  Avatar, Box, IconButton,
  ListItemIcon, Menu, MenuItem,
  Tooltip, Typography } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { deauthorize, useUser } from 'entities/user';
import { useNavigate } from 'react-router-dom';
import { userMenuOptions } from './model';

export const PopupMenu = () => {
  const { isAuthorized, data: { name, avatarUrl }} = useUser();
  const dispatch: AppDispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = (path?: string) => {
    setAnchorElUser(null);
    if (path !== undefined && typeof path === 'string') {
      navigate(path, { replace: true });
    }
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(deauthorize());
  }

  const userMenuItems = isAuthorized
    ? Object.keys(userMenuOptions).map((key) => {
      const { title, href, icon } = userMenuOptions[key];
      return (
        <MenuItem key={key} onClick={() => handleCloseUserMenu(href)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography variant="inherit">
            {title}
          </Typography>
        </MenuItem>)
    })
    : '';

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Меню пользователя">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{
            border: "2px solid",
            borderColor: "primary.dark",
            transition: "border-color 250ms",
            "&:hover": { borderColor: "primary.light" }
          }} alt={name} src={avatarUrl || "#"} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px', width: 200 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu()}
        keepMounted
      > 
        <MenuItem divider={true} disabled sx={{
          justifyContent: "flex-end",
          mb: 1,
          color: "primary.main",
          "&.Mui-disabled": {
            opacity: 1,
          }}}>
          <Typography variant="body1" noWrap>
            {name}
          </Typography>
        </MenuItem>
        {userMenuItems}
        <MenuItem
          onClick={handleLogout}
          aria-label="Выйти"
          sx={{ color: "primary" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Выход</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
