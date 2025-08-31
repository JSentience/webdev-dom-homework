import { updateComments } from './comments.js';
import { renderComments } from './renderComments.js';

export let token = '';
export const setToken = newToken => {
	token = newToken;
};

export let name = '';
export const setName = newName => {
	name = newName;
};
export const baseUrl = 'https://wedev-api.sky.pro/api/v2/:sergey-nasonov';
export const authUrl = 'https://wedev-api.sky.pro/api/user';
export const fetchComments = (showLoader = false) => {
	const commentPageLoad = document.querySelector('.comment-load');
	if (showLoader) {
		commentPageLoad.classList.remove('hidden');
	}
	return fetch(baseUrl + '/comments', {
		method: 'GET',
	})
		.then(response => {
			if (response.status === 400) {
				throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
			}
			return response.json();
		})
		.then(data => {
			// Преобразуем структуру комментариев
			const normalizedComments = data.comments.map(comment => ({
				...comment,
				name: comment.author.name,
			}));

			updateComments(normalizedComments);
			renderComments();

			return normalizedComments;
		})
		.catch(error => {
			console.error('Ошибка загрузки комментариев: ' + error.message);
			throw error;
		})
		.finally(() => {
			if (showLoader) {
				commentPageLoad.classList.add('hidden');
			}
		});
};

const validateComment = (name, text) => {
	const addName = document.querySelector('.add-form-name');
	const addComment = document.querySelector('.add-form-text');
	addName.classList.remove('error');
	addComment.classList.remove('error');
	if (!name) {
		addName.classList.add('error');
		return false;
	}
	if (!text) {
		addComment.classList.add('error');
		return false;
	}
	return true;
};

const sendComment = data => {
	return fetch(baseUrl + '/comments', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			authorization: `Bearer ${token}`,
		},
	}).then(response => {
		if (!response.ok) {
			const errorMessage =
				response.status === 400
					? 'Текст должен содержать более 3 символов'
					: response.status === 500
						? 'Сервер не доступен'
						: ' Ошибка сервера ';
			throw new Error(errorMessage);
		}
	});
};
const toggleLoader = isLoad => {
	const form = document.querySelector('.add-form');
	const addLoader = document.querySelector('.loader-add-comment');
	form.classList.toggle('hidden', isLoad);
	addLoader.classList.toggle('hidden', !isLoad);
};

export const createComment = () => {
	const addName = document.querySelector('.add-form-name');
	const addComment = document.querySelector('.add-form-text');

	const name = addName.value.trim();
	const text = addComment.value.trim();

	if (!validateComment(name, text)) return;

	//Создаем объект с данными нового комментария
	const newCommentData = { name, text, forceError: true };
	toggleLoader(true);

	sendComment(newCommentData)
		.then(() => {
			return fetchComments(false);
		})
		.then(() => {
			addName.value = '';
			addComment.value = '';
		})
		.catch(error => {
			if (error.message === 'Сервер не доступен') {
				createComment();
			}
			console.error(`Ошибка добавления комментария ${error} `);
		})
		.finally(() => {
			toggleLoader(false);
		});
};

export const login = (login, password) => {
	return fetch(authUrl + '/login', {
		method: 'POST',
		body: JSON.stringify({ login: login, password: password }),
	});
};
export const registration = (name, login, password) => {
	return fetch(authUrl, {
		method: 'POST',
		body: JSON.stringify({ name: name, login: login, password: password }),
	});
};
