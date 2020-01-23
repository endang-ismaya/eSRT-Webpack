<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class ProgramRunModelv2 extends CI_Model
{

  private $_program;
  private $_jsonString;

  public function __construct()
  {
    parent::__construct();
  }

  public function setProgram($program)
  {
    $this->_program = $program;
  }

  public function setJsonString($_jsonString)
  {
    $this->_jsonString = json_encode($_jsonString);
  }

  public function execute()
  {
    ob_start();
    passthru("{$this->_program} {$this->_jsonString}");
    $output = ob_get_clean();

    return $output;
  }
}
