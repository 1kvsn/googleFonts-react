import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';

import Messages from '../constants';
import reducer from '../reducer/fonts-reducer';

export const store = createStore(reducer);

class Home extends React.Component {
	
		state = {
			inputVal: "",
			fontSize: 18,
			isChecked: false,
			themeColor: "",
		}

	handleInput = (e) => {
		this.setState({ inputVal: e.target.value })
	}

	handleInc = () => {
		this.setState({ fontSize: this.state.fontSize+1 })
	}
	handleDec = () => {
		this.setState({ fontSize: this.state.fontSize-1 })
	}

	handleEffect = (data) => {
		this.setState({ isChecked: !this.state.isChecked })
		this.props.dispatch({ type: "TOGGLE", payload: data })
	}

	// nextPage = () => {
	// 	this.setState({
	// 		nextPageValue: [{
	// 			a: this.state.nextPageValue[0].a*2,
	// 			b: this.state.nextPageValue[0].b*2,
	// 		}]
	// 	})
	// }

	// Web Font Loader Method
	 loadFont = (font) => {
		WebFont.load({
			google: {
				families: [font]
			}
		});
	 }

	render() {
		const { fontsReducer } = this.props.fonts;
		const slicedArr = fontsReducer.slice(2, 18);

		return (
			<>
				<div className="main-wrapper" style={{backgroundColor: this.state.themeColor}} >
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
						
						<p>Made with &#9829; @ <a href="https://altcampus.io" target="_blank" rel="noopener noreferrer">AltCampus</a></p>
					</footer>
				</div>
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		fonts: state,
	}
}

export default connect(mapStateToProps)(Home);