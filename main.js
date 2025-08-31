import { addLike } from './modules/addLikes.js';
import {
	authFromLocalStorage,
	createComment,
	fetchComments,
	token,
} from './modules/api.js';
import { replyToComment } from './modules/replyComment.js';
import { updateComments } from './modules/comments.js';
import { renderComments } from './modules/renderComments.js';
import { renderLogin } from './modules/renderLogin.js';

authFromLocalStorage();
// Получаем комментарии с сервера
export const fetchAndRenderComments = () => {
	fetchComments(true).then(comments => {
		updateComments(comments);
		renderComments();
	});
};
fetchAndRenderComments();

const container = document.querySelector('.container');
container.addEventListener('click', event => {
	if (token) {
		if (event.target.classList.contains('like-button')) {
			addLike(event);
			return;
		}
		if (event.target.classList.contains('add-form-button')) {
			createComment();
			return;
		}
		if (event.target.closest('.comment')) {
			replyToComment(event);
		}
	} else {
		if (event.target.classList.contains('link-login')) {
			renderLogin();
		}
	}
});
