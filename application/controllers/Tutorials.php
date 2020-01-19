<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class Tutorials extends MY_Controller
{
  public $data = [
    'title'             => '',
    'main_view'         => 'tutorials/tutorials_html',
    'tools_menu'        => '',
    'db_filelocator'    => '',
    'home_menu'         => '',
    'updates_menu'      => '',
    'tutorial_menu'     => 'active',
    'breadcrumb'        => 'Tutorials',
    'menu_1'            => '',
    'menu_2'            => '',
    'menu_3'            => '',
    'menu_4'            => '',
    'home'              => 'others',
    'video' => 'd-none',
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

  private function setVersion()
  {
    $this->HomeModel->setAllVersion();
    $this->data['iVersion'] = $this->HomeModel->getiVersion();
    $this->data['serverVersion'] = $this->HomeModel->getServerVersion();
    $this->data['titleVersion'] = $this->HomeModel->getTitleVersion();
  }

  public function index($tutor = 1)
  {
    switch ($tutor) {
      case 1:
        $this->data['menu_1'] = 'active';
        $this->data['tutor_contents'] = 'tutorials/contents/srtup_html';
        break;

      case 2:
        $this->data['menu_2'] = 'active';
        $this->data['tutor_contents'] = 'tutorials/contents/xampp_html';
        break;

      case 3:
        $this->data['menu_3'] = 'active';
        $this->data['tutor_contents'] = 'tutorials/contents/c1_ix_html';
        break;

      case 4:
        $this->data['menu_4'] = 'active';
        $this->data['tutor_contents'] = 'tutorials/contents/presrt_html';
        break;

      default:
        $this->data['tutor_contents'] = 'tutorials/contents/notutor_html';
        break;
    }
    $this->load->view('layout_html', $this->data);
  }
}
