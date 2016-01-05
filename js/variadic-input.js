/* ========================================================================
 * Bootstrap: variadic-input.js v3.3.6
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // VARIADIC INPUT PUBLIC CLASS DEFINITION
  // ==============================

  var VariadicInput = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, VariadicInput.DEFAULTS, options)

    this.$element.delegate('[data-action]', 'click', $.proxy(function (e) {
      var $el = $(e.target).closest('button')
      var action = $el.attr('data-action')

      if (action === 'add') return this.add()
      $el.closest('.input-group').remove()
    }, this))
  }

  VariadicInput.VERSION  = '3.3.6'

  VariadicInput.DEFAULTS = {
    placeholder: 'extra parameter'
  }

  VariadicInput.prototype.add = function () {
    var name = this.$element.find('input[type=text]').attr('name')

    var $input = $('<input class="form-control" type="text"></input>').attr({
      name: name,
      placeholder: this.options.placeholder
    })

    var $button = '<span class="input-group-btn"><button type="button" class="btn btn-default" data-action="remove"><span aria-hidden="true" class="glyphicon glyphicon-minus"></span></button></span>';

    var $inputGroup = $('<div class="input-group"></div>').append($input, $button)
    this.$element.append($inputGroup)
    $input.trigger('focus')
  }

  // VARIADIC INPUT PLUGIN DEFINITION
  // ================================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.variadic-input')
      var options = $.extend({}, VariadicInput.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.variadic-input', (data = new VariadicInput(this, options)))
    })
  }

  var old = $.fn.variadicInput

  $.fn.variadicInput             = Plugin
  $.fn.variadicInput.Constructor = VariadicInput


  // VARIADIC INPUT NO CONFLICT
  // =========================

  $.fn.variadicInput.noConflict = function () {
    $.fn.variadicInput = old
    return this
  }


  // VARIADIC INPUT DATA-API
  // =======================

  $(window).on('load', function () {
    $('[data-ride="variadic-input"]').each(function () {
      var $input = $(this)
      Plugin.call($input, $input.data())
    })
  })

}(jQuery);
