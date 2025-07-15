import { comments } from './comments.js';
import { renderComments } from './renderComments.js';

export const addLike = event => {
	if (event.target.classList.contains('like-button')) {
		const commentElement = event.target.closest('.comment');
		const index = +commentElement.dataset.index;
		const comment = comments[index];
		if (comment.isLiked) {
			comment.likes--;
		} else {
			comment.likes++;
		}

		comment.isLiked = !comment.isLiked;
	}
	renderComments();
};
