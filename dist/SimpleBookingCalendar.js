"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleBookingCalendar = /*#__PURE__*/function () {
  /**
   * Simple Booking and Availibility Calendar Liberary
   *  
   * @param {string} element ID of calendar element
   * @param {string|object} evtSrc ajax url string or jquery like ajax options object
   */
  function SimpleBookingCalendar(element, evtSrc) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, SimpleBookingCalendar);

    this._initprops();

    var elem = document.getElementById(element);

    if (elem) {
      this.calendarElement = elem;
      this.ajaxSrc = evtSrc;
      this.extraOpts = opts;
      this.init();
    } else {
      throw "Element ID is required";
    }
  }

  _createClass(SimpleBookingCalendar, [{
    key: "_initprops",
    value: function _initprops() {
      this.calendarElement = null;
      this.calendarBody = null;
      this.ajaxSrc = null;
      this.ajaxResponse = null;
      this.disableUnselectStart = null;
      this.selectedStart = null;
      this.selectedEnd = null;
      this.selectedGate = null;
      this.currentMonth = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this._evts = [];
      this._coloredRanges = [];
      this.monthText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    /**
     * Returns selected start date if any
     * 
     * @returns {string}
     */

  }, {
    key: "ajaxOpts",

    /**
     * Ajax options creator
     * @param {string|object} src JQuery like ajax options object or url
     * @param {object} complete callback when ajax is complete
     * @returns {object} AJAX options
     */
    value: function ajaxOpts(src) {
      var complete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      function success(res) {
        this.ajaxResponse = res;
      }

      if (typeof src == 'string') {
        return {
          url: src,
          type: 'GET',
          data: Object.assign(this.extraOpts, {
            date: this.toFullDateString(this.currentYear, this.currentMonth)
          }),
          success: success.bind(this),
          complete: complete
        };
      }

      if (_typeof(src) == 'object') {
        return src;
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.calendarElement.innerHTML = '<table class="calendar"><caption class="calendar__banner--month"><a class="btn btn-primary btnPrev pull-left" href="#" role="button">Previous</a><h1 id="period_label"></h1><a class="btn btn-primary btnNext pull-right" href="#" role="button">Next</a></caption><thead><tr><th class="calendar__day__header">Sun</th><th class="calendar__day__header">Mon</th><th class="calendar__day__header">Tue</th><th class="calendar__day__header">Wed</th><th class="calendar__day__header">Thu</th><th class="calendar__day__header">Fri</th><th class="calendar__day__header">Sat</th></tr></thead><tbody id="calendarBody"></tbody></table>';
      this.calendarBody = document.getElementById('calendarBody');
      this.calendarBody.addEventListener("mouseenter", function (_this) {
        return function (e) {
          for (var target = e.target; target && target != this; target = target.parentNode) {
            if (target.classList && target.classList.contains('calendar__day__cell')) {
              if (!_this.selectedEnd) {
                (function () {
                  target.classList.add('hover_day');

                  var currDate = _this._dateToUTC(target.getAttribute('data-date'));

                  if (_this.selectedStart) {
                    _this.selectedGate = false;

                    _this.calendarBody.querySelectorAll('td').forEach(function (element) {
                      if (_this._dateToUTC(element.getAttribute('data-date')) == _this._dateToUTC(_this.selectedStart)) {
                        element.classList.add('selected_day');
                      }

                      element.classList.remove('hover_day');

                      if (_this._dateToUTC(element.getAttribute('data-date')) <= currDate && _this._dateToUTC(element.getAttribute('data-date')) > _this._dateToUTC(_this.selectedStart)) {
                        if (element.classList.contains('calendar__day__booked') || _this.selectedGate) {
                          _this.selectedGate = element.getAttribute('data-date');
                          return;
                        }

                        element.classList.add('hover_day');
                      }
                    });
                  }
                })();
              }

              break;
            }
          }
        };
      }(this), true);
      this.calendarBody.addEventListener("mouseout", function (_this) {
        return function (e) {
          for (var target = e.target; target && target != this; target = target.parentNode) {
            if (target.classList && target.classList.contains('calendar__day__cell') && !_this.selectedEnd) {
              target.classList.remove('hover_day');
              break;
            }
          }
        };
      }(this), true);
      this.calendarBody.addEventListener("click", function (_this) {
        return function (e) {
          for (var target = e.target; target && target != this; target = target.parentNode) {
            if (target.classList && target.classList.contains('calendar__day__cell')) {
              if (!_this.selectedStart) {
                _this.selectedStart = target.getAttribute('data-date');
                target.classList.add('selected_day');
                _this._evts['select'] && _this._evts['select'].forEach(function (evt) {
                  evt('start', _this.selectedStart);
                });
              } else if (!_this.disableUnselectStart && target.getAttribute('data-date') == _this.selectedStart && !_this.selectedEnd) {
                _this._evts['unselect'] && _this._evts['unselect'].forEach(function (evt) {
                  evt('start', _this.selectedStart);
                });
                _this.selectedStart = null;
                target.classList.remove('selected_day');
              } else if (!_this.selectedEnd && !_this.selectedGate && _this.selectedStart && _this._dateToUTC(_this.selectedStart) <= _this._dateToUTC(target.getAttribute('data-date'))) {
                _this.selectedEnd = target.getAttribute('data-date');
                target.classList.add('selected_day');
                _this._evts['select'] && _this._evts['select'].forEach(function (evt) {
                  evt('end', _this.selectedEnd);
                });
                _this._evts['rangeselect'] && _this._evts['rangeselect'].forEach(function (evt) {
                  evt(_this.selectedStart, _this.selectedEnd, _this);
                });
              } else if (target.getAttribute('data-date') == _this.selectedEnd) {
                _this._evts['unselect'] && _this._evts['unselect'].forEach(function (evt) {
                  evt('end', _this.selectedEnd);
                });
                target.classList.remove('selected_day');
                _this.selectedEnd = null;
              }

              break;
            }
          }
        };
      }(this), true);
      this.calendarElement.querySelector('a.btnPrev').addEventListener('click', function (_this) {
        return function (e) {
          e.preventDefault();

          _this.previous();
        };
      }(this));
      this.calendarElement.querySelector('a.btnNext').addEventListener('click', function (_this) {
        return function (e) {
          e.preventDefault();

          _this.next();
        };
      }(this));
      this.render();
    }
  }, {
    key: "toFullDateString",
    value: function toFullDateString(year, month, day) {
      return new Date(year || this.currentYear, month || this.currentMonth, day || 2).toISOString().substr(0, 10);
    }
  }, {
    key: "next",
    value: function next() {
      this.currentYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
      this.currentMonth = (this.currentMonth + 1) % 12;
      this.render();
    }
  }, {
    key: "previous",
    value: function previous() {
      this.currentYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
      this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
      this.render();
    }
  }, {
    key: "jump",
    value: function jump(month, year) {
      this.currentYear = parseInt(year);
      this.currentMonth = parseInt(month);
      this.render();
    }
    /**
     * Select a range programmatically
     * 
     * @param {Date} start Start date of selection
     * @param {Date} end End date of selection
     * @returns {boolean} returns true on all dates selection in provided range
     */

  }, {
    key: "select",
    value: function select(start, end, disableUnselectStart) {
      this.disableUnselectStart = disableUnselectStart;
      this.selectedStart = this.toFullDateString(start.getFullYear(), start.getMonth(), start.getDate() + 1);

      if (end) {
        this.selectedEnd = this.toFullDateString(end.getFullYear(), end.getMonth(), end.getDate());
      }

      this.selectedGate = false;
      var allDatesSelected = false;
      var currDate = new Date().getTime();
      return allDatesSelected;
    }
  }, {
    key: "unselect",
    value: function unselect() {
      this.selectedStart = null;
      this.selectedEnd = null;
      this.calendarBody.querySelectorAll('td').forEach(function (element) {
        if (element.classList.contains('hover_day')) {
          element.classList.remove('hover_day');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentMonth;
      var year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentYear;

      if (this.ajaxSrc) {
        var complete = function complete() {
          this._render(month, year);
        };

        this._ajax(this.ajaxOpts(this.ajaxSrc, complete.bind(this)));
      } else {
        this._render(month, year);
      }
    }
  }, {
    key: "_render",
    value: function _render(month, year) {
      document.getElementById('period_label').innerText = "".concat(this.monthText[month], " ").concat(year);
      var days = 32 - new Date(year, month, 32).getDate();
      var offset = 0;
      var tdata = '<tr>';

      for (var index = 1; index <= days; index++) {
        if (index === 1) {
          var dayoftheweek = new Date(year, month, index).getDay();

          for (var _index = 0; _index < dayoftheweek; _index++) {
            offset++;
            tdata += '<td class="calendar__day__booked"></td>';
          }
        }

        var bankholiday = '';

        if (this._dateToUTC(this.toFullDateString(year, month, index + 1)) <= new Date().getTime() - 8.64e+7) {
          bankholiday += 'data-bank-holiday=""';
        }

        if (this.ajaxResponse && this.ajaxResponse[this.toFullDateString(year, month, index + 1)]) {
          tdata += "<td class=\"calendar__day__booked\" data-moon-phase=\"Booked Orders# ".concat(this.ajaxResponse[this.toFullDateString(year, month, index + 1)], "\" data-date=\"").concat(this.toFullDateString(year, month, index + 1), "\" ").concat(bankholiday, ">").concat(index, "</td>");
        } else if (this.selectedStart && !this.selectedEnd) {
          tdata += "<td class=\"calendar__day__cell ".concat(this.toFullDateString(year, month, index + 1) == this.selectedStart ? 'hover_day' : null, "\"  data-date=\"").concat(this.toFullDateString(year, month, index + 1), "\" ").concat(bankholiday, ">").concat(index, "</td>");
        } else if (this.selectedStart && this.selectedEnd) {
          tdata += "<td class=\"calendar__day__cell ".concat(this.toFullDateString(year, month, index + 1) >= this.selectedStart && this.toFullDateString(year, month, index + 1) <= this.selectedEnd ? 'hover_day' : null, "\"  data-date=\"").concat(this.toFullDateString(year, month, index + 1), "\" ").concat(bankholiday, ">").concat(index, "</td>");
        } else {
          tdata += "<td class=\"calendar__day__cell\"  data-date=\"".concat(this.toFullDateString(year, month, index + 1), "\" ").concat(bankholiday, ">").concat(index, "</td>");
        }

        if (index === days) {
          var lastdayoftheweek = new Date(year, month, index).getDay() + 1;

          for (var _index2 = lastdayoftheweek; _index2 < 7; _index2++) {
            tdata += '<td class="calendar__day__booked"></td>';
          }
        }

        if ((index + offset) % 7 == 0) {
          tdata += '</tr>';
        }
      }

      this.calendarBody.innerHTML = tdata;

      this._executeRange();
    }
    /**
     * Bind an event
     * 
     * @param {string} evt Event name
     * @param {object} func Event callback function
     */

  }, {
    key: "on",
    value: function on(evt, func) {
      if (!this._evts[evt]) {
        this._evts[evt] = [];
      }

      this._evts[evt].push(func);
    }
  }, {
    key: "addRange",
    value: function addRange(range) {
      this._coloredRanges.push(range);
    }
  }, {
    key: "_executeRange",
    value: function _executeRange() {
      this._coloredRanges.forEach(function (_this) {
        return function (range) {
          _this.calendarBody.querySelectorAll('td').forEach(function (element) {
            if (_this._dateToUTC(element.getAttribute('data-date')) == _this._dateToUTC(range.start)) {
              element.innerHTML += '<p style="font-size:12px">Check In</p>';
            }

            if (_this._dateToUTC(element.getAttribute('data-date')) == _this._dateToUTC(range.end)) {
              element.innerHTML += '<p style="font-size:12px">Check Out</p>';
            }

            if (_this._dateToUTC(element.getAttribute('data-date')) >= _this._dateToUTC(range.start) && _this._dateToUTC(element.getAttribute('data-date')) <= _this._dateToUTC(range.end)) {
              element.setAttribute("style", "background-color:".concat(range.bgColor, " !important; color:").concat(range.fontColor, " !important;"));
            }
          });
        };
      }(this));
    }
  }, {
    key: "_ajax",
    value: function _ajax(opts) {
      var request;

      if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
      } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }

      request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status === 200) {
            var res = this.responseText;

            if (this.getResponseHeader('content-type') == 'application/json') {
              try {
                res = JSON.parse(res);
              } catch (e) {
                console.error(e);
              }
            }

            opts.success && opts.success(res, this.status);
          } else {
            opts.error && opts.error();
          }

          opts.complete && opts.complete();
        }
      };

      if (opts.type == 'GET') {
        opts.url += "?".concat(this._object2param(opts.data));
        opts.data = null;
      }

      request.open(opts.type, opts.url, true);
      opts.beforeSend && opts.beforeSend();
      request.send(opts.data && this._object2param(opts.data));
    }
  }, {
    key: "_object2param",
    value: function _object2param(object) {
      return Object.entries(object).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(val));
      }).join('&');
    }
  }, {
    key: "_dateToUTC",
    value: function _dateToUTC(date) {
      return new Date(date).getTime();
    }
  }, {
    key: "startDate",
    get: function get() {
      return this.selectedStart;
    }
    /**
     * Returns selected end date if any
     * 
     * @returns {string}
     */

  }, {
    key: "endDate",
    get: function get() {
      return this.selectedEnd;
    }
  }]);

  return SimpleBookingCalendar;
}();