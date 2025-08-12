import { comments } from './comments.js';
import { renderComments } from './renderComments.js';

export const addLike = event => {
	if (event.target.classList.contains('like-button')) {
		const commentElement = event.target.closest('.comment');
		const index = +commentElement.dataset.index;
		const comment = comments[index];

		const likeButton = event.target;
		likeButton.classList.add('loading');
		likeButton.disabled = true;

		new Promise(resolve => {
			setTimeout(() => {
				if (comment.isLiked) {
					comment.likes--;
				} else {
					comment.likes++;
				}

				comment.isLiked = !comment.isLiked;
				resolve();
			}, 3000);
		})
			.then(() => {
				renderComments();
			})
			.catch(error => {
				console.error('Ошибка при изменении лайка', error);
			})
			.finally(() => {
				likeButton.classList.remove('loading');
				likeButton.disabled = false;
			});
	}
};
