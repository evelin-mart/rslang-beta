import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { matchPath } from 'react-router';
import { MenuItem, Menu, Link, Collapse, List, ListItemButton, ListItemText, ListItem, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { MenuLink } from 'shared/constants/menu-links';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { setGameSource, resetGame } from 'entities/game';
import { MenuLinkText } from '../link-text';
import styles from '../styles';

type HeaderSubmenuProps = {
  isColumn: boolean;
  link: MenuLink;
  handleCloseNavMenu?: () => void;
}

export const HeaderSubmenu = (props: HeaderSubmenuProps) => {
  const { isColumn, link, handleCloseNavMenu } = props;
  const dispatch: AppDispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const handleListItemClick = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = (path?: string) => {
    setAnchorElUser(null);
    if (handleCloseNavMenu) handleCloseNavMenu();
    if (path !== undefined && typeof path === 'string') {
      navigate(path, { replace: true });
    }
  };

  const handleGameLinkClick = (path?: string) => {
    dispatch(resetGame());
    dispatch(setGameSource('headerMenu'));
    handleCloseUserMenu(path);
  }

  const userMenuItems = link.submenu?.map(({ title, href, icon }, i) => {
    const isActive = matchPath(href, location.pathname) !== null;
    return (
      <MenuItem
        key={i}
        onClick={() => href.includes('game') ? handleGameLinkClick(href) : handleCloseUserMenu(href)}
        sx={{ color: "text.primary" }}>
        <ListItemIcon>{icon && icon()}</ListItemIcon>
        <MenuLinkText title={title} isActive={isActive} isColumn={isColumn}/>
      </MenuItem>)
  })
  
  const userMenuItemsColumn = link.submenu?.map(({ title, href, icon }, i) => {
    const isActive = matchPath(href, location.pathname) !== null;
    return (
      <ListItem 
        key={i}
        sx={{ p: 0 }}>
        <ListItemButton onClick={() => handleCloseUserMenu(href)} sx={{ color: "primary.contrastText", pl: 3, pr: 3 }}>
          <ListItemIcon sx={{ minWidth: 35, color: "primary.contrastText" }}>{icon && icon()}</ListItemIcon>
          <ListItemText primary={<MenuLinkText title={title} isActive={isActive} isColumn={isColumn}/>}/>
        </ListItemButton>
      </ListItem>
    )
  })

  return isColumn
    ? <>
        <ListItem disablePadding>
          <ListItemButton onClick={handleListItemClick} sx={{ color: "primary.contrastText", pl: 3, pr: 3 }}>
            <ListItemText sx={{ mr: 2 }} primary={<MenuLinkText title={link.title} isActive={false} isColumn={isColumn}/>} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List disablePadding sx={{ bgcolor: "primary.light" }}>
            {userMenuItemsColumn}
          </List>
        </Collapse>
      </>
    : <ListItem disablePadding>
        <ListItemButton onClick={handleOpenUserMenu} sx={{ pl: isColumn ? 3 : 1, pr: isColumn ? 3 : 1 }}>
          <Link sx={[{ display: "flex" }, styles.headerSubmenuMainLink]}>
            <MenuLinkText title={link.title} isActive={false} isColumn={isColumn}/>
            {anchorElUser !== null ? <ExpandLess /> : <ExpandMore />}
          </Link>
        </ListItemButton>
        <Menu
          disableAutoFocusItem={true}
          sx={{ mt: '35px', width: 200 }}
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
          {userMenuItems}
        </Menu>
    </ListItem>
}