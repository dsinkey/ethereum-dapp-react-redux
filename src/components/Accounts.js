import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Accounts extends Component {
	state = {
		selectedValue: ''
	};

	renderOptions(options) {
		return _.map(options, option => {
			return (
				<option key={option} value={option}>
					{option}
				</option>
			);
		});
	}

	handleAccountChange(e) {
		let account = e.target.value;
		this.setState({ selectedValue: account });
		this.props.getBalance(account);
	}

	render() {
		console.log('actions', this.props);
		return (
			<div className="hero-unit">
				<h1>Accounts</h1>
				<div className="sidekick">
					<h1>Accounts</h1>
					<span>Count</span>
					<span className="ready" id="accounts_count">
						{this.props.accounts.length}
					</span>
					<div>
						<span>Coinbase</span>
						<span className="ready" id="coinbase">
							{this.props.accounts[0]}
						</span>
					</div>
					<div>
						<span>Default</span>
						<span className="ready" id="defaultAccount">
							{this.props.accounts[0]}
						</span>
					</div>
					<div>
						<span>Accounts</span>
						<select
							style={{ display: 'inline', width: '70%' }}
							defaultValue={this.props.accounts[0]}
							value={this.state.selectedValue}
							onChange={e => this.handleAccountChange(e)}
						>
							{this.renderOptions(this.props.accounts)}
						</select>
					</div>
					<div>
						<button onClick={() => this.props.getAccounts()}>
							Get Accounts
						</button>
					</div>
				</div>
				<div className="sidekick">
					<h1>Balances</h1>
					<ol id="account_balances_list">
						<li>
							<p>{this.props.balance} Ether</p>
						</li>
					</ol>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ accounts, balance }) {
	return {
		accounts: accounts,
		balance: balance
	};
}

export default connect(mapStateToProps, actions)(Accounts);
