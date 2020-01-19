<?php
//phpcs:disable
// Turn off error reporting
// error_reporting(0);
// Report all errors
// error_reporting(E_ALL);

// if ($message == '' && $success == '') {
//     include 'error.php';
//     die();
// }
?>
<?php if ($message != '') :?>
<div class="message">
    <p>
        <span class="msg-item">Message:</span>
        <span class="msg-info"><?php echo $message ?></span>
    </p>
    <p>
        <span class="msg-item">Error:</span>
        <span class="msg-info"><?php echo $error ?></span>
    </p>
    <p>
        <span class="msg-item">Filename:</span>
        <span class="msg-info"><?php echo $filename ?></span>
    </p>
</div>
<?php else: ?>
<div class="message">
    <p>
        <span class="msg-item"><?php echo $success ?></span>
    </p>
</div>
<?php endif; ?>