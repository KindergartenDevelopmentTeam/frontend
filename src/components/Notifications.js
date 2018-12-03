import React, {Component} from 'react';
import Notificationbutt from "./notificationbutt";
import {Route} from "react-router-dom";
import axios from'axios';
import PostPage from "./PostPage";
import {DEFAULT_PAGE} from "../index";




class Notifications extends Component{

    constructor(props){
        super(props);
        this.state = {
            redirect:false,
            posts:[],
            redirectPostId: 0
        }
    }

    handleOnClick = (id) => {
        this.setState({redirectPostId: id});
        this.setState({redirect: true});
    };


    componentDidMount() {
        axios.get(`${DEFAULT_PAGE}/group/654/getPosts/`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts:posts });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    postItem;

    loadPosts = () => {
        if (this.state.posts.length > 0){
            this.postItem = this.state.posts.map(post =>
                <li onClick={() =>this.handleOnClick(post.id)}>
                    <Notificationbutt name={post.creator.name} image={post.creator.image}/>
                </li>
            );
        }
        else
            ;
    };

    render() {
        if(this.state.redirect){
            this.props.history.push(`/post/${this.state.redirectPostId}`);
            return <Route path={`/post/${this.state.redirectPostId}`} component={PostPage}/>
        }
        this.loadPosts();
        return(
            <div className='notifications-container'>
               <ul>
                    {this.postItem}
                </ul>
            </div>
        )
    }

}
export default Notifications;