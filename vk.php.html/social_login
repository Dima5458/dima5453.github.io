$client_id = 'XXXXXXXX'; // ID приложения
$client_secret = 'xxxxxxxxxxxxxxxxxxxxxxxxx'; // Защищённый ключ
$redirect_uri = 'https://site.ru/social_login_callback/vk.php'; // куда ответ

$url = 'https://oauth.vk.com/authorize';

$params = array(
        'client_id'     => $client_id,
		'scope'         => 'email',
        'redirect_uri'  => $redirect_uri,
        'response_type' => 'code'

);
	

header('Location: '. $url . '?' . urldecode(http_build_query($params)) ); exit();
