
import React, { Component } from 'react';
import '../Styles/css/Login.css';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

var passwordRegex = /[0-9\sA-Za-z]/;
const styles = theme => ({
   textField: {
     flexBasis: 200,
   },
 });

class RegisterForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showPassword: false,
      };
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
   }

   handleClickShowPassword() {
      this.setState({showPassword: !this.state.showPassword});
  };

   render() {
      const { classes } = this.props;
      return (
         <form>
            <div className="inner-container">
            
            <Alert stack ={{limit: 2}}/>

               <div className="box">
                  <div className="login-title">
                     Register
                  </div>
                  <div className="input-group">
                     <FormControl className={classNames(classes.textField)}>               
                           <InputLabel htmlFor="adornment-password">Email</InputLabel>
                           <Input
                              name="registerEmail"
                              id="adornment-password"
                              onChange={this.props.handleRegisterEmailChange}
                              value ={this.props.registerEmail}
                              margin="normal"
                           />  
                     </FormControl>        
                  </div>
                  <div className="input-group-pass">
                     <FormControl className={classNames(classes.textField)}>                       
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                           name="registerPassword"
                           id="adornment-password"
                           onChange={this.props.handleRegisterPasswordChange}
                           value ={this.props.registerPassword}
                           type={this.state.showPassword ? "text" : "password"}
                           margin="normal"
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                 >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                 </IconButton>
                              </InputAdornment>
                           }
                        />  
                        <button type="submit" onClick={this.props.submitRegister} className="login-btn">Register</button>
                     </FormControl>        
                  </div> 
                  
               </div>
            </div>
         </form>
      )
   }
}
export default withStyles(styles)(RegisterForm);
RegisterForm.propTypes = {
   classes: PropTypes.object.isRequired,
 };
