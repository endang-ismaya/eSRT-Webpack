<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class ToolsModel extends CI_Model
{

  private $_dsn = 'sqlite:C:/eranris/srtwp/db/srtwp.db';
  private $_conn;
  private $_error;
  private $_stmt;
  private $_resultJsonFile;

  public function __construct()
  {
    parent::__construct();
    $this->_conn = new PDO($this->_dsn, 'srtwp', 'srtwp');
    $this->_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function getResultJsonFile()
  {
    return $this->_resultJsonFile;
  }
  public function getStmt()
  {
    return $this->_stmt;
  }

  public function getError()
  {
    return $this->_error;
  }

  public function setStmtKguts()
  {
    try {
      $sql = 'SELECT no, folderpath
              FROM FolderList
              WHERE filetype = :filetype
              ORDER BY no DESC
              LIMIT 15';
      $this->_stmt = $this->_conn->prepare($sql);
      $this->_stmt->bindValue('filetype', 'FOLDER');
      $this->_stmt->execute();
      $errorInfo = $this->_conn->errorInfo();
      if (isset($errorInfo[2])) {
        $this->_error = $errorInfo[2];
      }
    } catch (Exception $e) {
      $this->_error = $e->getMessage();
    }
  }

  public function setStmtAlignMe()
  {
    try {
      $sql = 'SELECT no, folderpath
                    FROM FolderList
                    WHERE filetype = :filetype
                    AND folderpath like :folderpath
                    ORDER BY no DESC
                    LIMIT 15';
      $this->_stmt = $this->_conn->prepare($sql);
      $this->_stmt->bindValue('filetype', 'FILE');
      $this->_stmt->bindValue('folderpath', '%.xlsx');
      $this->_stmt->execute();
      $errorInfo = $this->_conn->errorInfo();
      if (isset($errorInfo[2])) {
        $this->_error = $errorInfo[2];
      }
    } catch (Exception $e) {
      $this->_error = $e->getMessage();
    }
  }

  private function formRulesForC1IX_1To5()
  {
    $form = [
      [
        'field' => 'site_id',
        'label' => 'Site Id',
        'rules' => "required"
      ],
      [
        'field' => 'rbssummaryfile_revision',
        'label' => 'Revision',
        'rules' => "trim|required|exact_length[1]|alpha_numeric"
      ],
      [
        'field' => 'rbssummaryfile_licensingkeyfilepath',
        'label' => 'licensingKeyFilePath',
        'rules' => ''
      ],
      [
        'field' => 'rbssummaryfile_upgradepackagefilepath',
        'label' => 'upgradePackageFilePath',
        'rules' => 'required'
      ],
      [
        'field' => 'sitebasic_ip_ntp_server_primary',
        'label' => 'IP_NTP_Server_Primary',
        'rules' => "required|valid_ip[ipv4]"
      ],
      [
        'field' => 'sitebasic_vlan_id_s1_x2_U_C',
        'label' => 'VLAN_ID (s1,x2,U,C)',
        'rules' => "required|numeric"
      ],
      [
        'field' => 'sitebasic_ip_s1_x2_U_C_Address',
        'label' => 'IP_(s1,x2,U,C)_Address',
        'rules' => "required|valid_ip[ipv4]"
      ],
      [
        'field' => 'sitebasic_ip_s1_x2_U_C_Network_Mask',
        'label' => 'IP_(s1,x2,U,C)_Network_Mask',
        'rules' => "required|numeric"
      ],
      [
        'field' => 'sitebasic_ip_s1_x2_U_C_Default_Router',
        'label' => 'IP_(s1,x2,U,C)_Default_Router',
        'rules' => "required|valid_ip[ipv4]"
      ],
      [
        'field' => 'sitebasic_vlan_id_oam',
        'label' => 'VLAN_ID (OAM)',
        'rules' => "required|numeric"
      ],
      [
        'field' => 'sitebasic_ip_oam_address',
        'label' => 'IP_(OAM)_Address',
        'rules' => "required|valid_ip[ipv4]"
      ],
      [
        'field' => 'sitebasic_ip_oam_network_mask',
        'label' => 'IP_(OAM)_Network_Mask',
        'rules' => "required|numeric"
      ],
      [
        'field' => 'sitebasic_ip_oam_default_router',
        'label' => 'IP_(OAM)_Default_Router',
        'rules' => "required|valid_ip[ipv4]"
      ],
      [
        'field' => 'enodebfunction_enodebid',
        'label' => 'eNodeBId',
        'rules' => "required|numeric"
      ],
      [
        'field' => 'enodebfunction_mcc',
        'label' => 'MCC',
        'rules' => "required|numeric|max_length[3]"
      ],
      [
        'field' => 'enodebfunction_mnc',
        'label' => 'MNC',
        'rules' => "required|numeric|max_length[3]"
      ],
      [
        'field' => 'enodebfunction_mnclength',
        'label' => 'mncLength',
        'rules' => "required|numeric|max_length[2]"
      ],
      [
        'field' => 'enodebfunction_mnclength',
        'label' => 'mncLength',
        'rules' => "required|numeric|max_length[2]"
      ],
      [
        'field' => 'folderlist',
        'label' => 'Destination Folder',
        'rules' => "required|callback_is_folder_exists"
      ],
      [
        'field' => 'fddscripts',
        'label' => 'EUtranCellFDD Scripts',
        'rules' => "required"
      ]
    ];
    return $form;
  }

  public function validationForIX_1To5()
  {
    $form = $this->formRulesForC1IX_1To5();
    $this->form_validation->set_rules($form);

    if ($this->form_validation->run()) {
      return true;
    } else {
      return false;
    }
  }

  public function createJSONForCI_IXScripting($postData)
  {

    $destination = 'C:\xampp\htdocs\srtwp\tmp';
    $todayDate = date('Ymd_hisa');
    $fileName = $this->session->userdata['username'] . $todayDate;
    $destination .= '\c1ix_' . $postData['site_id'] . '_' . $fileName . '.json';

    // echo $destination;

    $jsonData = json_encode($postData);
    file_put_contents($destination, $jsonData);

    if (file_exists($destination)) {
      $this->_resultJsonFile = $destination;
      return true;
    } else {
      $this->_resultJsonFile = '';
      return false;
    }
  }

  public function createJSONForKCompare($postData)
  {

    $destination = 'C:\xampp\htdocs\srtwp\tmp';
    $todayDate = date('Ymd_hisa');
    $fileName = $this->session->userdata['username'] . $todayDate;
    $destination .= '\kcompare_' . '_' . $fileName . '.json';

    file_put_contents($destination, $postData);

    if (file_exists($destination)) {
      $this->_resultJsonFile = $destination;
      return true;
    } else {
      $this->_resultJsonFile = '';
      return false;
    }
  }

  public function getSiteEquipmentConfig()
  {
    return [
      '1C_2x2'            => '1C_2x2',
      '1C_2x2 + 2C_4x4'   => '1C_2x2 + 2C_4x4'
    ];
  }

  public function getMarket()
  {
    return [
      'NCAL'  => 'NCAL',
      'SCAL'  => 'SCAL'
    ];
  }

  public function GetAllIPAdress()
  {
    $latestDocs = file_get_contents(base_url('json/c1_ipaddress.json'));
    $json_latestDocs = json_decode($latestDocs, true);

    ksort($json_latestDocs);

    return $json_latestDocs;
  }
}
