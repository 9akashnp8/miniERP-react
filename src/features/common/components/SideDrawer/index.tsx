import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LaptopIcon from '@mui/icons-material/Laptop';
import GroupIcon from '@mui/icons-material/Group';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material';

import { deleteCookie } from '../../../../lib/utils';

// Types
import {
    FCWithChildren,
    OnClickEvent
} from '../../../../types/common';
import Link from '../Link';

const drawerWidth = 200;

export default function ({ children }: FCWithChildren) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleMenu = (event: OnClickEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    function handleSignOut() {
        deleteCookie("access")
        deleteCookie("refresh")
        window.location.href = "/login"
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color={"transparent"}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    boxShadow: 0,
                }}
            >
                <Toolbar
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >   
                    <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" noWrap component="div">
                            miniERP
                        </Typography>
                    </Link>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            sx={{
                                marginTop: -1,
                                marginLeft: 1,
                            }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Link sx={{ textDecoration: 'none'}} to={'/admin'}>
                                <MenuItem onClick={handleClose}>
                                    Admin
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

                <Divider />
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.default
                    },
                }}
                className='test'
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }} className={'test2'}>
                    <List>
                        <Link to={"employee"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem key={1} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Employees"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={"hardware"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem key={1} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LaptopIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Hardwares"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                    {/*
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> */}
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}