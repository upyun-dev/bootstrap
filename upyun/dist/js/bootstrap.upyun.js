/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

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
    this.$submit = null
    this.$element.on('submit', $.proxy(function (e) {
      e.preventDefault()
      return this.send()
    }, this))

    $(':submit', this.$element).click($.proxy(function(e){
      this.$submit = $(e.target)
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
      if (this.$submit) data.append(this.$submit.attr('name'), this.$submit.val())
      contentType = false
    } else {
      data = this.$element.serializeArray()
      if (this.$submit) data.push({ name: this.$submit.attr('name'), value: this.$submit.val() })
      data = $.param(data);
    }
    this.$submit = null;

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
