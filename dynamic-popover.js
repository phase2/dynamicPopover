/* ===========================================================
 * bootstrap-popover.js v2.3.0
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ===========================================================
 *
 * MODIFIED BY jec006 to allow for the usage of dynamic content within the popover.
 * http://github.com/phase2/dynamicPopover
 */
!function ($) {
  "use strict";


 /* DynamicPopover PUBLIC CLASS DEFINITION
  * =============================== */

  var DynamicPopover = function (element, options) {
    this.init('dynamicPopover', element, options)
    this.setContent();
  }

  /* NOTE: DynamicPopover EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  DynamicPopover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: DynamicPopover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent();

      this.title(title);

      $tip.find('.popover-content').append(content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , o = this.options

      content = $(o.selector).first().detach();

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , title: function(title) {
    var $tip = this.tip();

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    if (this.options.closeButton) {
      this.addCloseButton();
    }
  }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  , addCloseButton: function() {
    var close = $('<a class="close" href="#" title="Close Popover">&times;</a>').appendTo(this.$tip.find('.popover-title')),
        ref = this;
    close.click(function(e) {
      ref.hide();
      e.preventDefault();
      if (typeof ref.options.onClose == 'function') {
        ref.options.onClose();
      }
    });
  }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.dynamicPopover

  $.fn.dynamicPopover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dynamicPopover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('dynamicPopover', (data = new DynamicPopover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.dynamicPopover.Constructor = DynamicPopover

  $.fn.dynamicPopover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , selector: '.popover'
  , template: '<div class="popover dynamic-popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.dynamicPopover.noConflict = function () {
    $.fn.dynamicPopover = old
    return this
  }

}(window.jQuery);