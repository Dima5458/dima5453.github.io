document.getElementById('entry').onclick = function () {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;
	let out = document.getElementById('out');

	if (login === 'Дима' && password === 'Дима' 
		|| login === 'Дима' && password === '777' 
		|| login === 'Чер' && password === 'b5678') {
		out.innerHTML = 'Добрый день вы зашли на профиль "Черненков Дмитрий Игоревич " нажмите на эту кнопку ---> Что-бы попасть в журнал <a class="header-submenu__link" href="/рабочий.стол.html" title="Моя школа">Рабочий стол</a> ';
	}
	
	else {
		out.innerHTML = 'Ошибка';
	}
}
