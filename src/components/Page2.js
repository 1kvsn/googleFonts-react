import React from 'react';
import {createStore} from 'redux';
import reducer from '../reducers/fonts-reducer';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';
import Messages from './Messages';
import Nav from './Nav';

export const store = createStore(reducer);

class Page2 extends React.Component {
	constructor() {
		super();

		this.state = {
			inputVal: "",
			fontSize: 14,
			isChecked: false,
		}
	}

	// Hijacked the user input and update it on React state.
	handleInput = (e) => {
		this.setState({inputVal: e.target.value,})
	}

	// Font Increment & Decrement methods
	handleInc = () => {
		this.setState({fontSize: this.state.fontSize+1})
	}
	handleDec = () => {
		this.setState({fontSize: this.state.fontSize-1})
	}

	// Font Effect Method
	handleEffect = (data) => {
		console.log(data);
		this.setState({isChecked: !this.state.isChecked,})
		this.props.dispatch({type: "TOGGLE", payload: data})
		// console.log('handle effect called', this.state.isChecked);
	}

	// Web Font Loader Method
	 loadFont = (font) => {
		WebFont.load({
			google: {
				families: [font]
			}
		});
	 }

	render() {
		const {fontsReducer} =this.props.fonts;
		const slicedArr = fontsReducer.slice(19, 35);

		// function(array) {
		// 	return array.slice()
		// }
		// console.log(slicedArr, 'this is sliced array');

		return (
			<>
				<div className="main-wrapper">
					<h1>Google Fonts Browser</h1>
					<div className="input-container">
						<input onChange={(e) => this.handleInput(e)} type="text" placeholder="enter text here..."/>
					</div>
					<section className="font-section">
					
					{
						slicedArr.map((items, i) => (
							<div className="font-wrapper">
								<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
									<path class="theme-chooser-icon-bucket" d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path>
									<path class="theme-chooser-icon-paint" d="M0 20h24v4H0z"></path>
								</svg>
								<div className="font-header">
									<p className="font-title">{items.family}</p>

									{/* Font Size Button */}
									<span className="font-sizer-btn">
										<button onClick={() => this.handleInc()}><p className="plus-btn">+</p></button>
										<button onClick={() => this.handleDec()}><p className="minus-btn">-</p></button>
									</span>

									{/* Font Styles Button */}

									{/* <label className="switch">
										<input type="checkbox" checked={items.isClicked} onChange={() => this.handleEffect(items)} />
										<span className="slider round"></span>
									</label> */}
								</div>
								<div className="divider" />

								{/* Conditional Rendering for Font Effects */}

								{
									(items.isClicked) ? (this.loadFont(items.family + "&effect=fire-animation")) : (this.loadFont(items.family))

									// (this.loadFont(items.family))
								}
								<p className={items.isClicked ? 'user-text font-effect-fire-animation' : 'user-text'} style={{fontFamily: items.family, fontSize: this.state.fontSize,}}>

								{/* Conditional Rendering if user input box is empty */}

								{
									(this.state.inputVal) ? (this.state.inputVal) : Messages[i]
								}
								</p>
							</div>)
						)
					}
					</section>

					{/* Footer Section */}
					<footer className="footer">
						<Nav />
						<p>Made with &#9829; @ <a href="https://altcampus.io" target="_blank">AltCampus</a></p>
					</footer>
				</div>
			</>
		)
	}
}

// Making the Redux state appear as Props in React. 
function mapStateToProps(state) {

	return {
		fonts: state,
	}
}

// Connect function connecting Redux with React.

export default connect(mapStateToProps)(Page2);