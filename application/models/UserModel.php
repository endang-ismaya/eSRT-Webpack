<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class UserModel extends CI_Model
{
  private $_settingJson = 'C:\xampp\htdocs\srtwp\setting.json';
  private $_cygwinUser;
  private $_userLogin;
  private $_passwordLogin;

  public function __construct()
  {
    parent::__construct();
  }

  public function getCygwinUser()
  {
    return $this->_cygwinUser;
  }
  public function getUserLogin()
  {
    return $this->_userLogin;
  }
  public function getPasswordLogin()
  {
    return $this->_passwordLogin;
  }

  private function formRulesForUserPreferences()
  {
    $form = [
      [
        'field' => 'cygwin_user',
        'label' => 'Cygwin User',
        'rules' => "required|max_length[20]"
      ],
      [
        'field' => 'user_login',
        'label' => 'User Login',
        'rules' => "required|max_length[7]|callback_is_lowercase"
      ],
      [
        'field' => 'password_login',
        'label' => 'User Password',
        'rules' => "required|max_length[10]|min_length[5]"
      ]
    ];

    return $form;
  }

  public function validationForUserPreferences()
  {
    $form = $this->formRulesForUserPreferences();
    $this->form_validation->set_rules($form);

    if ($this->form_validation->run()) {
      return true;
    } else {
      return false;
    }
  }

  public function getValueFromSettingJson()
  {
    $jsondata = file_get_contents($this->_settingJson);
    $json = json_decode($jsondata, true);
    $this->_cygwinUser = $json['cygwin_user'];
    $this->_userLogin = $json['user_login'];
    $this->_passwordLogin = $json['password_login'];
  }

  public function setSettingJson($cygwinUser, $userLogin, $passwordLogin)
  {
    unlink($this->_settingJson);
    $tmp = [
      'cygwin_user'       => $cygwinUser,
      'user_login'        => $userLogin,
      'password_login'    => $passwordLogin,
      'python_exe'        => 'C:\\Python27\\python2.exe'
    ];
    $jsonData = json_encode($tmp);
    file_put_contents($this->_settingJson, $jsonData);
  }
}
