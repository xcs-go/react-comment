import React,{Component} from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component{
	static propTypes = {
		onSubmitContent:PropTypes.func
	}
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			content:''
		}
	}

	componentDidMount() {
		this.textarea.focus();
	}

	componentWillMount() {
		this._loadUsername('username');
	}

	handleUserNameChange(event){
		this.setState({
			username:event.target.value
		})
	}

	handleContentChange(event){
		this.setState({
			content:event.target.value
		})
	}

	handleSubmit(){
		if(this.props.onSubmitContent){
			const {username,content} = this.state;
			this.props.onSubmitContent({username,content});
			this.setState({
				content:''
			})
		}
	}

	_loadUsername(username){
		let user = window.localStorage.getItem('username');
		this.setState({
			username:user ? user : this.state.username
		})
	}

	_saveUsername(username){
		window.localStorage.setItem('username',username);
	}

	handleUsernameBlur(event){
		// 将用户名存入localstorage
		this._saveUsername(event.target.value);
	}

	render(){
		return(
			<div className="comment-input">
				<div className="comment-field">
					<span className="comment-field-name">用户名:</span>
					<div className="comment-field-input">
						<input value={this.state.username} onChange={this.handleUserNameChange.bind(this)} onBlur={this.handleUsernameBlur.bind(this)} />
					</div>
				</div>
				<div className="comment-field">
					<span className="comment-field-name">评论内容:</span>
					<div className="comment-field-input">
					<textarea ref={(textarea)=>this.textarea = textarea} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
					</div>
				</div>
				<div className='comment-field-button'>
					<button onClick={this.handleSubmit.bind(this)}>
						发布
					</button>
				</div>
			</div>
		)
	}
}

export default CommentInput;