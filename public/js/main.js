/*
 * In-Field Label jQuery Plugin
 * http://fuelyourcoding.com/scripts/infield.html
 *
 * Copyright (c) 2009 Doug Neiner
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.1
 */(function(a){a.InFieldLabels=function(b,c,d){var e=this;e.$label=a(b);e.label=b;e.$field=a(c);e.field=c;e.$label.data("InFieldLabels",e);e.showing=!0;e.init=function(){e.options=a.extend({},a.InFieldLabels.defaultOptions,d);if(e.$field.val()!=""){e.$label.hide();e.showing=!1}e.$field.focus(function(){e.fadeOnFocus()}).blur(function(){e.checkForEmpty(!0)}).bind("keydown.infieldlabel",function(a){e.hideOnChange(a)}).change(function(a){e.checkForEmpty()}).bind("onPropertyChange",function(){e.checkForEmpty()})};e.fadeOnFocus=function(){e.showing&&e.setOpacity(e.options.fadeOpacity)};e.setOpacity=function(a){e.$label.stop().animate({opacity:a},e.options.fadeDuration);e.showing=a>0};e.checkForEmpty=function(a){if(e.$field.val()==""){e.prepForShow();e.setOpacity(a?1:e.options.fadeOpacity)}else e.setOpacity(0)};e.prepForShow=function(a){if(!e.showing){e.$label.css({opacity:0}).show();e.$field.bind("keydown.infieldlabel",function(a){e.hideOnChange(a)})}};e.hideOnChange=function(a){if(a.keyCode==16||a.keyCode==9)return;if(e.showing){e.$label.hide();e.showing=!1}e.$field.unbind("keydown.infieldlabel")};e.init()};a.InFieldLabels.defaultOptions={fadeOpacity:.5,fadeDuration:300};a.fn.inFieldLabels=function(b){return this.each(function(){var c=a(this).attr("for");if(!c)return;var d=a("input#"+c+"[type='text'],"+"input#"+c+"[type='password'],"+"textarea#"+c);if(d.length==0)return;new a.InFieldLabels(this,d[0],b)})}})(jQuery);$(function(){$("label").inFieldLabels()});
 
 
 // sticky footer plugin
      (function($){
        var footer;
      
        $.fn.extend({
          stickyFooter: function(options) {
            footer = this;
            
            positionFooter();
      
            $(window)
              .scroll(positionFooter)
              .resize(positionFooter);
      
            function positionFooter() {
              var docHeight = $(document.body).height() - $("#sticky-footer-push").height();
              if(docHeight < $(window).height()){
                var diff = $(window).height() - docHeight;
                if (!$("#sticky-footer-push").length > 0) {
                  $(footer).before('<div id="sticky-footer-push"></div>');
                }
                $("#sticky-footer-push").height(diff);
              }
            }
          }
        });
      })(jQuery);

$(document).ready(function() {
	$("footer").stickyFooter();
});

