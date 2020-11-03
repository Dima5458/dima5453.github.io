<?php
  $host = 'localhost';  // Хост, у нас все локально
  $user = 'user_bd';    // Имя созданного вами пользователя
  $pass = '1q2w3e4r5t'; // Установленный вами пароль пользователю
  $db_name = 'аа';   // Имя базы данных
  $link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

  // Ругаемся, если соединение установить не удалось
  if (!$link) {
    echo 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
    exit;
  }
?>
