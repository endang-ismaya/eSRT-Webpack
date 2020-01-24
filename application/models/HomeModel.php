<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class HomeModel extends CI_Model
{
  private $localVersion = "1.0.0";
  private $serverVersion = "1.0.0";
  private $linkNewVersion = "#";

  public function __construct()
  {
    parent::__construct();
  }

  public function getServerVersion()
  {
    return $this->serverVersion;
  }

  public function getLocalVersion()
  {
    return $this->localVersion;
  }

  public function getLinkNewVersion()
  {
    return $this->linkNewVersion;
  }

  public function setAllVersion()
  {
    $this->pullLocalVersion();
    $this->pullServerVersion();
  }

  private function pullLocalVersion()
  {
    $jsondata = file_get_contents('C:\xampp\htdocs\srtwp\package.json');
    $json = json_decode($jsondata, true);

    $this->localVersion = $json['version'];
  }

  private function pullServerVersion()
  {
    try {

      $doc = new DOMDocument();
      $doc->load('https://endang-ismaya.com/eranris/eranris_server.xml');

      $swVersions = $doc->getElementsByTagName("swversion");
      foreach ($swVersions as $swVer) {

        $id = $swVer->getAttribute('id');
        $link = $swVer->getAttribute('link');
        $ver = $swVer->getAttribute('ver');

        if ($id == 'srtwp') {
          $this->serverVersion = $ver;
          $this->linkNewVersion = $link;
        }
      }
    } catch (\Throwable $th) {
      //throw $th;
    }
  }
}
