<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class updates extends MY_Controller
{
  public $data = [
    'title'             => 'Updates',
    'main_view'         => 'updates/updates_html',
    'tools_menu'        => '',
    'db_filelocator'    => '',
    'home_menu'         => '',
    'updates_menu'      => 'active',
    'tutorial_menu'     => '',
    'breadcrumb'        => 'Updates',
    'home'              => '',
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

  public $program = 'C:\eranris\srtup\SrtUp.exe';

  public function __construct()
  {
    parent::__construct();
    $this->load->model('ProgramRunModel');
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

  public function updateSrtVba()
  {
    ini_set('max_execution_time', 0);

    $this->ProgramRunModel->setProgram($this->program);
    $this->ProgramRunModel->setScripts('update');
    $this->ProgramRunModel->setOptions($_POST['tools']);
    $output = $this->ProgramRunModel->execute();
    echo $output;
  }

  public function updateSrtWP()
  {
    ini_set('max_execution_time', 0);

    $this->ProgramRunModel->setProgram($this->program);
    $this->ProgramRunModel->setScripts('update');
    $this->ProgramRunModel->setOptions($_POST['tools']);
    $output = $this->ProgramRunModel->execute();
    echo $output;
  }
}
