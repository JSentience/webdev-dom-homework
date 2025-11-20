import { comments } from './comments.js';
import { name, token } from './api.js';
import { getFormattedDate, secureHtml } from './utils.js';

export const renderComments = () => {
	const container = document.querySelector('.container');
	const commentsHtml = comments
		.map(
			(comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${secureHtml(comment.name)}</div>
            <div>${getFormattedDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${secureHtml(comment.text)}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${
								comment.isLiked ? '-active-like' : ''
							}"></button>
            </div>
          </div>
        </li>
      `,
		)
		.join('');

	const addCommentsHtml = `
	<div class="loader-add-comment hidden">
                <h2 class="loader-add-comment__text">Комментарий добавляется</h2>
            </div>
<div class="add-form">

<input
type="text"
class="add-form-name"
placeholder="Введите ваше имя"
value="${name}"
readonly
required />
<textarea
type="textarea"
class="add-form-text"
placeholder="Введите ваш комментарий"
rows="4"
required></textarea>
<div class="add-form-row">
<button class="add-form-button">Написать</button>
</div>
</div>
	`;
	const linkToLoginText = `
	<p>Чтобы отправить комментарий, <a class="link-login">войдите</a></p>
	`;
	const baseHtml = `
	<ul class="comments">${commentsHtml}</ul>
	${token ? addCommentsHtml : linkToLoginText}
`;
	container.innerHTML = baseHtml;
};
