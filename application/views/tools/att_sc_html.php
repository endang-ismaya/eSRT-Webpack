<label class="container-fluid">
  <label class="row">
    <div class="col-sm-9">
      <div class="alert alert-warning" role="alert">
        <ul></ul>
      </div>
      <div class="card mb-2">
        <div class="card-header">Modump's folder</div>
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
      <div class="card">
        <div class="card-header">Report</div>
        <div class="card-body">
          <div id="sc-output"></div>
        </div>
      </div>
    </div>
    <label class="col-sm-3">
      <label class="card">
        <div class="card-header">Menu</div>
        <div class="card-body">
          <div class="mb-4 font-weight-bold bg-gradient p-2 mr-3">
            <label for="fga-selection">FGA Selection:</label><br>
            <input type="checkbox" value="FGA187" style="width: 25px; height: 25px;" class="sc-fga"><span style="font-size: 35px;" class="ml-3">FGA187</span><br>
            <input type="checkbox" value="SC3877" style="width: 25px; height: 25px;" class="sc-fga"><span style="font-size: 35px;" class="ml-3">SC3877</span><br>
          </div>
          <div class="mb-4 font-weight-bold bg-light p-2 mr-3">
            <label for="fga-selection">Options:</label><br>
            <input type="checkbox" value="DEFAULT" style="width: 25px; height: 25px;" class="sc-default-set"><span style="font-size: 35px;" class="ml-3">Print Default Set</span><br>
            <input type="checkbox" value="RESET-ALL" style="width: 25px; height: 25px;" class="sc-reset-all"><span style="font-size: 35px;" class="ml-3">Reset all to default</span><br>
          </div>
          <label class=" mb-4 font-weight-bold bg-gradient p-3 mr-3">
            <label for="sc-configuration">SC Configuration:</label>
            <select class="form-control form-control-lg" id="sc-config-name">
              <option value="NSB_BBU_MACRO_L19Q3">NSB_BBU_MACRO_L19Q3</option>
              <option value="NSB_BBU_CRAN_L19Q3">NSB_BBU_CRAN_L19Q3</option>
              <option value="NSB_BBU_WLL_L19Q3">NSB_BBU_WLL_L19Q3</option>
              <option value="EXISTING_DUS_MACRO_L19Q3_BBU_MACRO_L19Q3">EXISTING_DUS_MACRO_L19Q3_BBU_MACRO_L19Q3</option>
              <option value="EXISTING_BBU_MACRO_L19Q3_BBU_MACRO_L19Q3">EXISTING_BBU_MACRO_L19Q3_BBU_MACRO_L19Q3</option>
            </select>
          </label>
          <button id="btn-sc-get-current" type="button" class="btn btn-lg btn-block mr-3">Get SC</button>
          <button id="btn-sc-create-script" type="button" class="btn btn-lg btn-block mr-3">Create SC Script</button>
        </div>
      </label>
    </label>
  </label>
</label>
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