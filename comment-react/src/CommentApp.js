import React,{Component} from 'react';
import CommentInput from './CommentInput.js';
import CommentList from './CommentList.js';

class CommentApp extends Component{
	constructor(props) {
		super(props);
		this.state={
			comments:[]
		}
	}

	componentWillMount() {
		this._loadComment();
	}

	_setComment(comments){
		window.localStorage.setItem('comments',JSON.stringify(comments));
	}

	_loadComment(){
		let comments = window.localStorage.getItem('comments');
		if(comments){
			comments = JSON.parse(comments);
			this.setState({
				comments:comments   // 让存储在本地的评论加载到评论列表中显示到评论列表中
			})
		}
	}

	handleSubmitContent(comment){
		if(!comment) return;
		if(!comment.username) alert('请输入用户名');
		if(!comment.content) alert('请输入评论');
		const comments = this.state.comments;
		comments.push(comment);
		this.setState({
			comments:comments
		});
		this._setComment(comments);
	}

	render(){
		return (
			<div className="wrapper">
				<CommentInput onSubmitContent={this.handleSubmitContent.bind(this)}/>
				<CommentList comments={this.state.comments}/>
			</div>
		)
	}
}

export default CommentApp