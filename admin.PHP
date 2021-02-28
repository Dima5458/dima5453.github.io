<?php
session_start();
 if($_SESSION['admin'] != "admin"){
 header("Location: login.php");    
exit; 
}
?> 
Вы авторизованы !!!

<?php

<br /> 
<form method="post">
Username: <input type="text" name="user" /> <br /> 
Password: <input type="password" name="pass" /> <br />
<input type="submit" name="submit" value="Login" />
</form> 
 
<?php
session_start();
$users = 'admin';
$pass = 'a029d0df84eb5549c641e04a9ef389e5';
 if($_POST['submit']){
 if($users == $_POST['user'] AND $pass == md5($_POST['pass']))
{
 $_SESSION['admin'] = $users;
 header("Location: index.php");
 exit;
 }
else echo '<p>Логин или пароль неверны!</p>';
} 
  
Вставим этот код сразу после  session_start(); для проверки полученных данных. 

if($_GET['do'] == 'logout'){
 unset($_SESSION['admin']);
 session_destroy();
} 
