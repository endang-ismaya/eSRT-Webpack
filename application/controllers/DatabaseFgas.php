<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class DatabaseFgas extends MY_Controller
{
  public $data = [
    'title'             => 'FGA and Implementation Notice',
    'main_view'         => '',
    'tools_menu'        => '',
    'db_filelocator'    => 'active',
    'home_menu'         => '',
    'updates_menu'      => '',
    'tutorial_menu'     => '',
    'paginators'        => '',
    'files'             => [],
    'totalFiles'        => 0,
    'breadcrumb'        => 'FGA Docs and Implementation Notice',
    'home'              => 'others',
    'video'             => 'd-none',
    'js_spinner'            => false,
    'js_kguts'              => false,
    'js_alignme'            => false,
    'js_tools'              => false,
    'js_fganotification'    => true,
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
    $this->load->model('DatabaseFileLocatorModel');
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
    $this->data['main_view'] = 'database/db_fgas_html';
    $this->load->view('layout_html', $this->data);
  }
}
