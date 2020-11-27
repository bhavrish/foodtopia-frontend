import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ForumIcon from '@material-ui/icons/Forum';
import { Link as RouterLink } from 'react-router-dom';

export default function CustListItems(props) {
  return(
    <div>
        <ListItem button component={RouterLink} to="/" >
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
        <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/customer/dashboard" onClick={() => props.display('Dashboard')}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/menus">
            <ListItemIcon>
                <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menus" />
        </ListItem>
        <ListItem button component={RouterLink} to="/customer/cart" onClick={() => props.display('Cart')}>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
        </ListItem>
        <ListItem button component={RouterLink} to="/customer/discussion" onClick={() => props.display('Discussion')}>
            <ListItemIcon>
                <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion" />
        </ListItem>
    </div>
  );
};
