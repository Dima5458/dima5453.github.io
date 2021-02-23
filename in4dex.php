$params = array(
	'client_id'     => 'ID приложения',
	'redirect_uri'  => 'https://example.com/oauth-vk.php',
	'scope'         => 'email',
	'response_type' => 'code',
	'state'         => 'https://example.com/page-1'
);

$url = 'https://oauth.vk.com/authorize?' . urldecode(http_build_query($params));
echo '<a href="' . $url . '">Войти через ВКонтакте</a>';
