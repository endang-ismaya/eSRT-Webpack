<!-- Error Page -->
<?php if (isset($error)) : ?>
  <p> <?php echo $error; ?> </p>
<?php else : ?>
  <div class="container-fluid">
    <div class="row">
      <div class="col"></div>
      <div class="col-md-10">
        <nav aria-label="Page navigation example mb-5">
          <?php echo $paginators; ?>
        </nav>
        <ul class="list-group mt-5">
          <?php foreach ($files as $file) : ?>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <?php echo htmlspecialchars($file['filetype'] . ': ' . $file['folderpath'], ENT_QUOTES, 'UTF-8'); ?>
              <span>
                <?php echo anchor('databasefilelocator/delete/' . $file['no'], 'Delete', ['class' => 'badge badge-warning badge-pill']); ?>
              </span>
            </li>
          <?php endforeach; ?>
        </ul>
        <p class="h5 p-1 text-light bg-success text-center">
          <?php echo $totalFiles ?>
          File/Folder have been submitted to the Database.
        </p>
      </div>
      <div class="col"></div>
    </div>
  </div>
<?php endif; ?>