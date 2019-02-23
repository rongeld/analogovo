import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {Link} from 'react-router-dom';

import RetroWave from '../../img/login_bg.jpg';

import CameraIcon from '../../img/camera-icon.png';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: '-15%',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  wrapper: {
    backgroundImage: `url(${RetroWave})`,
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    height: '100vh'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
  },
  camera: {
    width: '80%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    fontSize: '14px',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    fontSize: '14px',
    marginBottom: theme.spacing.unit * 3
  },
});

function SignIn(props) {
  const { classes } = props;

  return (
      <div className={classes.wrapper}>
        <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
            <img className={classes.camera} src={CameraIcon} alt="" />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign in
            </Button>
            </form>
            <Link to='/'>To main page</Link>
        </Paper>
        </main>
      </div>
    
  );
}


export default withStyles(styles)(SignIn);