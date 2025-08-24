import { updateComments } from './comments.js';
import { renderComments } from './renderComments.js';
import { commentPageLoad } from './selectors.js';

export const fetchComments = (showLoader = false) => {
	if (showLoader) {
		commentPageLoad.classList.remove('hidden');
	}
	return fetch('https://wedev-api.sky.pro/api/v1/sergey-nasonov/comments', {
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
