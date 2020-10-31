<?php

$connect = mysqli_connect("127.0.0.1", "root", "", "аа");



if (isset($_POST['subRegBtn'])) {
	if ($_POST['login'] == '') {
		echo "Введите логин!";
	} elseif ($_POST['email'] == '') {
		echo "Введите email!";
	} elseif ($_POST['password'] == '') {
		echo "Введите пароль!";
	} else {
		INSERT INTO `Регистрация.Дима` (`login`, `password`) VALUES ('Dima', 'Dima');

		echo '<h1 style="color: green;">Вы успешно зарегистрировались!</h1>';
	}
}




?>
