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
            <select id="att-base-folder" class="custom-select">
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
          <div id="r-output"></div>
        </div>
      </div>
    </div>
    <label class="col-sm-3">
      <label class="card">
        <div class="card-header">Menu</div>
        <div class="card-body">
          <button id="btn-nbiot-get-current" type="button" class="btn btn-lg btn-block mr-3">Get NbIotCell</button>
          <button id="btn-nbiot-create-script" type="button" class="btn btn-lg btn-block mr-3">Create NbIotCell Script</button>
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