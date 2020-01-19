<div class="container-fluid">
  <div class="row">
    <div id="box1" class="col-sm-9">
      <div class="alert alert-warning" role="alert"> Invalid Input!, Please check if Directory exist. </div>
      <div class="card mb-2">
        <div class="card-header"> Modump folder </div>
        <div class="card-body">
          <?php
          if (isset($error)) {
            echo "<div>$error</div>";
          } else { ?>
            <select id="kgutsFolderPath" class="custom-select">
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
          <pre id="output-result" class="output-result"></pre>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card">
        <div class="card-header">Menu</div>
        <div class="card-body">
          <button id="kguts-textParser" type="button" class="btn btn-lg btn-block">Parse to TEXT (srtvba)</button>
          <button id="kguts-jsonParser" type="button" class="btn btn-lg btn-block">Parse to JSON</button>
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