<?php //phpcs:disable
defined('BASEPATH') or exit('No direct script access allowed');

$route['default_controller'] = 'login';
$route['404_override'] = 'error404';
$route['tools/(:any)'] = 'tools/index/$1';
$route['toolv2/(:any)'] = 'toolv2/index/$1';
$route['user/(:any)'] = 'user/index/$1';
$route['tutorials/i/(:num)'] = 'tutorials/index/$1';
$route['databasefilelocator/delete/(:num)'] = 'databasefilelocator/delete/$1';
$route['databasefilelocator/(:num)/(:num)'] = 'databasefilelocator/index/$1/$2';
$route['translate_uri_dashes'] = FALSE;
