import React, {Component} from 'react';
import logo from "../images/Kindergarten App Logo.png"

class Default extends Component{

    render(){
        return(
            <div className = 'welcome-div'>
                <h1>Welcome to KDT</h1>
                <div className="mdl-layout-spacer"/>
                <img src={logo}/>
            </div>

        )
    }
}
export default Default;