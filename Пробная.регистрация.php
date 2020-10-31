<?php

$connect = mysqli_connect("127.0.0.1", "root", "", "lessons_php");



if (isset($_POST['subRegBtn'])) {
	if ($_POST['login'] == '') {
		echo "Введите логин!";
	} elseif ($_POST['email'] == '') {
		echo "Введите email!";
	} elseif ($_POST['password'] == '') {
		echo "Введите пароль!";
	} else {
		$login = $_POST['login'];
		$email = $_POST['email'];
		$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
		mysqli_query($connect, "INSERT INTO `users` (`id`, `login`, `email`, `password`) VALUES (NULL, '$login', '$email', '$password');");
		echo '<h1 style="color: green;">Вы успешно зарегистрировались!</h1>';
	}
}




?>
