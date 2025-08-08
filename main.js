import { addLike } from './modules/addLikes.js';
import { createComment } from './modules/createComments.js';
import { fetchComments } from './modules/getComments.js';
import { replyToComment } from './modules/replyComment.js';
import { addButton, commentsBlock } from './modules/selectors.js';

// Получаем комментарии с сервера

fetchComments(true);

addButton.addEventListener('click', createComment);
commentsBlock.addEventListener('click', event => {
	if (event.target.classList.contains('like-button')) {
		addLike(event);
	} else if (event.target.closest('.comment')) {
		replyToComment(event);
	}
});
