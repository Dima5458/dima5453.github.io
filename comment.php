document.getElementById('entry').onclick = function () {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;
	let out = document.getElementById('out');

	if (login === 'Дима' && password === 'Дима' 
		|| login === 'alex' && password === '777' 
		|| login === 'petr' && password === 'b5678') {
		out.innerHTML = 'Добро пожаловать перейдите к журналу <a class="header-submenu__link" href="/рабочий.стол.html" title="Моя школа">Рабочий стол</a> ';
	}
	
	else {
		out.innerHTML = 'Ошибка';
	}
}

document.getElementById('entry').onclick = function () {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;
	let out = document.getElementById('out');

	if (login === 'Дима4' && password === 'Дима' 
		|| login === 'alex' && password === '1' 
		|| login === 'petr' && password === '2') {
		out.innerHTML = 'Добро пожаловать перейдите к журналу <a class="header-submenu__link" href="/рабочий.стол.html" title="Моя школа">Рабочий стол</a> ';
	}
	
	else {
		out.innerHTML = 'Ошибка';
	}
}

