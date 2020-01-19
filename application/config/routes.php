<?php //phpcs:disable
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'login';
$route['404_override'] = 'error404';
$route['tools/(:any)'] = 'tools/index/$1';
$route['user/(:any)'] = 'user/index/$1';
$route['tutorials/i/(:num)'] = 'tutorials/index/$1';
$route['databasefilelocator/delete/(:num)'] = 'databasefilelocator/delete/$1';
$route['databasefilelocator/(:num)/(:num)'] = 'databasefilelocator/index/$1/$2';
$route['translate_uri_dashes'] = FALSE;
