import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      search: ''
    }
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value })
  }

  searchPosts = () => {
    this.props.searchPostFn(this.state.search);
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" value={this.state.search} onChange={this.handleChange}/>

          <SearchIcon id="Search__icon" onClick={this.searchPosts}/>
        </div>
        
      </section>
    )
  }
}