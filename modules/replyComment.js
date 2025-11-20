import { comments } from './comments.js';

export const replyToComment = event => {
	const addComment = document.querySelector('.add-form-text');
	const commentElement = event.target.closest('.comment');
	if (commentElement) {
		const index = +commentElement.dataset.index;
		const comment = comments[index];
		addComment.value = `> ${comment.name} : ${comment.text}`;
		addComment.focus();
	}
};
