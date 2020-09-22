import React, { Component } from 'react';
import axios from 'axios';

const axiosGraphQL = axios.create({
  baseURL: 'http://graphql-base.herokuapp.com/graphql',
})

const GET_POST = (idPost) => `{
  post(id:${idPost}){
    id
    title
    description
  }
}`

export default class ApiAxios extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     idPost : '1',
  //     post: null,
  //     errors: null,
  //   }
  //   this.onChangeIdPost = this.onChangeIdPost.bind(this);
  // }

  state = {
    idPost: 1,
    post: null,
    errors: null,
  }

  // componentDidMount() {
  //   //fetch data
  //   this.onFetchData(this.state.idPost);
  // }

  onFetchData = (idPost) => {
    // console.log(GET_POST(idPost));
    axiosGraphQL
      .post('', { query: GET_POST(idPost) })
      .then(result => {
        // console.log(result.data);
        this.setState(() => ({
          post: result.data.data ? result.data.data.post : null,
          errors: result.data.errors,
        }))
        // console.log(this.state.post)
      });
  };

  onChangeIdPost =  event => {
    event.preventDefault();
     this.setState({ idPost: event.target.value });
  }

  onClickGetPost = event => {
    event.preventDefault();
    this.onFetchData(this.state.idPost);
  }


  render() {
    const { idPost, post } = this.state;
    return (
      <div>
        <input id='idPost' type='text' value={idPost} onChange={this.onChangeIdPost} />
          <button id='btnGetPost' onClick={this.onClickGetPost}>GET</button>
          {
            post ? (<Post post={post} />) :
              (<p>No information yet</p>)
          }
      </div>
    );
  }
}

const Post = ({ post }) => (
  <div>
    <br />
    <h3>{post.title}</h3>
    <p>
      {post.description}
    </p>
  </div>
);
