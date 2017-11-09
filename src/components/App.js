import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Accounts from './Accounts';
import SendEthers from './send-ethers/SendEthers';
import Web3 from 'web3';

/*global web3:true*/

class App extends Component {
	componentDidMount() {
		window.addEventListener('load', function() {
			// Checking if Web3 has been injected by the browser (Mist/MetaMask)
			if (typeof web3 !== 'undefined') {
				// Use Mist/MetaMask's provider
				window.web3 = new Web3(web3.currentProvider);
			} else {
				console.log('No web3? You should consider trying MetaMask!');
				// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
				window.web3 = new Web3(
					new Web3.providers.HttpProvider('http://localhost:8545')
				);
			}
		});
	}

	render() {
		return (
			<div className="container">
				<Accounts />
				<SendEthers />
			</div>
		);
	}
}

export default connect(null, actions)(App);
