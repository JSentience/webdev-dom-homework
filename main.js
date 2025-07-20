import { renderComments } from './modules/renderComments.js';
import { createComment } from './modules/createComments.js';
import { replyToComment } from './modules/replyComment.js';
import { addLike } from './modules/addLikes.js';
import { addButton, commentsBlock } from './modules/selectors.js';
import { updateComments } from './modules/comments.js';

fetch('https://wedev-api.sky.pro/api/v1/sergey-nasonov/comments', {
	method: 'GET',
})
	.then(response => response.json())
	.then(data => {
		// Преобразуем структуру комментариев
		const normalizedComments = data.comments.map(comment => ({
			...comment,
			name: comment.author.name,
		}));
		updateComments(normalizedComments);
		renderComments();
	})
	.catch(error => {
		alert('Ошибка загрузки комментариев: ' + error.message);
	});


addButton.addEventListener('click', createComment);
commentsBlock.addEventListener('click', event => {
	if (event.target.classList.contains('like-button')) {
		addLike(event);
	} else if (event.target.closest('.comment')) {
		replyToComment(event);
	}
});
