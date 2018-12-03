import React, {Component} from 'react';
import {Cell, Grid} from "react-mdl";
import Calendar from 'react-calendar';
import axios from "axios";
import {DEFAULT_PAGE} from "../index";

class ChildrensPage extends Component{

    constructor(props){
        super(props);
        this.state = {checker: false, child:null, notes: null};
    }

    componentWillMount(){
        if(window.location.href.split("/").length>4) {
            const url = window.location.href.split("/");
            console.log(`${DEFAULT_PAGE}/child/${url[url.length - 1]}`);
            axios.get(`${DEFAULT_PAGE}/child/${url[url.length - 1]}`)
                .then(res => {
                    const child = res.data;
                    this.setState({child: child});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            axios.get(`${DEFAULT_PAGE}/child/0`)
                .then(res => {
                    const child = res.data;
                    this.setState({child: child});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    noteItem;
    loadNotes = () => {
        this.noteItem = this.state.child.notes.map(note =>
            <li key={note.id}>
                <h6>{note.content}</h6>
            </li>
        );
    };


    render(){
        if(this.state.child==null){
            return (<div></div>)
        }
        this.loadNotes();
        return(
                <div className = 'children-div' >

                    <Grid className = 'children-grid'>
                        <Cell col={8}>
                             <h2 align = "left">{this.state.child.name}</h2>

                            <div className='post-text-container'>
                                <ul>{this.noteItem}</ul>
                            </div>
                        </Cell>
                        <Cell col={4} className='child-data-container'>
                            <img src = "https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-512.png"
                                 style={{height: 250}}/>
                            &nbsp;
                            <Calendar activeStartDate={new Date(Date.now())} markedDates={new Date(2018, 11, 12)}/>
                        </Cell>
                    </Grid>
            </div>
        )
    }
}

export default ChildrensPage;