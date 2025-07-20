import { updateComments } from './comments.js';
import { renderComments } from './renderComments.js';
import { addComment, addName } from './selectors.js';

export const createComment = () => {
	const name = addName.value.trim();
	const text = addComment.value.trim();

	addName.classList.remove('error');
	addComment.classList.remove('error');
	if (!name) return addName.classList.add('error');
	if (!text) return addComment.classList.add('error');

	const newCommentData = {
		name: name,
		text: text,
	};

	fetch('https://wedev-api.sky.pro/api/v1/sergey-nasonov/comments', {
		method: 'POST',
		body: JSON.stringify(newCommentData),
	})
		.then(response => {
			return response.json();
		})
		.then(() => {
			return fetch('https://wedev-api.sky.pro/api/v1/sergey-nasonov/comments');
		})
		.then(response => response.json())
		.then(data => {
			const normalizedComments = data.comments.map(comment => ({
				...comment,
				name: comment.author.name,
			}));
			updateComments(normalizedComments);
			renderComments();
			// Очищаем поля ввода
			addName.value = '';
			addComment.value = '';
		})
		.catch(error => {
			alert('Ошибка при отправке комментария ' + error.message);
		});
};
