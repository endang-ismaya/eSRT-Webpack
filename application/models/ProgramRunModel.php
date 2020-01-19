<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class ProgramRunModel extends CI_Model
{

  private $_program;
  private $_scripts;
  private $_options;

  public function __construct()
  {
    parent::__construct();
  }

  public function setProgram($program)
  {
    $this->_program = $program;
  }

  public function setScripts($scripts)
  {
    $this->_scripts = $scripts;
  }

  public function setOptions($options)
  {
    $this->_options = $options;
  }

  public function execute()
  {
    ob_start();
    passthru("{$this->_program} {$this->_scripts} {$this->_options}");
    $output = ob_get_clean();

    return $output;
  }
}
