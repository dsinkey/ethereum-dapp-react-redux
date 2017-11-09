import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import accounts from './accounts';
import balance from './balance';
import transaction from './transactions';

export default combineReducers({
	form: reduxForm,
	accounts: accounts,
	balance: balance,
	transaction: transaction
});
