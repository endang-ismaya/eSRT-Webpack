<div class="container-fluid">
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-8">
      <div class="alert alert-warning" role="alert">
        <ul></ul>
      </div>
      <div class="card mb-2 bg-gradient">
        <div class="card-header py-2"><span class="font-weight-bold text-primary">MODUMP FOLDER </span> <i class="fas fa-folder-open float-right fa-2x"></i></div>
        <div class="card-body">
          <?php
          if (isset($error)) {
            echo "<div>$error</div>";
          } else { ?>
            <select id="att-sc-mobatch-srt-data-folder" class="custom-select">
              <option selected>--Select Folder--</option>
              <?php
              while ($row = $stmt->fetch()) {
                echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
              } ?>
            </select>
          <?php } ?>
        </div>
      </div>
      <div class="card bg-gradient">
        <div class="card-header"><span class="font-weight-bold text-primary">REPORT </span> <i class="fas fa-file-signature float-right fa-2x text-info"></i></div>
        <div class="card-body">
          <div id="sc-output"></div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card mr-3 bg-gradient">
        <div class="card-header"><span class="font-weight-bold text-primary">ACTION </span> <i class="fas fa-location-arrow"></i></div>
        <div class="card-body">
          <div class="font-weight-bold bg-gradient p-2 mr-3">
            <label for="fga-selection"><span class="font-weight-bold text-primary">FGA SELECTION: </span></label><br>
            <input type="checkbox" value="FGA187" style="width: 25px; height: 25px;" class="sc-fga"><span style="font-size: 35px;" class="ml-3">FGA187</span><br>
            <input type="checkbox" value="SC3877" style="width: 25px; height: 25px;" class="sc-fga"><span style="font-size: 35px;" class="ml-3">SC3877</span><br>
          </div>
          <hr>
          <div class="font-weight-bold p-2 mr-3">
            <label for="fga-selection"><span class="font-weight-bold text-primary">SCRIPT OPTIONS: </span></label><br>
            <input type="checkbox" value="DEFAULT" style="width: 24px; height: 24px;" class="sc-default-set"><span style="font-size: 20px;" class="ml-3 align-text-bottom">Print Default Set</span><br>
            <input type="checkbox" value="RESET-ALL" style="width: 24px; height: 24px;" class="sc-reset-all"><span style="font-size: 20px;" class="ml-3 align-text-bottom">Reset all to default</span><br>
          </div>
          <hr>
          <div class="font-weight-bold bg-gradient p-3 mr-3">
            <label for="sc-configuration"><span class="font-weight-bold text-primary">SC CONFIGURATION: </span></label>
            <select class="form-control form-control-lg" id="sc-config-name" style="font-size: 12px;">
              <option value="NSB_BBU_MACRO_L19Q3">NSB_BBU_MACRO_L19Q3</option>
              <option value="NSB_BBU_CRAN_L19Q3">NSB_BBU_CRAN_L19Q3</option>
              <option value="NSB_BBU_WLL_L19Q3">NSB_BBU_WLL_L19Q3</option>
              <option value="EXISTING_DUS_MACRO_L19Q3_BBU_MACRO_L19Q3">EXISTING_DUS_MACRO_L19Q3_BBU_MACRO_L19Q3</option>
              <option value="EXISTING_BBU_MACRO_L19Q3_BBU_MACRO_L19Q3">EXISTING_BBU_MACRO_L19Q3_BBU_MACRO_L19Q3</option>
            </select>
          </div>
          <hr>
          <button id="btn-sc-get-current" type="button" class="btn btn-lg btn-block mr-3">Get SC</button>
          <button id="btn-sc-create-script" type="button" class="btn btn-lg btn-block mr-3">Create SC Script</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div id="main-show">
  <div class="s1">
    <div class="s b sb1"></div>
    <div class="s b sb2"></div>
    <div class="s b sb3"></div>
    <div class="s b sb4"></div>
  </div>

  <div class="s2">
    <div class="s b sb5"></div>
    <div class="s b sb6"></div>
    <div class="s b sb7"></div>
    <div class="s b sb8"></div>
  </div>

  <div class="bigcon">
    <div class="big b"></div>
  </div>
</div>
<div id="btm-x" style="margin-bottom: 150px"></div>