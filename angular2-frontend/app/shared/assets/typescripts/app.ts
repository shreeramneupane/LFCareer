import { Injectable } from '@angular/core';

@Injectable()
export class App {
  /* Helper variables - set in uiInit() */
  /* Initialization UI Code */
  page:any;
  pageContent:any;
  header:any;
  footer:any;
  sidebar:any;
  sidebarAlt:any;
  sScroll:any;

  constructor() {
    this.uiInit();
  }

  uiInit() {
    // Set variables - Cache some often used Jquery objects in variables */
    this.page = $('#page-container');
    this.pageContent = $('#page-content');
    this.header = $('header');
    this.footer = $('#page-content + footer');
    this.sidebar = $('#sidebar');
    this.sidebarAlt = $('#sidebar-alt');
    this.sScroll = $('.sidebar-scroll');
    // Initialize sidebars functionality
    this.handleSidebar('init', null);
    // Sidebar navigation functionality
    this.handleNav();
    // Resize #page-content to fill empty space if exists (also add it to resize and orientationchange events)
    this.resizePageContent();
    var that = this;
    $(window).resize(function () {
      that.resizePageContent();
    });
    $(window).bind('orientationchange', this.resizePageContent);
    // Add the correct copyright year at the footer
    var yearCopy = $('#year-copy'), d = new Date();
    if (d.getFullYear() === 2014) {
      yearCopy.html('2014');
    }
    else {
      yearCopy.html('2014-' + d.getFullYear().toString().substr(2, 2));
    }
    // Initialize tabs
    $('[data-toggle="tabs"] a, .enable-tabs a').click(function (e) {
      e.preventDefault();
      (<any>$(this)).tab('show');
    });
    // Initialize Tooltips
    (<any>$('[data-toggle="tooltip"], .enable-tooltip')).tooltip({
      container: 'body',
      animation: false
    });
    // Initialize Popovers
    (<any>$('[data-toggle="popover"], .enable-popover')).popover({
      container: 'body',
      animation: true
    });
  };

  /* Gets window width cross browser */
  getWindowWidth() {
    return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  };

  /* Sidebar Navigation functionality */
  handleNav() {
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
            this.handlePageScroll(link, 200, 300);
          });
          // Resize #page-content to fill empty space if exists
          setTimeout(this.resizePageContent, upSpeed);
        }
        else {
          $('.sidebar-nav-menu.open').removeClass('open').next().slideUp(upSpeed);
          link.addClass('open').next().slideDown(downSpeed, function () {
            this.handlePageScroll(link, 150, 600);
          });
          // Resize #page-content to fill empty space if exists
          setTimeout(this.resizePageContent, ((upSpeed > downSpeed) ? upSpeed : downSpeed));
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
            this.handlePageScroll(link, 200, 300);
          });
          // Resize #page-content to fill empty space if exists
          setTimeout(this.resizePageContent, upSpeed);
        }
        else {
          link.closest('ul').find('.sidebar-nav-submenu.open').removeClass('open').next().slideUp(upSpeed);
          link.addClass('open').next().slideDown(downSpeed, function () {
            this.handlePageScroll(link, 150, 600);
          });
          // Resize #page-content to fill empty space if exists
          setTimeout(this.resizePageContent, ((upSpeed > downSpeed) ? upSpeed : downSpeed));
        }
      }
      return false;
    });
  };

  /* Scrolls the page (static layout) or the sidebar scroll element (fixed header/sidebars layout) to a specific position - Used when a submenu opens */
  handlePageScroll(sElem, sHeightDiff, sSpeed) {
    if (!this.page.hasClass('disable-menu-autoscroll')) {
      var elemScrollToHeight;
      // If we have a static layout scroll the page
      if (!this.header.hasClass('navbar-fixed-top') && !this.header.hasClass('navbar-fixed-bottom')) {
        var elemOffsetTop = sElem.offset().top;
        elemScrollToHeight = (((elemOffsetTop - sHeightDiff) > 0) ? (elemOffsetTop - sHeightDiff) : 0);
        $('html, body').animate({scrollTop: elemScrollToHeight}, sSpeed);
      }
      else {
        var sContainer = sElem.parents('.sidebar-scroll');
        var elemOffsetCon = sElem.offset().top + Math.abs($('div:first', sContainer).offset().top);
        elemScrollToHeight = (((elemOffsetCon - sHeightDiff) > 0) ? (elemOffsetCon - sHeightDiff) : 0);
        sContainer.animate({scrollTop: elemScrollToHeight}, sSpeed);
      }
    }
  };

  /* Sidebar Functionality */
  handleSidebar(mode, extra) {
    this.page = $('#page-container');
    if (mode === 'init') {
      // Init sidebars scrolling (if we have a fixed header)
      if (this.header.hasClass('navbar-fixed-top') || this.header.hasClass('navbar-fixed-bottom')) {
        this.handleSidebar('sidebar-scroll', null);
      }
      // Close the other sidebar if we hover over a partial one
      // In smaller screens (the same applies to resized browsers) two visible sidebars
      // could mess up our main content (not enough space), so we hide the other one :-)
      $('.sidebar-partial #sidebar')
      .mouseenter(function () {
        this.handleSidebar('close-sidebar-alt');
      });
      $('.sidebar-alt-partial #sidebar-alt')
      .mouseenter(function () {
        this.handleSidebar('close-sidebar');
      });
    }
    else {
      var windowW = this.getWindowWidth();
      if (mode === 'toggle-sidebar') {
        if (windowW > 991) {
          this.page.toggleClass('sidebar-visible-lg');
          if (this.page.hasClass('sidebar-visible-lg')) {
            this.handleSidebar('close-sidebar-alt', null);
          }
          // If 'toggle-other' is set, open the alternative sidebar when we close this one
          if (extra === 'toggle-other') {
            if (!this.page.hasClass('sidebar-visible-lg')) {
              this.handleSidebar('open-sidebar-alt', null);
            }
          }
        }
        else {
          this.page.toggleClass('sidebar-visible-xs');
          if (this.page.hasClass('sidebar-visible-xs')) {
            this.handleSidebar('close-sidebar-alt', null);
          }
        }
      }
      else if (mode === 'toggle-sidebar-alt') {
        if (windowW > 991) {
          this.page.toggleClass('sidebar-alt-visible-lg');
          if (this.page.hasClass('sidebar-alt-visible-lg')) {
            this.handleSidebar('close-sidebar', null);
          }
          // If 'toggle-other' is set open the main sidebar when we close the alternative
          if (extra === 'toggle-other') {
            if (!this.page.hasClass('sidebar-alt-visible-lg')) {
              this.handleSidebar('open-sidebar', null);
            }
          }
        }
        else {
          this.page.toggleClass('sidebar-alt-visible-xs');
          if (this.page.hasClass('sidebar-alt-visible-xs')) {
            this.handleSidebar('close-sidebar', null);
          }
        }
      }
      else if (mode === 'open-sidebar') {
        if (windowW > 991) {
          this.page.addClass('sidebar-visible-lg');
        }
        else {
          this.page.addClass('sidebar-visible-xs');
        }
        // Close the other sidebar
        this.handleSidebar('close-sidebar-alt', null);
      }
      else if (mode === 'open-sidebar-alt') {
        if (windowW > 991) {
          this.page.addClass('sidebar-alt-visible-lg');
        }
        else {
          this.page.addClass('sidebar-alt-visible-xs');
        }
        // Close the other sidebar
        this.handleSidebar('close-sidebar', null);
      }
      else if (mode === 'close-sidebar') {
        if (windowW > 991) {
          this.page.removeClass('sidebar-visible-lg');
        }
        else {
          this.page.removeClass('sidebar-visible-xs');
        }
      }
      else if (mode === 'close-sidebar-alt') {
        if (windowW > 991) {
          this.page.removeClass('sidebar-alt-visible-lg');
        }
        else {
          this.page.removeClass('sidebar-alt-visible-xs');
        }
      }
      else if (mode == 'sidebar-scroll') {
        if (this.sScroll.length && (!this.sScroll.parent('.slimScrollDiv').length)) {
          // Initialize Slimscroll plugin on both sidebars
          this.sScroll.slimScroll({
            height         : $(window).height(),
            color          : '#fff',
            size           : '3px',
            touchScrollStep: 100
          });
          // Resize sidebars scrolling height on window resize or orientation change
          $(window).resize(this.sidebarScrollResize);
          $(window).bind('orientationchange', this.sidebarScrollResizeOrient);
        }
      }
    }
    return false;
  };

  // Sidebar Scrolling Resize Height on window resize and orientation change
  sidebarScrollResize() {
    this.sScroll.add(this.sScroll.parent()).css('height', $(window).height());
  };

  sidebarScrollResizeOrient() {
    setTimeout(this.sScroll.add(this.sScroll.parent()).css('height', $(window).height()), 500);
  };

  /* Resize #page-content to fill empty space if exists */
  resizePageContent() {
    var windowH = $(window).height();
    var sidebarH = this.sidebar.outerHeight();
    var sidebarAltH = this.sidebarAlt.outerHeight();
    var headerH = this.header.outerHeight();
    var footerH = this.footer.outerHeight();
    // If we have a fixed sidebar/header layout or each sidebars’ height < window height
    if (this.header.hasClass('navbar-fixed-top') || this.header.hasClass('navbar-fixed-bottom') || ((sidebarH < windowH) && (sidebarAltH < windowH))) {
      if (this.page.hasClass('footer-fixed')) {
        this.pageContent.css('min-height', windowH - headerH + 'px');
      }
      else {
        this.pageContent.css('min-height', windowH - (headerH + footerH) + 'px');
      }
    }
    else {
      if (this.page.hasClass('footer-fixed')) {
        this.pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - headerH + 'px');
      }
      else {
        this.pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - (headerH + footerH) + 'px');
      }
    }
  }
}