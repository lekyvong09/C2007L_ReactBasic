import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import { Badge, Button } from '@mui/material';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { red } from '@mui/material/colors';
import ShoppingCart from '../../Shop/ShoppingCart';


const drawerWidth = 240;
  
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
  
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Navigation(props) {
    const theme = useTheme();
    const ctx = React.useContext(AuthContext);

    const handleDrawerOpen = () => {
        props.onDrawerOpen(true);
      };
    
      const handleDrawerClose = () => {
        props.onDrawerOpen(false);
      };


    const mapIndexWithPath = (index) => {
      switch (index) {
        case 0:
          return "/product";
        case 1:
          return "/shop";
        default:
          return "/shop";
      }
    }

    const [openModal, setOpenModal] = React.useState(false);

    const handleClickOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

    return (
      <>
        {ctx.storeIsLoggedIn && <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={props.isDrawerOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(props.isDrawerOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        Products
                    </Typography>

                    <IconButton aria-label="cart" sx={{marginRight: 2}} onClick={handleClickOpenModal}>
                      <StyledBadge badgeContent={4} style={{color: red[300]}}>
                        <ShoppingCartIcon sx={{width: 28, height: 28, color: red[500]}}/>
                      </StyledBadge>
                    </IconButton>

                    <Button color='inherit' onClick={ctx.onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.isDrawerOpen}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Manage Product', 'Shop'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to={mapIndexWithPath(index)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <ModeEditIcon /> : <ShoppingCartIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    </Box>}
      
    <ShoppingCart openModal={openModal} onCloseModal={handleCloseModal}/>

    </>
    
    );
}

export default Navigation;