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
    $this->load->model('HomeModel');
    $this->setVersion();
  }

  private function setVersion()
  {
    $this->HomeModel->setAllVersion();
    $this->data['iVersion'] = $this->HomeModel->getiVersion();
    $this->data['serverVersion'] = $this->HomeModel->getServerVersion();
    $this->data['titleVersion'] = $this->HomeModel->getTitleVersion();
  }

  public function index()
  {
    ini_set('max_execution_time', 0);
    $program = 'C:\xampp\htdocs\srtwp\bin\SRTWPFileManagement\SRTWPFileManagement.exe';
    exec($program);
  }
}
