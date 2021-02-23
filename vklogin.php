‹?php
$VK_APP_ID = "3328234";
$VK_SECRET_CODE = " Q5f2PSwkiFw23TysdDgr ";

if(!empty($_GET['code'])) {
 
  $vk_grand_url = "https://api.vk.com/oauth/access_token?client_id=".$VK_APP_ID."&client_secret=".$VK_SECRET_CODE."&code=".$_GET['code']."&redirect_uri=http://www.mydomain.ru/vklogin.php";
 
 // отправляем запрос на получения access token
  $resp = file_get_contents($vk_grand_url);
  $data = json_decode($resp, true);
  $vk_access_token = $data['access_token'];
  $vk_uid =  $data['user_id'];
  
// обращаемся к ВК Api, получаем имя, фамилию и ID пользователя вконтакте
// метод users.get
  $res = file_get_contents("https://api.vk.com/method/users.get?uids=".$vk_uid."&access_token=".$vk_access_token."&fields=uid,first_name,last_name,nickname,photo"); 
  $data = json_decode($res, true);
  $user_info = $data['response'][0];

  echo $user_info['first_name']." ".$user_info['last_name']."
";
  echo "‹img src='".$user_info['photo']."' border='0' /›";

}
?›
