<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class LoginModel extends CI_Model
{

  public function formRules()
  {
    $form_rules = array(
      array(
        'field' => 'username',
        'label' => 'Username',
        'rules' => 'required'
      ),
      array(
        'field' => 'password',
        'label' => 'Password',
        'rules' => 'required'
      )
    );

    return $form_rules;
  }

  public function formValidation()
  {
    $form = $this->formRules();
    $this->form_validation->set_rules($form);

    if ($this->form_validation->run()) {
      return true;
    } else {
      return false;
    }
  }

  // cek status user, login atau tidak
  public function userDBValidation()
  {
    $username = $this->input->post('username');
    $password = $this->input->post('password');
    // $options = [
    // 	'const' => 12
    // ];
    // $hashedPassword = password_hash($password, PASSWORD_BCRYPT, $options);

    $jsondata = file_get_contents('C:\xampp\htdocs\srtwp\setting.json');
    $json = json_decode($jsondata, true);
    $userLogin = $json['user_login'];
    $userPassword = $json['password_login'];

    if ($username === $userLogin && password_verify($password, $userPassword)) {
      $data = [
        'username' => $username,
        'login' => true,
      ];
      // buat data session jika login benar
      $this->session->set_userdata($data);
      return true;
    } else {
      return false;
    }
  }

  public function logout()
  {
    $this->session->unset_userdata(
      [
        'username' => '',
        'login' => false
      ]
    );
    $this->session->sess_destroy();
  }
}
