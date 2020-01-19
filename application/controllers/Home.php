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
    'js_spinner'            => false,
    'js_kguts'              => false,
    'js_alignme'            => false,
    'js_tools'              => false,
    'js_fganotification'    => false,
    'js_apexchart'          => false,
    'js_error'              => false,
    'js_att_ix_presrt'      => false,
    'js_att_kpi_chartsfn'   => false,
    'js_att_kpi_charts'     => false,
    'js_kcompare'           => false,
    'js_att_ix_posthc'      => false,
    'js_umts_logs'          => false,
    'js_att_fgatest'        => false
  ];

  public function __construct()
  {
    parent::__construct();
    $this->load->model('HomeModel');
    $this->setVersion();
  }

  public function index()
  {
    $this->load->view('layout_html', $this->data);
  }

  private function setVersion()
  {
    $this->HomeModel->setAllVersion();
    $this->data['iVersion'] = $this->HomeModel->getiVersion();
    $this->data['serverVersion'] = $this->HomeModel->getServerVersion();
    $this->data['titleVersion'] = $this->HomeModel->getTitleVersion();
  }
}
