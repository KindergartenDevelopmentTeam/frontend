import {Component} from "react";
import Post from "./Post"
import React from "react";
import axios from "axios";
import {Textfield} from "react-mdl";
import {DEFAULT_PAGE, DEFAULT_PAGE_NORMAL} from "../index";

class PostPage extends Component{

    constructor(props){
        super(props);
        this.state = { post:null};

    }
    componentDidMount(){
        this.setState({isLoading:true});
        const url = window.location.href.split("/");
        axios.get(`${DEFAULT_PAGE_NORMAL}/post/${url[url.length - 1]}`)
            .then(res => {
                const Respost = res.data;
                this.setState({ post: Respost });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleOnSendCommentClick = (element) => {
        const comment = {
            content :  element.value,
            date : new Date(Date.now())
        };
        axios.post(`${DEFAULT_PAGE}/group/654/post/${this.state.post.id}/comment`, {comment} )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        element.value = "";
    };


    render(){
        if(this.state.post==null){
            return (<div></div>)
        }
        return(
           <div>
               <Post id={this.state.post.id}/>
               <div className='new-comment'>
                   <div className = 'post-div' >
                       <div className='comment-header'>
                           <h6><img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                                    style = {{height: 40}}
                           /> My name</h6>
                       </div>
                       <div className='new-comment-text-div'  >
                           <Textfield   label="Comment..."
                                        id="newComment"
                                        rows={3}
                                        style={{width: 700, padding:0}}
                           />
                       </div>
                       <div className='send-new-comment-div'>
                           <input type="submit" value="Send" onClick={() => this.handleOnSendCommentClick(document.getElementById("newComment"))}  style={{width: 100}}/>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}
export default PostPage;