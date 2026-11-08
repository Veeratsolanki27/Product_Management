import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ColorModeContext } from './ThemeContext';
import { getCurrentUser, logout } from './services/api';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.mode === 'dark' ? '0px 1px 4px rgba(0, 0, 0, 0.4)' : '0px 1px 4px rgba(0, 0, 0, 0.05)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav({ children, onLogout }) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();

  // Menu Anchors for Top Bar Controls
  const [mailAnchorEl, setMailAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setProfileAnchorEl(null);
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out of CodingMSTR Admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d32f2f',
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been logged out successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        if (onLogout) {
          onLogout();
        } else {
          navigate('/');
        }
      }
    });
  };

  const handleMessageClick = (msg) => {
    setMailAnchorEl(null);
    Swal.fire({
      title: 'Message Details',
      text: msg,
      icon: 'info',
      confirmButtonColor: '#3085d6',
    });
  };

  const handleNotifClick = (notif) => {
    setNotifAnchorEl(null);
    Swal.fire({
      title: 'Notification Alert',
      text: notif,
      icon: 'info',
      confirmButtonColor: '#3085d6',
    });
  };

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Products', icon: <ShoppingBagIcon />, path: '/products' },
    { text: 'Orders', icon: <ReceiptLongIcon />, path: '/orders' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: theme.palette.background.default }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{ fontWeight: 700, color: theme.palette.text.primary, flexGrow: 1, cursor: 'pointer' }}
          >
            CodingMSTR
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Dark / Light Theme Toggle */}
            <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: '#ffb74d' }} /> : <Brightness4Icon sx={{ color: '#333' }} />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Messages">
              <IconButton
                size="large"
                color="inherit"
                onClick={(e) => setMailAnchorEl(e.currentTarget)}
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon sx={{ color: theme.palette.text.primary }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                size="large"
                color="inherit"
                onClick={(e) => setNotifAnchorEl(e.currentTarget)}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon sx={{ color: theme.palette.text.primary }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account & Profile">
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={(e) => setProfileAnchorEl(e.currentTarget)}
              >
                <AccountCircle sx={{ color: theme.palette.text.primary, fontSize: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Messages Menu */}
      <Menu
        anchorEl={mailAnchorEl}
        open={Boolean(mailAnchorEl)}
        onClose={() => setMailAnchorEl(null)}
        slotProps={{ paper: { sx: { width: 280, p: 1 } } }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, px: 2, py: 1 }}>
          Messages (4)
        </Typography>
        <Divider />
        <MenuItem onClick={() => handleMessageClick('New order #1049 received from customer')}>
          New order #1049 received
        </MenuItem>
        <MenuItem onClick={() => handleMessageClick('Customer inquiry on Laptop stock & pricing')}>
          Customer inquiry on Laptop
        </MenuItem>
        <MenuItem onClick={() => handleMessageClick('Low stock alert triggered for Table Fan')}>
          Stock alert for Fan
        </MenuItem>
        <MenuItem onClick={() => handleMessageClick('Weekly sales summary report is generated and ready')}>
          Weekly sales summary ready
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={() => setNotifAnchorEl(null)}
        slotProps={{ paper: { sx: { width: 300, p: 1 } } }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, px: 2, py: 1 }}>
          Notifications (17)
        </Typography>
        <Divider />
        <MenuItem onClick={() => handleNotifClick('System security patch & update completed successfully.')}>
          System update completed
        </MenuItem>
        <MenuItem onClick={() => handleNotifClick('New admin user P Kumar registered into system.')}>
          New user P Kumar registered
        </MenuItem>
        <MenuItem onClick={() => handleNotifClick('Server latency is 14ms (Optimal status).')}>
          Server response time optimal
        </MenuItem>
        <MenuItem onClick={() => handleNotifClick('Automated cloud backup scheduled for 02:00 AM tonight.')}>
          Backup scheduled for tonight
        </MenuItem>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
        slotProps={{ paper: { sx: { width: 220, p: 1 } } }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, px: 2, py: 1, color: theme.palette.primary.main }}>
          {currentUser ? (currentUser.fullName || currentUser.username) : 'Coding Master Admin'}
        </Typography>
        <Typography variant="caption" sx={{ px: 2, pb: 1, display: 'block', color: 'text.secondary' }}>
          {currentUser ? currentUser.email : 'admin@codingmaster.com'}
        </Typography>
        <Divider />
        <MenuItem onClick={() => { setProfileAnchorEl(null); navigate('/settings'); }}>
          Profile Settings
        </MenuItem>
        <MenuItem onClick={() => { setProfileAnchorEl(null); navigate('/orders'); }}>
          Orders Directory
        </MenuItem>
        <MenuItem onClick={() => { setProfileAnchorEl(null); navigate('/customers'); }}>
          Customer CRM
        </MenuItem>
        <MenuItem onClick={() => { setProfileAnchorEl(null); navigate('/products'); }}>
          Manage Products
        </MenuItem>
        <MenuItem onClick={() => { setProfileAnchorEl(null); navigate('/analytics'); }}>
          View Analytics
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f', fontWeight: 600 }}>
          Logout
        </MenuItem>
      </Menu>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isSelected}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.16)' : 'rgba(25, 118, 210, 0.08)',
                      borderRight: `3px solid ${theme.palette.primary.main}`,
                      '& .MuiListItemIcon-root': { color: theme.palette.primary.main },
                      '& .MuiListItemText-primary': { color: theme.palette.primary.main, fontWeight: 600 }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justify: 'center',
                      color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontSize: '0.95rem',
                        fontWeight: isSelected ? 600 : 400
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2.5,
          pt: 1,
          width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 64px)`,
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

