import React, {Component} from 'react';
import axios from "axios";
import './AdminPage.css'
import {DEFAULT_PAGE, DEFAULT_PAGE_NORMAL} from "../index";

class AdminPage extends Component{
    constructor(props){
        super(props);
        this.state = {groups:null, parents:null, children:null, teachers:null, groupId:-1, toChange:"", newPerson:""};
    }

    componentWillMount(){
        if(true) {
            axios.get(`${DEFAULT_PAGE_NORMAL}/getGroups`)
                .then(res => {
                    const groups = res.data;
                    this.setState({groups: groups});
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            axios.get(`http://kindergarten.westeurope.cloudapp.azure.com:8080/api/group/51/getParents/`)
                .then(res => {
                    const group = res.data;
                    this.setState({groups: group});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    groupIdItem;
    loadPage = () => {
        this.groupIdItem = this.state.groups.map(group =>
            <option value={group.id}>{group.name}({group.id})</option>
        );
    };

    handleGroupSelectionOnClick(event) {
        this.setState({groupId : event.target.value});
        this.loadPeople(event.target.value);
    };

    handleGroupWhenNewSelectionOnClick(event) {
        this.setState({groupId : event.target.value});
    };

    handlePeopleSelectionOnClick(event) {
        this.setState({toChange : event.target.value});
    };

    handleRemoveOnClick(str) {
        const person = this.state.toChange;
        if(person!=="- select -") {
            axios.post(`${DEFAULT_PAGE}/group/${this.state.groupId}/remove${str}/`, {person})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    handleNewPersonOnClick(name, password, role, username) {
        const user = {
            name: name.toString(),
            password: password.toString(),
            scope: role.toString(),
            username: username.toString()
        };
        console.log(name, role, username, password);
        let personId = -1;
        this.setState({newPerson: user});
        axios.post(`${DEFAULT_PAGE_NORMAL}/createUser`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                personId = res.data.id;
                console.log(personId);
                return personId;

            })
            .then(personId => axios.post(`${DEFAULT_PAGE_NORMAL}/group/${this.state.groupId}/addUser/`, personId, {headers:{"Content-Type": "text/plain"}}))
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleCreateGroupOnClick= (element) => {
        axios.post(`${DEFAULT_PAGE_NORMAL}/createGroup`, element.value, {headers:{"Content-Type": "text/plain"}})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    parentIdItem;
    teacherIdItem;
    childIdItem;
    loadPeople = (ID) => {
        axios.get(`${DEFAULT_PAGE_NORMAL}/group/${ID}`)
            .then(res => {
                const group = res.data;
                this.setState({parents: group.users.filter(user => user.scope === 'parent')});
                this.setState({teachers: group.users.filter(user => user.scope === 'teacher')});
                this.setState({children: group.children});
                this.parentIdItem = group.users.filter(user => user.scope === 'parent').map(parent =>
                    <option value={parent}>{parent.name}({parent.id})</option>
                );
                this.childIdItem = group.children.map(parent =>
                    <option value={parent}>{parent.name}({parent.id})</option>
                );
                this.teacherIdItem = group.users.filter(user => user.scope === 'teacher').map(parent =>
                    <option value={parent}>{parent.name}({parent.id})</option>
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render(){
        if(this.state.groups == null){
            return<div></div>
        }
        this.loadPage();
        return(
            <div className='admin_page_div'>
                <div  className='new-group'>
                    <label>
                        Create new group:
                        <div className="mdl-layout-spacer"/>
                            Name:
                        <input type="text" name="name" id="new-group-input"/>
                        <input type="button" value="Create Group" onClick={() => this.handleCreateGroupOnClick(document.getElementById("new-group-input"))} />
                    </label>
                </div>
                <div  className='modify-group'>

                    <form action="#">
                        <label>
                            Modify in group:
                            <div className="mdl-layout-spacer"/>
                            Group's name(ID):
                            <select onChange={(e) => this.handleGroupSelectionOnClick(e)} className='selection' value="null">
                                <option>- select -</option>
                                {this.groupIdItem};
                            </select>
                        </label>
                        <div className="mdl-layout-spacer"/>
                        <label>
                            <div className='parents'>
                                Parents:
                                <select onChange={(e) => this.handlePeopleSelectionOnClick(e)} defaultValue="- select -">
                                    <option>- select -</option>
                                    {this.parentIdItem};
                                </select>
                                <input type="button" value="Remove" onClick={() => this.handleRemoveOnClick("Parent")} />
                            </div>
                            <div className='children'>
                                Children:
                                <select onChange={(e) => this.handlePeopleSelectionOnClick(e)} defaultValue="- select -">
                                    <option>- select -</option>
                                    {this.childIdItem};
                                </select>
                                <input type="button" value="Remove" onClick={() => this.handleRemoveOnClick("Child")} />
                            </div>
                            <div className='teachers'>
                                Teachers:
                                <select onChange={(e) => this.handlePeopleSelectionOnClick(e)} defaultValue="- select -">
                                    <option>- select -</option>
                                    {this.teacherIdItem};
                                </select>
                                <input type="button" value="Remove" onClick={() => this.handleRemoveOnClick("Teacher")} />
                            </div>
                        </label>
                    </form>
                </div>
                <div  className='new-person'>
                    <label>
                        Create new Person:
                        <form>
                            <label>
                                Group's name(ID)
                                <select onChange={(e) => this.handleGroupWhenNewSelectionOnClick(e)} className='selection' value="null">
                                    <option>- select -</option>
                                    {this.groupIdItem};
                                </select>
                            </label>
                            <div className="mdl-layout-spacer"/>
                            <label>
                                Name:
                                <input id="n" type="text" name="name" />
                            </label>
                            <div className="mdl-layout-spacer"/>
                            <label>
                                Password:
                                <input id="p"  name="password" />
                            </label>
                            <div className="mdl-layout-spacer"/>
                            <select id="r" defaultValue={"Parent"} >
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                                <option value="parent">Parent</option>
                            </select>
                            <div className="mdl-layout-spacer"/>
                            <div className='new-person-button'>
                                <button type="button"
                                        onClick={() => this.handleNewPersonOnClick(document.getElementById("n").value,
                                           document.getElementById("p").value, document.getElementById("r").value,document.getElementById("n").value)}>Create</button>
                            </div>
                        </form>
                    </label>
                </div>
            </div>
        )
    }
}
export default AdminPage;
