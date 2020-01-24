<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class FileLocator extends MY_Controller
{

  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    ini_set('max_execution_time', 0);
    $program = 'C:\xampp\htdocs\srtwp\bin\SRTWPFileManagement\SRTWPFileManagement.exe';
    exec($program);
  }
}
