import React, { Component } from 'react';
import axios from 'axios';
import './vendor/bootstrap/css/bootstrap.min.css';
import './App.css';

class NewsCard extends Component {
	render() {
		return (
			<div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
				<div className="card h-100">
					<img className="card-img-top" src={this.props.post.images.landscape.sizes ? this.props.post.images.landscape.sizes['thesun-video-rail'].source_url : 'http://placehold.it/700x400'} alt="" />
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

const LoadingSpinner = () => (
	<div className="loader">
		<img alt="Loading..." src="https://media.giphy.com/media/Db2IKbddDTWSI/giphy.gif" /> Loading...
	</div>
);

class CategoryList extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			categoryList: []
		};

		this.handleClick = this.handleClick.bind( this );
	}

	renderHTML( data ) {
		return { __html: data };
	}

	handleClick( e ) {
		this.selectedCat = e.target.value;
		this.props.onCategoryChange( e.target.value );
	}

	componentDidMount() {
		axios.get('https://www.thesun.co.uk/wp-json/wp/v2/categories?orderby=count&order=desc')
		.then(res => {
			this.setState({ categoryList: res.data });
		});
	}

	render() {
		return (
			<div className="category_filter">
				<div className="list">
					<label>Categories</label>
					<ul>
						{this.state.categoryList.map(function(category, index) {
							return (<li key={category.id}>
								<input
									type="radio"
									name="cat"
									value={category.id}
									checked={ parseInt( this.props.selectedCategory, 10 ) === parseInt( category.id, 10 )}
									onClick={this.handleClick} />
								<span dangerouslySetInnerHTML={ this.renderHTML( category.name ) } />
							</li>);
						}, this)}
					</ul>
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
			category: null,
			textSearch: '',
			categorySearch: '',
			loading: true
		};

		this.handleKeyUp = this.handleKeyUp.bind( this );
		this.handleCategoryChange = this.handleCategoryChange.bind( this );
		this.search = this.search.bind( this );
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
		if ( 32 !== e.keyCode ) {
			return;
		}

		let s = e.target.value;

		s = s.trim();

		if ( s !== '' ) {
			this.setState({ textSearch: '&search=' + s }, this.search);
		} else {
			this.setState({ textSearch: '' }, this.search);
		}
	}

	handleCategoryChange( category ) {
		this.setState({ category: category });

		if ( null !== category ) {
			this.setState({ categorySearch: '&categories=' + category }, this.search);
		} else {
			this.setState({ categorySearch: '' }, this.search);
		}
	}

	search() {
		this.setState({ posts: [], loading: true });

		axios.get('https://www.thesun.co.uk/wp-json/thesun/v1/posts/lite?per_page=12' + this.state.textSearch + this.state.categorySearch)
		.then(res => {
			this.setState({ posts: res.data, loading: false });
		});	
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-2"> <CategoryList onCategoryChange={this.handleCategoryChange} selectedCategory={this.state.category} /> </div>
				<div className="col-sm">
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
			</div>
		);
	}
}

export default NewsSearch;

class Weather extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			city: '',
			imageURL: ''
		};
	}

	componentDidMount() {
		let obj = this;
		navigator.geolocation.getCurrentPosition( function( pos ) {
			axios.get('http://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&appid=bd5e378503939ddaee76f12ad7a97608')
			.then(res => {
				obj.setState({
					city: res.data.name,
					imageURL: 'http://openweathermap.org/img/w/' + res.data.weather[0].icon + '.png'
				});
			});
		} );
	}

	render() {
		return (
			<div className="weather">
				<span className="city">{this.state.city}</span>
				<img alt="weather icon" src={this.state.imageURL} />
			</div>
		);
	}
}

export {
	Weather
}

