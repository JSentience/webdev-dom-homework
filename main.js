import { renderComments } from './modules/renderComments.js';
import { createComment } from './modules/createComments.js';
import { replyToComment } from './modules/replyComment.js';
import { addLike } from './modules/addLikes.js';

export const addButton = document.querySelector('.add-form-button');
export const commentsBlock = document.querySelector('.comments');
export const addName = document.querySelector('.add-form-name');
export const addComment = document.querySelector('.add-form-text');

renderComments();

addButton.addEventListener('click', createComment);
commentsBlock.addEventListener('click', event => {
	if (event.target.classList.contains('like-button')) {
		addLike(event);
	} else if (event.target.closest('.comment')) {
		replyToComment(event);
	}
});
