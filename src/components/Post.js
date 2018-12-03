import React, {Component} from 'react';
import {Radio, RadioGroup} from "react-mdl";
import {Button} from "react-mdl";
import Comment from "./Comment"
import axios from "axios";
import {DEFAULT_PAGE_NORMAL} from "../index";

class Post extends Component{

    constructor(props){
        super(props);
        this.state = {checker: false, post:null, postId:0};
    }

    componentWillMount(){
        this.setState({postId : this.props.id});
                axios.get(`${DEFAULT_PAGE_NORMAL}/post/${this.props.id}`)
                    .then(res => {
                        const post = res.data;
                        this.setState({post: post});
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            ;
    }

    commentItem;
    loadComments = () => {
        this.commentItem = this.state.post.comments.map(comment =>
            <li key={comment.id}>
                <Comment name={comment.creator.name} image={comment.creator.image} content={comment.content}/>
            </li>
        );
    };

    pollItem;
    loadPoll = () => {
        this.pollItem = this.state.post.poll.map(option =>
            <Radio value="Yes" ripple>{this.state.post.poll}</Radio>
        );
    };

    handleOnLikeClick() {
        axios.post(`${DEFAULT_PAGE_NORMAL}/post/${this.postId}/like`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        if(this.state.post==null){
            return (<div></div>)
        }
        this.loadComments();
        return(
            <div>
                <div className = 'post-div' >
                    <div>
                        <div className='post-header-div'>
                            <h2><img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                     style = {{height: 70}}
                                     alt = "avatar"/>
                                {this.state.post.creator.name}</h2>
                        </div>
                             <img src = "https://cdn3.iconfinder.com/data/icons/customer-support-24/64/forum-information-web-board-text-512.png"
                                  style = {{height: 250}}
                                  alt = "postPicture"/>
                    </div>
                    <div className='post-text-container'>
                         <h6>{this.state.post.content}</h6>
                    </div>
                    <RadioGroup id={this.state.post.id} container="ul" childContainer="li" name={this.state.post.id.toString()} value="No">
                        <Radio value="Yes" ripple>Yee</Radio>
                        <Radio value="No" ripple>No</Radio>
                    </RadioGroup>
                    <div className='post-like-button-div'>
                        <Button onClick={() =>this.handleOnLikeClick()}>Like</Button>
                    </div>
                </div>
                <ul>
                    {this.commentItem}
                </ul>

            </div>
        )
    }
}

export default Post;