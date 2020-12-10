import React, { useState, useContext } from 'react';
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

import ChefContext from '../../context/chef/chefContext';
import AuthContext from '../../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  addRecipeBtn: {
    float: 'right',
  },
}));

const CreateRecipe = () => {
  const classes = useStyles();

  const chefContext = useContext(ChefContext);
  const authContext = useContext(AuthContext);

  const { createRecipe } = chefContext;
  const { user } = authContext;

  const [open, setOpen] = React.useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    chefName: '',
    description: '',
    ingredients: '',
    dietaryRestrictions: '',
    type: '',
    price: 0,
  });
  const [image, setImage] = useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(image);
    createRecipe({
      title: recipe.title,
      chefName: `${user.firstName} ${user.lastName}`,
      chefID: user._id,
      description: recipe.description,
      ingredients: recipe.ingredients,
      dietaryRestrictions: recipe.dietaryRestrictions,
      type: recipe.type,
      price: recipe.price,
      image: image,
    });
  };

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const uploadImage = (image) => {
    setImage(image[0]);
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='price'
            name='price'
            label='Price'
            onChange={onChange}
          />

          <DropzoneArea name='image' onChange={uploadImage} />
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
