export const userAccountReducer = (state = null, action) => {
	switch(action.type) {
		case 'LOG_IN':
			return action.user;
		case 'LOG_OUT':
			return action.user;
		default:
			return state;
	}
}