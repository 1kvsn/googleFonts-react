import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';

import Nav from './Nav';
import Messages from './Messages';
import reducer from '../reducers/fonts-reducer';

export const store = createStore(reducer);

class Page2 extends React.Component {

		state = {
			inputVal: "",
			fontSize: 18,
			isChecked: false,
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
		// console.log(data);
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

		return (
			<>
				<div className="main-wrapper">
					<div className="header-btn">
						<button className="f-btn one-btn">G</button>
						<button className="f-btn two-btn">o</button>
						<button className="f-btn three-btn">o</button>
						<button className="f-btn four-btn">g</button>
						<button className="f-btn five-btn">l</button>
						<button className="f-btn six-btn">e</button>
							<span>
								Fonts Browser
							</span>
						</div>
					<div className="input-container">
						<input onChange={(e) => this.handleInput(e)} type="text" placeholder="enter text here..."/>
					</div>
					<section className="font-section">
					
					{
						slicedArr.map((items, i) => (
							<div className="font-wrapper" key={i}>
								<div className="font-header">
									<p className="font-title">{items.family}</p>

									{/* Font Size Button */}
									<span className="font-sizer-btn">
										<div onClick={() => this.handleInc()}><p className="plus-btn font-sizer-common">+</p></div>
										<div onClick={() => this.handleDec()}><p className="minus-btn font-sizer-common">-</p></div>
									</span>
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
						<p>Made with &#9829; @ <a href="https://altcampus.io" target="_blank" rel="noopener noreferrer">AltCampus</a></p>
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