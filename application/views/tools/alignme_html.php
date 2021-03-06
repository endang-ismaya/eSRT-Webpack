<section>
  <div class="container-fluid">
    <div class="row">
      <div id="box1" class="col-md-9">
        <div class="card mb-3">
          <div class="card-header bg-light py-2"><span class="text-primary font-weight-bold">GS FILE</span> <i class="fas fa-file-excel float-right fa-2x text-success"></i></div>
          <div class="card-body bg-gradient">
            <div class="alert alert-warning" role="alert">File not exist!</div>
            <?php
            if (isset($error)) {
              echo "<div>$error</div>";
            } else { ?>
              <select id="folderPath-alignme" class="custom-select">
                <option selected>--Select File--</option>
                <?php
                while ($row = $stmt->fetch()) {
                  echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
                } ?>
              </select>
            <?php } ?>
          </div>
        </div>
        <div class="card mb-2">
          <div class="card-header bg-light py-2"><span class="text-primary font-weight-bold">GS TABLE</span> <i class="fas fa-table float-right fa-2x text-info"></i></div>
          <div class="card-body bg-gradient">
            <div id="alignMe-worksheet" class="m-0 p-0"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header bg-light py-2"><span class="text-primary font-weight-bold">REPORT</span> <i class="fas fa-file-signature float-right fa-2x text-primary"></i></div>
          <div class="card-body p-0 bg-gradient">
            <pre id="output-result" class="output-result my-1 mx-2"></pre>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-header bg-light"><span class="text-primary font-weight-bold">ACTION</span> <i class="fas fa-location-arrow text-warning"></i></div>
          <div class="card-body bg-gradient">
            <div class="mb-4 font-weight-bold bg-gradient p-3">
              <label for="customer">Customer:</label>
              <select class="form-control form-control-lg" id="customer">
                <option value="ATT">AT&T</option>
                <option value="C1">Cellular One</option>
                <option value="ROGERS">Rogers</option>
              </select>
            </div>
            <button id="btn-alignme-validate" type="button" class="btn btn-block">Validate</button>
            <button id="btn-alignme-createscript-att" type="button" class="btn btn-block">Create Script</button>
          </div>
        </div>
        <div class="card mt-3">
          <div class="card-header bg-light"><span class="text-primary font-weight-bold">BEST PRACTICE</span></div>
          <div class="card-body bg-gradient">
            <ul>
              <li class="text-secondary">Make sure the Excel's Absolute path is without any spaces</li>
              <li class="text-secondary">Make sure the Worksheet's name is without any spaces</li>
              <li class="text-secondary">Always put the correct Node (BBU / DUS)</li>
              <li class="text-secondary">
                Always put the correct SW Version
                (to align with database such as FileTakeEffect, EricssonOnly, etc )
              </li>
              <li class="text-secondary">Always remove un-used worksheet</li>
              <li class="text-secondary">
                Do a <span class="highlighted">'Validate'</span> before Creating Script</li>
            </ul>
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
  <!-- <div id="btm-x" style="margin-bottom: 150px"></div> -->