export const postClientList = async newList => {
	const url = `https://evening-dusk-50121.herokuapp.com/api/v1/lists?client_id=${newList.client_id}`;
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newList)
	};
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('Could not add new list');
	}
	const list = await response.json();
	return list;
};

export const deleteClientList = async (client_id, list_id) => {
	const url = `https://evening-dusk-50121.herokuapp.com/api/v1/lists/${list_id}`;
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	};
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('Could not delete list');
	}
};

export const patchClientList = async updatedList => {
	const options = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedList.name)
	};
	const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/lists/${updatedList.list_id}`, options);

	if (!response.ok) {
		throw new Error('Could not edit the name of the list');
	}
	const list = await response.json();
	return list;
};

export const postClientTask = async (newTask, list_id, client_id) => {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTask)
	};
	const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/lists/${list_id}/tasks`, options);
	if (!response.ok) {
		throw new Error('Could not add new task');
	}
	const task = await response.json();
	return task;
};


export const deleteClientTask = async (list_id, task_id) => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	};
	const response = await fetch(
		`https://evening-dusk-50121.herokuapp.com/api/v1/lists/${list_id}/tasks/${task_id}`,
		options
	);
	if (!response.ok) {
		throw new Error('Could not delete task');
	}
};

export const fetchCaretakers = async () => {
	const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/caretakers`);
	if (!response.ok) {
		throw new Error('Could not fetch caretakers');
	} else {
		const caretakers = response.json();
		return caretakers;
	}
};

export const patchClientProfile = async updatedProfile => {
	const options = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedProfile)
	};
	const response = await fetch(
		`https://evening-dusk-50121.herokuapp.com/api/v1/clients/${updatedProfile.client_id}`,
		options
	);

	if (!response.ok) {
		throw new Error('Could not edit the client profile');
	}
	const profile = await response.json();
	return profile;
};
