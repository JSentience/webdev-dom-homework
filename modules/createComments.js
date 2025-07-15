import { comments } from './comments.js';
import { getFormattedDate } from './utils.js';
import { renderComments } from './renderComments.js';
import { addComment, addName } from './selectors.js';

export const createComment = () => {
	const name = addName.value.trim();
	const comment = addComment.value.trim();
	addName.classList.remove('error');
	addComment.classList.remove('error');
	if (!name) {
		return addName.classList.add('error');
	}
	if (!comment) {
		return addComment.classList.add('error');
	}

	comments.push({
		name: name,
		date: getFormattedDate(),
		text: comment,
		likes: 0,
		isLiked: false,
	});
	renderComments();

	//    Обнуление строк ввода
	addName.value = '';
	addComment.value = '';
};
