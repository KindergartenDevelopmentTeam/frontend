import React, {Component} from "react";
import {Route} from "react-router-dom";
import App from './App'
import './Login.css';
import {Cell, Grid} from "react-mdl";

import {AUTH_PAGE} from "./index";
import axios from "axios";


class Login extends Component {

   handleLoginOnClick(name, password, role, username){
       const personData = {
           grant_type: "password",
           username: username,
           password: password,
           client_id:"react_client",
           client_secret:"almaalmaalmaalma",
        };

       sessionStorage.setItem("username", username);
       sessionStorage.setItem("password", password);
/*
       axios.post(AUTH_PAGE, personData, {headers:{"Content-Type": "text/plain"}})
           .then(res => {
               console.log(res.data);
               sessionStorage.setItem("userToken", res.data.access_token);
               console.log('userresponse ' + res.data.access_token);
           })
           .catch((error) => {
               console.log('error ' + error);
           });*/
       this.setState({redirect: true})
   };

    handleRegnameChange = event => {
        this.setState({ regname: event.target.value });
    };

    handleRegpasswChange = event => {
        this.setState({ regpassw: event.target.value });
    };

    handleRegistration = event => {
        event.preventDefault();

        const user = {
            name: this.state.regname,
            password: this.state.regpassw
        };

        axios.post(`http://kindergarten.westeurope.cloudapp.azure.com:3000`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
   };

   constructor(props){
       super(props);
       this.state = {redirect: false, loginname:"", loginpassword:"", regname:"", regpassw:""};
   }
    render() {

       //todo BELEPES
       /*

const AuthStr = 'Bearer '.concat(USER_TOKEN);


axios.get(URL, { headers: { Authorization: AuthStr } })
 .then(response => {
     // If request is good...
     console.log(response.data);
  })
 .catch((error) => {
     console.log('error ' + error);
  });*/

        if(this.state.redirect || window.location.href.split("/")[window.location.href.split("/").length-1]!==""){
            return <Route component={App}/>
        }


        return (
            <div>
                <h1 align="center" className='login-welcome'>Welcome to KDT</h1>
                <Grid >
                    <Cell col={6} className='login-cell-div'>
                        <div className='input-login-div'>
                            <h2 align="center">Log in</h2>
                            <div className="mdl-layout-spacer"/>
                            <form>
                                <label>
                                    Name:
                                    <input id="name" type="text" name="name" />
                                </label>
                                <div className="mdl-layout-spacer"/>
                                <label>
                                    Password:
                                    <input id="password" type="password"  name="password" />
                                </label>
                                <div className="mdl-layout-spacer"/>
                                <select id="role" defaultValue={"Parent"} >
                                    <option value="Teacher">Teacher</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Parent">Parent</option>
                                </select>
                                    <div className="mdl-layout-spacer"/>
                                    <div className='new-person-button'>
                                    <button type="button"
                                        onClick={() => this.handleLoginOnClick(document.getElementById("name"),
                                            document.getElementById("password"), document.getElementById("role"),document.getElementById("name"))}>Login</button>
                            </div>
                        </form>
                        </div>
                    </Cell>

                    <Cell col={6} className='login-cell-div'>
                    <div className='input-register-div'>
                        <h2 align="center">Register</h2>
                        <form onSubmit={this.handleRegistration}>
                            <label>
                                Name:
                                <input type="text" name="name" />
                            </label>
                            <div className="mdl-layout-spacer"/>
                            <label>
                                Password:
                                <input type="password" name="password" />
                            </label>
                            <div className="mdl-layout-spacer"/>
                            <label>
                                Password again:
                                <input type="password" name="password" />
                            </label>
                            <div className="mdl-layout-spacer"/>
                            <select defaultValue="parent">
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                                <option value="parent">Parent</option>
                            </select>
                            <div className="mdl-layout-spacer"/>
                            <div className='button-div'>
                                <div className="mdl-layout-spacer"/>
                                <input type="button" value="Register"  />
                            </div>
                        </form>
                    </div>
                    </Cell>
                </Grid>
            </div>

        )
    }
}
export default Login;