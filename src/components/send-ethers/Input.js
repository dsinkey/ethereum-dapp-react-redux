// Survey Field contains logic to render a single label and text input
import React from 'react';

export default ({ input, label }) => {
	return (
		<div style={{ clear: 'left' }}>
			<label id="etherSendLabel">{label}</label>
			<input {...input} id="etherSendInput" />
		</div>
	);
};
