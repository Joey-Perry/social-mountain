import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      url:'https://practiceapi.devmountain.com/api/posts'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind( this );
  }
  
  componentDidMount() {
    axios.get(this.state.url)
      .then(({data}) => {
        this.setState({ posts: data });
      })
      .catch(err => console.log(err))
  }

  updatePost(id, text) {
    const newPost = {
      id: id,
      text: text,
    }
    axios.put((this.state.url + `?id=${id}`), newPost)
      .then(({data}) => {
        this.setState({ posts: data});
      })
      .catch(err => console.log(err))
  }

  deletePost(id) {
    axios.delete(this.state.url + `?id=${id}`)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.log(err))
  }

  createPost(text) {
    const body = {text};
    axios.post(this.state.url, body)
      .then(({data}) => {
        this.setState({ posts: data})
      })
      .catch(err => console.log(err))
  }

  searchPosts(params){
    const encodedUri = encodeURI(this.state.url + `/filter?text=${params}`);
    axios.get(encodedUri)
      .then(({data}) => {
        this.setState({ posts: data })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(post => {
            return <Post key={post.id} 
                          text={post.text} 
                          date={post.date} 
                          updatePostFn={this.updatePost} 
                          id={post.id}
                          deletePostFn={this.deletePost}
                          />
          })}
        </section>
      </div>
    );
  }
}

export default App;
