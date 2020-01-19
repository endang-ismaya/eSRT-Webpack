<div class="container-fluid">
	<div class="row">
		<div class="col"></div>
		<div class="col-6">
			<div class="form-group row">
				<input type="text" class="form-control" id="inputTitle" placeholder="Please enter your project name here...">
			</div>
		</div>
		<div class="col"></div>
	</div>
	<div id="folderPrePost" class="row">
		<div class="col-sm-10">
			<div class="row mb-3">
				<div id="box-Post" class="col-sm-6">
					<div class="card">
						<div class="card-header">Post-Dump</div>
						<div class="card-body">
							<div>
								<?php
                if (isset($error)) {
                    echo "<div>$error</div>";
                } else { ?>
								<select id="PostFolderPath" class="custom-select mr-2">
									<option selected>--Post Folder--</option>
									<?php
                        while ($result = $stmt2->fetch()) {
                            echo '<option value="' . $result['folderpath'] . '">' . $result['folderpath'] . '</option>';
                        } ?>
								</select>
								<?php } ?>
							</div>
							<div id="filesPost"></div>
						</div>
					</div>
				</div>
				<div id="box-Pre" class="col-sm-6">
					<div class="card">
						<div class="card-header">Pre-Dump</div>
						<div class="card-body">
							<div>
								<?php
                if (isset($error)) {
                    echo "<div>$error</div>";
                } else { ?>
								<select id="PreFolderPath" class="custom-select mr-2">
									<option selected>--Pre Folder--</option>
									<?php
                        while ($result = $stmt->fetch()) {
                            echo '<option value="' . $result['folderpath'] . '">' . $result['folderpath'] . '</option>';
                        } ?>
								</select>
								<?php } ?>
							</div>
							<div id="filesPre"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="row mb-2">
				<div class="col-md-6">
					<div class="form-inline mb-2">
						<label class="my-1 mr-2" for="replaceRelation"> MO Relation: </label>
						<button id="btnReplaceRelationClear" class="btn btn-sm btn-danger ml-auto">Clear</button>
					</div>
					<textarea class="form-control" name="tAreaReplaceRelation" id="tAreaReplaceRelation" rows="5" placeholder="CLL03029_2B_1=>CLL23029_2B_1|310410-553029-23=>310410-558226-23"></textarea>
				</div>
				<div class="col-md-6">
					<div class="form-inline mb-2">
						<label class="my-1 mr-2" for="replaceFeatureState"> MO FeatureState: </label>
						<section class="ml-auto">
							<button id="btnInputFeatureStateDefault" class="btn btn-sm btn-primary">Default</button>
							<button id="btnInputFeatureStateClear" class="btn btn-sm btn-danger">Clear</button>
						</section>
					</div>
					<textarea class="form-control" name="tAreaReplaceFeatureState" id="tAreaReplaceFeatureState" rows="5" placeholder="SystemFunctions=1,Lm=1,FeatureState=CXC4010319=>SystemFunctions=1,Licensing=1,OptionalFeatureLicense=Irc|SystemFunctions=1,Lm=1,FeatureState=CXC4010320=>SystemFunctions=1,Licensing=1,OptionalFeatureLicense=AdvCellSup"></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-md-10">
					<div class="form-group">
						<label for="inputCompare">JSON Result</label>
						<textarea class="form-control bg-primary text-white" name="inputCompare" id="inputCompare" rows="15"></textarea>
					</div>
				</div>
				<div class="col-md-2">
					<div style="margin-top: 50%;">
						<button id="btnGenerateJSON" class="btn btn-lg btn-primary btn-block">Generate JSON</button>
						<button id="btnGenerateJSONClear" class="btn btn-lg btn-danger btn-block">Clear</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<pre id="output-result" class="output-result"></pre>
				</div>
			</div>
		</div>
		<div class="col-sm-2">
			<div class="card">
				<div class="card-header">Menu</div>
				<div class="card-body">
					<button id="btnRunCompare" type="button" class="btn btn-lg btn-block">Run</button>
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
<div id="btm-x" style="margin-bottom: 50px"></div>
