/* ========================================================================
 * Bootstrap: loading.js v3.3.6
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'


  // LOADING PUBLIC CLASS DEFINITION
  // ===============================

  var Loading = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, Loading.DEFAULTS, options)
    this.isShown = false
    this.$loading = null
  }

  Loading.VERSION = '3.3.6'

  Loading.DEFAULTS = {
    duration : 1000 // loading effect shortest time display
  }

  Loading.prototype.show = function () {
    this.$loading = $('<div class="loading-bg"><div class="loading-box"><i id="loading-icon" class="glyphicon glyphicon-refresh"></i></div></div>')
    this.$element.append(this.$loading)
  }

  Loading.prototype.hide = function () {
    var that = this
    setTimeout(function () {
      if ($(that.$loading)[0]){
        $(that.$loading).remove()
        that.$loading = null
      }
    }, this.options.duration)
  }

  Loading.prototype.start = function () {
    if (this.isShown) return
    this.isShown = true
    this.show()
  }

  Loading.prototype.stop = function () {
    if (!this.isShown) return
    this.isShown = false
    this.hide()
  }

  // LOADING PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.loading')
      // $this.data() function get data from element, such as data-xxx=yyy => {xxx: yyy}
      var options = $.extend({}, Loading.DEFAULTS, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('bs.loading', (data = new Loading(this, options)))
      if (typeof option == 'string') data[option]()
      else data.start()
    })
  }

  var old = $.fn.loading

  $.fn.loading = Plugin
  $.fn.loading.Constructor = Loading

  // LOADING NO CONFLICT
  // ===================

  $.fn.loading.noConflict = function () {
    $.fn.loading = old
    return this
  }


  // LOADING DATA-API
  // ================

}(jQuery);
