import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ApproveCard} from '../../components';

import ManagerContext from '../../context/manager/managerContext';

const useStyles = makeStyles((theme) => ({
    
  }));

export default function EmployeeList(props) {
    const classes = useStyles();

    const managerContext = useContext(ManagerContext);

    const { employees, getPendingEmployees } = managerContext;

    useEffect(() => {
        getPendingEmployees();

        // eslint-disable-next-line
    }, []);

    return(
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={5}>
            {employees.map((employee) => (
                <Grid key={employee._id} item xs={6}>
                    <ApproveCard
                        id={employee._id}
                        name={employee.firstName + " " + employee.lastName}
                        email={employee.email}
                        type={employee.type}
                    />
                </Grid>
            ))}
            </Grid>
        </Grid>
    );
}