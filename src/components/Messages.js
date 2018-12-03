import React, {Component} from 'react';
import {Grid, Cell, Textfield} from 'react-mdl';
import Contact from './Contact';
import axios from "axios";
import {DEFAULT_PAGE_NORMAL} from "../index";


class Messages extends Component{

    handleOnClick = (value) => {
        this.setState({name:value});
    };

    constructor(props){
        super(props);
        this.state = {name:"Random Name1", messages:0}
    }

    teacherIdItem;
    parentIdItem;

    loadPeople = (ID) => {
        let id;
        axios.get(`${DEFAULT_PAGE_NORMAL}/currentUserId`)
            .then(res => {
                id = res.data.id;
            })
            .then(id => axios.get(`${DEFAULT_PAGE_NORMAL}/user/${id}/getMessages`)
                .then(mess =>{this.setState({messages:mess})})

            );


        axios.get(`${DEFAULT_PAGE_NORMAL}/group/${ID}`)
            .then(res => {
                const group = res.data;
                this.parentIdItem = group.parents.map(parent =>
                    <div onClick={() =>this.handleOnClick(parent.name)}>
                    <Contact name={parent.name} image = <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                             alt = "avatar"
                             style = {{height: 70}}/>
                    />
                    </div>

                );
                this.teacherIdItem = group.teachers.map(parent =>
                    <option value={parent}>{parent.name}({parent.id})</option>
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    handleSendOnClick = (element) =>{
        element.value="";
    };



    render() {
        return(
            <div className = 'messages-body'>

               <Grid >
                   <Cell col={4} className='message-contact-container'>
                       <div>
                           <h3 align = "center">Contacts</h3>
                           <div onClick={() =>this.handleOnClick("Random Name1")}>
                                <Contact name="Random Name1" image = <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                        alt = "avatar"
                                        style = {{height: 70}}/>
                               />
                            </div>
                           <div onClick={() =>this.handleOnClick("Random Name2")}>
                                <Contact name="Random Name2" image = <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                         alt = "avatar"
                                         style = {{height: 70}}
                                      />
                                />
                           </div>
                           <div onClick={() =>this.handleOnClick("Random Name3")}>
                           <Contact name="Random Name3" image = <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                       alt = "avatar"
                                       style = {{height: 70}}
                                 />
                           />
                           </div>
                           <div onClick={() =>this.handleOnClick("Random Name4")}>
                            <Contact name="Random Name4" image = <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                           alt = "avatar"
                                           style = {{height: 70}}
                                     />
                            />
                           </div>
                       </div>
                   </Cell>
                   <Cell col={6}>
                       <h4 align = "middle">Messages</h4>
                       <div className='sent-messages-contact-name'>
                           <h6 align = "left" > <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                alt = "avatar"
                                style = {{height: 50}}/>
                            {this.state.name}</h6>
                       </div>
                       <div className='sent-messages-div'>
                           <p align = "middle">Message 1</p>
                           <p align = "middle">Message 2</p>
                           <p align = "middle">Message 3</p>
                           <p align = "middle">Message 4</p>
                       </div>

                       <form action="#">
                           <div className='messages-textfield-div'>
                               <div className="mdl-layout-spacer"/>
                               <Textfield  id="tf" label="Type here..."
                                            rows={2}
                                            style={{width: 700, padding:0}}
                               />

                               <input type="submit" value="Send"
                                      onClick={() => this.handleSendOnClick(document.getElementById("tf"))}
                                      style={{height:40, width:60}}/>
                           </div>
                           <div className='messages-textfield-send-button-div'>

                           </div>
                       </form>
                   </Cell>
               </Grid>
            </div>
            //<div><h1>Messages</h1></div>
        )
    }
}
export default Messages;