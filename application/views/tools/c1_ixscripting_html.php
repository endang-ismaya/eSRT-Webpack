<?php
$form = [
    'site_id' => [
        'name'          => 'site_id',
        'id'            => 'site_id',
        'size'          => '30',
        'class'         => "form-control",
        'placeholder'   => 'Enter Site ID',
        'value'         => set_value('site_id', isset($form_value['site_id']) ? $form_value['site_id'] : '')
    ],
    'rbssummaryfile_revision' => [
        'name'  => 'rbssummaryfile_revision',
        'id'    => 'rbssummaryfile_revision',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('rbssummaryfile_revision', isset($form_value['rbssummaryfile_revision']) ? $form_value['rbssummaryfile_revision'] : 'G')
    ],
    'rbssummaryfile_licensingkeyfilepath' => [
        'name'          => 'rbssummaryfile_licensingkeyfilepath',
        'id'            => 'rbssummaryfile_licensingkeyfilepath',
        'size'          => '30',
        'class'         => 'form-control',
        'placeholder'   => 'Leave it blank if there is no LKF',
        'value'         => set_value('rbssummaryfile_licensingkeyfilepath', isset($form_value['rbssummaryfile_licensingkeyfilepath']) ? $form_value['rbssummaryfile_licensingkeyfilepath'] : '')
    ],
    'rbssummaryfile_upgradepackagefilepath' => [
        'name'  => 'rbssummaryfile_upgradepackagefilepath',
        'id'  => 'rbssummaryfile_upgradepackagefilepath',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('rbssummaryfile_upgradepackagefilepath', isset($form_value['rbssummaryfile_upgradepackagefilepath']) ? $form_value['rbssummaryfile_upgradepackagefilepath'] : 'Baseband_Radio_Node_UP_R5H54.zip')
    ],
    'sitebasic_ip_ntp_server_primary' => [
        'name'  => 'sitebasic_ip_ntp_server_primary',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_ntp_server_primary', isset($form_value['sitebasic_ip_ntp_server_primary']) ? $form_value['sitebasic_ip_ntp_server_primary'] : '10.20.10.100')
    ],
    'sitebasic_vlan_id_s1_x2_U_C' => [
        'name'  => 'sitebasic_vlan_id_s1_x2_U_C',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_vlan_id_s1_x2_U_C', isset($form_value['sitebasic_vlan_id_s1_x2_U_C']) ? $form_value['sitebasic_vlan_id_s1_x2_U_C'] : '58')
    ],
    'sitebasic_ip_s1_x2_U_C_Address' => [
        'name'  => 'sitebasic_ip_s1_x2_U_C_Address',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_s1_x2_U_C_Address', isset($form_value['sitebasic_ip_s1_x2_U_C_Address']) ? $form_value['sitebasic_ip_s1_x2_U_C_Address'] : '')
    ],
    'sitebasic_ip_s1_x2_U_C_Network_Mask' => [
        'name'  => 'sitebasic_ip_s1_x2_U_C_Network_Mask',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_s1_x2_U_C_Network_Mask', isset($form_value['sitebasic_ip_s1_x2_U_C_Network_Mask']) ? $form_value['sitebasic_ip_s1_x2_U_C_Network_Mask'] : '29')
    ],
    'sitebasic_ip_s1_x2_U_C_Default_Router' => [
        'name'  => 'sitebasic_ip_s1_x2_U_C_Default_Router',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_s1_x2_U_C_Default_Router', isset($form_value['sitebasic_ip_s1_x2_U_C_Default_Router']) ? $form_value['sitebasic_ip_s1_x2_U_C_Network_Mask'] : '')
    ],
    'sitebasic_vlan_id_oam' => [
        'name'  => 'sitebasic_vlan_id_oam',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_vlan_id_oam', isset($form_value['sitebasic_vlan_id_oam']) ? $form_value['sitebasic_vlan_id_oam'] : '51')
    ],
    'sitebasic_ip_oam_address' => [
        'name'  => 'sitebasic_ip_oam_address',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_oam_address', isset($form_value['sitebasic_ip_oam_address']) ? $form_value['sitebasic_ip_oam_address'] : '')
    ],
    'sitebasic_ip_oam_network_mask' => [
        'name'  => 'sitebasic_ip_oam_network_mask',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_oam_network_mask', isset($form_value['sitebasic_ip_oam_network_mask']) ? $form_value['sitebasic_ip_oam_network_mask'] : '29')
    ],
    'sitebasic_ip_oam_default_router' => [
        'name'  => 'sitebasic_ip_oam_default_router',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('sitebasic_ip_oam_default_router', isset($form_value['sitebasic_ip_oam_default_router']) ? $form_value['sitebasic_ip_oam_default_router'] : '')
    ],
    'siteequipment_config' => [
        'name'  => 'siteequipment_config',
        'id'    => 'siteequipment_config',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('siteequipment_config', isset($form_value['siteequipment_config']) ? $form_value['siteequipment_config'] : '')
    ],
    'enodebfunction_enodebid' => [
        'name'  => 'enodebfunction_enodebid',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('enodebfunction_enodebid', isset($form_value['enodebfunction_enodebid']) ? $form_value['enodebfunction_enodebid'] : '')
    ],
    'enodebfunction_mcc' => [
        'name'  => 'enodebfunction_mcc',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('enodebfunction_mcc', isset($form_value['enodebfunction_mcc']) ? $form_value['enodebfunction_mcc'] : '310')
    ],
    'enodebfunction_mnc' => [
        'name'  => 'enodebfunction_mnc',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('enodebfunction_mnc', isset($form_value['enodebfunction_mnc']) ? $form_value['enodebfunction_mnc'] : '320')
    ],
    'enodebfunction_mnclength' => [
        'name'  => 'enodebfunction_mnclength',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('enodebfunction_mnclength', isset($form_value['enodebfunction_mnclength']) ? $form_value['enodebfunction_mnclength'] : '3')
    ],
    'folderlist' => [
        'name'  => 'folderlist',
        'size'  => '30',
        'class' => 'form-control',
        'value' => set_value('folderlist', isset($form_value['folderlist']) ? $form_value['folderlist'] : '')
    ],
    'fddscripts' => [
        'name'  => 'fddscripts',
        'rows'  => '10',
        'class' => 'form-control',
        'id'    => 'fddscripts',
        'value' => set_value('fddscripts', isset($form_value['fddscripts']) ? $form_value['fddscripts'] : '')
    ]
];
?>

<!-- form start -->
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-4">
            <div class="card">
                <div class="card-header">
                    CellularOne_LTE_ATND_CIQ_All-Clusters-v17
                </div>
                <div class="card-body">
                <select id="c1-ipadresslist" class="custom-select" <?php echo $enodeb_selection; ?>>
                    <option selected>--Select eNodeB Name--</option>
                    <?php
                    if (isset($_POST['enodebnameid'])) {
                        $enodebnameid = $_POST['enodebnameid'];
                    } else {
                        $enodebnameid = '';
                    }
                    foreach ($ipAdressList as $eNodeBName => $ipData) {
                        if ($enodebnameid == $eNodeBName) {
                            echo '<option selected value="' . $eNodeBName . '">' . $eNodeBName . '</option>';
                        } else {
                            echo '<option value="' . $eNodeBName . '">' . $eNodeBName . '</option>';
                        }
                    } ?>
                </select>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <?php echo form_open($form_action, ['id' => 'myform']); ?>
            <input type="hidden" name="enodebnameid" value="<?php echo $enodebnameid; ?>">
            <fieldset id="ix-fieldset" <?php echo $disable_form; ?>>
                <div class="card">
                    <div class="card-header">RbsSummaryFile</div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <?php echo form_label('Site ID', 'site_id', ['class' => 'text-primary']); ?>
                                <?php echo form_input($form['site_id']); ?>
                                <?php echo form_error('site_id', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-1">
                                <?php echo form_label('Revision', 'rbssummaryfile_revision', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['rbssummaryfile_revision']); ?>
                                <?php echo form_error('rbssummaryfile_revision', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-4">
                                <?php echo form_label('licensingKeyFilePath', 'rbssummaryfile_licensingkeyfilepath', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['rbssummaryfile_licensingkeyfilepath']); ?>
                                <?php echo form_error('rbssummaryfile_licensingkeyfilepath', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-4">
                                <?php echo form_label('upgradePackageFilePath', 'rbssummaryfile_upgradepackagefilepath', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['rbssummaryfile_upgradepackagefilepath']); ?>
                                <?php echo form_error('rbssummaryfile_upgradepackagefilepath', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">SiteBasic</div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_NTP_Server_Primary', 'sitebasic_ip_ntp_server_primary', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_ntp_server_primary']); ?>
                                <?php echo form_error('sitebasic_ip_ntp_server_primary', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <?php echo form_label('VLAN_ID (s1,x2,U,C)', 'sitebasic_vlan_id_s1_x2_U_C', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_vlan_id_s1_x2_U_C']); ?>
                                <?php echo form_error('sitebasic_vlan_id_s1_x2_U_C', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_(s1,x2,U,C)_Address', 'sitebasic_ip_s1_x2_U_C_Address', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_s1_x2_U_C_Address']); ?>
                                <?php echo form_error('sitebasic_ip_s1_x2_U_C_Address', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_(s1,x2,U,C)_Network_Mask', 'sitebasic_ip_s1_x2_U_C_Network_Mask', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_s1_x2_U_C_Network_Mask']); ?>
                                <?php echo form_error('sitebasic_ip_s1_x2_U_C_Network_Mask', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_(s1,x2,U,C)_Default_Router', 'sitebasic_ip_s1_x2_U_C_Default_Router', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_s1_x2_U_C_Default_Router']); ?>
                                <?php echo form_error('sitebasic_ip_s1_x2_U_C_Default_Router', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <?php echo form_label('VLAN_ID (OAM)', 'sitebasic_vlan_id_oam', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_vlan_id_oam']); ?>
                                <?php echo form_error('sitebasic_vlan_id_oam', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_(OAM)_Address', 'sitebasic_ip_oam_address', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_oam_address']); ?>
                                <?php echo form_error('sitebasic_ip_oam_address', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_(OAM)_Network_Mask', 'sitebasic_ip_oam_network_mask', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_oam_network_mask']); ?>
                                <?php echo form_error('sitebasic_ip_oam_network_mask', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-3">
                                <?php echo form_label('IP_(OAM)_Default_Router', 'sitebasic_ip_oam_default_router', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['sitebasic_ip_oam_default_router']); ?>
                                <?php echo form_error('sitebasic_ip_oam_default_router', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">SiteEquipment</div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <?php echo form_label('Config Selection:', 'siteequipment_config', ['class' => 'text-secondary']); ?>
                                <?php echo form_dropdown('siteequipment_config', $siteequipment_config, isset($form_value['siteequipment_config']) ? $form_value['siteequipment_config'] : '', ['class' => 'form-control']); ?>
                                <?php echo form_error('siteequipment_config', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">ENodeBFunction</div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-md-1">
                                <?php echo form_label('eNodeBId', 'enodebfunction_enodebid', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['enodebfunction_enodebid']); ?>
                                <?php echo form_error('enodebfunction_enodebid', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-1">
                                <?php echo form_label('MCC', 'enodebfunction_mcc', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['enodebfunction_mcc']); ?>
                                <?php echo form_error('enodebfunction_mcc', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-1">
                                <?php echo form_label('MNC', 'enodebfunction_mnc', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['enodebfunction_mnc']); ?>
                                <?php echo form_error('enodebfunction_mnc', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-1">
                                <?php echo form_label('mncLength', 'enodebfunction_mnclength', ['class' => 'text-secondary']); ?>
                                <?php echo form_input($form['enodebfunction_mnclength']); ?>
                                <?php echo form_error('enodebfunction_mnclength', '<p class="text-danger">', '</p>'); ?>
                            </div>
                            <div class="form-group col-md-8">
                                <?php echo form_label('Please select your destination folder:', 'folderlist', ['class' => 'text-primary']); ?>
                                <?php echo form_dropdown('folderlist', $folderlist, isset($form_value['folderlist']) ? $form_value['folderlist'] : '', ['class' => 'form-control']); ?>
                                <?php echo form_error('folderlist', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">EUtranCellFDD</div>
                    <div class="card-body">
                        <p class="text-info">Please select your EUtranCellFDD(s) and then click '<span class="text-danger">Apply</span>'</p>
                        <div class="form-row">
                            <div class="form-group col-md-1" id="initFDD700"></div>
                            <div class="form-group col-md-1" id="initFDD1900"></div>
                            <div class="form-group col-md-10" id="initFDDArea">
                                <p id="p-check" hidden><input type="checkbox" id="checkAll"/><label id="lbl-check"> Check all</label></p>
                                <button id="c1-apply-fdd" type="button" class="btn btn-outline-dark">Apply</button><br><br>
                                <?php echo form_label('EUtranCellFDD Scripts', 'fddscripts', ['class' => 'text-secondary']); ?>
                                <?php echo form_textarea($form['fddscripts']); ?>
                                <?php echo form_error('fddscripts', '<p class="text-danger">', '</p>'); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <input type="submit" id="submit" name="submit" value="Validate" class="btn btn-info" <?php echo $hidden_submit; ?>>
            </fieldset>
            <?php echo form_close(); ?>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <button id="c1-ix-script1-to-5" name="ajax-submit" type="button" class="btn btn-info" <?php echo $hidden_btn; ?>>Create Script</button>
            <button id="c1-ix-cancel" name="ajax-cancel" type="button" class="btn btn-warning" <?php echo $hidden_cancel; ?>>Cancel</button>
            <div><label id="json-file-result" for="json-file" hidden><?php echo $jsonFileResult; ?></label></div>
            <br>
            <div class="card">
                <div class="card-header">Report</div>
                <div class="card-body">
                    <pre id="output-result" class="output-result"></pre>
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
<!-- form end -->