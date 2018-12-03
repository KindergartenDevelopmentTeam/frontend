
import React, {Component} from 'react';
import Post from "./Post";
import {Cell, Grid} from "react-mdl";
import People from "./People";
import {Route} from "react-router-dom";
import Messages from "./Messages";
import ChildrensPage from "./ChildrensPage";
import PostPage from "./PostPage";
import axios from "axios";
import {DEFAULT_PAGE_NORMAL} from "../index";


class Group extends Component{
    constructor(props){
        super(props);
        this.state = {redirect: false, path:"/group", component:Group,
            posts:null, children:null, parents:null, teachers:null};
    }

    handleOnClick = (value, comp) => {
        this.setState({ redirect: true, path:value, component:comp})
    };

    componentDidMount() {
        axios.get(`${DEFAULT_PAGE_NORMAL}/getGroups`)
            .then(res => {
                let groupId = res.data[0].id;
                console.log("groipIdinGroup: " + groupId);
                console.log(res.data[0]);
                return groupId;
            })
            .then(groupId => {
                axios.get(`${DEFAULT_PAGE_NORMAL}/group/${groupId}`)
                    .then(res => {
                        const posts = res.data.posts;
                        this.setState({posts: posts});
                        const children = res.data.children;
                        this.setState({children: children});
                        const teachers = res.data.users.filter(user => user.scope === 'teacher');
                        this.setState({teachers: teachers});
                        const parents = res.data.users.filter(user => user.scope === 'parent');
                        this.setState({parents: parents});
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            });


    };

    postItem;
    parentItem;
    childItem;
    teacherItem;

    loadPage = () => {
        this.postItem = this.state.posts.map(post =>
            <li onClick={() =>this.handleOnClick(`/post/${post.id}`, PostPage)}>
                <Post id={post.id}/>
            </li>
        );
        this.parentItem = this.state.parents.map(parent =>
            <li className='people-nav-div' onClick={() =>this.handleOnClick(`/messages/${parent.id}`, Messages)}>
                <People name={parent.name} image= {parent.image}/>
            </li>
        );
        this.childItem = this.state.children.map(child =>
            <li onClick={() =>this.handleOnClick(`/childrenspage/${child.id}`, ChildrensPage)}>
                <People name={child.name} image= {child.image}/>
            </li>
        );
        this.teacherItem = this.state.teachers.map(teacher =>
            <li onClick={() =>this.handleOnClick(`/messages/${teacher.id}`, PostPage)}>
                <People name={teacher.name} image= {teacher.image}/>
            </li>
        );
    };



    render() {
        if(this.state.redirect){
            this.props.history.push(this.state.path);
            return <Route  component={this.state.component}/>
        }
        if(this.state.posts==null || this.state.children==null|| this.state.teachers==null || this.state.parents==null ){
            return (<div></div>)
        }
        this.loadPage();
        return(
            <div>
                <Grid>
                    <Cell col={8}>
                       <ul>
                           {this.postItem}
                       </ul>
                    </Cell>
                    <Cell col={4}>
                        <div className = 'people-type-container'>
                            <h5>Teachers</h5>
                            <ul>{this.teacherItem}</ul>
                        </div>
                        <div className = 'people-type-container'>
                            <h5>Children</h5>
                            <ul>{this.childItem}</ul>
                        </div>
                        <div className = 'people-type-container'>
                            <h5>Parents</h5>
                            <ul>{this.parentItem}</ul>
                        </div>
                    </Cell>
                </Grid>

            </div>
        )
    }
}
export default Group;