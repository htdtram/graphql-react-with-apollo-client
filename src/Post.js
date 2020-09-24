import React from 'react'

const Post = (props) => (
  <div>
    <br />
    <h3>Title: {props.post.title}</h3>
    <p>Description: {props.post.description}</p>
  </div>
);


export default Post
