import { container } from './selectors.js';
import { login, setName, setToken } from './api.js';
import { fetchAndRenderComments } from '../main.js';

export const renderLogin = () => {
	const loginHtml = `
	<div class="add-form">
	<h1>Форма входа</h1>
<input
type="text"
class="add-form-name-login"
placeholder="Введите логин"
id="login"
required />
<input
type="password"
class="add-form-name-login"
placeholder="Введите пароль"
id="password"
required />
<fieldset class="add-form-registry">
<button class="add-form-button-main"
type="submit" >Войти</button>
<button class="add-form-button-registry">Зарегистрироваться</button>
</div>
</fieldset>

	`;

	container.innerHTML = loginHtml;

	const loginElement = document.getElementById('login');
	const passwordElement = document.getElementById('password');
	const submitButton = document.querySelector('.add-form-button-main');

	submitButton.addEventListener('click', () => {
		login(loginElement.value, passwordElement.value)
			.then(res => {
				return res.json();
			})
			.then(data => {
				setToken(data.user.token);
				setName(data.user.name);
				fetchAndRenderComments();
			});
	});
};
