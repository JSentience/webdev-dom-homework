import { comments } from './comments.js';
import { getFormattedDate, secureHtml } from './utils.js';
import { commentsBlock } from './selectors.js';

export const renderComments = () => {
	commentsBlock.innerHTML = comments
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
};
