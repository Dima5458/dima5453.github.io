document.getElementById('entry').onclick = function () {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;
	let out = document.getElementById('out');

	if (login === 'Дима' && password === 'Дима' 
		|| login === 'Дима' && password === '777' 
		|| login === 'Чер' && password === 'b5678') {
		out.innerHTML = 'Добрый день вы зашли на профиль "Черненков Дмитрий Игоревич " организация "ТАКОЙ ШКОЛЫ НЕТ №4" нажмите на эту кнопку ---> Что-бы попасть в журнал <a class="header-submenu__link" href="/рабочий.стол.html" title="Моя школа">Рабочий стол</a> ';
	}
	
	else {
		out.innerHTML = 'Пользователя нет в этой системе "спросите у администратора"';
	}
}
if (login === 'Дима' && password === 'Дима4' 
		|| login === 'Дима' && password === '7774' 
		|| login === 'Чер' && password === 'b56784') {
		out.innerHTML = 'Добрый день вы зашли на профиль "Вы не зареганы " организация "ее нет" нажмите на эту кнопку ---> Что-бы попасть в регистрацию <a class="header-submenu__link" href="/рабочий.стол.html" title="Моя школа">Рабочий стол</a> ';
	}
	
	else {
		out.innerHTML = 'Пользователя нет в этой системе "спросите у администратора"';
	}
}
