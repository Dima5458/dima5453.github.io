document.getElementById('entry').onclick = function () {
	let login = document.getElementById('login').value;
	let password = document.getElementById('password').value;
	let out = document.getElementById('out');

	if (login === 'ivan' && password === '334455' 
		|| login === 'alex' && password === '777' 
		|| login === 'petr' && password === 'b5678') {
		out.innerHTML = 'Добро пожаловать';
	}
	
	else {
		out.innerHTML = 'Ошибка';
	}
}
