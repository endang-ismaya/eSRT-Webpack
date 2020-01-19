<?php
//phpcs:disable

$form = [
    'cygwin_user' => [
        'name' => 'cygwin_user',
        'size' => '30',
        'class' => 'form-control',
        'value' => set_value('cygwin_user', isset($form_value['cygwin_user']) ? $form_value['cygwin_user'] : '')
    ],
    'user_login' => [
        'name' => 'user_login',
        'size' => '30',
        'class' => 'form-control',
        'value' => set_value('user_login', isset($form_value['user_login']) ? $form_value['user_login'] : '')
    ],
    'password_login' => [
        'name'  => 'password_login',
        'size'  => '30',
        'class' => 'form-control',
        'type'  => 'password',
        'value' => set_value('password_login', isset($form_value['password_login']) ? $form_value['password_login'] : '')
    ],
    'submit' => [
        'name'  => 'submit',
        'id'    => 'submit',
        'value' => 'Save',
        'type'  => 'submit',
        'class' => 'btn btn-primary'
    ],
    'cancel' => [
        'name'  => 'cancel',
        'id'    => 'cancel',
        'value' => 'Cancel',
        'type'  => 'submit',
        'class' => 'btn btn-warning'
    ]
];

?>

<!-- form start -->
<div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
        <?php echo form_open($form_action); ?>
            <div class="form-group">
                <?php echo form_label('User Login', 'user_login'); ?>
                <?php echo form_input($form['user_login']); ?>
                <?php echo form_error('user_login', '<p class="text-danger">', '</p>'); ?>
            </div>
            <div class="form-group">
                <?php echo form_label('User Password', 'password_login'); ?>
                <?php echo form_input($form['password_login']); ?>
                <?php echo form_error('password_login', '<p class="text-danger">', '</p>'); ?>
            </div>
            <div class="form-group">
                <?php echo form_label('Cygwin User', 'cygwin_user'); ?>
                <?php echo form_input($form['cygwin_user']); ?>
                <?php echo form_error('cygwin_user', '<p class="text-danger">', '</p>'); ?>
            </div>
            <?php echo form_submit($form['submit']); ?>
            <?php echo form_submit($form['cancel']); ?>
        <?php echo form_close(); ?>
    </div>
    <div class="col-md-4"></div>
</div>
<!-- form end -->