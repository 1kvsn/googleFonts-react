import React from 'react';
import {createStore} from 'redux';
import reducer from '../reducers/fonts-reducer';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';
import Messages from './Messages';
import Nav from './Nav';

export const store = createStore(reducer);

const theme = {
	backgroundColor: "#DB4437",
	color: '#fff',

}

class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			inputVal: "",
			fontSize: 14,
			isChecked: false,
			themeColor: "",
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
		this.setState({isChecked: !this.state.isChecked,})
		this.props.dispatch({type: "TOGGLE", payload: data})
	}

	handleTheme = (color) => {
		this.setState({themeColor: color})
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
		const slicedArr = fontsReducer.slice(2, 18);

		return (
			<>
				<div className="main-wrapper" style={{backgroundColor: this.state.themeColor}} >
					<div className="header-btn">
						<button onClick={() => this.handleTheme("#4285F4")} className="f-btn one-btn">G</button>
						<button onClick={() => this.handleTheme("#FF665E")} className="f-btn two-btn">o</button>
						<button onClick={() => this.handleTheme("#F4B400")} className="f-btn three-btn">o</button>
						<button onClick={() => this.handleTheme("#4285F4")} className="f-btn four-btn">g</button>
						<button onClick={() => this.handleTheme("#0F9D58")} className="f-btn five-btn">l</button>
						<button onClick={() => this.handleTheme("#DB4437")} className="f-btn six-btn">e</button>
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
							<div className="font-wrapper">
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

export default connect(mapStateToProps)(Home);