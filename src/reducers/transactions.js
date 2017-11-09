import { GENERATE_TRANSACTION_JSON } from '../actions/types';
import { SEND_TRANSACTION } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case GENERATE_TRANSACTION_JSON:
			const transactionJSON = JSON.stringify(action.payload, undefined, 2);
			console.log(transactionJSON);
			return Object.assign({}, state, { transactionJSON: transactionJSON });
		case SEND_TRANSACTION:
			delete action.payload.logsBloom;
			const transactionHash = action.payload.transactionHash;
			const sendTransactionResponse = JSON.stringify(
				action.payload,
				undefined,
				2
			);
			console.log(transactionHash);
			return Object.assign(
				{},
				state,
				{ sendTransactionResponse: sendTransactionResponse },
				{ transactionHash: transactionHash }
			);
		default:
			return state;
	}
}
