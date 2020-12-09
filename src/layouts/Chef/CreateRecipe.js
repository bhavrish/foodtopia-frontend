import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  addRecipeBtn: {
    float: 'right',
  },
}));

const CreateRecipe = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Fab
        color='primary'
        aria-label='add'
        onClick={handleClickOpen}
        className={classes.addRecipeBtn}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create Recipe</DialogTitle>
        <DialogContent>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='title'
            name='title'
            label='Title'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='chefName'
            name='chefName'
            label='Chef Name'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            multiline
            id='description'
            name='description'
            label='Description'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='ingredients'
            name='ingredients'
            label='Ingredients'
            placeholder='Ex: eggs, cheese, milk'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='dietaryRestrictions'
            name='dietaryRestrictions'
            label='Dietary Restrictions'
            placeholder='Ex: eggs, cheese, milk'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='type'
            name='type'
            label='Type'
            placeholder='food or drink'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='price'
            name='price'
            label='Price'
          />
          <DropzoneArea />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateRecipe;
