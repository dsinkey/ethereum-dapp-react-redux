import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Input from './Input';
import etherFields from './sendEthersFields.js';
import * as actions from '../../actions';

class SendEthers extends Component {
	state = {
		from: this.props.accounts[0] || '',
		to: this.props.accounts[0] || ''
	};

	renderFields() {
		return _.map(etherFields, ({ label, name, component }) => {
			return (
				<Field
					key={name}
					component={component || Input}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	renderOptions(options) {
		return _.map(options, option => {
			return (
				<option key={option} value={option}>
					{option}
				</option>
			);
		});
	}

	render() {
		return (
			<div className="hero-unit">
				<h1>Send Ethers</h1>
				<div />
				<div className="sidekick">
					<form name="sendEtherForm">
						<div style={{ clear: 'left' }}>
							<label id="etherSendLabel">From</label>
							<Field
								style={{ display: 'inline', width: '70%' }}
								name="from"
								value={this.from}
								component="select"
								defaultValue={this.props.accounts[0]}
							>
								{this.renderOptions(this.props.accounts)}
							</Field>
						</div>
						<div style={{ clear: 'left' }}>
							<label id="etherSendLabel">To</label>
							<Field
								name="to"
								value={this.to}
								component="select"
								style={{ display: 'inline', width: '70%' }}
								defaultValue={this.props.accounts[0]}
							>
								{this.renderOptions(this.props.accounts)}
							</Field>
						</div>
						{this.renderFields()}
					</form>
					<span>
						<button
							onClick={() =>
								this.props.generateTransactionJSON(this.props.formValues)}
						>
							JSON &gt;&gt;
						</button>
					</span>
					<span>
						<button>Reset</button>
					</span>
				</div>
				<div className="sidekick">
					<h1>JSON</h1>
					<pre id="send_transaction_object_json" className="ready">
						{this.props.transactionJSON}
					</pre>
				</div>
				<div className="sidekick">
					<h1>Send</h1>
					<span>
						<button
							onClick={() => this.props.sendTransaction(this.props.formValues)}
						>
							Send Transaction
						</button>
					</span>
				</div>
				<div className="sidekick">
					<h1>Result</h1>
					<p className="notready" id="send_transaction_error_or_result">
						{this.props.sendTransactionResponse}
					</p>
					<a
						href={
							'https://ropsten.etherscan.io/tx/' + this.props.transactionHash
						}
						id="etherscan_io_tx_link"
						target="_blank"
					>
						transaction link
					</a>
				</div>
			</div>
		);
	}
}

const selector = formValueSelector('sendEtherForm'); // <-- same as form name
SendEthers = connect((state, ownProps) => {
	console.log(state);
	const formValues = {};

	formValues.from = selector(state, 'from');
	formValues.to = selector(state, 'to');
	formValues.value = selector(state, 'value') || 0;
	formValues.gas = selector(state, 'gas');
	formValues.gasPrice = selector(state, 'gasPrice');
	formValues.nonce = selector(state, 'nonce');

	return {
		formValues: formValues,
		transactionJSON: state.transaction.transactionJSON,
		sendTransactionResponse: state.transaction.sendTransactionResponse,
		transactionHash: state.transaction.transactionHash,
		accounts: state.accounts
	};
}, actions)(SendEthers);

export default reduxForm({
	form: 'sendEtherForm'
})(SendEthers);
