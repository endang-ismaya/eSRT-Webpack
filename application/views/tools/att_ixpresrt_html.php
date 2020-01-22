<div class="container-fluid">
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-sm-7">
      <div class="alert alert-warning" role="alert">
        <ul></ul>
      </div>
      <div class="card mb-2 bg-gradient">
        <div class="card-header">MARKET <i class="fas fa-map-marked-alt float-right fa-2x"></i></div>
        <div class="card-body">
          <select id="optMarket-presrt" class="custom-select w-25">
            <option selected>--Select market--</option>
            <?php
            foreach ($stmtMarket as $key => $value) {
              echo '<option value="' . $key . '">' . $value . '</option>';
            }
            ?>
          </select>
        </div>
      </div>
      <div class="card mb-2 bg-gradient">
        <div class="card-header">MODUMP FOLDER <i class="fas fa-folder-open float-right fa-2x"></i></div>
        <div class="card-body">
          <?php
          if (isset($error)) {
            echo "<div>$error</div>";
          } else { ?>
            <select id="folderPath-presrt" class="custom-select">
              <option selected>--Select folder--</option>
              <?php
              while ($row = $stmt->fetch()) {
                echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
              } ?>
            </select>
          <?php } ?>
        </div>
      </div>
      <div class="card mb-2 bg-gradient">
        <div class="card-header">CIQ</div>
        <div class="card-body">
          <?php
          if (isset($error)) {
            echo "<div>$error</div>";
          } else { ?>
            <select id="ciqPath-presrt" class="custom-select">
              <option selected>--Select file--</option>
              <?php
              while ($row = $stmtFile->fetch()) {
                echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
              } ?>
            </select>
          <?php } ?>
        </div>
      </div>
      <div class="card bg-gradient">
        <div class="card-header">REPORT <i class="fas fa-file-signature float-right fa-2x"></i></div>
        <div class="card-body">
          <pre id="output-result" class="output-result"></pre>
          <div id="celldata-result"></div>
        </div>
      </div>
    </div>
    <div class="col-md-2">
      <div class="card bg-gradient">
        <div class="card-header">ACTION <i class="fas fa-location-arrow"></i></div>
        <div class="card-body">
          <button id="btnATTIXGetcelldata" type="button" class="btn btn-lg btn-block">Get Cell Data</button>
          <button id="btnATTIXExistingrelation" type="button" class="btn btn-lg btn-block">Create Existing Relations</button>
          <button id="btnATTIXSystemconstants" type="button" class="btn btn-lg btn-block">Create Existing SystemConstants</button>
          <button id="btnATTIXNBIotCell" type="button" class="btn btn-lg btn-block">Create NBIotCell</button>
        </div>
      </div>
      <div class="card mt-2 bg-gradient">
        <div class="card-header mb-0">
          RATFREQPRIO <i class="fas fa-location-arrow"></i>
        </div>
        <div class="card-body">
          <button id="btnRatFreqPrio-01" type="button" class="btn btn-lg btn-block">Non B30 & Non B14</button>
          <button id="btnRatFreqPrio-02" type="button" class="btn btn-lg btn-block">B30 & Non B14</button>
          <button id="btnRatFreqPrio-03" type="button" class="btn btn-lg btn-block">NSB & B14</button>
          <button id="btnRatFreqPrio-04" type="button" class="btn btn-lg btn-block">Create Existing RATFreqPrio</button>
          <button id="btnRatFreqPrio-05" type="button" class="btn btn-lg btn-block">Existing B14 Carrier & Add Carrier non_B14</button>
          <button id="btnRatFreqPrio-06" type="button" class="btn btn-lg btn-block">Existing Carrier & Add B14 Carrier</button>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
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