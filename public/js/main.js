import React, { useEffect } from 'react';
import $ from 'jquery';
import 'owl.carousel';
import 'jquery.easing';

function Main() {
  useEffect(() => {
    console.log('Main component mounted');

    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $('.navbar .dropdown')
          .on('mouseover', function () {
            $('.dropdown-toggle', this).trigger('click');
          })
          .on('mouseout', function () {
            $('.dropdown-toggle', this).trigger('click').blur();
          });
      } else {
        $('.navbar .dropdown').off('mouseover').off('mouseout');
      }
    }

    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);

    // Testimonials carousel
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
        } else {
          $('.back-to-top').fadeOut('slow');
        }
      });

      $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
      });

      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1,
        nav: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
    });
  }, []);

  return null;
}

export default Main;
