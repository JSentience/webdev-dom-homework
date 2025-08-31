import { registration, setName, setToken } from './api.js';
import { fetchAndRenderComments } from '../main.js';
import { renderLogin } from './renderLogin.js';

export const renderRegistration = () => {
	const container = document.querySelector('.container');
	const loginHtml = `
	<div class="add-form">
	<h1>Форма входа</h1>
	<input
type="text"
class="add-form-name-login"
placeholder="Введите имя"
id="name"
required />
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
type="submit" >Зарегистрироваться</button>
<button class="add-form-button-registry">Войти</button>
</div>
</fieldset>

	`;

	container.innerHTML = loginHtml;

	document
		.querySelector('.add-form-button-registry')
		.addEventListener('click', () => {
			renderLogin();
		});
	const nameElement = document.querySelector('#name');
	const loginElement = document.querySelector('#login');
	const passwordElement = document.querySelector('#password');
	const submitButton = document.querySelector('.add-form-button-main');

	submitButton.addEventListener('click', () => {
		registration(nameElement.value, loginElement.value, passwordElement.value)
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
