import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import '../Styles/css/SearchForm.css'
import SearchForm from './SearchForm.js'
// import LoginForm from './Components/LoginPage.js';

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   render() {
      return(   
         <div>     
            <SearchForm JWT={this.props.JWT}/>
        </div>  
      )
   }
}
export default Home;
