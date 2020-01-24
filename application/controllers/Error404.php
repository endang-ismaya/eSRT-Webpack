<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class Error404 extends MY_Controller
{
  public $data = [
    'title'             => 'Error 404',
    'main_view'         => '',
    'tools_menu'        => '',
    'db_filelocator'    => '',
    'home_menu'         => '',
    'updates_menu'      => '',
    'tutorial_menu'     => '',
    'breadcrumb'        => 'Page not found',
    'home'              => '',
    'video' => 'd-none',
  ];

  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    $this->load->view('templates/error_html', $this->data);
  }
}
