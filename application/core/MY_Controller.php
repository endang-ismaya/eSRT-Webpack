<?php
//phpcs:disable

if (!defined('BASEPATH')) :
    exit('No direct script access allowed');
endif;

class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        if (session_id() == '' || !isset($_SESSION)) {
            session_start();
        } else {
            // print_r($_SESSION);
            // cek status login user
            if ($this->session->userdata('login') == false) :
                redirect('login');
            endif;
        }
    }
}