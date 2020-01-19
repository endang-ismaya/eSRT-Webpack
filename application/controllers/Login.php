<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class Login extends CI_Controller
{
  public $data = array('pesan' => '');

  public function __construct()
  {
    parent::__construct();
    $this->load->helper('form');
    $this->load->library('form_validation');
    $this->load->model('LoginModel');
  }

  public function index()
  {
    // status user login=BENAR, pindah ke halaman home
    if ($this->session->userdata('login') == true) {
      redirect('home'); //  welcome to the jungle
    } else {
      // status login salah, tampilkan form login

      // validasi sukses
      if ($this->LoginModel->formValidation()) {
        // cek di database sukses
        if ($this->LoginModel->userDBValidation()) {
          $this->session->set_userdata('titleVersion', '');
          redirect('home'); // welcome to the jungle
        } else {
          // login gagal
          $this->data['pesan'] = 'Wrong Username or Password!';
          $this->load->view('login/login_form_html', $this->data);
        }
      } else {
        // validasi gagal
        $this->load->view('login/login_form_html', $this->data);
      }
    }
  }

  public function logout()
  {
    $this->LoginModel->logout();
    redirect('login');
  }
}
