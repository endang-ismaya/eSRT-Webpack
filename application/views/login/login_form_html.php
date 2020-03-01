<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Login</title>
  <link rel="shortcut icon" href="<?php echo base_url('assets/images/high-res.ico'); ?>" type="image/x-icon">
  <link rel="stylesheet" type="text/css" media="screen" href="<?php echo base_url('assets/css/sandstone.min.css'); ?>" />
  <link rel="stylesheet" type="text/css" media="screen" href="<?php echo base_url('assets/css/login.css'); ?>" />
</head>

<body class="text-center">
  <div class="content">
    <?php
    $attributes = [
      'name' => 'login_form',
      'id' => 'login_form',
      'class' => 'form-signin'
    ];
    echo form_open('login', $attributes);
    ?>
    <img class="mb-4" src="<?php echo base_url('assets/images/high-res.ico'); ?>" alt="ris-logo" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-bold text-white">~ eSRT-webPack ~</h1>
    <!-- pesan start -->
    <?php if (!empty($pesan)) : ?>
      <p class="text-danger"><?php echo $pesan; ?></p>
    <?php endif; ?>
    <!-- pesan end -->
    <div>
      <label for="username" class="sr-only">Username:</label>
      <input type="text" name="username" id="username" size="20" class="form-control mb-1" placeholder="Username" value="<?php echo set_value('username'); ?>" required>
      <?php echo form_error('username', '<p class="field_error">', '</p>'); ?>
    </div>

    <div>
      <label for="password" class="sr-only">Password:</label>
      <input type="password" name="password" id="password" size="20" class="form-control" placeholder="Password" value="<?php echo set_value('password'); ?>" required>
      <?php echo form_error('password', '<p class="field_error">', '</p>'); ?>
    </div>
    <input class="btn btn-lg btn-dark btn-block text-white" type="submit" id="submit" value="Login">
    <?php echo form_close(); ?>
    <p class="mt-5 mb-3 text-muted small">&copy; com.endang-ismaya 2018-2020</p>
  </div>
</body>

</html>