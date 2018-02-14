/**
 * Created by jahir on 6/29/17.
 */
$(function () {
    $(window).on('load', function () {
        // Scroll to right section
        var hash = location.hash.replace('#', '');
        if (hash !== '') {
            scrollToItem(hash)
        }
        // Make some items same height as others
        $('.of-same-height').matchHeight();
        /*
        setTimeout(function () {

            $('#portfolio-all-button').click();
        }, 500); */

        // Init Isotope
        var iso = new Isotope('.grid', {
            itemSelector: '.portfolio-item',
            layoutMode: 'masonry'
        });
        iso.arrange({filter: '*'});
        // bind filter button click
        var filtersElem = document.querySelector('.filters-button-group');
        filtersElem.addEventListener('click', function (event) {
            // only work with buttons
            if (!matchesSelector(event.target, 'button')) {
                return;
            }
            $(".filter-button").each(function () {
                $(this).removeClass("active");
            });
            $(event.target).addClass("active");
            var filterValue = event.target.getAttribute('data-filter');
            var realFilter = filterValue === 'all' ? '*' : ('.' + filterValue);
            iso.arrange({filter: realFilter});
        });
        iso.arrange({filter: '*'});
    });
});