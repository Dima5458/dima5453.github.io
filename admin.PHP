<?php
session_start();
 if($_SESSION['admin'] != "admin"){
 header("Location: login.php");    
exit; 
}
?> 
Вы авторизованы !!!
