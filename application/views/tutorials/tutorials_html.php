<?php //phpcs:disable ?>
<div class="row">
    <div class="col-3">
        <nav class="nav flex-column nav-pills tutorial-nav">
            <li class="nav-item">
                <a class="nav-link <?php echo $menu_1 ?>" href="<?php echo base_url('tutorials/index/1')?>">Installation: SrtUp Setup, The Srt Package Manager</a>
            </li>
            <li class="nav-item">
                <a class="nav-link <?php echo $menu_2 ?>" href="<?php echo base_url('tutorials/index/2')?>">Installation: XAMPP Setup</a>
            </li>
            <li class="nav-item">
                <a class="nav-link <?php echo $menu_3 ?>" href="<?php echo base_url('tutorials/index/3')?>">C1 IX: Create IX Scripts for Cellular One</a>
            </li>
            <li class="nav-item">
                <a class="nav-link <?php echo $menu_4 ?>" href="<?php echo base_url('tutorials/index/4')?>">Pre-SRT (Phase-1): Create Scripts for Existing Relations and SystemConstants</a>
            </li>
        </nav>
    </div>
    <div class="col-9"><?php $this->load->view($tutor_contents); ?></div>
</div>
