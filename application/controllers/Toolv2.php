<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class Toolv2 extends MY_Controller
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
  ];

  public $program = 'c:\xampp\htdocs\srtwp\bin\srtwpv2\Srtwp.exe';

  public function __construct()
  {
    parent::__construct();
    $this->load->model('ToolsModel');
    $this->load->model('ProgramRunModel');
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

  public function index($toolMenu = '')
  {
    switch ($toolMenu) {

      case 'kguts':
        $this->data['main_view'] = 'tools/kgutsv2_html';
        $this->data['title'] = 'Kguts (Kget\'s extractor)';
        $this->data['js_fileFolderManagement'] = true;
        $this->data['js_kgutsv2'] = true;
        $this->kguts();
        break;

      case 'isfilefolderexists':
        $this->isFileFolderExists();
        break;

      case 'getfolderlist':
        $this->getFolderList();
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

  private function isFileFolderExists()
  {
    ini_set('max_execution_time', 0);

    try {
      $_POST = json_decode(file_get_contents('php://input'), true);

      if (isset($_POST['fileOrFolderPath']) && file_exists($_POST['fileOrFolderPath'])) {
        $output = array(
          "status" => true,
          "isExists" => true
        );
      } else {
        $output = $output = array(
          "status" => true,
          "isExists" => false
        );
      }
      echo json_encode($output);
    } catch (\Throwable $th) {
      $output = $output = array(
        "status" => false,
        "isExists" => false
      );
      echo json_encode($output);
    }
  }

  private function kguts()
  {
    $this->ToolsModel->setStmtKguts();
    $this->data['stmt'] = $this->ToolsModel->getStmt();
    $this->data['error'] = $this->ToolsModel->getError();
    $this->load->view('layout_html', $this->data);
  }

  private function getFolderList()
  {
    $output = array();
    $this->ToolsModel->setStmtKguts();
    $stmt = $this->ToolsModel->getStmt();
    while ($row = $stmt->fetch()) {
      // $output[] = array($stmt['folderpath']);
      array_push($output, $row['folderpath']);
    }

    // $output = array('one', 'two', 'three');

    echo json_encode($output);
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

  private function is_folder_exists()
  {
    if (file_exists($this->input->post('folderlist'))) {
      return true;
    } else {
      $this->form_validation->set_message('is_folder_exists', 'Destination folder is not exist!');
      return false;
    }
  }
}
