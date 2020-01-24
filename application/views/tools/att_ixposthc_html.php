<div class="container-fluid">
  <div class="row">
    <div class="col-md-1"></div>
    <div id="box1" class="col-md-8">
      <div class="alert alert-warning" role="alert"> Invalid Input!, Please check if Directory exist. </div>
      <div class="card bg-gradient mb-2">
        <div class="card-header py-2"><span class="font-weight-bold text-primary">MODUMP FOLDER </span> <i class="fas fa-folder-open float-right fa-2x"></i></div>
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
      <div class="card bg-gradient">
        <div class="card-header"><span class="font-weight-bold text-primary">REPORT </span> <i class="fas fa-file-signature float-right fa-2x text-info"></i></div>
        <div id="body-report" class="p-0">
          <pre id="output-result" class="output-result my-1 mx-2"></pre>
        </div>
      </div>
    </div>
    <div class="col-sm-2">
      <div class="card">
        <div class="card-header"><span class="font-weight-bold text-primary">ACTION </span> <i class="fas fa-location-arrow"></i></div>
        <div class="card-body">
          <button id="posthc-run" type="button" class="btn btn-lg btn-block"> Create HealthCheck.log </button>
          <button id="posthc-read" type="button" class="btn btn-lg btn-block btn-primary"> Read Health Check </button>
        </div>
      </div>
      <div class="accordion" id="accordionExample">
        <div class="card mt-3">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                HealtCheck List
              </button>
            </h2>
          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <h5 class="text-success">MME</h5>
              <ul class="mb-3">
                <li>Check if status UNLOCKED & ENABLED</li>
                <li>Count 14 Mos</li>
                <li>Check if the registered Termpoints are defined</li>
              </ul>
              <h5 class="text-success">DiffAdmCtrlFilteringProfile</h5>
              <ul class="mb-3">
                <li>Check if MO is defined</li>
                <li>Check if all EUtranCellFDD has its reference</li>
              </ul>
              <h5 class="text-success">MeasCellGroup</h5>
              <ul class="mb-3">
                <li>Check All EUtranCellFDD should not have any reference(L18Q3)</li>
              </ul>
              <h5 class="text-success">measCellGroupUeRef</h5>
              <ul class="mb-3">
                <li>Check if FNET has <em>MeasCellGroup=1</em></li>
                <li>Check if NON_FNET has no <em>MeasCellGroup=1</em></li>
              </ul>
              <h5 class="text-success">SystemConstant</h5>
              <ul class="mb-3">
                <li>Check if SystemConstant is not empty</li>
                <li>Check if MISSING or EXTRA SC found</li>
                <li>Add logic for L19Q1 if catm1SupportEnabled is enabled</li>
              </ul>
              <h5 class="text-success">UlCompGroup</h5>
              <ul class="mb-3">
                <li>Check if UlCompGroup is defined for non DL-ONLY</li>
                <li>Check if UlCompGroup is not-defined for DL-ONLY</li>
              </ul>
              <h5 class="text-success">PmFlexCounterFilter</h5>
              <ul class="mb-3">
                <li>Check if PmFlexCounterFilter is defined</li>
                <li>Check if PmFlexCounterFilter for <strong>L18Q3 = 16 MOs, L18Q4 = 24 MOs</strong></li>
              </ul>
              <h5 class="text-success">PrefTrafficMgmt<span class="badge badge-pill badge-danger ml-1 text-small">Updated</span></h5>
              <ul class="mb-3">
                <li>Check if PrefTrafficMgmt is not defined on each EUtranCellFDD</li>
              </ul>
              <h5 class="text-success">LinkBudget</h5>
              <ul class="mb-3">
                <li>Check if LinkBudget values consist of -1</li>
              </ul>
              <h5 class="text-success">rfBranch</h5>
              <ul class="mb-3">
                <li>Check if rfBranchRxRef & rfBranchTxRef are set for 4x4 Configuration</li>
              </ul>
              <h5 class="text-success">auPortRef</h5>
              <ul class="mb-3">
                <li>Check any missing AuPort Reference</li>
              </ul>
              <h5 class="text-success">RATFreqPrio</h5>
              <ul class="mb-3">
                <li>Check for FNET USID, RATFreqPrio = 4 and all earfcnDl USID defined</li>
                <li>Check for NON FNET USID, RATFreqPrio = 1 and all earfcnDl USID defined</li>
              </ul>
              <h5 class="text-success">CVLS</h5>
              <ul class="mb-3">
                <li>Check for FGA implementation</li>
              </ul>
              <h5 class="text-success">OTDOA</h5>
              <ul class="mb-3">
                <li>Verify OTDOA Implementation</li>
              </ul>
              <h5 class="text-success">TermPointToENB</h5>
              <ul class="mb-3">
                <li>Verify any disabled TermPointToENB</li>
              </ul>
              <h5 class="text-success">BbLink</h5>
              <ul class="mb-3">
                <li>Verify if BbLink defined</li>
              </ul>
              <h5 class="text-success">PlmnAbConfProfile</h5>
              <ul class="mb-3">
                <li>Verify if EUtranCellFDD has plmn1AbConfProfileRef & plmn2AbConfProfileRef</li>
              </ul>
              <h5 class="text-success">PtmFunction</h5>
              <ul class="mb-3">
                <li>Verify if PtmFunction and children mo are defined</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-1"></div>
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
</div>