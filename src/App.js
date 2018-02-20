import React, { Component } from 'react';
import axios from 'axios';
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
	  posts: [],
	  loading: true
	};

	this.handleKeyUp = this.handleKeyUp.bind( this );
  }

  componentDidMount() {
	axios.get('https://www.thesun.co.uk/wp-json/thesun/v1/posts/lite?per_page=12')
	  .then(res => {
		this.setState({
			posts: res.data,
			loading: false
		});
	  });
  }

	handleKeyUp( e ) {
		let s = e.target.value;
		let sSplit = s.split(' ');
		s = s.trim();
		let search = '';
		if ( s !== '' && ( sSplit.length < 1 || '' != sSplit[sSplit.length - 1] ) ) {
			return;
		}

		if ( s !== '' ) {
			search = '&search=' + s;
		}

		this.setState({ posts: [], loading: true });

		axios.get('https://www.thesun.co.uk/wp-json/thesun/v1/posts/lite?per_page=12' + search)
		  .then(res => {
			this.setState({ posts: res.data, loading: false });
		  });

	}

	render() {
		return (
			<div>
				<p className="searchBar_container">
					<label htmlFor="s">Search Here <small>(type your query and add space to search)</small></label>
					<input type="text" name="s" id="s" className="searchBar" onKeyUp={this.handleKeyUp} />
				</p>
				<div className="row">
					{ this.state.loading ? <LoadingSpinner /> : '' }
					{this.state.posts.map(post =>
						<NewsCard key={post.id} post={post} />
					)}
				</div>
			</div>
		);
	}
}

export default NewsSearch;

const LoadingSpinner = () => (
  <div className="loader">
	<img src="https://media.giphy.com/media/Db2IKbddDTWSI/giphy.gif" /> Loading...
  </div>
);

export {
	LoadingSpinner
}	
