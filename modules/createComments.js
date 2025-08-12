import { fetchComments } from './getComments.js';
import { addComment, addLoader, addName, form } from './selectors.js';

export const createComment = () => {
	const name = addName.value.trim();
	const text = addComment.value.trim();

	addName.classList.remove('error');
	addComment.classList.remove('error');
	if (!name) return addName.classList.add('error');
	if (!text) return addComment.classList.add('error');
	//Создаем объект с данными нового комментария
	const newCommentData = {
		name: name,
		text: text,
	};
	// Передаем комментарий на сервер
	form.classList.add('hidden');
	addLoader.classList.remove('hidden');

	return fetch('https://wedev-api.sky.pro/api/v1/sergey-nasonov/comments', {
		method: 'POST',
		body: JSON.stringify(newCommentData),
	})
		.then(response => {
			return response.json();
		})
		.then(() => {
			return fetchComments(false);
		})
		.then(() => {
			addName.value = '';
			addComment.value = '';
		})
		.catch(error => {
			console.error(`Ошибка добавления комментария ${error} `);
		})
		.finally(() => {
			form.classList.remove('hidden');
			addLoader.classList.add('hidden');
		});
};
