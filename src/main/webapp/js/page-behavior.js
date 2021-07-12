$(document).ready( function() {
    updatePage();
});

$(':input[type="number"]').on('input', function() {
    console.log("Number field updated");
    updatePage();
});

