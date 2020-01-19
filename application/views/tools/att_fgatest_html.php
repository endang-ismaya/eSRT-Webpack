<section>
  <div class="container-fluid">
    <div class="row">
      <div id="box1" class="col-md-9">
        <div class="card mb-3">
          <div class="card-header">main folder:</div>
          <div class="card-body">
            <?php
            if (isset($error)) {
              echo "<div>$error</div>";
            } else { ?>
              <select id="att-fgatest-mobatch-srt_data-folder" class="custom-select">
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
          <div class="card-body" id="att-fgatest-output"></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-header">Menu</div>
          <div class="card-body">
            <div class="mb-4 font-weight-bold bg-gradient p-3">
              <label for="customer">FGA List:</label>
              <select class="form-control form-control-lg" id="fga-name">
                <option value="L19Q1-E-183">L19Q1-E-183 [Rcs::tInactivityTimerBr:4]</option>
                <option value="L19Q1-E-185">L19Q1-E-185 [EUtranCellFDD::lastSchedLinkAdaptEnabled:false]</option>
                <option value="L19Q3-E-187">L19Q3-E-187 [SC109:5]</option>
              </select>
            </div>
            <button id="btn-att-fgatest-run" type="button" class="btn btn-lg btn-block">RUN-TEST</button>
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