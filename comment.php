<?php
session_start();

$admin = 'admin';
$pass = 'a029d0df84eb5549c641e04a9ef389e5';
?>
<p><a href="index.php">Главная</a> | <a href="contact.php">Контакты</a> | <a href="admin.php">Админка</a></p>
<hr />
Это страница авторизации.
<br />
<form method="post">
 Username: <input type="text" name="user" /><br />
 Password: <input type="password" name="pass" /><br />
 <input type="submit" name="submit" value="Войти" />
</form>
