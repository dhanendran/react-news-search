import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './vendor/bootstrap/css/bootstrap.min.css';
import './App.css';

class NewsCard extends Component {
	render() {
		return (
				<div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <a href="#"><img className="card-img-top" src={this.props.post.images.landscape.sizes ? this.props.post.images.landscape.sizes['thesun-video-rail'].source_url : 'http://placehold.it/700x400'} alt="" /></a>
            <div className="card-body">
              <p className="card-text">
                <a href={this.props.post.canonical_url} target="_blank">{this.props.post.title}</a>
              </p>
            </div>
          </div>
        </div>
		)
	}
}

class NewsSearch extends Component {

	constructor( props ) {
    super( props );

    this.state = {
      posts: []
    };

    this.handleKeyUp = this.handleKeyUp.bind( this );
  }

  componentDidMount() {
    axios.get('https://www.thesun.co.uk/wp-json/thesun/v1/posts/lite?per_page=12')
      .then(res => {
        this.setState({ posts: res.data });
      });
  }

	handleKeyUp( e ) {
		let s = e.target.value;
		let sCount = s.split(' ').length;
		if ( sCount <= 1 || '' != s.split( ' ' )[sCount - 1] ) {
			return;
		}

		axios.get('https://www.thesun.co.uk/wp-json/thesun/v1/posts/lite?per_page=12&search=' + s)
      .then(res => {
        this.setState({ posts: res.data });
      });

	}

	render() {
		return (
			<div>
				<p className="searchBar_container">
					<label htmlFor="s">Search Here</label>
					<input type="text" name="s" id="s" className="searchBar" onKeyUp={this.handleKeyUp} />
				</p>
				<div className="row">
					{this.state.posts.map(post =>
            <NewsCard key={post.id} post={post} />
          )}
				</div>
			</div>
		);
	}
}

export default NewsSearch;
