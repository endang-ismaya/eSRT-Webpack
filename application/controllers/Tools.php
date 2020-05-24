<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class Tools extends MY_Controller
{
  public $data = [
    'title' => '',
    'main_view' => '',
    'tools_menu' => 'active',
    'db_filelocator' => '',
    'home_menu' => '',
    'updates_menu' => '',
    'tutorial_menu' => '',
    'error' => '',
    'stmt' => '',
    'home' => 'others',
    'video' => 'd-none',
    'js_main' => true,
    'js_spinner' => true,
    'js_home' => true
  ];

  public $program = 'C:\xampp\htdocs\srtwp\bin\eSRTWebPack\eSRTWebPack.exe';

  public function __construct()
  {
    parent::__construct();
    $this->load->model('ToolsModel');
    $this->load->model('ProgramRunModel');
  }

  public function index($toolsMenu = '')
  {
    switch ($toolsMenu) {

      case 'att_sc':
        $this->data['breadcrumb'] = 'System Constants Check';
        $this->data['main_view'] = 'tools/att_sc_html';
        $this->data['title'] = 'System Constants Check';
        $this->data['js_att_sc'] = true;
        $this->att_sc_check();
        break;

      case 'kguts':
        $this->data['breadcrumb'] = 'Kguts';
        $this->data['main_view'] = 'tools/kguts_html';
        $this->data['title'] = 'Kguts (Kget\'s extractor)';
        $this->data['js_kguts'] = true;
        $this->kguts();
        break;

      case 'get_setting':
        $this->getSetting();
        break;

      case 'run_script':
        $this->runScript();
        break;

      case 'is_filefolder_exists':
        $this->isFileFolderExists();
        break;

      case 'runKPI':
        $this->runKPI();
        break;

      case 'alignme':
        $this->data['breadcrumb'] = 'AlignMe';
        $this->data['main_view'] = 'tools/alignme_html';
        $this->data['title'] = 'AlignMe (Scripting\'s tools)';
        $this->data['js_alignme'] = true;
        $this->alignMe();
        break;

      case 'att_ixpresrt':
        $this->data['breadcrumb'] = 'ATT - IX Pre-SRT';
        $this->data['main_view'] = 'tools/att_ixpresrt_html';
        $this->data['title'] = 'ATT - IX Pre-SRT';
        $this->data['js_att_ix_presrt'] = true;
        $this->att_ixpresrt();
        break;

      case 'att_kpicharts':
        $this->data['breadcrumb'] = 'ATT - KPI Charts';
        $this->data['main_view'] = 'tools/att_kpicharts_html';
        $this->data['title'] = 'ATT - KPI Charts';
        $this->data['js_apexchart'] = true;
        $this->data['js_att_kpi_chartsfn'] = true;
        $this->data['js_att_kpi_charts'] = true;
        $this->att_kpicharts();
        break;

      case 'att_ixposthc':
        $this->data['breadcrumb'] = 'ATT - IX HealthCheck';
        $this->data['main_view'] = 'tools/att_ixposthc_html';
        $this->data['title'] = 'ATT - IX HealthCheck';
        $this->data['js_att_ix_posthc'] = true;
        $this->att_ixposthc();
        break;

      default:
        if (isset($_POST['scripts'])) {
          echo "Error 404 - Page Not Found";
        } else {
          redirect('error404');
        }
        break;
    }
  }

  private function att_sc_check()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->load->view('layout_html', $this->data);
  }

  private function att_ixposthc()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->ToolsModel->setStmtAlignMe();
    $this->data['stmtFile'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->data['stmtMarket'] = $this->ToolsModel->getMarket();

    $this->load->view('layout_html', $this->data);
  }

  private function isFileFolderExists()
  {
    ini_set('max_execution_time', 0);

    if (isset($_POST['pathFolder']) && file_exists($_POST['pathFolder'])) {
      $output = 'exists';
    } else {
      $output = 'not_exists';
    }

    echo $output;
  }

  private function att_kpicharts()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->ToolsModel->setStmtAlignMe();
    $this->data['stmtFile'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->data['stmtMarket'] = $this->ToolsModel->getMarket();

    $this->load->view('layout_html', $this->data);
  }

  private function att_ixpresrt()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->ToolsModel->setStmtAlignMe();
    $this->data['stmtFile'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->data['stmtMarket'] = $this->ToolsModel->getMarket();

    $this->load->view('layout_html', $this->data);
  }

  private function alignMe()
  {
    $this->ToolsModel->setStmtAlignMe();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();
    $this->load->view('layout_html', $this->data);
  }

  private function kguts()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();
    $this->load->view('layout_html', $this->data);
  }

  private function getSetting()
  {
    if (isset($_POST['key'])) {
      $jsondata = file_get_contents('C:\xampp\htdocs\srtwp\setting.json');
      $json = json_decode($jsondata, true);
      $output = $json[$_POST['key']];
    } else {
      $output = 'no-user';
    }

    echo $output;
  }

  private function runScript()
  {
    ini_set('max_execution_time', 0);

    if (isset($_POST['scripts'])) {
      $scripts = $_POST['scripts'];
    } else {
      $scripts = '';
    }
    if (isset($_POST['options'])) {
      $options = $_POST['options'];
    } else {
      $options = '';
    }
    if (isset($_POST['pathFolder'])) {
      $pathFolder = htmlentities(strip_tags($_POST['pathFolder']));
    } else {
      $pathFolder = '';
    }
    if (file_exists($pathFolder)) {
      $this->ProgramRunModel->setProgram($this->program);
      $this->ProgramRunModel->setScripts($scripts);
      $this->ProgramRunModel->setOptions($options);
      $output = $this->ProgramRunModel->execute();
      // $output = "$this->program $scripts $options";
      // echo "$this->program $scripts $options";
    } else {
      $output = 'Folder is not exists!!';
      // echo $output;
    }

    echo $output;
  }

  private function runKPI()
  {
    ini_set('max_execution_time', 0);

    $this->ProgramRunModel->setProgram($this->program);
    $this->ProgramRunModel->setScripts("ValidationOK");
    $this->ProgramRunModel->setOptions("ValidationOK");
    $output = $this->ProgramRunModel->execute();
    // $output = "this is a valid testing";

    echo $output;
  }

  public function is_folder_exists()
  {
    if (file_exists($this->input->post('folderlist'))) {
      return true;
    } else {
      $this->form_validation->set_message('is_folder_exists', 'Destination folder is not exist!');
      return false;
    }
  }
}
