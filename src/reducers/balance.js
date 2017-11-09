import { GET_BALANCE } from '../actions/types';

export default (state = 0, action) => {
	switch (action.type) {
		case GET_BALANCE:
			return action.payload;
		default:
			return state;
	}
};
