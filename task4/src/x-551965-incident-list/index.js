import { createCustomElement } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, { updateState }) => {
	return (
		<div></div>
	);
};

createCustomElement('x-551965-incident-list', {
	renderer: { type: snabbdom },
	view,
	styles
});
