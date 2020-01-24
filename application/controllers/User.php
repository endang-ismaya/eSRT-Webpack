<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class User extends MY_Controller
{
  public $data = [
    'title'             => '',
    'main_view'         => '',
    'tools_menu'        => '',
    'db_filelocator'    => '',
    'home_menu'         => '',
    'updates_menu'      => '',
    'tutorial_menu'     => '',
    'error'             => '',
    'stmt'              => '',
    'breadcrumb'        => 'User Preferences',
    'home'              => 'others',
    'video' => 'd-none',
  ];

  public function __construct()
  {
    parent::__construct();
    $this->load->model('UserModel');
  }

  public function index($userMenu = '')
  {
    switch ($userMenu) {
      case 'preferences':
        $this->userPreferences();
        break;

      default:
        redirect('error404');
        break;
    }
  }

  private function userPreferences()
  {
    if ($this->input->post('submit')) {

      if ($this->UserModel->validationForUserPreferences() === true) {

        $userLogin = $this->input->post('user_login');
        $cygwin_user = $this->input->post('cygwin_user');
        $password_login = $this->input->post('password_login');
        $hashedPassword = md5(crc32($password_login));
        $this->UserModel->setSettingJson($cygwin_user, $userLogin, $hashedPassword);
        redirect('login/logout');
      } else {

        $this->UserModel->getValueFromSettingJson();
        $this->data['form_value']['cygwin_user'] = $this->UserModel->getCygwinUser();
        $this->data['form_value']['user_login'] = $this->UserModel->getUserLogin();
        $this->data['form_value']['password_login'] = $this->UserModel->getPasswordLogin();

        $this->data['main_view'] = 'users/preferences_html';
        $this->data['title'] = 'User Preferences';
        $this->data['form_action'] = 'user/preferences';
        $this->load->view('layout_html', $this->data);
      }
    } elseif ($this->input->post('cancel')) {

      redirect('home');
    } else {

      $this->UserModel->getValueFromSettingJson();
      $this->data['form_value']['cygwin_user'] = $this->UserModel->getCygwinUser();
      $this->data['form_value']['user_login'] = $this->UserModel->getUserLogin();
      $this->data['form_value']['password_login'] = $this->UserModel->getPasswordLogin();

      $this->data['main_view'] = 'users/preferences_html';
      $this->data['title'] = 'User Preferences';
      $this->data['form_action'] = 'user/preferences';
      $this->load->view('layout_html', $this->data);
    }
  }

  public function is_lowercase()
  {
    $userLogin = $this->input->post('user_login');

    if (ctype_lower($userLogin)) {
      return true;
    } else {
      $this->form_validation->set_message('is_lowercase', 'User Login only accept Lower Case');
      return false;
    }
  }
}
