var App = function () {

    /* Helper variables - set in uiInit() */
    var page, pageContent, header, footer, sidebar, sidebarAlt, sScroll;

    /* Initialization UI Code */
    var uiInit = function () {

        // Set variables - Cache some often used Jquery objects in variables */
        page = $('#page-container');
        pageContent = $('#page-content');
        header = $('header');
        footer = $('#page-content + footer');
        sidebar = $('#sidebar');
        sidebarAlt = $('#sidebar-alt');
        sScroll = $('.sidebar-scroll');

        // Initialize sidebars functionality
        handleSidebar('init');

        // Sidebar navigation functionality
        handleNav();
        // Resize #page-content to fill empty space if exists (also add it to resize and orientationchange events)
        resizePageContent();
        $(window).resize(function () {
            resizePageContent();
        });
        $(window).bind('orientationchange', resizePageContent);

        // Add the correct copyright year at the footer
        var yearCopy = $('#year-copy'), d = new Date();
        if (d.getFullYear() === 2014) {
            yearCopy.html('2014');
        } else {
            yearCopy.html('2014-' + d.getFullYear().toString().substr(2, 2));
        }

        // Initialize tabs
        $('[data-toggle="tabs"] a, .enable-tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

        // Initialize Tooltips
        $('[data-toggle="tooltip"], .enable-tooltip').tooltip({
            container: 'body',
            animation: false
        });

        // Initialize Popovers
        $('[data-toggle="popover"], .enable-popover').popover({
            container: 'body',
            animation: true
        });
    };

    /* Gets window width cross browser */
    var getWindowWidth = function () {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    };

    /* Sidebar Navigation functionality */
    var handleNav = function () {

        // Animation Speed, change the values for different results
        var upSpeed = 250;
        var downSpeed = 250;

        // Get all vital links
        var menuLinks = $('.sidebar-nav-menu');
        var submenuLinks = $('.sidebar-nav-submenu');

        // Primary Accordion functionality
        menuLinks.click(function () {
            var link = $(this);

            if (link.parent().hasClass('active') !== true) {
                if (link.hasClass('open')) {
                    link.removeClass('open').next().slideUp(upSpeed, function () {
                        handlePageScroll(link, 200, 300);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, upSpeed);
                }
                else {
                    $('.sidebar-nav-menu.open').removeClass('open').next().slideUp(upSpeed);
                    link.addClass('open').next().slideDown(downSpeed, function () {
                        handlePageScroll(link, 150, 600);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, ((upSpeed > downSpeed) ? upSpeed : downSpeed));
                }
            }

            return false;
        });

        // Submenu Accordion functionality
        submenuLinks.click(function () {
            var link = $(this);

            if (link.parent().hasClass('active') !== true) {
                if (link.hasClass('open')) {
                    link.removeClass('open').next().slideUp(upSpeed, function () {
                        handlePageScroll(link, 200, 300);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, upSpeed);
                }
                else {
                    link.closest('ul').find('.sidebar-nav-submenu.open').removeClass('open').next().slideUp(upSpeed);
                    link.addClass('open').next().slideDown(downSpeed, function () {
                        handlePageScroll(link, 150, 600);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, ((upSpeed > downSpeed) ? upSpeed : downSpeed));
                }
            }

            return false;
        });
    };

    /* Scrolls the page (static layout) or the sidebar scroll element (fixed header/sidebars layout) to a specific position - Used when a submenu opens */
    var handlePageScroll = function (sElem, sHeightDiff, sSpeed) {
        if (!page.hasClass('disable-menu-autoscroll')) {
            var elemScrollToHeight;

            // If we have a static layout scroll the page
            if (!header.hasClass('navbar-fixed-top') && !header.hasClass('navbar-fixed-bottom')) {
                var elemOffsetTop = sElem.offset().top;

                elemScrollToHeight = (((elemOffsetTop - sHeightDiff) > 0) ? (elemOffsetTop - sHeightDiff) : 0);

                $('html, body').animate({scrollTop: elemScrollToHeight}, sSpeed);
            } else { // If we have a fixed header/sidebars layout scroll the sidebar scroll element
                var sContainer = sElem.parents('.sidebar-scroll');
                var elemOffsetCon = sElem.offset().top + Math.abs($('div:first', sContainer).offset().top);

                elemScrollToHeight = (((elemOffsetCon - sHeightDiff) > 0) ? (elemOffsetCon - sHeightDiff) : 0);
                sContainer.animate({scrollTop: elemScrollToHeight}, sSpeed);
            }
        }
    };

    /* Sidebar Functionality */
    var handleSidebar = function (mode, extra) {
        var page = $('#page-container');
        if (mode === 'init') {
            // Init sidebars scrolling (if we have a fixed header)
            if (header.hasClass('navbar-fixed-top') || header.hasClass('navbar-fixed-bottom')) {
                handleSidebar('sidebar-scroll');
            }

            // Close the other sidebar if we hover over a partial one
            // In smaller screens (the same applies to resized browsers) two visible sidebars
            // could mess up our main content (not enough space), so we hide the other one :-)
            $('.sidebar-partial #sidebar')
                .mouseenter(function () {
                    handleSidebar('close-sidebar-alt');
                });
            $('.sidebar-alt-partial #sidebar-alt')
                .mouseenter(function () {
                    handleSidebar('close-sidebar');
                });
        } else {
            var windowW = getWindowWidth();

            if (mode === 'toggle-sidebar') {
                if (windowW > 991) { // Toggle main sidebar in large screens (> 991px)
                    page.toggleClass('sidebar-visible-lg');

                    if (page.hasClass('sidebar-visible-lg')) {
                        handleSidebar('close-sidebar-alt');
                    }

                    // If 'toggle-other' is set, open the alternative sidebar when we close this one
                    if (extra === 'toggle-other') {
                        if (!page.hasClass('sidebar-visible-lg')) {
                            handleSidebar('open-sidebar-alt');
                        }
                    }
                } else { // Toggle main sidebar in small screens (< 992px)
                    page.toggleClass('sidebar-visible-xs');

                    if (page.hasClass('sidebar-visible-xs')) {
                        handleSidebar('close-sidebar-alt');
                    }
                }
            } else if (mode === 'toggle-sidebar-alt') {
                if (windowW > 991) { // Toggle alternative sidebar in large screens (> 991px)
                    page.toggleClass('sidebar-alt-visible-lg');

                    if (page.hasClass('sidebar-alt-visible-lg')) {
                        handleSidebar('close-sidebar');
                    }

                    // If 'toggle-other' is set open the main sidebar when we close the alternative
                    if (extra === 'toggle-other') {
                        if (!page.hasClass('sidebar-alt-visible-lg')) {
                            handleSidebar('open-sidebar');
                        }
                    }
                } else { // Toggle alternative sidebar in small screens (< 992px)
                    page.toggleClass('sidebar-alt-visible-xs');

                    if (page.hasClass('sidebar-alt-visible-xs')) {
                        handleSidebar('close-sidebar');
                    }
                }
            }
            else if (mode === 'open-sidebar') {
                if (windowW > 991) { // Open main sidebar in large screens (> 991px)
                    page.addClass('sidebar-visible-lg');
                } else { // Open main sidebar in small screens (< 992px)
                    page.addClass('sidebar-visible-xs');
                }

                // Close the other sidebar
                handleSidebar('close-sidebar-alt');
            }
            else if (mode === 'open-sidebar-alt') {
                if (windowW > 991) { // Open alternative sidebar in large screens (> 991px)
                    page.addClass('sidebar-alt-visible-lg');
                } else { // Open alternative sidebar in small screens (< 992px)
                    page.addClass('sidebar-alt-visible-xs');
                }

                // Close the other sidebar
                handleSidebar('close-sidebar');
            }
            else if (mode === 'close-sidebar') {
                if (windowW > 991) { // Close main sidebar in large screens (> 991px)
                    page.removeClass('sidebar-visible-lg');
                } else { // Close main sidebar in small screens (< 992px)
                    page.removeClass('sidebar-visible-xs');
                }
            }
            else if (mode === 'close-sidebar-alt') {
                if (windowW > 991) { // Close alternative sidebar in large screens (> 991px)
                    page.removeClass('sidebar-alt-visible-lg');
                } else { // Close alternative sidebar in small screens (< 992px)
                    page.removeClass('sidebar-alt-visible-xs');
                }
            }
            else if (mode == 'sidebar-scroll') { // Init sidebars scrolling
                if (sScroll.length && (!sScroll.parent('.slimScrollDiv').length)) {
                    // Initialize Slimscroll plugin on both sidebars
                    sScroll.slimScroll({
                        height: $(window).height(),
                        color: '#fff',
                        size: '3px',
                        touchScrollStep: 100
                    });

                    // Resize sidebars scrolling height on window resize or orientation change
                    $(window).resize(sidebarScrollResize);
                    $(window).bind('orientationchange', sidebarScrollResizeOrient);
                }
            }
        }

        return false;
    };

    // Sidebar Scrolling Resize Height on window resize and orientation change
    var sidebarScrollResize = function () {
        sScroll.add(sScroll.parent()).css('height', $(window).height());
    };
    var sidebarScrollResizeOrient = function () {
        setTimeout(sScroll.add(sScroll.parent()).css('height', $(window).height()), 500);
    };

    /* Resize #page-content to fill empty space if exists */
    var resizePageContent = function () {
        var windowH = $(window).height();
        var sidebarH = sidebar.outerHeight();
        var sidebarAltH = sidebarAlt.outerHeight();
        var headerH = header.outerHeight();
        var footerH = footer.outerHeight();

        // If we have a fixed sidebar/header layout or each sidebars’ height < window height
        if (header.hasClass('navbar-fixed-top') || header.hasClass('navbar-fixed-bottom') || ((sidebarH < windowH) && (sidebarAltH < windowH))) {
            if (page.hasClass('footer-fixed')) { // if footer is fixed don't remove its height
                pageContent.css('min-height', windowH - headerH + 'px');
            } else { // else if footer is static, remove its height
                pageContent.css('min-height', windowH - (headerH + footerH) + 'px');
            }
        } else { // In any other case set #page-content height the same as biggest sidebar's height
            if (page.hasClass('footer-fixed')) { // if footer is fixed don't remove its height
                pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - headerH + 'px');
            } else { // else if footer is static, remove its height
                pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - (headerH + footerH) + 'px');
            }
        }
    };
    return {
        init: function () {
            uiInit(); // Initialize UI Code
            //pageLoading(); // Initialize Page Loading
        },
        sidebar: function (mode, extra) {
            handleSidebar(mode, extra); // Handle sidebars - access functionality from everywhere
        },
    };
}();

/* Initialize app when page loads */
$(function () {
    App.init();
});
