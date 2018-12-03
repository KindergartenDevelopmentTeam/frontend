import React, {Component} from 'react';

class Comment extends Component{

    render(){
        return(
            <div >
                <div className = 'post-div' >
                    <div className='comment-header'>
                        <h6><image>{this.props.image}{this.props.name}</image></h6>
                    </div>
                    <div className='comment-text-container'>
                        <h6>{this.props.content}</h6 >
                    </div>
                </div>
            </div>
        )
    }
}
export default Comment;