import { HeaderMenu } from 'widgets/header-menu';
import { UserToolbar, useUser } from 'entities/user';
import { AppLogo } from 'shared/components/app-logo';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Box, Drawer } from '@mui/material';
import styles from './styles';
import { useScrollbarWidth } from 'shared/lib';
import { useUi } from 'shared/lib/store/ui';

export const ResponsiveAppBar = () => {
  const { scrollbarWidth } = useScrollbarWidth();
  const { isBodyOverflow } = useUi();
  const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>(null);
  const user = useUser();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={[
        { height: "var(--header-height)", zIndex: 1, },
        isBodyOverflow && styles.menuOpenedStyles(scrollbarWidth),
      ]}>
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Toolbar disableGutters sx={{ height: 1, width: "100%" }}>
          <AppLogo isMobile={false}/>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              sx={{ color: "primary.contrastText" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              sx={{
                display: { xs: 'flex', sm: 'none' },
                bgcolor: 'primary'
              }}
            >
              <Box sx={styles.headerMenuBoxColumn}>
                <HeaderMenu isColumn={true} handleCloseNavMenu={handleCloseNavMenu}/>
              </Box>
            </Drawer>
          </Box>
          <AppLogo isMobile={true}/>
          <Box sx={[styles.headerMenuBox, { mr: user.isAuthorized ? 3 : 0}]}>
            <HeaderMenu isColumn={false}/>
          </Box>
          <UserToolbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
