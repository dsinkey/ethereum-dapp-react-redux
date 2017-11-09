import { GET_ACCOUNTS } from '../actions/types';

export default (state = [], action) => {
	switch (action.type) {
		case GET_ACCOUNTS:
			return action.payload;
		default:
			return state;
	}
};
