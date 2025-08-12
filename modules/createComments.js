import { fetchComments } from './getComments.js';
import { addComment, addLoader, addName, form } from './selectors.js';

const validateComment = (name, text) => {
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
	return fetch('https://wedev-api.sky.pro/api/v1/sergey-nasonov/comments/', {
		method: 'POST',
		body: JSON.stringify(data),
	}).then(response => {
		if (!response.ok) {
			const errorMessage =
				response.status === 400
					? 'Короткий текст'
					: response.status === 500
						? 'Сервер не доступен'
						: ' Ошибка сервера ';
			throw new Error(errorMessage);
		}
	});
};
const toggleLoader = isLoad => {
	form.classList.toggle('hidden', isLoad);
	addLoader.classList.toggle('hidden', !isLoad);
};

export const createComment = () => {
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
