<?php
//phpcs:disable

if (!defined('BASEPATH')) :
    exit('No direct script access allowed');
endif;

class HomeModel extends CI_Model
{
    private $srtwpEXE = 'C:\xampp\htdocs\srtwp\bin\eSRTWebPack\eSRTWebPack.exe';
    private $domain = 'eranris.com';
    private $iVersion = 0;
    private $titleVersion = '';
    private $localVersion = '';
    private $serverVersion = '';

    public function __construct()
    {
        parent::__construct();
    }

    public function getSRTWPExe()
    {
        return $this->srtwpEXE;
    }

    public function getiVersion()
    {
        return $this->iVersion;
    }

    public function getTitleVersion()
    {
        return $this->titleVersion;
    }

    public function getServerVersion()
    {
        return $this->serverVersion;
    }

    public function setAllVersion()
    {
        $this->pullLocalVersion();
        $this->pullServerVersion();
        $this->customCompare($this->localVersion, $this->serverVersion);
    }

    private function pullLocalVersion()
    {
        $fpFile = fopen($this->srtwpEXE, "rb");
        $strFileContent = fread($fpFile, filesize($this->srtwpEXE));
        fclose($fpFile);

        $strTagBefore = 'F\0i\0l\0e\0V\0e\0r\0s\0i\0o\0n\0\0\0\0\0';
        $strTagAfter = '\0\0';
        if (preg_match("/$strTagBefore(.*?)$strTagAfter/", $strFileContent, $arrMatches)) {
            $arrversion =  explode('.', $arrMatches[1]);
            $swVer = trim($arrversion[0].'.'.$arrversion[1].'.'.$arrversion[2].'.'.$arrversion[3]);
            $version = 'v'.$arrversion[0].'.'.$arrversion[1].'.'.$arrversion[2].$arrversion[3];
        } else {
            $version = 'v0.0.00';
        }

        $this->localVersion = $swVer;
        $this->titleVersion = $version;
    }

    private function pullServerVersion()
    {
        // if ($this->pingDomain($this->domain)) :
        //     libxml_use_internal_errors(true);
        //     $eranris = 'http://www.eranris.com/eranris/eranris.app.server.xml';
        //     $eranrisVersion = simplexml_load_file($eranris);
        //     // echo "$eranrisVersion";

        //     if (!$eranrisVersion) {
        //         $serverVersion = $swVer;
        //     } else {
        //         $serverVersion =  $eranrisVersion->swversion[2];
        //         // $serverVersion = '2.2.0.1';
        //     }

        //     //Important to clear the error buffer
        //     libxml_clear_errors();
        // else :
            $serverVersion = '0.0.0.0';
        // endif;

        $this->serverVersion = $serverVersion;
    }

    private function pingDomain($domain)
    {
        $file = @fsockopen($domain, 80, $errno, $errstr, 10);

        return (!$file) ? false : true;
    }

    private function customCompare(string $local, string $server)
    {

        $locals = explode('.', $local);
        $servers = explode('.', $server);

        // compare the first digit
        $local0 = (int) trim($locals[0]);
        $local1 = (int) trim($locals[1]);
        $local2 = (int) trim($locals[2]);
        $local3 = (int) trim($locals[3]);

        $server0 = (int) trim($servers[0]);
        $server1 = (int) trim($servers[1]);
        $server2 = (int) trim($servers[2]);
        $server3 = (int) trim($servers[3]);

        if ($local0 < $server0) {
            $this->iVersion = -1;
            // echo 'A<br>';
        } elseif ($local0 > $server0) {
            $this->iVersion = 0;
            // echo 'A-<br>';
        } else {
            if ($local1 < $server1) {
                $this->iVersion = -1;
                // echo 'B<br>';
            } elseif ($local1 > $server1) {
                $this->iVersion = 0;
                // echo 'B-<br>';
            } else {
                if ($local2 < $server2) {
                    $this->iVersion = -1;
                    // echo 'C<br>';
                } elseif ($local2 > $server2) {
                    $this->iVersion = 0;
                    // echo 'C-<br>';
                } else {
                    if ($local3 < $server3) {
                        $this->iVersion = -1;
                        // echo 'D<br>';
                    }
                }
            }
        }
    }

}