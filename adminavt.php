//Это vk.php
<form action="index.php" method="POST">
<input type="text" name="test">
<input type="button" name="button">
</form>

<html>
<head>
<title>Главная страница</title>
</head>
<body>
<?php
$test=$_POST[text];
echo  "Вы ввели:".$test;
?>
<form action="" method="POST">
<input type="text" value="Введите текст здесь..." name="text">
<input type="button" name="button">
</form>
</body>
</html>
