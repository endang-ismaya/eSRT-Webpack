<div class="container-fluid">
  <div class="row">
    <div class="col-sm-9">
      <div class="alert alert-warning" role="alert">
        <ul></ul>
      </div>
      <div class="card mb-2">
        <div class="card-header">Market</div>
        <div class="card-body">
          <select id="optMarket-presrt" class="custom-select w-25">
            <option selected>--Select Market--</option>
            <?php
            foreach ($stmtMarket as $key => $value) {
              echo '<option value="' . $key . '">' . $value . '</option>';
            }
            ?>
          </select>
        </div>
      </div>
      <div class="card mb-2">
        <div class="card-header">Modump's folder</div>
        <div class="card-body">
          <?php
            if (isset($error)) {
              echo "<div>$error</div>";
            } else { ?>
            <select id="folderPath-presrt" class="custom-select">
              <option selected>--Select Folder--</option>
              <?php
              while ($row = $stmt->fetch()) {
                echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
              } ?>
            </select>
          <?php } ?>
        </div>
      </div>
      <div class="card mb-2">
        <div class="card-header">CIQ</div>
        <div class="card-body">
          <?php
            if (isset($error)) {
              echo "<div>$error</div>";
            } else { ?>
            <select id="ciqPath-presrt" class="custom-select">
              <option selected>--Select File--</option>
              <?php
              while ($row = $stmtFile->fetch()) {
                echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
              } ?>
            </select>
          <?php } ?>
        </div>
      </div>
      <div class="card">
        <div class="card-header">Report</div>
        <div class="card-body">
          <pre id="output-result" class="output-result"></pre>
          <div id="celldata-result"></div>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card">
        <div class="card-header">Menu</div>
        <div class="card-body">
          <button id="btnATTIXGetcelldata" type="button" class="btn btn-lg btn-block">Get Cell Data</button>
          <button id="btnATTIXExistingrelation" type="button" class="btn btn-lg btn-block">Create Existing Relations</button>
          <button id="btnATTIXSystemconstants" type="button" class="btn btn-lg btn-block">Create Existing SystemConstants</button>
          <button id="btnATTIXNBIotCell" type="button" class="btn btn-lg btn-block">Create NBIotCell</button>
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