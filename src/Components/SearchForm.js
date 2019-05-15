import React, { Component } from 'react';

import '../Styles/css/SearchForm.css'
import DisplayQuery from './DisplayQuery.js'
import DisplayGraphs from './DisplayGraphs.js';
import DisplayMap from './DisplayMap.js';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
var monthRegex = /[0-9,]/;
var queryRegex = /[0-9A-Za-z,]/;
var regex = /[0-9A-Za-z]/;
const styles = theme => ({
   container: {
     display: 'flex',
     flexWrap: 'wrap',
   },
   textField: {
     marginLeft: theme.spacing.unit,
     marginRight: theme.spacing.unit,
   },
   dense: {
     marginTop: 16,
   },
   menu: {
     width: 200,
   },
 });

class SearchForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showMapComponent: false,
         showQueryComponent: false,
         returns:[],
         offence:'',
         age:'',
         gender:'',
         year:'',
         month:'',
         area:'',

         offenceT:'',
         ageT:'',
         genderT:'',
         yearT:'',
         monthT:''
      };
      this.handleChange = this.handleChange.bind(this);
      this.submitQuery = this.submitQuery.bind(this);
      this.mapOnClick = this.mapOnClick.bind(this);
      this.cantMap = this.cantMap.bind(this);

   }

   submitQuery(e) {
      e.preventDefault();
      if (!regex.test(this.state.offence) && !regex.test(this.state.area) && 
      !regex.test(this.state.age) && !regex.test(this.state.gender) && 
      !regex.test(this.state.year) && !regex.test(this.state.month)) {
         Alert.error('You must specify the offence', {
            position: 'top',
            effect: 'slide',
            offset: 180,
            timeout: 3000
         });
         this.setState({
            offence:'',
            age:'',
            gender:'',
            year:'',
            month:'',
            area:''
         })
         return;
      }

      this.setState({
         showMapComponent: false,
         showQueryComponent: true,
       });
   
   //the filter parameters
   let filter = '';
   if (regex.test(this.state.area)) {
      filter = filter + `&area=${this.state.area}`
   }
   if (regex.test(this.state.age)) {
      filter = filter + `&age=${this.state.age}`
   }
   if (regex.test(this.state.gender)) {
      filter = filter + `&gender=${this.state.gender}`
   }
   if (regex.test(this.state.year)) {
      filter = filter + `&year=${this.state.year}`
   }
   if (regex.test(this.state.month)) {
      filter = filter + `&month=${this.state.month}`
   }

   //The parameters of the call
   let getParam = { method: "GET" };
   let head = { Authorization: `Bearer ${this.props.JWT}` };
   getParam.headers = head;

   //The URL
   const baseUrl = "https://cab230.hackhouse.sh/search?";
   // const query = 'offence=Armed Robbery';
   // this.state.offence = 'Armed Robbery'

   const query = `offence=${this.state.offence}`;
   const url = baseUrl + query + filter;

   fetch(encodeURI(url),getParam)
      .then(function(res) {
         if (res.ok) {
            return res.json();
         }
         {Alert.error('No results Found', {
            position: 'top',
            effect: 'slide',
            offset: 180,
            timeout: 3000
         })
         }
         throw new Error("Error when retrieving data");
      })
      .then((data) => this.setState({returns: data.result}))


      .catch((error) => {
         console.log("There has been a problem with your fetch operation: ",error.message);
      })

      this.setState({
         offenceT: this.state.offence,
         ageT: this.state.age,
         genderT: this.state.gender,
         yearT: this.state.year,
         monthT: this.state.month,

         offence:'',
         age:'',
         gender:'',
         year:'',
         month:'',
         area:'',
         returns:[]
      })
   }

   handleChange = (e) => {
      if (e.target.name == 'age' || e.target.name == 'gender' || e.target.name == 'year') {
         if (!queryRegex.test(e.target.value.slice(-1)) && e.target.value.length >= 1) {
            Alert.error('This field must contain only numbers or letters separated by a comma', {
               position: 'top',
               effect: 'slide',
               offset: 180,
               timeout: 3000
            });
            return;
         }
      }
      if (e.target.name == 'month') {
         if (!monthRegex.test(e.target.value.slice(-1)) && e.target.value.length >= 1) {
            Alert.error('This field must contain only numbers separated by a comma', {
               position: 'top',
               effect: 'slide',
               offset: 180,
               timeout: 3000
            });
            return;
         }
      }
      
   this.setState({[e.target.name]: e.target.value})
   }

   cantMap() {
      Alert.error('There is no data to Map', {
         position: 'top',
         effect: 'slide',
         offset: 180,
         timeout: 3000
      });
   }

   mapOnClick() {
      this.setState({
         showMapComponent: true,
         showQueryComponent: false
       });
   }

   render() {
      const { classes } = this.props;
      return(
         <div className="querypage">
            <Alert stack ={{limit: 1}}/>
            <div className= "headerwrapper">
               <form onSubmit ={this.submitQuery}> 
                  <div className="textboxes">
                     <TextField
                        // autoFocus="true"
                        name="offence"
                        value={this.state.offence}
                        onChange={this.handleChange}
                        id="outlined-textarea"
                        placeholder="Offence"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                     />
                     <TextField
                        name="area"
                        value={this.state.area}
                        onChange={this.handleChange}
                        id="outlined-textarea"
                        placeholder="Area"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                     />             
                     <TextField
                        name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        id="outlined-textarea"
                        placeholder="Age"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                     />
                     <TextField
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        id="outlined-textarea"
                        placeholder="Gender"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                     />
                     <TextField
                        name="year"
                        value={this.state.year}
                        onChange={this.handleChange}
                        id="outlined-textarea"
                        placeholder="Year"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                     />
                     <TextField
                        name="month"
                        value={this.state.month}
                        onChange={this.handleChange}
                        id="outlined-textarea"
                        placeholder="Month"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                     />
                     
                     
                  </div>     
                  <div className="searchbtn"> 
                     <button className="btn"><p>Search</p></button>
                  </div>    
               </form>
         <div className="mapbtn"> 
            {this.state.returns.length > 0 ? <button onClick={this.mapOnClick} className="btn2"><p>Graph</p></button>
            : <button onClick={this.cantMap} className="btn2"><p>Map</p></button>}
         </div>
      </div>

         

      <div className="background">
         {!this.state.showGMapComponent && this.state.showQueryComponent ? 
         <DisplayQuery returns={this.state.returns} offence={this.state.offenceT}
         age={this.state.ageT} gender={this.state.genderT}
         year={this.state.yearT} month={this.state.monthT}/> 
         :  null}
         {this.state.showMapComponent && !this.state.showQueryComponent ? 
         <DisplayMap returns={this.state.returns} offence={this.state.offenceT}
         age={this.state.ageT} gender={this.state.genderT}
         year={this.state.yearT} month={this.state.monthT}/>
         : null}
         
         {/* <DisplayGraphs returns={this.state.returns} offence={this.state.offenceT}
         age={this.state.ageT} gender={this.state.genderT}
         year={this.state.yearT} month={this.state.monthT}/> */}
      </div>
   
   </div>

         
      )
   }
}
export default withStyles (styles)(SearchForm);
