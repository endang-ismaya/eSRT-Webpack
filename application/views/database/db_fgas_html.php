<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6">
      <p class="text-danger">* Required an internet connection to preview the pdf file</p>
      <p class="text-danger">* A login to Yupana's email on the same browser is required</p>
      <h4>FGAs</h4>
      <?php
      $latestDocs = file_get_contents(base_url('/json/fgalist.json'));
      $json_latestDocs = json_decode($latestDocs, true);
      foreach ($json_latestDocs["fgas"] as $fgaNum => $fgaLink) {
      ?>
          <button type="button" class="btn btn-outline-primary fgabtn"><?php echo $fgaNum?></button>
      <?php } ?>
      <hr class="my-4">
      <h4>Notifications</h4>
      <?php
      $latestDocs = file_get_contents(base_url('/json/fgalist.json'));
      $json_latestDocs = json_decode($latestDocs, true);
      foreach ($json_latestDocs["notifications"] as $fgaNum => $fgaLink) {
      ?>
          <button type="button" class="btn btn-outline-primary fganotifbtn"><?php echo $fgaNum?></button>
      <?php } ?>
    </div>
    <div id="fgaDisplay" class="col-sm-6"></div>
  </div>
</div>
<div id="btm-x" style="margin-bottom: 150px"></div>