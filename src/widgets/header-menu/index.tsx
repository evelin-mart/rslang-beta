import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Box, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import { links } from 'shared/constants/menu-links';
import styles from './styles';
import { HeaderSubmenu } from './submenu';
import { MenuLinkText } from './link-text';

export const HeaderMenu = (props: {isColumn: boolean, handleCloseNavMenu?: () => void}) => {
  const { isColumn, handleCloseNavMenu } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const widthMatches = useMediaQuery('(min-width:700px)');
  
  const handleMenuItemClick = (path?: string) => {
    if (path !== undefined && typeof path === 'string') {
      navigate(path, { replace: true });
    }
  }
  
  const linksRendered = links.map((link, i) => {
    const { title, href, submenu } = link;
    const isActive = matchPath(href, location.pathname) !== null;
    return (submenu !== undefined
      ? <HeaderSubmenu key={i} isColumn={isColumn} link={link} handleCloseNavMenu={handleCloseNavMenu}/>
      : <ListItem key={i} sx={{ p: 0 }}>
          <ListItemButton 
            onClick={() => handleMenuItemClick(href)}
            sx={{ color: "primary.contrastText", pl: isColumn ? 3 : 1, pr: isColumn ? 3 : 1 }}>
              <ListItemText primary={<MenuLinkText title={title} isActive={isActive} isColumn={isColumn}/>}/>
          </ListItemButton>
        </ListItem>)
  });

  return (
    <Box component="nav">
      <List sx={[
        styles.headerMenu,
        { columnGap: widthMatches ? 2 : 0 },
        isColumn && styles.headerMenu_column
      ]}>
        {linksRendered}
      </List>
    </Box>
  )
}