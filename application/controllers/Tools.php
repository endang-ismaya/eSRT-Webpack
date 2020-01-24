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

      case 'att_nbiot':
        $this->data['breadcrumb'] = 'NbIotCell';
        $this->data['main_view'] = 'tools/att_nbiot_html';
        $this->data['title'] = 'NbIotCell';
        $this->data['js_att_nbiot'] = true;
        $this->att_nbiot();
        break;

      case 'att_sc':
        $this->data['breadcrumb'] = 'System Constants Check';
        $this->data['main_view'] = 'tools/att_sc_html';
        $this->data['title'] = 'System Constants Check';
        $this->data['js_att_sc'] = true;
        $this->att_sc_check();
        break;

      case 'att_fgatest':
        $this->data['breadcrumb'] = 'FGA Test';
        $this->data['main_view'] = 'tools/att_fgatest_html';
        $this->data['title'] = 'FGA Test';
        $this->data['js_att_fgatest'] = true;
        $this->att_fgatest();
        break;

      case 'kcompare':
        $this->data['breadcrumb'] = 'KCompare';
        $this->data['main_view'] = 'tools/kcompare_html';
        $this->data['title'] = 'Kget Compare';
        $this->data['js_kcompare'] = true;
        $this->kcompare();
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

      case 'runScriptKCompare':
        $this->runScriptKCompare();
        break;

      case 'is_filefolder_exists':
        $this->isFileFolderExists();
        break;

      case 'runKPI':
        $this->runKPI();
        break;

      case 'run_script_c1ix';
        $this->runScriptC1IX();
        break;

      case 'alignme':
        $this->data['breadcrumb'] = 'AlignMe';
        $this->data['main_view'] = 'tools/alignme_html';
        $this->data['title'] = 'AlignMe (Scripting\'s tools)';
        $this->data['js_alignme'] = true;
        $this->alignMe();
        break;

      case 'c1_ciqparser':
        $this->data['breadcrumb'] = 'C1 - CIQ Parser';
        $this->data['main_view'] = 'tools/c1_ciqparser_html';
        $this->data['title'] = 'C1 CIQ Parser';
        $this->data['js_tools'] = true;
        $this->c1_ciqparser();
        break;

      case 'c1_ixscripting':
        $this->data['breadcrumb'] = 'C1 - IX Scripting';
        $this->data['main_view'] = 'tools/c1_ixscripting_html';
        $this->data['title'] = 'C1 IX Scripting';
        $this->data['js_tools'] = true;
        $this->c1_ixscripting();
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

      case 'umtslogs':
        $this->data['breadcrumb'] = 'UMTS Logs';
        $this->data['main_view'] = 'tools/umtslogs_html';
        $this->data['title'] = 'UMTS Logs';
        $this->data['js_umts_logs'] = true;
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

  private function att_nbiot()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->load->view('layout_html', $this->data);
  }

  private function att_sc_check()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->load->view('layout_html', $this->data);
  }

  private function att_fgatest()
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

  private function c1_ixscripting()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();
    $this->data['form_action'] = 'tools/c1_ixscripting';

    // folder list
    while ($row = $this->data['stmt']->fetch()) {
      $this->data['folderlist'][$row['folderpath']] = $row['folderpath'];
    }

    $this->data['disable_form'] = '';
    $this->data['hidden_btn'] = 'hidden';
    $this->data['hidden_submit'] = '';
    $this->data['hidden_cancel'] = 'hidden';
    $this->data['enodeb_selection'] = '';
    $this->data['jsonFileResult'] = '';
    $this->data['ipAdressList'] = $this->ToolsModel->GetAllIPAdress();

    $this->data['siteequipment_config'] = $this->ToolsModel->getSiteEquipmentConfig();
    $this->data['form_value']['folderlist'] = $this->input->post('folderlist');

    // validation
    if ($this->input->post('submit')) {

      if ($this->ToolsModel->validationForIX_1To5() === true) {
        $postData = $this->input->post();

        // echo '<pre>';
        // print_r($postData);
        // echo '</pre>';

        if ($this->ToolsModel->createJSONForCI_IXScripting($postData) === true) {
          $this->data['jsonFileResult'] = $this->ToolsModel->getResultJsonFile();
        }
        $this->data['disable_form'] = 'disabled';
        $this->data['enodeb_selection'] = 'disabled';
        $this->data['hidden_btn'] = '';
        $this->data['hidden_submit'] = 'hidden';
        $this->data['hidden_cancel'] = '';
        $this->data['form_value']['siteequipment_config'] = $this->input->post('siteequipment_config');
      } else {
        // error is here
      }
    }

    $this->load->view('layout_html', $this->data);
  }

  private function c1_ciqparser()
  {
    $this->ToolsModel->setStmtAlignMe();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();
    $this->load->view('layout_html', $this->data);
  }

  private function alignMe()
  {
    $this->ToolsModel->setStmtAlignMe();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();
    $this->load->view('layout_html', $this->data);
  }

  private function kcompare()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();

    $this->ToolsModel->setStmtKguts();
    $this->data['stmt2'] = $this->ToolsModel->getStmt();
    $this->data['error2'] = $this->ToolsModel->getError();

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

  private function runScriptC1IX()
  {
    ini_set('max_execution_time', 0);

    if (isset($_POST['jsonFilePath'])) {
      $jsonFilePath = $_POST['jsonFilePath'];
    } else {
      $jsonFilePath = '';
    }

    if (file_exists($jsonFilePath)) {
      $this->ProgramRunModel->setProgram($this->program);
      $this->ProgramRunModel->setScripts('C1-IX');
      $this->ProgramRunModel->setOptions($jsonFilePath);
      $output = $this->ProgramRunModel->execute();
    } else {
      $output = 'Folder is not exists!!';
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

  private function runScriptKCompare()
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

      if ($this->ToolsModel->createJSONForKCompare($options) === true) {
        $destination = $this->ToolsModel->getResultJsonFile();
        $this->ProgramRunModel->setProgram($this->program);
        $this->ProgramRunModel->setScripts($scripts);
        $this->ProgramRunModel->setOptions($destination);
        $output = $this->ProgramRunModel->execute();
        // $output = "$this->program $scripts $destination";
      }
    } else {
      $output = 'Folder is not exists!!';
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
