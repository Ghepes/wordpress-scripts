jQuery(document).ready(function($) {
    var currentCssIndex = 0;
    var currentJsIndex = 0;

    function showNextCssRow() {
        var rows = $('#css-table .css-row');
        if (currentCssIndex < rows.length) {
            $(rows[currentCssIndex]).show();
            currentCssIndex++;
        }
    }

    function showNextJsRow() {
        var rows = $('#js-table .js-row');
        if (currentJsIndex < rows.length) {
            $(rows[currentJsIndex]).show();
            currentJsIndex++;
        }
    }

    $('#add-css').on('click', function() {
        showNextCssRow();
    });

    $('#add-js').on('click', function() {
        showNextJsRow();
    });

    // Show the first row initially
    showNextCssRow();
    showNextJsRow();
});
