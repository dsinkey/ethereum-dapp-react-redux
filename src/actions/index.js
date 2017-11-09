import { GET_ACCOUNTS } from './types';
import { GET_BALANCE } from './types';
import { GENERATE_TRANSACTION_JSON } from './types';
import { SEND_TRANSACTION } from './types';
import { ERROR_GENERATED } from './types';

/*global web3:true*/

export const getAccounts = () => async dispatch => {
	let accounts = [
		'0xbA37163625B3f2E96112562858C12b75963AF138',
		'0xcE6d0d2E0376E5FFa49f69fe5ddf1e1a561bDe03',
		'0x0D526B60a82A109a0B9af95443f965AB2c6c81ab'
	];
	const res = await web3.eth.getAccounts();
	dispatch({ type: GET_ACCOUNTS, payload: accounts });
};

export const getBalance = account => async dispatch => {
	const res = await web3.eth.getBalance(account);
	// Convert the balance to ethers
	let bal = web3.utils.fromWei(res, 'ether');
	dispatch({ type: GET_BALANCE, payload: bal });
};

export const generateTransactionJSON = data => {
	return { type: GENERATE_TRANSACTION_JSON, payload: data };
};

export const sendTransaction = transactionData => async dispatch => {
	function onSuccess(success) {
		dispatch({ type: SEND_TRANSACTION, payload: success });
		return success;
	}
	function onError(error) {
		dispatch({ type: ERROR_GENERATED, error });
		return error;
	}

	try {
		transactionData.value = web3.utils.toWei(transactionData.value, 'ether');
		const res = await web3.eth.sendTransaction(transactionData);
		return onSuccess(res);
	} catch (error) {
		console.log(error);
		return onError(error);
	}
};
