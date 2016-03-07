/* ========================================================================
 * Bootstrap: async-form.js v3.3.6
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'


  // AsyncForm PUBLIC CLASS DEFINITION
  // ===============================

  var formAsyncSelector = 'form[data-async]'
  var AsyncForm = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.$element.on('submit', $.proxy(function (e) {
      e.preventDefault()
      return this.send()
    }, this))
  }

  AsyncForm.VERSION = '3.3.6'


  AsyncForm.prototype.send = function (e) {
    if (e) e.preventDefault()
    var method = this.$element.attr('method')
    var url = this.$element.attr('action')
    var enctype = this.$element.attr('enctype')
    var contentType
    var data
    var that = this


    if (enctype && ~enctype.indexOf('form-data')) {
      // 'data-form' include in enctype
      data = new FormData(this.$element[0])
      contentType = false
    } else {
      data = this.$element.serialize()
    }

    this.$element.trigger(e = $.Event('beforeSubmit.bs.asyncForm'))
    $.ajax(url, {
      method: method,
      data: data,
      contentType: contentType,
      processData: false,
      success: function (data) {
        that.$element.trigger(e = $.Event('success.bs.asyncForm'), [data])
      },
      error: function (jqXHR, testStatus, errorThrown) {
        that.$element.trigger(e = $.Event('error.bs.asyncForm'), [jqXHR, testStatus, errorThrown])
      }
    })
  }


  // AsyncForm PLUGIN DEFINITION
  // =========================

  function Plugin(option)   {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.asyncForm')
      var options = $.extend({}, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('bs.asyncForm', (data = new AsyncForm(this, options)))
    })
  }

  var old = $.fn.asyncForm


  $.fn.asyncForm = Plugin
  $.fn.asyncForm.Constructor = AsyncForm


  // AsyncForm NO CONFLICT
  // ===================

  $.fn.asyncForm.noConflict = function () {
    $.fn.asyncForm = old
    return this
  }


  // AsyncForm DATA-API
  // ================

  $(window).on('load', function () {
    $(formAsyncSelector).each(function () {
      var $this = $(this)
      Plugin.call($this)
    })
  })
}(jQuery);
