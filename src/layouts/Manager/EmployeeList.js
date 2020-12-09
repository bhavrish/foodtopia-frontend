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

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={6}>
                    <ApproveCard />
                </Grid>
                <Grid item xs={6}>
                    <ApproveCard />
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <Grid container spacing={3}>
            {/* <Grid container item xs={12} spacing={5}>
                <FormRow />
            </Grid>
            <Grid container item xs={12} spacing={5}>
                <FormRow />
            </Grid> */}
            {employees.map((employee) => (
                <Grid container item xs={12} spacing={5}>
                    <Grid key={employee._id} item xs={4}>
                        <ApproveCard
                            id={employee._id}
                            name={employee.firstName + " " + employee.lastName}
                            email={employee.email}
                            type={employee.type}
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}