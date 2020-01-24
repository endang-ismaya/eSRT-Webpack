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
    'js_home' => true
  ];

  public $program = 'c:\xampp\htdocs\srtwp\bin\srtwpv2\Srtwp.exe';

  public function __construct()
  {
    parent::__construct();
    $this->load->model('ToolsModel');
    $this->load->model('ProgramRunModelv2');
    $this->load->model('HomeModel');
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

      case 'getallversions':
        $this->getAllVersions();
        break;

      case 'runscript':
        $this->runScript();
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

  private function getAllVersions()
  {
    // ini_set('max_execution_time', 0);

    try {

      $this->HomeModel->setAllVersion();
      $localVersion = $this->HomeModel->getLocalVersion();
      $serverVersion = $this->HomeModel->getServerVersion();
      $linkNewVersion = $this->HomeModel->getLinkNewVersion();

      $output = array(
        "local" => $localVersion,
        "server" => $serverVersion,
        "link" => $linkNewVersion
      );

      echo json_encode($output);
    } catch (\Throwable $th) {
      $this->HomeModel->setAllVersion();
      $localVersion = $this->HomeModel->getLocalVersion();

      $output = array(
        "local" => $localVersion,
        "server" => $localVersion,
        "link" => "#"
      );
      echo json_encode($output);
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
        $output = array(
          "status" => true,
          "isExists" => false
        );
      }
      echo json_encode($output);
    } catch (\Throwable $th) {
      $output = array(
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

    echo json_encode($output);
  }

  private function runScript()
  {
    ini_set('max_execution_time', 0);

    try {
      $_POST = json_decode(file_get_contents('php://input'), true);

      if (isset($_POST['jsonString'])) {
        $jsonString = $_POST['jsonString'];
      } else {
        $jsonString = '';
      }

      $this->ProgramRunModelv2->setProgram($this->program);
      $this->ProgramRunModelv2->setJsonString(json_encode($jsonString));
      $message = $this->ProgramRunModelv2->execute();

      echo json_encode($message);
    } catch (\Throwable $th) {
      $output = array(
        "status" => false,
        "message" => "Something went wrong!, Please try it again later!"
      );
      echo json_encode($output);
    }
  }
}
