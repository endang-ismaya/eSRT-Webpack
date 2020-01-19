<?php

?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>
    <?php echo $title; ?>
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="<?php echo base_url('assets/images/high-res.ico'); ?>" type="image/x-icon">
  <link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url('assets/css/bootswatch.minty.css'); ?>" />
  <link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url('assets/css/custom.css'); ?>" />
  <link rel="stylesheet" type="text/css" media="screen" href="<?php echo base_url('assets/css/spinner.css'); ?>" />
</head>

<body class="<?php echo $home; ?>">
  <!-- <video autoplay muted loop oncontextmenu="return false;" id="myVideo" class="<?php echo $video; ?>">
		<source src="http://localhost/srtwp/assets/video/PexelsVideos1494285_6MB.mp4" type="video/mp4">
	</video> -->
  <?php $this->load->view('templates/nav_html.php'); ?>
  <div class="row mb-0">
    <div class="col-sm-12">
      <p class="text-light bg-primary text-center subtitle">~<?php echo $breadcrumb; ?>~</p>
    </div>
  </div>
  <?php if ($iVersion == -1) { ?>
    <div class="row mb-2 mt-0">
      <div class="col-sm-12 text-center">
        <span class="badge badge-pill badge-danger">There is a new version
          <?php echo '(v' . $serverVersion . ')'; ?> available for download!</span>
      </div>
    </div>
  <?php } ?>
  <div id="mainx">
    <?php $this->load->view($main_view); ?>
  </div>
  <?php $this->load->view('templates/footer_html.php'); ?>
  <script src="<?php echo base_url('assets/js/jquery-3.3.1.min.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/popper.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/bootstrap.min.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/main.js'); ?>" />
  </script>
  <?php if ($js_error) { ?>
    <script src="<?php echo base_url('assets/js/error.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_apexchart) { ?>
    <script src="<?php echo base_url('assets/js/apexcharts_cdn.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_spinner) { ?>
    <script src="<?php echo base_url('assets/js/spinner.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_kguts) { ?>
    <script src="<?php echo base_url('assets/js/kguts.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_alignme) { ?>
    <script src="<?php echo base_url('assets/js/alignme.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_tools) { ?>
    <script src="<?php echo base_url('assets/js/tools.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_fganotification) { ?>
    <script src="<?php echo base_url('assets/js/fganotification.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_att_ix_presrt) { ?>
    <script src="<?php echo base_url('assets/js/att-ix-presrt.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_att_kpi_chartsfn) { ?>
    <script src="<?php echo base_url('assets/js/kpicharts-fn.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_att_kpi_charts) { ?>
    <script src="<?php echo base_url('assets/js/kpicharts.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_att_ix_posthc) { ?>
    <script src="<?php echo base_url('assets/js/att-ixposthc.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_kcompare) { ?>
    <script src="<?php echo base_url('assets/js/kcompare.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_umts_logs) { ?>
    <script src="<?php echo base_url('assets/js/umtslogs.js'); ?>" />
    </script>
  <?php } ?>
  <?php if ($js_att_fgatest) { ?>
    <script src="<?php echo base_url('assets/js/att_fgatest.js'); ?>" />
    </script>
  <?php } ?>
  <?php if (isset($js_att_sc)) { ?>
    <script src="<?php echo base_url('assets/js/att_sc.js'); ?>" />
    </script>
  <?php } ?>
  <?php if (isset($js_att_nbiot)) { ?>
    <script src="<?php echo base_url('assets/js/att_nbiotcell.js'); ?>" />
    </script>
  <?php } ?>
</body>

</html>