<?php
//phpcs:disable

if (!defined('BASEPATH')) :
  exit('No direct script access allowed');
endif;

class DatabaseFileLocatorModel extends CI_Model
{

  private $_dsn = 'sqlite:C:/eranris/srtwp/db/srtwp.db';
  private $_conn;
  private $_limit; //records (rows) to show per page
  private $_page; //current page

  public function __construct()
  {
    parent::__construct();
    $this->_conn = new PDO($this->_dsn, 'srtwp', 'srtwp');
    $this->_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  //LIMIT DATA
  //all it does is limits the data returned and returns everything as $result object
  public function getData($limit = 10, $page = 1, $passQuery)
  { //set default argument values

    $this->_limit = $limit;
    $this->_page = $page;

    //no limiting necessary, use query as it is
    if ($this->_limit == 'all') {
      $query = $passQuery;
    } else {
      //echo ( ( $this->_page - 1 ) * $this->_limit );die;
      //create the query, limiting records from page, to limit
      $this->_row_start = (($this->_page - 1) * $this->_limit);
      $query = $passQuery .
        //add to original query: ( minus one because of the way SQL works )
        " LIMIT {$this->_row_start}, $this->_limit";
    }

    //echo $query;die;

    $rs = $this->_conn->query($query) or die($this->_conn->error);

    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
      //store this array in $result->data below
      $results[]  = $row;
    }

    //print_r($results);die;

    //return data as object, new stdClass() creates new empty object
    $result         = new stdClass();
    $result->page   = $this->_page;
    $result->limit  = $this->_limit;
    $result->total  = $this->getTotal();
    $result->data   = $results; //$result->data = array

    //print_r($result);die;
    return $result; //object
  }

  private function _query($sql, $parameters = [])
  {
    $query = $this->_conn->prepare($sql);
    $query->execute($parameters);
    return $query;
  }

  public function getTotal()
  {

    return $this->totalRow();
  }

  private function totalRow()
  {
    $query = $this->_query('SELECT COUNT(*) FROM `FolderList`');
    $row = $query->fetch();
    return $row[0];
  }

  public function createLinks($links)
  {
    //return empty result string, no links necessary
    if ($this->_limit == 'all') {
      return '';
    }

    //get the last page number
    $last = ceil($this->getTotal() / $this->_limit);

    //calculate start of range for link printing
    $start = (($this->_page - $links) > 0) ? $this->_page - $links : 1;

    //calculate end of range for link printing
    $end = (($this->_page + $links) < $last) ? $this->_page + $links : $last;

    //debugging
    // echo '$total: '.$this->_total.' | '; //total rows
    // echo '$row_start: '.$this->_row_start.' | '; //total rows
    // echo '$limit: '.$this->_limit.' | '; //total rows per query
    // echo '$start: '.$start.' | '; //start printing links from
    // echo '$end: '.$end.' | '; //end printing links at
    // echo '$last: '.$last.' | '; //last page
    // echo '$page: '.$this->_page.' | '; //current page
    // echo '$links: '.$links.' <br /> '; //links

    //ul boot strap class - "pagination pagination-sm"
    $html = '<ul class="' . 'pagination justify-content-center' . '">';

    $class = ($this->_page == 1) ? "page-item disabled" : "page-item"; //disable previous page link <<<

    //create the links and pass limit and page as $_GET parameters

    //$this->_page - 1 = previous page (<<< link )
    $previous_page = ($this->_page == 1) ?
      '<li class="' . $class . '"><a class="page-link" href="">Previous</a></li>' : //remove link from previous button
      '<li class="' . $class . '"><a class="page-link" href="' . site_url('databasefilelocator/' . $this->_limit . '/' . ($this->_page - 1)) . '">Previous</a></li>';

    $html .= $previous_page;

    if ($start > 1) { //print ... before (previous <<< link)
      $html .= '<li><a class="page-link" href="' . site_url('databasefilelocator/' . $this->_limit . '/1') . '">1</a></li>'; //print first page link
      $html .= '<li class="page-item disabled"><span>...</span></li>'; //print 3 dots if not on first page
    }

    //print all the numbered page links
    for ($i = $start; $i <= $end; $i++) {
      $class = ($this->_page == $i) ? "page-item active" : ""; //highlight current page
      $html .= '<li class="' . $class . '"><a class="page-link" href="' . site_url('databasefilelocator/' . $this->_limit . '/' . $i) . '">' . $i . '</a></li>';
    }

    if ($end < $last) { //print ... before next page (>>> link)
      $html .= '<li class="page-item disabled"><span>...</span></li>'; //print 3 dots if not on last page
      $html .= '<li><a class="page-link" href="' . site_url('databasefilelocator/' . $this->_limit . '/' . $last) . '">' . $last . '</a></li>'; //print last page link
    }

    $class = ($this->_page == $last) ? "page-item disabled" : ""; //disable (>>> next page link)

    //$this->_page + 1 = next page (>>> link)
    $next_page = ($this->_page == $last) ?
      '<li class="' . $class . '"><a class="page-link" href="">Next</a></li>' : //remove link from next button
      '<li class="' . $class . '"><a class="page-link" href="' . site_url('databasefilelocator/' . $this->_limit . '/' . ($this->_page + 1)) . '">Next</a></li>';

    $html .= $next_page;
    $html .= '</ul>';

    return $html;
  }

  public function delete($id, $table, $primaryKey)
  {
    $parameters = [':id' => $id];

    $this->_query(
      'DELETE FROM `' . $table . '` WHERE`' .
        $primaryKey . '` = :id',
      $parameters
    );
  }
}
