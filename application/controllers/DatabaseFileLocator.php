<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class DatabaseFileLocator extends MY_Controller
{
  public $data = [
    'title'             => 'FileLocator\'s Database',
    'main_view'         => '',
    'tools_menu'        => '',
    'db_filelocator'    => 'active',
    'home_menu'         => '',
    'updates_menu'      => '',
    'tutorial_menu'     => '',
    'paginators'        => '',
    'files'             => [],
    'totalFiles'        => 0,
    'breadcrumb'        => 'FileLocator\'s Database',
    'home'              => 'others',
    'video' => 'd-none',
    'js_main'            => true,
  ];

  public function __construct()
  {
    parent::__construct();
    $this->load->model('DatabaseFileLocatorModel');
  }

  public function index($limit = 5, $page = 1)
  {
    $query = "SELECT * FROM FolderList";
    $links = 5;

    $results = $this->DatabaseFileLocatorModel->getData($limit, $page, $query);
    $this->data['totalFiles'] = $this->DatabaseFileLocatorModel->getTotal();

    if ($limit != 5) {
      redirect('DatabaseFileLocator');
    } elseif ((($limit * $page) - $this->data['totalFiles']) > 5) {
      redirect('DatabaseFileLocator');
    } else {
      $files = [];
      for ($p = 0; $p < count($results->data); $p++) :
        $datas = $results->data[$p];
        $files[] = [
          'no' => $datas['no'],
          'filetype' => $datas['filetype'],
          'folderpath' => $datas['folderpath']
        ];
      endfor;
      $this->data['files'] = $files;
      $this->data['paginators'] = $this->DatabaseFileLocatorModel->createLinks($links);
      $this->data['main_view'] = 'database/db_filelocator_main_html.php';

      $this->load->view('layout_html', $this->data);
    }
  }

  public function delete($id = null)
  {
    // make sure that data is exist
    if (!empty($id)) {
      $this->DatabaseFileLocatorModel->delete($id, 'FolderList', 'no');
      redirect('databasefilelocator');
    } else {
      redirect('databasefilelocator');
    }
  }
}
