<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class Home extends MY_Controller
{
  public $data = [
    'title'                 => 'Home',
    'main_view'             => 'templates/home_html',
    'tools_menu'            => '',
    'db_filelocator'        => '',
    'home_menu'             => 'active',
    'updates_menu'          => '',
    'tutorial_menu'         => '',
    'breadcrumb'            => 'Home',
    'home'                  => 'home',
    'video'                 => '',
    'js_home'               => true
  ];

  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    $this->load->view('layout_html', $this->data);
  }
}
