import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { Link as RouterLink } from 'react-router-dom';

export default function DelivListItems(props) {
  return(
    <div>
        <ListItem button component={RouterLink} to="/">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
        <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/delivery/dashboard" onClick={() => props.display('Dashboard')}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/delivery/deliveries" onClick={() => props.display('Deliveries')}>
            <ListItemIcon>
                <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Deliveries" />
        </ListItem>
    </div>
  );
};
