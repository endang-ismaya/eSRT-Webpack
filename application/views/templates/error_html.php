<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>
    <?php echo $title ?>
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="<?php echo base_url('assets/images/high-res.ico'); ?>" type="image/x-icon">
  <link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url('assets/css/sandstone.min.css'); ?>" />
  <link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url('assets/css/custom.css'); ?>" />
  <link rel="stylesheet" type="text/css" media="screen" href="<?php echo base_url('assets/css/error.css'); ?>" />
  <link rel="stylesheet" type="text/css" media="screen" href="<?php echo base_url('assets/css/spinner.css'); ?>" />
</head>

<body>
  <?php $this->load->view('templates/nav_html.php') ?>
  <div class="error">
    <div class="container-floud">
      <div class="col-xs-12 ground-color text-center">
        <div class="container-error-404">
          <div class="clip">
            <div class="shadow">
              <span class="digit thirdDigit"></span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit secondDigit"></span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit firstDigit"></span>
            </div>
          </div>
          <div class="msg">Oh!<span class="triangle"></span></div>
        </div>
        <h2 class="h1">Sorry! Page not found</h2>
      </div>
    </div>
  </div>
  <?php $this->load->view('templates/footer_html.php'); ?>
  <script src="<?php echo base_url('assets/js/jquery-3.3.1.min.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/popper.min.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/bootstrap.min.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/error.js'); ?>" />
  </script>
</body>

</html>