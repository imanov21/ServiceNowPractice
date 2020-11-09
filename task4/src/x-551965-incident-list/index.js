import { createCustomElement, actionTypes } from '@servicenow/ui-core';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import { createHttpEffect } from '@servicenow/ui-effect-http';
import '@servicenow/now-template-card';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, { updateState }) => {
	// const { number = 'Loading...', short_description = 'Loading...', incident_state = '...', assignment_group = '...', assigned_to = '...', resolved_at = '...' } = state;
	list = state;
	for (let i = 0; i < list.length; i++) {
		return (
			<div>
				<p><now-template-card-assist tagline={{ "icon": "tree-view-long-outline", "label": "Incident" }} actions={[{ "id": "share", "label": "Copy URL" }, { "id": "close", "label": "Mark Complete" }]} heading={{ "label": list[i].short_description }} content={[{ "label": "Number", "value": { "type": "string", "value": list[i].number } }, { "label": "State", "value": { "type": "string", "value": list[i].incident_state } }, { "label": "Assignment Group", "value": { "type": "string", "value": list[i].assignment_group.display_value } }, { "label": "Assigned To", "value": { "type": "string", "value": list[i].assigned_to.display_value } }]} contentItemMinWidth={300} footerContent={{ "label": "Updated", "value": list[i].resolved_at }} configAria={{}}></now-template-card-assist></p>
			</div>
		);
	}

};

createCustomElement('x-551965-incident-list', {
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;

			dispatch('GET_LIST_OF_INCIDENT', {
				sysparm_display_value: true,
				sysparm_limit: '1',
			});
		},
		'GET_LIST_OF_INCIDENT': createHttpEffect('api/now/table/incident', {
			method: 'GET',
			queryParams: ['sysparm_display_value', 'sysparm_limit'],
			successActionType: 'GET_LIST_OF_INCIDENT_SUCCESS'
		}),
		'GET_LIST_OF_INCIDENT_SUCCESS': (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;
			let list = [];
			for (let i = 0; i < result.length; i++) {
				A = { number, short_description, incident_state, assignment_group, assigned_to, resolved_at };
				A = result[i];
				list[i] = A;
			}
			// const { number, short_description, incident_state, assignment_group, assigned_to, resolved_at } = result[0];

			updateState(list);
		}
	},
	renderer: { type: snabbdom },
	view,
	styles
});
