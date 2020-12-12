import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { Link as RouterLink } from 'react-router-dom';

export default function ManagListItems(props) {
  return(
    <div>
        <ListItem button component={RouterLink} to="/manager/dashboard" onClick={() => props.display('Dashboard')}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/manager/employees" onClick={() => props.display('Manage Employees')}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Employees" />
        </ListItem>
        <ListItem button component={RouterLink} to="/manager/customers" onClick={() => props.display('Manage Customers')}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Customers" />
        </ListItem>
    </div>
  );
};
