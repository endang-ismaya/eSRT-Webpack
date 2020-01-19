<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="<?php echo base_url(); ?>">
    <img src="<?php echo base_url('assets/images/icons8-RadioTower-48.png'); ?>" alt="brand-logo" class="ml-2"></a>
  <h1>eSRT-webPack<span class="h1-jmbtron text-warning">
      <?php echo $titleVersion; ?></span></h1>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse ml-3" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item <?php echo $home_menu; ?>">
        <a class="nav-link" href="<?php echo base_url(); ?>">Home</a>
      </li>
      <li class="nav-item dropdown <?php echo $tools_menu; ?>">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Tools </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="<?php echo base_url('/tools/kguts'); ?>">Kguts </a>
          <a class="dropdown-item" href="<?php echo base_url('/tools/alignme'); ?>">AlignMe</a>
          <a class="dropdown-item" href="<?php echo base_url('/tools/kcompare'); ?>">KCompare</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="<?php echo base_url('/tools/umtslogs'); ?>">UMTS Logs Reporting</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="<?php echo base_url('/tools/att_ixpresrt'); ?>">AT&T - IX Pre-SRT <span class="badge badge-warning ml-1">Updated</span></a></a>
          <a class="dropdown-item" href="<?php echo base_url('/tools/att_sc'); ?>">AT&T - IX SystemContants</a>
          <a class="dropdown-item" href="<?php echo base_url('/tools/att_kpicharts'); ?>" target="_blank">AT&T - KPI Charts</a>
          <a class="dropdown-item" href="<?php echo base_url('/tools/att_ixposthc'); ?>">AT&T - IX HealthCheck <span class="badge badge-warning ml-1">Updated</span></a>
          <a class="dropdown-item" href="<?php echo base_url('/tools/att_fgatest'); ?>">AT&T - FGA Test</a>
        </div>
      </li>
      <li class="nav-item <?php echo $tutorial_menu; ?>"">
        <a class=" nav-link" href="<?php echo base_url('/databasefilelocator'); ?>">PathLocator db</a>
      </li>
    </ul>
  </div>
  <nav class="my-2 my-md-0 mr-md-3">
    <button id="file-locator" type="button" class="btn btn-warning">PathLocator</button>
  </nav>
  <div class="pull-right" style="margin-right: 200px">
    <ul class="nav pull-right">
      <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="text-light">
            <?php echo ucfirst($this->session->userdata['username']); ?></span></a>
        <ul class="dropdown-menu">
          <!-- <li class="dropdown-item"><a href="http://localhost/srtwp/user/preferences">-- Preferences</a></li> -->
          <li class="dropdown-item"><a href="http://localhost/srtwp/help/support">-- Contact Support</a></li>
          <li class="dropdown-divider"></li>
          <li class="dropdown-item"><a href="http://localhost/srtwp/login/logout" onclick="return confirm('Are you sure?')">--
              Logout</a></li>
        </ul>
      </li>
    </ul>
  </div>
</nav>