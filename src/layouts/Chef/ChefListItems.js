import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Link as RouterLink } from 'react-router-dom';

export default function ChefListItems(props) {
  return(
    <div>
        <ListItem button component={RouterLink} to="/">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
        <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/chef/dashboard" onClick={() => props.display('Dashboard')}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/chef/recipes" onClick={() => props.display('My Recipes')}>
            <ListItemIcon>
                <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="My Recipes" />
        </ListItem>
        <ListItem button component={RouterLink} to="/chef/orders" onClick={() => props.display('Orders')}>
            <ListItemIcon>
                <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItem>
    </div>
  );
};
