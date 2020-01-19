<div class="container-fluid">
	<div class="row">
		<div id="box1" class="col-md-8">
			<?php
	        if (isset($error)) {
	            echo "<div>$error</div>";
	        } else { ?>
			<div class="alert alert-warning" role="alert">No worksheet found!</div>
			<div class="card">
				<div class="card-header">Excel file</div>
				<div class="card-body">
					<select id="folderPath-c1relations" class="custom-select">
						<option selected>--Select File--</option>
						<?php
	            while ($row = $stmt->fetch()) {
	                echo '<option value="' . $row['folderpath'] . '">' . $row['folderpath'] . '</option>';
	            } ?>
					</select>
					<?php } ?>
				</div>
			</div>
			<br>
			<div class="card">
				<div class="card-header">Report</div>
				<div class="card-body">
					<pre id="output-result" class="output-result"></pre>
				</div>
			</div>
		</div>
		<div id="box1" class="col-md-4">
			<div class="card">
				<div class="card-header">Menu</div>
				<div class="card-body">
					<button id="c1-relations-createtemplate" type="button" class="btn btn-info alignme-btn mb-3">1. Create Relation's Template</button><br>
					<button id="c1-700-celldata" type="button" class="btn btn-info alignme-btn mb-3">2. Update 700's EUtranParameters</button><br>
					<button id="c1-1900-celldata" type="button" class="btn btn-info alignme-btn mb-3">3. Update 1900's EUtranParameters</button>
				</div>
			</div>
			<div class="card mt-3">
				<div class="card-header">How To</div>
				<div class="card-body">
					<ul>
						<li class="text-secondary">Make sure the Excel's Absolute path is without any spaces</li>
						<li class="text-secondary">Add Excel file with PathLocator</li>
						<li class="text-secondary">Select the Excel file</li>
						<li class="text-secondary">Select <span class="highlighted">'Menus'</span></li>
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
<div id="btm-x" style="margin-bottom: 150px"></div>