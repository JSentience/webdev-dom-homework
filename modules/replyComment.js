import { comments } from './comments.js';
import { addComment } from '../main.js';

export const replyToComment = event => {
	const commentElement = event.target.closest('.comment');
	if (commentElement) {
		const index = +commentElement.dataset.index;
		const comment = comments[index];
		addComment.value = `> ${comment.name} : ${comment.text}`;
		addComment.focus();
	}
};
