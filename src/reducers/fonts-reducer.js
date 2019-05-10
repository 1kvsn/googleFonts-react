export default function fontsReducer (state=[], action) {
	console.log(state, action);
	switch (action.type) {
		case "ADD_FONTS":
			return action.payload;
		case "TOGGLE": 
			return [...state].map(font => {
				if(font.family === action.payload.family) {
					return {...font, isClicked: !action.payload.isClicked}
				} else {
					return font;
				}
			})
			 default:
				return state;
		}
		
 }