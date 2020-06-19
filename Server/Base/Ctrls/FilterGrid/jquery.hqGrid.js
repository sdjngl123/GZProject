/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2016
 * @version 1.3.4
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 * @see http://php.net/manual/en/function.date.php
 *
 * @github   https://github.com/xdan/datetimepicker
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
var DateFormatter;
! function () {
	"use strict";
	var t, e, r, n, a, u, i;
	u = 864e5, i = 3600, t = function (t, e) {
		return "string" == typeof t && "string" == typeof e && t.toLowerCase() === e.toLowerCase()
	}, e = function (t, r, n) {
		var a = n || "0",
			u = t.toString();
		return u.length < r ? e(a + u, r) : u
	}, r = function (t) {
		var e, n;
		for (t = t || {}, e = 1; e < arguments.length; e++)
			if (n = arguments[e])
				for (var a in n) n.hasOwnProperty(a) && ("object" == typeof n[a] ? r(t[a], n[a]) : t[a] = n[a]);
		return t
	}, n = function (t, e) {
		for (var r = 0; r < e.length; r++)
			if (e[r].toLowerCase() === t.toLowerCase()) return r;
		return -1
	}, a = {
		dateSettings: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			meridiem: ["AM", "PM"],
			ordinal: function (t) {
				var e = t % 10,
					r = {
						1: "st",
						2: "nd",
						3: "rd"
					};
				return 1 !== Math.floor(t % 100 / 10) && r[e] ? r[e] : "th"
			}
		},
		separators: /[ \-+\/\.T:@]/g,
		validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
		intParts: /[djwNzmnyYhHgGis]/g,
		tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		tzClip: /[^-+\dA-Z]/g
	}, DateFormatter = function (t) {
		var e = this,
			n = r(a, t);
		e.dateSettings = n.dateSettings, e.separators = n.separators, e.validParts = n.validParts, e.intParts = n.intParts, e.tzParts = n.tzParts, e.tzClip = n.tzClip
	}, DateFormatter.prototype = {
		constructor: DateFormatter,
		getMonth: function (t) {
			var e, r = this;
			return e = n(t, r.dateSettings.monthsShort) + 1, 0 === e && (e = n(t, r.dateSettings.months) + 1), e
		},
		parseDate: function (e, r) {
			var n, a, u, i, s, o, c, f, l, h, d = this,
				g = !1,
				m = !1,
				p = d.dateSettings,
				y = {
					date: null,
					year: null,
					month: null,
					day: null,
					hour: 0,
					min: 0,
					sec: 0
				};
			if (!e) return null;
			if (e instanceof Date) return e;
			if ("U" === r) return u = parseInt(e), u ? new Date(1e3 * u) : e;
			switch (typeof e) {
				case "number":
					return new Date(e);
				case "string":
					break;
				default:
					return null
			}
			if (n = r.match(d.validParts), !n || 0 === n.length) throw new Error("Invalid date format definition.");
			for (a = e.replace(d.separators, "\x00").split("\x00"), u = 0; u < a.length; u++) switch (i = a[u], s = parseInt(i), n[u]) {
				case "y":
				case "Y":
					if (!s) return null;
					l = i.length, y.year = 2 === l ? parseInt((70 > s ? "20" : "19") + i) : s, g = !0;
					break;
				case "m":
				case "n":
				case "M":
				case "F":
					if (isNaN(s)) {
						if (o = d.getMonth(i), !(o > 0)) return null;
						y.month = o
					} else {
						if (!(s >= 1 && 12 >= s)) return null;
						y.month = s
					}
					g = !0;
					break;
				case "d":
				case "j":
					if (!(s >= 1 && 31 >= s)) return null;
					y.day = s, g = !0;
					break;
				case "g":
				case "h":
					if (c = n.indexOf("a") > -1 ? n.indexOf("a") : n.indexOf("A") > -1 ? n.indexOf("A") : -1, h = a[c], c > -1) f = t(h, p.meridiem[0]) ? 0 : t(h, p.meridiem[1]) ? 12 : -1, s >= 1 && 12 >= s && f > -1 ? y.hour = s + f - 1 : s >= 0 && 23 >= s && (y.hour = s);
					else {
						if (!(s >= 0 && 23 >= s)) return null;
						y.hour = s
					}
					m = !0;
					break;
				case "G":
				case "H":
					if (!(s >= 0 && 23 >= s)) return null;
					y.hour = s, m = !0;
					break;
				case "i":
					if (!(s >= 0 && 59 >= s)) return null;
					y.min = s, m = !0;
					break;
				case "s":
					if (!(s >= 0 && 59 >= s)) return null;
					y.sec = s, m = !0
			}
			if (g === !0 && y.year && y.month && y.day) y.date = new Date(y.year, y.month - 1, y.day, y.hour, y.min, y.sec, 0);
			else {
				if (m !== !0) return null;
				y.date = new Date(0, 0, 0, y.hour, y.min, y.sec, 0)
			}
			return y.date
		},
		guessDate: function (t, e) {
			if ("string" != typeof t) return t;
			var r, n, a, u, i, s, o = this,
				c = t.replace(o.separators, "\x00").split("\x00"),
				f = /^[djmn]/g,
				l = e.match(o.validParts),
				h = new Date,
				d = 0;
			if (!f.test(l[0])) return t;
			for (a = 0; a < c.length; a++) {
				if (d = 2, i = c[a], s = parseInt(i.substr(0, 2)), isNaN(s)) return null;
				switch (a) {
					case 0:
						"m" === l[0] || "n" === l[0] ? h.setMonth(s - 1) : h.setDate(s);
						break;
					case 1:
						"m" === l[0] || "n" === l[0] ? h.setDate(s) : h.setMonth(s - 1);
						break;
					case 2:
						if (n = h.getFullYear(), r = i.length, d = 4 > r ? r : 4, n = parseInt(4 > r ? n.toString().substr(0, 4 - r) + i : i.substr(0, 4)), !n) return null;
						h.setFullYear(n);
						break;
					case 3:
						h.setHours(s);
						break;
					case 4:
						h.setMinutes(s);
						break;
					case 5:
						h.setSeconds(s)
				}
				u = i.substr(d), u.length > 0 && c.splice(a + 1, 0, u)
			}
			return h
		},
		parseFormat: function (t, r) {
			var n, a = this,
				s = a.dateSettings,
				o = /\\?(.?)/gi,
				c = function (t, e) {
					return n[t] ? n[t]() : e
				};
			return n = {
				d: function () {
					return e(n.j(), 2)
				},
				D: function () {
					return s.daysShort[n.w()]
				},
				j: function () {
					return r.getDate()
				},
				l: function () {
					return s.days[n.w()]
				},
				N: function () {
					return n.w() || 7
				},
				w: function () {
					return r.getDay()
				},
				z: function () {
					var t = new Date(n.Y(), n.n() - 1, n.j()),
						e = new Date(n.Y(), 0, 1);
					return Math.round((t - e) / u)
				},
				W: function () {
					var t = new Date(n.Y(), n.n() - 1, n.j() - n.N() + 3),
						r = new Date(t.getFullYear(), 0, 4);
					return e(1 + Math.round((t - r) / u / 7), 2)
				},
				F: function () {
					return s.months[r.getMonth()]
				},
				m: function () {
					return e(n.n(), 2)
				},
				M: function () {
					return s.monthsShort[r.getMonth()]
				},
				n: function () {
					return r.getMonth() + 1
				},
				t: function () {
					return new Date(n.Y(), n.n(), 0).getDate()
				},
				L: function () {
					var t = n.Y();
					return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0 ? 1 : 0
				},
				o: function () {
					var t = n.n(),
						e = n.W(),
						r = n.Y();
					return r + (12 === t && 9 > e ? 1 : 1 === t && e > 9 ? -1 : 0)
				},
				Y: function () {
					return r.getFullYear()
				},
				y: function () {
					return n.Y().toString().slice(-2)
				},
				a: function () {
					return n.A().toLowerCase()
				},
				A: function () {
					var t = n.G() < 12 ? 0 : 1;
					return s.meridiem[t]
				},
				B: function () {
					var t = r.getUTCHours() * i,
						n = 60 * r.getUTCMinutes(),
						a = r.getUTCSeconds();
					return e(Math.floor((t + n + a + i) / 86.4) % 1e3, 3)
				},
				g: function () {
					return n.G() % 12 || 12
				},
				G: function () {
					return r.getHours()
				},
				h: function () {
					return e(n.g(), 2)
				},
				H: function () {
					return e(n.G(), 2)
				},
				i: function () {
					return e(r.getMinutes(), 2)
				},
				s: function () {
					return e(r.getSeconds(), 2)
				},
				u: function () {
					return e(1e3 * r.getMilliseconds(), 6)
				},
				e: function () {
					var t = /\((.*)\)/.exec(String(r))[1];
					return t || "Coordinated Universal Time"
				},
				I: function () {
					var t = new Date(n.Y(), 0),
						e = Date.UTC(n.Y(), 0),
						r = new Date(n.Y(), 6),
						a = Date.UTC(n.Y(), 6);
					return t - e !== r - a ? 1 : 0
				},
				O: function () {
					var t = r.getTimezoneOffset(),
						n = Math.abs(t);
					return (t > 0 ? "-" : "+") + e(100 * Math.floor(n / 60) + n % 60, 4)
				},
				P: function () {
					var t = n.O();
					return t.substr(0, 3) + ":" + t.substr(3, 2)
				},
				T: function () {
					var t = (String(r).match(a.tzParts) || [""]).pop().replace(a.tzClip, "");
					return t || "UTC"
				},
				Z: function () {
					return 60 * -r.getTimezoneOffset()
				},
				c: function () {
					return "Y-m-d\\TH:i:sP".replace(o, c)
				},
				r: function () {
					return "D, d M Y H:i:s O".replace(o, c)
				},
				U: function () {
					return r.getTime() / 1e3 || 0
				}
			}, c(t, t)
		},
		formatDate: function (t, e) {
			var r, n, a, u, i, s = this,
				o = "",
				c = "\\";
			if ("string" == typeof t && (t = s.parseDate(t, e), !t)) return null;
			if (t instanceof Date) {
				for (a = e.length, r = 0; a > r; r++) i = e.charAt(r), "S" !== i && i !== c && (r > 0 && e.charAt(r - 1) === c ? o += i : (u = s.parseFormat(i, t), r !== a - 1 && s.intParts.test(i) && "S" === e.charAt(r + 1) && (n = parseInt(u) || 0, u += s.dateSettings.ordinal(n)), o += u));
				return o
			}
			return ""
		}
	}
}();
/**
 * @preserve jQuery DateTimePicker
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * @author Chupurnov Valeriy (<chupurnov@gmail.com>)
 */

/**
 * @param {jQuery} $
 */
var datetimepickerFactory = function ($) {
	'use strict';

	var default_options = {
		i18n: {
			ar: { // Arabic
				months: [
					"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
				],
				dayOfWeekShort: [
					"ن", "ث", "ع", "خ", "ج", "س", "ح"
				],
				dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
			},
			ro: { // Romanian
				months: [
					"Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
				],
				dayOfWeekShort: [
					"Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"
				],
				dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
			},
			id: { // Indonesian
				months: [
					"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"
				],
				dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
			},
			is: { // Icelandic
				months: [
					"Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
				],
				dayOfWeekShort: [
					"Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"
				],
				dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
			},
			bg: { // Bulgarian
				months: [
					"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
				],
				dayOfWeekShort: [
					"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				],
				dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
			},
			fa: { // Persian/Farsi
				months: [
					'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
				],
				dayOfWeekShort: [
					'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
				],
				dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
			},
			ru: { // Russian
				months: [
					'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
				],
				dayOfWeekShort: [
					"Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				],
				dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
			},
			uk: { // Ukrainian
				months: [
					'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
				],
				dayOfWeekShort: [
					"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
				],
				dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
			},
			en: { // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			el: { // Ελληνικά
				months: [
					"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
				],
				dayOfWeekShort: [
					"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
				],
				dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
			},
			de: { // German
				months: [
					'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
				],
				dayOfWeekShort: [
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				],
				dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
			},
			nl: { // Dutch
				months: [
					"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
				],
				dayOfWeekShort: [
					"zo", "ma", "di", "wo", "do", "vr", "za"
				],
				dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
			},
			tr: { // Turkish
				months: [
					"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
				],
				dayOfWeekShort: [
					"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
				],
				dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
			},
			fr: { //French
				months: [
					"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeekShort: [
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				],
				dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
			},
			es: { // Spanish
				months: [
					"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
				],
				dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
			},
			th: { // Thai
				months: [
					'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
				],
				dayOfWeekShort: [
					'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
				],
				dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
			},
			pl: { // Polish
				months: [
					"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
				],
				dayOfWeekShort: [
					"nd", "pn", "wt", "śr", "cz", "pt", "sb"
				],
				dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
			},
			pt: { // Portuguese
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			ch: { // Simplified Chinese
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				]
			},
			se: { // Swedish
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			km: { // Khmer (ភាសាខ្មែរ)
				months: [
					"មករា​", "កុម្ភៈ", "មិនា​", "មេសា​", "ឧសភា​", "មិថុនា​", "កក្កដា​", "សីហា​", "កញ្ញា​", "តុលា​", "វិច្ឆិកា", "ធ្នូ​"
				],
				dayOfWeekShort: ["អាទិ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហ​​", "សុក្រ​", "សៅរ៍"],
				dayOfWeek: ["អាទិត្យ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហស្បតិ៍​", "សុក្រ​", "សៅរ៍"]
			},
			kr: { // Korean
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeekShort: [
					"일", "월", "화", "수", "목", "금", "토"
				],
				dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
			},
			it: { // Italian
				months: [
					"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
				],
				dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
			},
			da: { // Dansk
				months: [
					"Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
			},
			no: { // Norwegian
				months: [
					"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
			},
			ja: { // Japanese
				months: [
					"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
				],
				dayOfWeekShort: [
					"日", "月", "火", "水", "木", "金", "土"
				],
				dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
			},
			vi: { // Vietnamese
				months: [
					"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
				],
				dayOfWeekShort: [
					"CN", "T2", "T3", "T4", "T5", "T6", "T7"
				],
				dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
			},
			sl: { // Slovenščina
				months: [
					"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
				],
				dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
			},
			cs: { // Čeština
				months: [
					"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
				]
			},
			hu: { // Hungarian
				months: [
					"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
				],
				dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
			},
			az: { //Azerbaijanian (Azeri)
				months: [
					"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
				],
				dayOfWeekShort: [
					"B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
				],
				dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
			},
			bs: { //Bosanski
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
			},
			ca: { //Català
				months: [
					"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
				],
				dayOfWeekShort: [
					"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
				],
				dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
			},
			'en-GB': { //English (British)
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			et: { //"Eesti"
				months: [
					"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
				],
				dayOfWeekShort: [
					"P", "E", "T", "K", "N", "R", "L"
				],
				dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
			},
			eu: { //Euskara
				months: [
					"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
				],
				dayOfWeekShort: [
					"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
				],
				dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
			},
			fi: { //Finnish (Suomi)
				months: [
					"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
				],
				dayOfWeekShort: [
					"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
				],
				dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
			},
			gl: { //Galego
				months: [
					"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
				],
				dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
			},
			hr: { //Hrvatski
				months: [
					"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
			},
			ko: { //Korean (한국어)
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeekShort: [
					"일", "월", "화", "수", "목", "금", "토"
				],
				dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
			},
			lt: { //Lithuanian (lietuvių)
				months: [
					"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
				],
				dayOfWeekShort: [
					"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
				],
				dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
			},
			lv: { //Latvian (Latviešu)
				months: [
					"Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
				],
				dayOfWeekShort: [
					"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
				],
				dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
			},
			mk: { //Macedonian (Македонски)
				months: [
					"јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
				],
				dayOfWeekShort: [
					"нед", "пон", "вто", "сре", "чет", "пет", "саб"
				],
				dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
			},
			mn: { //Mongolian (Монгол)
				months: [
					"1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
				],
				dayOfWeekShort: [
					"Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
				],
				dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
			},
			'pt-BR': { //Português(Brasil)
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			sk: { //Slovenčina
				months: [
					"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
				],
				dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
			},
			sq: { //Albanian (Shqip)
				months: [
					"Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
				],
				dayOfWeekShort: [
					"Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"
				],
				dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
			},
			'sr-YU': { //Serbian (Srpski)
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
			},
			sr: { //Serbian Cyrillic (Српски)
				months: [
					"јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
				],
				dayOfWeekShort: [
					"нед", "пон", "уто", "сре", "чет", "пет", "суб"
				],
				dayOfWeek: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
			},
			sv: { //Svenska
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				],
				dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
			},
			'zh-TW': { //Traditional Chinese (繁體中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				],
				dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
			},
			zh: { //Simplified Chinese (简体中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				],
				dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
			},
			ug: { // Uyghur(ئۇيغۇرچە)
				months: [
					"1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي"
				],
				dayOfWeek: [
					"يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"
				]
			},
			he: { //Hebrew (עברית)
				months: [
					'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
				],
				dayOfWeekShort: [
					'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
				],
				dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
			},
			hy: { // Armenian
				months: [
					"Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
				],
				dayOfWeekShort: [
					"Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"
				],
				dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
			},
			kg: { // Kyrgyz
				months: [
					'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
				],
				dayOfWeekShort: [
					"Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"
				],
				dayOfWeek: [
					"Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"
				]
			},
			rm: { // Romansh
				months: [
					"Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"
				],
				dayOfWeek: [
					"Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"
				]
			},
			ka: { // Georgian
				months: [
					'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
				],
				dayOfWeekShort: [
					"კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"
				],
				dayOfWeek: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
			}
		},

		ownerDocument: document,
		contentWindow: window,

		value: '',
		rtl: false,

		format: 'Y/m/d H:i',
		formatTime: 'H:i',
		formatDate: 'Y/m/d',

		startDate: false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
		step: 60,
		monthChangeSpinner: true,

		closeOnDateSelect: false,
		closeOnTimeSelect: true,
		closeOnWithoutClick: true,
		closeOnInputClick: true,

		timepicker: true,
		datepicker: true,
		weeks: false,

		defaultTime: false, // use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate: false, // use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

		minDate: false,
		maxDate: false,
		minTime: false,
		maxTime: false,
		minDateTime: false,

		disabledMinTime: false,
		disabledMaxTime: false,

		allowTimes: [],
		opened: false,
		initTime: true,
		inline: false,
		theme: '',

		onSelectDate: function () {},
		onSelectTime: function () {},
		onChangeMonth: function () {},
		onGetWeekOfYear: function () {},
		onChangeYear: function () {},
		onChangeDateTime: function () {},
		onShow: function () {},
		onClose: function () {},
		onGenerate: function () {},

		withoutCopyright: true,
		inverseButton: false,
		hours12: false,
		next: 'xdsoft_next',
		prev: 'xdsoft_prev',
		dayOfWeekStart: 0,
		parentID: 'body',
		//hq 关联坐标
		coordinate: null,

		timeHeightInTimePicker: 25,
		timepickerScrollbar: true,
		todayButton: true,
		prevButton: true,
		nextButton: true,
		defaultSelect: true,

		scrollMonth: true,
		scrollTime: true,
		scrollInput: true,

		lazyInit: false,
		mask: false,
		validateOnBlur: true,
		allowBlank: true,
		yearStart: 1950,
		yearEnd: 2050,
		monthStart: 0,
		monthEnd: 11,
		style: '',
		id: '',
		fixed: false,
		roundTime: 'round', // ceil, floor
		className: '',
		weekends: [],
		highlightedDates: [],
		highlightedPeriods: [],
		allowDates: [],
		allowDateRe: null,
		disabledDates: [],
		disabledWeekDays: [],
		yearOffset: 0,
		beforeShowDay: null,

		enterLikeTab: true,
		showApplyButton: false
	};

	var dateHelper = null,
		globalLocaleDefault = 'en',
		globalLocale = 'en';

	var dateFormatterOptionsDefault = {
		meridiem: ['AM', 'PM']
	};

	var initDateFormatter = function () {
		var locale = default_options.i18n[globalLocale],
			opts = {
				days: locale.dayOfWeek,
				daysShort: locale.dayOfWeekShort,
				months: locale.months,
				monthsShort: $.map(locale.months, function (n) {
					return n.substring(0, 3)
				})
			};

		if (typeof DateFormatter === 'function') {
			dateHelper = new DateFormatter({
				dateSettings: $.extend({}, dateFormatterOptionsDefault, opts)
			});
		}
	};

	// for locale settings
	$.hqDatetimepicker = {
		setLocale: function (locale) {
			var newLocale = default_options.i18n[locale] ? locale : globalLocaleDefault;
			if (globalLocale !== newLocale) {
				globalLocale = newLocale;
				// reinit date formatter
				initDateFormatter();
			}
		},

		setDateFormatter: function (dateFormatter) {
			dateHelper = dateFormatter;
		},

		RFC_2822: 'D, d M Y H:i:s O',
		ATOM: 'Y-m-d\TH:i:sP',
		ISO_8601: 'Y-m-d\TH:i:sO',
		RFC_822: 'D, d M y H:i:s O',
		RFC_850: 'l, d-M-y H:i:s T',
		RFC_1036: 'D, d M y H:i:s O',
		RFC_1123: 'D, d M Y H:i:s O',
		RSS: 'D, d M Y H:i:s O',
		W3C: 'Y-m-d\TH:i:sP'
	};

	// first init date formatter
	initDateFormatter();

	// fix for ie8
	if (!window.getComputedStyle) {
		window.getComputedStyle = function (el) {
			this.el = el;
			this.getPropertyValue = function (prop) {
				var re = /(-([a-z]))/g;
				if (prop === 'float') {
					prop = 'styleFloat';
				}
				if (re.test(prop)) {
					prop = prop.replace(re, function (a, b, c) {
						return c.toUpperCase();
					});
				}
				return el.currentStyle[prop] || null;
			};
			return this;
		};
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			var i, j;
			for (i = (start || 0), j = this.length; i < j; i += 1) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}

	Date.prototype.countDaysInMonth = function () {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	};

	$.fn.xdsoftScroller = function (options, percent) {
		return this.each(function () {
			var timeboxparent = $(this),
				pointerEventToXY = function (e) {
					var out = {
							x: 0,
							y: 0
						},
						touch;
					if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
						touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						out.x = touch.clientX;
						out.y = touch.clientY;
					} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
						out.x = e.clientX;
						out.y = e.clientY;
					}
					return out;
				},
				timebox,
				parentHeight,
				height,
				scrollbar,
				scroller,
				maximumOffset = 100,
				start = false,
				startY = 0,
				startTop = 0,
				h1 = 0,
				touchStart = false,
				startTopScroll = 0,
				calcOffset = function () {};

			if (percent === 'hide') {
				timeboxparent.find('.xdsoft_scrollbar').hide();
				return;
			}

			if (!$(this).hasClass('xdsoft_scroller_box')) {
				timebox = timeboxparent.children().eq(0);
				parentHeight = timeboxparent[0].clientHeight;
				height = timebox[0].offsetHeight;
				scrollbar = $('<div class="xdsoft_scrollbar"></div>');
				scroller = $('<div class="xdsoft_scroller"></div>');
				scrollbar.append(scroller);

				timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
				calcOffset = function calcOffset(event) {
					var offset = pointerEventToXY(event).y - startY + startTopScroll;
					if (offset < 0) {
						offset = 0;
					}
					if (offset + scroller[0].offsetHeight > h1) {
						offset = h1 - scroller[0].offsetHeight;
					}
					timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
				};

				scroller
					.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
						}

						startY = pointerEventToXY(event).y;
						startTopScroll = parseInt(scroller.css('margin-top'), 10);
						h1 = scrollbar[0].offsetHeight;

						if (event.type === 'mousedown' || event.type === 'touchstart') {
							if (options.ownerDocument) {
								$(options.ownerDocument.body).addClass('xdsoft_noselect');
							}
							$([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft_scroller', function arguments_callee() {
								$([options.ownerDocument.body, options.contentWindow]).off('touchend mouseup.xdsoft_scroller', arguments_callee)
									.off('mousemove.xdsoft_scroller', calcOffset)
									.removeClass('xdsoft_noselect');
							});
							$(options.ownerDocument.body).on('mousemove.xdsoft_scroller', calcOffset);
						} else {
							touchStart = true;
							event.stopPropagation();
							event.preventDefault();
						}
					})
					.on('touchmove', function (event) {
						if (touchStart) {
							event.preventDefault();
							calcOffset(event);
						}
					})
					.on('touchend touchcancel', function () {
						touchStart = false;
						startTopScroll = 0;
					});

				timeboxparent
					.on('scroll_element.xdsoft_scroller', function (event, percentage) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
						}
						percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

						scroller.css('margin-top', maximumOffset * percentage);

						setTimeout(function () {
							timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
						}, 10);
					})
					.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
						var percent, sh;
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						percent = parentHeight / height;
						sh = percent * scrollbar[0].offsetHeight;
						if (percent > 1) {
							scroller.hide();
						} else {
							scroller.show();
							scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
							maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
							if (noTriggerScroll !== true) {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
							}
						}
					});

				timeboxparent.on('mousewheel', function (event) {
					var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

					top = top - (event.deltaY * 20);
					if (top < 0) {
						top = 0;
					}

					timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
					event.stopPropagation();
					return false;
				});

				timeboxparent.on('touchstart', function (event) {
					start = pointerEventToXY(event);
					startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
				});

				timeboxparent.on('touchmove', function (event) {
					if (start) {
						event.preventDefault();
						var coord = pointerEventToXY(event);
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
					}
				});

				timeboxparent.on('touchend touchcancel', function () {
					start = false;
					startTop = 0;
				});
			}
			timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
		});
	};

	$.fn.hqDatetimepicker = function (opt, opt2) {
		var result = this,
			KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
			ctrlDown = false,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

			lazyInitTimer = 0,
			createDateTimePicker,
			destroyDateTimePicker,

			lazyInit = function (input) {
				input
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function initOnActionCallback() {
						if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
							return;
						}
						clearTimeout(lazyInitTimer);
						lazyInitTimer = setTimeout(function () {

							if (!input.data('xdsoft_datetimepicker')) {
								createDateTimePicker(input);
							}
							input
								.off('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', initOnActionCallback)
								.trigger('open.xdsoft');
						}, 100);
					});
			};

		//hq
		createDateTimePicker = function (input) {

			var datetimepicker = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
				xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
				datepicker = $('<div class="xdsoft_datepicker active"></div>'),
				month_picker = $('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
					'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
					'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
					'<button type="button" class="xdsoft_next"></button></div>'),
				calendar = $('<div class="xdsoft_calendar"></div>'),
				timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
				timebox = $('<div class="xdsoft_time_variant"></div>'),
				applyButton = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),

				monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
				yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
				triggerAfterOpen = false,
				XDSoft_datetime,

				xchangeTimer,
				timerclick,
				current_time_index,
				setPos,
				timer = 0,
				_xdsoft_datetime,
				forEachAncestorOf;

			if (options.id) {
				datetimepicker.attr('id', options.id);
			}
			if (options.style) {
				datetimepicker.attr('style', options.style);
			}
			if (options.weeks) {
				datetimepicker.addClass('xdsoft_showweeks');
			}
			if (options.rtl) {
				datetimepicker.addClass('xdsoft_rtl');
			}
			if (options.datepicker) {
				datetimepicker.addClass('xdsoft_datepicker');
			}
			if (options.timepicker) {
				datetimepicker.addClass('xdsoft_timepicker');
			}

			datetimepicker.addClass('xdsoft_' + options.theme);
			datetimepicker.addClass(options.className);


			month_picker
				.find('.xdsoft_month span')
				.after(monthselect);
			month_picker
				.find('.xdsoft_year span')
				.after(yearselect);

			month_picker
				.find('.xdsoft_month,.xdsoft_year')
				.on('touchstart mousedown.xdsoft', function (event) {
					var select = $(this).find('.xdsoft_select').eq(0),
						val = 0,
						top = 0,
						visible = select.is(':visible'),
						items,
						i;

					month_picker
						.find('.xdsoft_select')
						.hide();
					if (_xdsoft_datetime.currentTime) {
						val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
					}

					select[visible ? 'hide' : 'show']();
					for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
						if (items.eq(i).data('value') === val) {
							break;
						} else {
							top += items[0].offsetHeight;
						}
					}

					select.xdsoftScroller(options, top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
					event.stopPropagation();
					return false;
				});

			month_picker
				.find('.xdsoft_select')
				.xdsoftScroller(options)
				.on('touchstart mousedown.xdsoft', function (event) {
					this.touchmoved = false;
					event.stopPropagation();
					event.preventDefault();
				})
				.on('touchmove', '.xdsoft_option', function () {
					this.touchmoved = true;
				})
				.on('touchend mousedown.xdsoft', '.xdsoft_option', function () {
					if (!this.touchmoved) {
						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var year = _xdsoft_datetime.currentTime.getFullYear();
						if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
							_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
						}

						$(this).parent().parent().hide();

						datetimepicker.trigger('xchange.xdsoft');
						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
							options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
					}
				});

			datetimepicker.getValue = function () {
				return _xdsoft_datetime.getCurrentTime();
			};

			datetimepicker.setOptions = function (_options) {
				var highlightedDates = {};

				options = $.extend(true, {}, options, _options);

				if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
					options.allowTimes = $.extend(true, [], _options.allowTimes);
				}

				if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
					options.weekends = $.extend(true, [], _options.weekends);
				}

				if (_options.allowDates && $.isArray(_options.allowDates) && _options.allowDates.length) {
					options.allowDates = $.extend(true, [], _options.allowDates);
				}

				if (_options.allowDateRe && Object.prototype.toString.call(_options.allowDateRe) === "[object String]") {
					options.allowDateRe = new RegExp(_options.allowDateRe);
				}

				if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
					$.each(_options.highlightedDates, function (index, value) {
						var splitData = $.map(value.split(','), $.trim),
							exDesc,
							hDate = new HighlightedDate(dateHelper.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
							keyDate = dateHelper.formatDate(hDate.date, options.formatDate);
						if (highlightedDates[keyDate] !== undefined) {
							exDesc = highlightedDates[keyDate].desc;
							if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
								highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
							}
						} else {
							highlightedDates[keyDate] = hDate;
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
					highlightedDates = $.extend(true, [], options.highlightedDates);
					$.each(_options.highlightedPeriods, function (index, value) {
						var dateTest, // start date
							dateEnd,
							desc,
							hDate,
							keyDate,
							exDesc,
							style;
						if ($.isArray(value)) {
							dateTest = value[0];
							dateEnd = value[1];
							desc = value[2];
							style = value[3];
						} else {
							var splitData = $.map(value.split(','), $.trim);
							dateTest = dateHelper.parseDate(splitData[0], options.formatDate);
							dateEnd = dateHelper.parseDate(splitData[1], options.formatDate);
							desc = splitData[2];
							style = splitData[3];
						}

						while (dateTest <= dateEnd) {
							hDate = new HighlightedDate(dateTest, desc, style);
							keyDate = dateHelper.formatDate(dateTest, options.formatDate);
							dateTest.setDate(dateTest.getDate() + 1);
							if (highlightedDates[keyDate] !== undefined) {
								exDesc = highlightedDates[keyDate].desc;
								if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
									highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
								}
							} else {
								highlightedDates[keyDate] = hDate;
							}
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
					options.disabledDates = $.extend(true, [], _options.disabledDates);
				}

				if (_options.disabledWeekDays && $.isArray(_options.disabledWeekDays) && _options.disabledWeekDays.length) {
					options.disabledWeekDays = $.extend(true, [], _options.disabledWeekDays);
				}

				if ((options.open || options.opened) && (!options.inline)) {
					input.trigger('open.xdsoft');
				}

				if (options.inline) {
					triggerAfterOpen = true;
					datetimepicker.addClass('xdsoft_inline');
					input.after(datetimepicker).hide();
				}

				if (options.inverseButton) {
					options.next = 'xdsoft_prev';
					options.prev = 'xdsoft_next';
				}

				if (options.datepicker) {
					datepicker.addClass('active');
				} else {
					datepicker.removeClass('active');
				}

				if (options.timepicker) {
					timepicker.addClass('active');
				} else {
					timepicker.removeClass('active');
				}

				if (options.value) {
					_xdsoft_datetime.setCurrentTime(options.value);
					if (input && input.val) {
						input.val(_xdsoft_datetime.str);
					}
				}

				if (isNaN(options.dayOfWeekStart)) {
					options.dayOfWeekStart = 0;
				} else {
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
				}

				if (!options.timepickerScrollbar) {
					timeboxparent.xdsoftScroller(options, 'hide');
				}

				if (options.minDate && /^[\+\-](.*)$/.test(options.minDate)) {
					options.minDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.minDate), options.formatDate);
				}

				if (options.maxDate && /^[\+\-](.*)$/.test(options.maxDate)) {
					options.maxDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.maxDate), options.formatDate);
				}

				if (options.minDateTime && /^\+(.*)$/.test(options.minDateTime)) {
					options.minDateTime = _xdsoft_datetime.strToDateTime(options.minDateTime).dateFormat(options.formatDate);
				}

				applyButton.toggle(options.showApplyButton);

				month_picker
					.find('.xdsoft_today_button')
					.css('visibility', !options.todayButton ? 'hidden' : 'visible');

				month_picker
					.find('.' + options.prev)
					.css('visibility', !options.prevButton ? 'hidden' : 'visible');

				month_picker
					.find('.' + options.next)
					.css('visibility', !options.nextButton ? 'hidden' : 'visible');

				setMask(options);

				if (options.validateOnBlur) {
					input
						.off('blur.xdsoft')
						.on('blur.xdsoft', function () {
							if (options.allowBlank && (!$.trim($(this).val()).length ||
									(typeof options.mask === "string" && $.trim($(this).val()) === options.mask.replace(/[0-9]/g, '_')))) {
								$(this).val(null);
								datetimepicker.data('xdsoft_datetime').empty();
							} else {
								var d = dateHelper.parseDate($(this).val(), options.format);
								if (d) { // parseDate() may skip some invalid parts like date or time, so make it clear for user: show parsed date/time
									$(this).val(dateHelper.formatDate(d, options.format));
								} else {
									var splittedHours = +([$(this).val()[0], $(this).val()[1]].join('')),
										splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

									// parse the numbers as 0312 => 03:12
									if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
										$(this).val([splittedHours, splittedMinutes].map(function (item) {
											return item > 9 ? item : '0' + item;
										}).join(':'));
									} else {
										$(this).val(dateHelper.formatDate(_xdsoft_datetime.now(), options.format));
									}
								}
								datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
							}

							datetimepicker.trigger('changedatetime.xdsoft');
							datetimepicker.trigger('close.xdsoft');
						});
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

				datetimepicker
					.trigger('xchange.xdsoft')
					.trigger('afterOpen.xdsoft');
			};

			datetimepicker
				.data('options', options)
				.on('touchstart mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
					yearselect.hide();
					monthselect.hide();
					return false;
				});

			//scroll_element = timepicker.find('.xdsoft_time_box');
			timeboxparent.append(timebox);
			timeboxparent.xdsoftScroller(options);

			datetimepicker.on('afterOpen.xdsoft', function () {
				timeboxparent.xdsoftScroller(options);
			});

			datetimepicker
				.append(datepicker)
				.append(timepicker);

			if (options.withoutCopyright !== true) {
				datetimepicker
					.append(xdsoft_copyright);
			}

			datepicker
				.append(month_picker)
				.append(calendar)
				.append(applyButton);

			$(options.parentID)
				.append(datetimepicker);

			XDSoft_datetime = function () {
				var _this = this;
				_this.now = function (norecursion) {
					var d = new Date(),
						date,
						time;

					if (!norecursion && options.defaultDate) {
						date = _this.strToDateTime(options.defaultDate);
						d.setFullYear(date.getFullYear());
						d.setMonth(date.getMonth());
						d.setDate(date.getDate());
					}

					if (options.yearOffset) {
						d.setFullYear(d.getFullYear() + options.yearOffset);
					}

					if (!norecursion && options.defaultTime) {
						time = _this.strtotime(options.defaultTime);
						d.setHours(time.getHours());
						d.setMinutes(time.getMinutes());
					}
					return d;
				};

				_this.isValidDate = function (d) {
					if (Object.prototype.toString.call(d) !== "[object Date]") {
						return false;
					}
					return !isNaN(d.getTime());
				};

				_this.setCurrentTime = function (dTime, requireValidDate) {
					if (typeof dTime === 'string') {
						_this.currentTime = _this.strToDateTime(dTime);
					} else if (_this.isValidDate(dTime)) {
						_this.currentTime = dTime;
					} else if (!dTime && !requireValidDate && options.allowBlank && !options.inline) {
						_this.currentTime = null;
					} else {
						_this.currentTime = _this.now();
					}

					datetimepicker.trigger('xchange.xdsoft');
				};

				_this.empty = function () {
					_this.currentTime = null;
				};

				_this.getCurrentTime = function () {
					return _this.currentTime;
				};

				_this.nextMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() + 1,
						year;
					if (month === 12) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
						month = 0;
					}

					year = _this.currentTime.getFullYear();

					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);

					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.prevMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() - 1;
					if (month === -1) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
						month = 11;
					}
					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.getWeekOfYear = function (datetime) {
					if (options.onGetWeekOfYear && $.isFunction(options.onGetWeekOfYear)) {
						var week = options.onGetWeekOfYear.call(datetimepicker, datetime);
						if (typeof week !== 'undefined') {
							return week;
						}
					}
					var onejan = new Date(datetime.getFullYear(), 0, 1);

					//First week of the year is th one with the first Thursday according to ISO8601
					if (onejan.getDay() !== 4) {
						onejan.setMonth(0, 1 + ((4 - onejan.getDay() + 7) % 7));
					}

					return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};

				_this.strToDateTime = function (sDateTime) {
					var tmpDate = [],
						timeOffset, currentTime;

					if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
						return sDateTime;
					}

					tmpDate = /^([+-]{1})(.*)$/.exec(sDateTime);

					if (tmpDate) {
						tmpDate[2] = dateHelper.parseDate(tmpDate[2], options.formatDate);
					}

					if (tmpDate && tmpDate[2]) {
						timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
						currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
					} else {
						currentTime = sDateTime ? dateHelper.parseDate(sDateTime, options.format) : _this.now();
					}

					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now();
					}

					return currentTime;
				};

				_this.strToDate = function (sDate) {
					if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
						return sDate;
					}

					var currentTime = sDate ? dateHelper.parseDate(sDate, options.formatDate) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.strtotime = function (sTime) {
					if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
						return sTime;
					}
					var currentTime = sTime ? dateHelper.parseDate(sTime, options.formatTime) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.str = function () {
					return dateHelper.formatDate(_this.currentTime, options.format);
				};
				_this.currentTime = this.now();
			};

			_xdsoft_datetime = new XDSoft_datetime();

			applyButton.on('touchend click', function (e) { //pathbrite
				e.preventDefault();
				datetimepicker.data('changed', true);
				_xdsoft_datetime.setCurrentTime(getCurrentValue());
				input.val(_xdsoft_datetime.str());
				datetimepicker.trigger('close.xdsoft');
			});
			month_picker
				.find('.xdsoft_today_button')
				.on('touchend mousedown.xdsoft', function () {
					datetimepicker.data('changed', true);
					_xdsoft_datetime.setCurrentTime(0, true);
					datetimepicker.trigger('afterOpen.xdsoft');
				}).on('dblclick.xdsoft', function () {
					var currentDate = _xdsoft_datetime.getCurrentTime(),
						minDate, maxDate;
					currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
					minDate = _xdsoft_datetime.strToDate(options.minDate);
					minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
					if (currentDate < minDate) {
						return;
					}
					maxDate = _xdsoft_datetime.strToDate(options.maxDate);
					maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
					if (currentDate > maxDate) {
						return;
					}
					input.val(_xdsoft_datetime.str());
					input.trigger('change');
					datetimepicker.trigger('close.xdsoft');
				});
			month_picker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('touchend mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false;

					(function arguments_callee1(v) {
						if ($this.hasClass(options.next)) {
							_xdsoft_datetime.nextMonth();
						} else if ($this.hasClass(options.prev)) {
							_xdsoft_datetime.prevMonth();
						}
						if (options.monthChangeSpinner) {
							if (!stop) {
								timer = setTimeout(arguments_callee1, v || 100);
							}
						}
					}(500));

					$([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee2() {
						clearTimeout(timer);
						stop = true;
						$([options.ownerDocument.body, options.contentWindow]).off('touchend mouseup.xdsoft', arguments_callee2);
					});
				});

			timepicker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('touchend mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false,
						period = 110;
					(function arguments_callee4(v) {
						var pheight = timeboxparent[0].clientHeight,
							height = timebox[0].offsetHeight,
							top = Math.abs(parseInt(timebox.css('marginTop'), 10));
						if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
							timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
						} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
							timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
						}
						/**
						 * Fixed bug:
						 * When using css3 transition, it will cause a bug that you cannot scroll the timepicker list.
						 * The reason is that the transition-duration time, if you set it to 0, all things fine, otherwise, this
						 * would cause a bug when you use jquery.css method.
						 * Let's say: * { transition: all .5s ease; }
						 * jquery timebox.css('marginTop') will return the original value which is before you clicking the next/prev button,
						 * meanwhile the timebox[0].style.marginTop will return the right value which is after you clicking the
						 * next/prev button.
						 *
						 * What we should do:
						 * Replace timebox.css('marginTop') with timebox[0].style.marginTop.
						 */
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox[0].style.marginTop, 10) / (height - pheight))]);
						period = (period > 10) ? 10 : period - 10;
						if (!stop) {
							timer = setTimeout(arguments_callee4, v || period);
						}
					}(500));
					$([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee5() {
						clearTimeout(timer);
						stop = true;
						$([options.ownerDocument.body, options.contentWindow])
							.off('touchend mouseup.xdsoft', arguments_callee5);
					});
				});

			xchangeTimer = 0;
			// base handler - generating a calendar and timepicker
			datetimepicker
				.on('xchange.xdsoft', function (event) {
					clearTimeout(xchangeTimer);
					xchangeTimer = setTimeout(function () {

						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var table = '',
							start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
							i = 0,
							j,
							today = _xdsoft_datetime.now(),
							maxDate = false,
							minDate = false,
							minDateTime = false,
							hDate,
							day,
							d,
							y,
							m,
							w,
							classes = [],
							customDateSettings,
							newRow = true,
							time = '',
							h,
							line_time,
							description;

						while (start.getDay() !== options.dayOfWeekStart) {
							start.setDate(start.getDate() - 1);
						}

						table += '<table><thead><tr>';

						if (options.weeks) {
							table += '<th></th>';
						}

						for (j = 0; j < 7; j += 1) {
							table += '<th>' + options.i18n[globalLocale].dayOfWeekShort[(j + options.dayOfWeekStart) % 7] + '</th>';
						}

						table += '</tr></thead>';
						table += '<tbody>';

						if (options.maxDate !== false) {
							maxDate = _xdsoft_datetime.strToDate(options.maxDate);
							maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
						}

						if (options.minDate !== false) {
							minDate = _xdsoft_datetime.strToDate(options.minDate);
							minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
						}

						if (options.minDateTime !== false) {
							minDateTime = _xdsoft_datetime.strToDate(options.minDateTime);
							minDateTime = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), minDateTime.getHours(), minDateTime.getMinutes(), minDateTime.getSeconds());
						}

						while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
							classes = [];
							i += 1;

							day = start.getDay();
							d = start.getDate();
							y = start.getFullYear();
							m = start.getMonth();
							w = _xdsoft_datetime.getWeekOfYear(start);
							description = '';

							classes.push('xdsoft_date');

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
								customDateSettings = options.beforeShowDay.call(datetimepicker, start);
							} else {
								customDateSettings = null;
							}

							if (options.allowDateRe && Object.prototype.toString.call(options.allowDateRe) === "[object RegExp]") {
								if (!options.allowDateRe.test(dateHelper.formatDate(start, options.formatDate))) {
									classes.push('xdsoft_disabled');
								}
							}

							if (options.allowDates && options.allowDates.length > 0) {
								if (options.allowDates.indexOf(dateHelper.formatDate(start, options.formatDate)) === -1) {
									classes.push('xdsoft_disabled');
								}
							}

							if ((maxDate !== false && start > maxDate) || (minDateTime !== false && start < minDateTime) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
								classes.push('xdsoft_disabled');
							}

							if (options.disabledDates.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
								classes.push('xdsoft_disabled');
							}

							if (options.disabledWeekDays.indexOf(day) !== -1) {
								classes.push('xdsoft_disabled');
							}

							if (input.is('[disabled]')) {
								classes.push('xdsoft_disabled');
							}

							if (customDateSettings && customDateSettings[1] !== "") {
								classes.push(customDateSettings[1]);
							}

							if (_xdsoft_datetime.currentTime.getMonth() !== m) {
								classes.push('xdsoft_other_month');
							}

							if ((options.defaultSelect || datetimepicker.data('changed')) && dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
								classes.push('xdsoft_current');
							}

							if (dateHelper.formatDate(today, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
								classes.push('xdsoft_today');
							}

							if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
								classes.push('xdsoft_weekend');
							}

							if (options.highlightedDates[dateHelper.formatDate(start, options.formatDate)] !== undefined) {
								hDate = options.highlightedDates[dateHelper.formatDate(start, options.formatDate)];
								classes.push(hDate.style === undefined ? 'xdsoft_highlighted_default' : hDate.style);
								description = hDate.desc === undefined ? '' : hDate.desc;
							}

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
								classes.push(options.beforeShowDay(start));
							}

							if (newRow) {
								table += '<tr>';
								newRow = false;
								if (options.weeks) {
									table += '<th>' + w + '</th>';
								}
							}

							table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
								'<div>' + d + '</div>' +
								'</td>';

							if (start.getDay() === options.dayOfWeekStartPrev) {
								table += '</tr>';
								newRow = true;
							}

							start.setDate(d + 1);
						}
						table += '</tbody></table>';

						calendar.html(table);

						month_picker.find('.xdsoft_label span').eq(0).text(options.i18n[globalLocale].months[_xdsoft_datetime.currentTime.getMonth()]);
						month_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

						// generate timebox
						time = '';
						h = '';
						m = '';

						line_time = function line_time(h, m) {
							var now = _xdsoft_datetime.now(),
								optionDateTime, current_time,
								isALlowTimesInit = options.allowTimes && $.isArray(options.allowTimes) && options.allowTimes.length;
							now.setHours(h);
							h = parseInt(now.getHours(), 10);
							now.setMinutes(m);
							m = parseInt(now.getMinutes(), 10);
							optionDateTime = new Date(_xdsoft_datetime.currentTime);
							optionDateTime.setHours(h);
							optionDateTime.setMinutes(m);
							classes = [];
							if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
								classes.push('xdsoft_disabled');
							} else if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || ((options.disabledMinTime !== false && now.getTime() > _xdsoft_datetime.strtotime(options.disabledMinTime).getTime()) && (options.disabledMaxTime !== false && now.getTime() < _xdsoft_datetime.strtotime(options.disabledMaxTime).getTime()))) {
								classes.push('xdsoft_disabled');
							} else if (input.is('[disabled]')) {
								classes.push('xdsoft_disabled');
							}

							current_time = new Date(_xdsoft_datetime.currentTime);
							current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));

							if (!isALlowTimesInit) {
								current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
							}

							if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && ((!isALlowTimesInit && options.step > 59) || current_time.getMinutes() === parseInt(m, 10))) {
								if (options.defaultSelect || datetimepicker.data('changed')) {
									classes.push('xdsoft_current');
								} else if (options.initTime) {
									classes.push('xdsoft_init_time');
								}
							}
							if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
								classes.push('xdsoft_today');
							}
							time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + dateHelper.formatDate(now, options.formatTime) + '</div>';
						};

						if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
							for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
								for (j = 0; j < 60; j += options.step) {
									h = (i < 10 ? '0' : '') + i;
									m = (j < 10 ? '0' : '') + j;
									line_time(h, m);
								}
							}
						} else {
							for (i = 0; i < options.allowTimes.length; i += 1) {
								h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
								m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
								line_time(h, m);
							}
						}

						timebox.html(time);

						opt = '';

						for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
						}
						yearselect.children().eq(0)
							.html(opt);

						for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[globalLocale].months[i] + '</div>';
						}
						monthselect.children().eq(0).html(opt);
						$(datetimepicker)
							.trigger('generate.xdsoft');
					}, 10);
					event.stopPropagation();
				})
				.on('afterOpen.xdsoft', function () {
					if (options.timepicker) {
						var classType, pheight, height, top;
						if (timebox.find('.xdsoft_current').length) {
							classType = '.xdsoft_current';
						} else if (timebox.find('.xdsoft_init_time').length) {
							classType = '.xdsoft_init_time';
						}
						if (classType) {
							pheight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
							if ((height - pheight) < top) {
								top = height - pheight;
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
						} else {
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
						}
					}
				});

			timerclick = 0;
			calendar
				.on('touchend click.xdsoft', 'td', function (xdevent) {
					xdevent.stopPropagation(); // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}

					currentTime.setDate(1);
					currentTime.setFullYear($this.data('year'));
					currentTime.setMonth($this.data('month'));
					currentTime.setDate($this.data('date'));

					datetimepicker.trigger('select.xdsoft', [currentTime]);

					input.val(_xdsoft_datetime.str());

					if (options.onSelectDate && $.isFunction(options.onSelectDate)) {
						options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}

					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === false && !options.timepicker))) && !options.inline) {
						datetimepicker.trigger('close.xdsoft');
					}
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});

			timebox
				.on('touchstart', 'div', function (xdevent) {
					this.touchmoved = false;
				})
				.on('touchmove', 'div', function (xdevent) {
					this.touchmoved = true;
				})
				.on('touchend click.xdsoft', 'div', function (xdevent) {
					if (!this.touchmoved) {
						xdevent.stopPropagation();
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;

						if (currentTime === undefined || currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							currentTime = _xdsoft_datetime.currentTime;
						}

						if ($this.hasClass('xdsoft_disabled')) {
							return false;
						}
						currentTime.setHours($this.data('hour'));
						currentTime.setMinutes($this.data('minute'));
						datetimepicker.trigger('select.xdsoft', [currentTime]);

						datetimepicker.data('input').val(_xdsoft_datetime.str());

						if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
							options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
						}
						datetimepicker.data('changed', true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
						if (options.inline !== true && options.closeOnTimeSelect === true) {
							datetimepicker.trigger('close.xdsoft');
						}
					}
				});

			datepicker
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollMonth) {
						return true;
					}
					if (event.deltaY < 0) {
						_xdsoft_datetime.nextMonth();
					} else {
						_xdsoft_datetime.prevMonth();
					}
					return false;
				});

			input
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollInput) {
						return true;
					}
					if (!options.datepicker && options.timepicker) {
						current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
						if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
							current_time_index += event.deltaY;
						}
						if (timebox.children().eq(current_time_index).length) {
							timebox.children().eq(current_time_index).trigger('mousedown');
						}
						return false;
					}
					if (options.datepicker && !options.timepicker) {
						datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
						if (input.val) {
							input.val(_xdsoft_datetime.str());
						}
						datetimepicker.trigger('changedatetime.xdsoft');
						return false;
					}
				});

			datetimepicker
				.on('changedatetime.xdsoft', function (event) {
					if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
						var $input = datetimepicker.data('input');
						options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
						delete options.value;
						$input.trigger('change');
					}
				})
				.on('generate.xdsoft', function () {
					if (options.onGenerate && $.isFunction(options.onGenerate)) {
						options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					if (triggerAfterOpen) {
						datetimepicker.trigger('afterOpen.xdsoft');
						triggerAfterOpen = false;
					}
				})
				.on('click.xdsoft', function (xdevent) {
					xdevent.stopPropagation();
				});

			current_time_index = 0;

			/**
			 * Runs the callback for each of the specified node's ancestors.
			 *
			 * Return FALSE from the callback to stop ascending.
			 *
			 * @param {DOMNode} node
			 * @param {Function} callback
			 * @returns {undefined}
			 */
			forEachAncestorOf = function (node, callback) {
				do {
					node = node.parentNode;

					if (!node || callback(node) === false) {
						break;
					}
				} while (node.nodeName !== 'HTML');
			};

			/**
			 * Sets the position of the picker.
			 *
			 * @returns {undefined}
			 */
			setPos = function () {
				//hq
				var dateInputOffset,
					dateInputElem,
					verticalPosition,
					left,
					position,
					datetimepickerElem,
					dateInputHasFixedAncestor,
					$dateInput,
					windowWidth,
					verticalAnchorEdge,
					datetimepickerCss,
					windowHeight,
					windowScrollTop,
					$coordinate = options.coordinate ? $(options.coordinate) : null,
					coordinatePosition,
					coordinateWidth,
					coordinateOffsetX;

				$dateInput = datetimepicker.data('input');
				dateInputOffset = $dateInput.offset();
				dateInputElem = $dateInput[0];

				verticalAnchorEdge = 'top';
				verticalPosition = (dateInputOffset.top + dateInputElem.offsetHeight) - 1;
				left = dateInputOffset.left;
				position = "absolute";

				windowWidth = $(options.contentWindow).width();
				windowHeight = $(options.contentWindow).height();
				windowScrollTop = $(options.contentWindow).scrollTop();

				if ((options.ownerDocument.documentElement.clientWidth - dateInputOffset.left) < datepicker.parent().outerWidth(true)) {
					var diff = datepicker.parent().outerWidth(true) - dateInputElem.offsetWidth;
					left = left - diff;
				}

				if ($dateInput.parent().css('direction') === 'rtl') {
					left -= (datetimepicker.outerWidth() - $dateInput.outerWidth());
				}

				if (options.fixed) {
					verticalPosition -= windowScrollTop;
					left -= $(options.contentWindow).scrollLeft();
					position = "fixed";
				} else {
					dateInputHasFixedAncestor = false;

					forEachAncestorOf(dateInputElem, function (ancestorNode) {
						if (ancestorNode === null) {
							return false;
						}

						if (options.contentWindow.getComputedStyle(ancestorNode).getPropertyValue('position') === 'fixed') {
							dateInputHasFixedAncestor = true;
							return false;
						}
					});

					if (dateInputHasFixedAncestor) {
						position = 'fixed';

						//If the picker won't fit entirely within the viewport then display it above the date input.
						if (verticalPosition + datetimepicker.outerHeight() > windowHeight + windowScrollTop) {
							verticalAnchorEdge = 'bottom';
							verticalPosition = (windowHeight + windowScrollTop) - dateInputOffset.top;
						} else {
							verticalPosition -= windowScrollTop;
						}
					} else {
						if (verticalPosition + datetimepicker[0].offsetHeight > windowHeight + windowScrollTop) {
							verticalPosition = dateInputOffset.top - datetimepicker[0].offsetHeight + 1;
						}
					}

					if (verticalPosition < 0) {
						verticalPosition = 0;
					}

					if (left + dateInputElem.offsetWidth > windowWidth) {
						left = windowWidth - dateInputElem.offsetWidth;
					}
				}

				datetimepickerElem = datetimepicker[0];

				forEachAncestorOf(datetimepickerElem, function (ancestorNode) {
					var ancestorNodePosition;

					ancestorNodePosition = options.contentWindow.getComputedStyle(ancestorNode).getPropertyValue('position');

					if (ancestorNodePosition === 'relative' && windowWidth >= ancestorNode.offsetWidth) {
						left = left - ((windowWidth - ancestorNode.offsetWidth) / 2);
						return false;
					}
				});

				//hq
				if ($coordinate && $coordinate.length) {
					coordinatePosition = $coordinate.position();
					coordinateWidth = $coordinate.width();
					coordinateOffsetX = (coordinatePosition.left + coordinateWidth) - (datetimepicker.outerWidth() + left);
					if (coordinateOffsetX < 0) {
						left += coordinateOffsetX;
					}

					if (left < coordinatePosition.left) {
						left = coordinatePosition.left;
					}

				}

				datetimepickerCss = {
					position: position,
					left: left,
					top: '', //Initialize to prevent previous values interfering with new ones.
					bottom: '' //Initialize to prevent previous values interfering with new ones.
				};

				datetimepickerCss[verticalAnchorEdge] = verticalPosition;

				datetimepicker.css(datetimepickerCss);
			};

			datetimepicker
				.on('open.xdsoft', function (event) {
					var onShow = true;
					if (options.onShow && $.isFunction(options.onShow)) {
						onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onShow !== false) {
						datetimepicker.show();
						setPos();
						$(options.contentWindow)
							.off('resize.xdsoft', setPos)
							.on('resize.xdsoft', setPos);

						if (options.closeOnWithoutClick) {
							$([options.ownerDocument.body, options.contentWindow]).on('touchstart mousedown.xdsoft', function arguments_callee6() {
								datetimepicker.trigger('close.xdsoft');
								$([options.ownerDocument.body, options.contentWindow]).off('touchstart mousedown.xdsoft', arguments_callee6);
							});
						}
					}
				})
				.on('close.xdsoft', function (event) {
					var onClose = true;
					month_picker
						.find('.xdsoft_month,.xdsoft_year')
						.find('.xdsoft_select')
						.hide();
					if (options.onClose && $.isFunction(options.onClose)) {
						onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onClose !== false && !options.opened && !options.inline) {
						datetimepicker.hide();
					}
					event.stopPropagation();
				})
				.on('toggle.xdsoft', function () {
					if (datetimepicker.is(':visible')) {
						datetimepicker.trigger('close.xdsoft');
					} else {
						datetimepicker.trigger('open.xdsoft');
					}
				})
				.data('input', input);

			timer = 0;

			datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
			datetimepicker.setOptions(options);

			function getCurrentValue() {
				var ct = false,
					time;

				if (options.startDate) {
					ct = _xdsoft_datetime.strToDate(options.startDate);
				} else {
					ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
					if (ct) {
						ct = _xdsoft_datetime.strToDateTime(ct);
					} else if (options.defaultDate) {
						ct = _xdsoft_datetime.strToDateTime(options.defaultDate);
						if (options.defaultTime) {
							time = _xdsoft_datetime.strtotime(options.defaultTime);
							ct.setHours(time.getHours());
							ct.setMinutes(time.getMinutes());
						}
					}
				}

				if (ct && _xdsoft_datetime.isValidDate(ct)) {
					datetimepicker.data('changed', true);
				} else {
					ct = '';
				}

				return ct || 0;
			}

			function setMask(options) {

				var isValidValue = function (mask, value) {
						var reg = mask
							.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
							.replace(/_/g, '{digit+}')
							.replace(/([0-9]{1})/g, '{digit$1}')
							.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
							.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
						return (new RegExp(reg)).test(value);
					},
					getCaretPos = function (input) {
						try {
							if (options.ownerDocument.selection && options.ownerDocument.selection.createRange) {
								var range = options.ownerDocument.selection.createRange();
								return range.getBookmark().charCodeAt(2) - 2;
							}
							if (input.setSelectionRange) {
								return input.selectionStart;
							}
						} catch (e) {
							return 0;
						}
					},
					setCaretPos = function (node, pos) {
						node = (typeof node === "string" || node instanceof String) ? options.ownerDocument.getElementById(node) : node;
						if (!node) {
							return false;
						}
						if (node.createTextRange) {
							var textRange = node.createTextRange();
							textRange.collapse(true);
							textRange.moveEnd('character', pos);
							textRange.moveStart('character', pos);
							textRange.select();
							return true;
						}
						if (node.setSelectionRange) {
							node.setSelectionRange(pos, pos);
							return true;
						}
						return false;
					};

				if (options.mask) {
					input.off('keydown.xdsoft');
				}

				if (options.mask === true) {
					if (typeof moment != 'undefined') {
						options.mask = options.format
							.replace(/Y{4}/g, '9999')
							.replace(/Y{2}/g, '99')
							.replace(/M{2}/g, '19')
							.replace(/D{2}/g, '39')
							.replace(/H{2}/g, '29')
							.replace(/m{2}/g, '59')
							.replace(/s{2}/g, '59');
					} else {
						options.mask = options.format
							.replace(/Y/g, '9999')
							.replace(/F/g, '9999')
							.replace(/m/g, '19')
							.replace(/d/g, '39')
							.replace(/H/g, '29')
							.replace(/i/g, '59')
							.replace(/s/g, '59');
					}
				}

				if ($.type(options.mask) === 'string') {
					if (!isValidValue(options.mask, input.val())) {
						input.val(options.mask.replace(/[0-9]/g, '_'));
						setCaretPos(input[0], 0);
					}

					input.on('keydown.xdsoft', function (event) {
						var val = this.value,
							key = event.which,
							pos,
							digit;

						if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
							pos = getCaretPos(this);
							digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

							if ((key === BACKSPACE || key === DEL) && pos) {
								pos -= 1;
								digit = '_';
							}

							while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
								pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
							}

							val = val.substr(0, pos) + digit + val.substr(pos + 1);

							if ($.trim(val) === '') {
								val = options.mask.replace(/[0-9]/g, '_');
							} else {
								if (pos === options.mask.length) {
									event.preventDefault();
									return false;
								}
							}

							pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
							while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
								pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
							}

							if (isValidValue(options.mask, val)) {
								this.value = val;
								setCaretPos(this, pos);
							} else if ($.trim(val) === '') {
								this.value = options.mask.replace(/[0-9]/g, '_');
							} else {
								input.trigger('error_input.xdsoft');
							}
						} else {
							if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
								return true;
							}
						}

						event.preventDefault();
						return false;
					});
				}
			}

			_xdsoft_datetime.setCurrentTime(getCurrentValue());

			input
				.data('xdsoft_datetimepicker', datetimepicker)
				.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function () {
					if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
						return;
					}
					clearTimeout(timer);
					timer = setTimeout(function () {
						if (input.is(':disabled')) {
							return;
						}

						triggerAfterOpen = true;
						_xdsoft_datetime.setCurrentTime(getCurrentValue(), true);
						if (options.mask) {
							setMask(options);
						}
						datetimepicker.trigger('open.xdsoft');
					}, 100);
				})
				.on('keydown.xdsoft', function (event) {
					var elementSelector,
						key = event.which;
					if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
						elementSelector = $("input:visible,textarea:visible,button:visible,a:visible");
						datetimepicker.trigger('close.xdsoft');
						elementSelector.eq(elementSelector.index(this) + 1).focus();
						return false;
					}
					if ([TAB].indexOf(key) !== -1) {
						datetimepicker.trigger('close.xdsoft');
						return true;
					}
				})
				.on('blur.xdsoft', function () {
					datetimepicker.trigger('close.xdsoft');
				});
		};
		destroyDateTimePicker = function (input) {
			var datetimepicker = input.data('xdsoft_datetimepicker');
			if (datetimepicker) {
				datetimepicker.data('xdsoft_datetime', null);
				datetimepicker.remove();
				input
					.data('xdsoft_datetimepicker', null)
					.off('.xdsoft');
				$(options.contentWindow).off('resize.xdsoft');
				$([options.contentWindow, options.ownerDocument.body]).off('mousedown.xdsoft touchstart');
				if (input.unmousewheel) {
					input.unmousewheel();
				}
			}
		};
		$(options.ownerDocument)
			.off('keydown.xdsoftctrl keyup.xdsoftctrl')
			.on('keydown.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = true;
				}
			})
			.on('keyup.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = false;
				}
			});

		this.each(function () {
			var datetimepicker = $(this).data('xdsoft_datetimepicker'),
				$input;
			if (datetimepicker) {
				if ($.type(opt) === 'string') {
					switch (opt) {
						case 'show':
							$(this).select().focus();
							datetimepicker.trigger('open.xdsoft');
							break;
						case 'hide':
							datetimepicker.trigger('close.xdsoft');
							break;
						case 'toggle':
							datetimepicker.trigger('toggle.xdsoft');
							break;
						case 'destroy':
							destroyDateTimePicker($(this));
							break;
						case 'reset':
							this.value = this.defaultValue;
							if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(dateHelper.parseDate(this.value, options.format))) {
								datetimepicker.data('changed', false);
							}
							datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
							break;
						case 'validate':
							$input = datetimepicker.data('input');
							$input.trigger('blur.xdsoft');
							break;
						default:
							if (datetimepicker[opt] && $.isFunction(datetimepicker[opt])) {
								result = datetimepicker[opt](opt2);
							}
					}
				} else {
					datetimepicker
						.setOptions(opt);
				}
				return 0;
			}
			if ($.type(opt) !== 'string') {
				if (!options.lazyInit || options.open || options.inline) {
					createDateTimePicker($(this));
				} else {
					lazyInit($(this));
				}
			}
		});

		return result;
	};

	$.fn.hqDatetimepicker.defaults = default_options;

	function HighlightedDate(date, desc, style) {
		"use strict";
		this.date = date;
		this.desc = desc;
		this.style = style;
	}
};;
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'jquery-mousewheel'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory(require('jquery'));;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(datetimepickerFactory));



/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
		toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
		slice = Array.prototype.slice,
		nullLowestDeltaTimeout, lowestDelta;

	if ($.event.fixHooks) {
		for (var i = toFix.length; i;) {
			$.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
		}
	}

	var special = $.event.special.mousewheel = {
		version: '3.1.12',

		setup: function () {
			if (this.addEventListener) {
				for (var i = toBind.length; i;) {
					this.addEventListener(toBind[--i], handler, false);
				}
			} else {
				this.onmousewheel = handler;
			}
			// Store the line height and page height for this particular element
			$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
			$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
		},

		teardown: function () {
			if (this.removeEventListener) {
				for (var i = toBind.length; i;) {
					this.removeEventListener(toBind[--i], handler, false);
				}
			} else {
				this.onmousewheel = null;
			}
			// Clean up the data we added to the element
			$.removeData(this, 'mousewheel-line-height');
			$.removeData(this, 'mousewheel-page-height');
		},

		getLineHeight: function (elem) {
			var $elem = $(elem),
				$parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
			if (!$parent.length) {
				$parent = $('body');
			}
			return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
		},

		getPageHeight: function (elem) {
			return $(elem).height();
		},

		settings: {
			adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
			normalizeOffset: true // calls getBoundingClientRect for each event
		}
	};

	$.fn.extend({
		mousewheel: function (fn) {
			return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
		},

		unmousewheel: function (fn) {
			return this.unbind('mousewheel', fn);
		}
	});


	function handler(event) {
		var orgEvent = event || window.event,
			args = slice.call(arguments, 1),
			delta = 0,
			deltaX = 0,
			deltaY = 0,
			absDelta = 0,
			offsetX = 0,
			offsetY = 0;
		event = $.event.fix(orgEvent);
		event.type = 'mousewheel';

		// Old school scrollwheel delta
		if ('detail' in orgEvent) {
			deltaY = orgEvent.detail * -1;
		}
		if ('wheelDelta' in orgEvent) {
			deltaY = orgEvent.wheelDelta;
		}
		if ('wheelDeltaY' in orgEvent) {
			deltaY = orgEvent.wheelDeltaY;
		}
		if ('wheelDeltaX' in orgEvent) {
			deltaX = orgEvent.wheelDeltaX * -1;
		}

		// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
		if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
			deltaX = deltaY * -1;
			deltaY = 0;
		}

		// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
		delta = deltaY === 0 ? deltaX : deltaY;

		// New school wheel delta (wheel event)
		if ('deltaY' in orgEvent) {
			deltaY = orgEvent.deltaY * -1;
			delta = deltaY;
		}
		if ('deltaX' in orgEvent) {
			deltaX = orgEvent.deltaX;
			if (deltaY === 0) {
				delta = deltaX * -1;
			}
		}

		// No change actually happened, no reason to go any further
		if (deltaY === 0 && deltaX === 0) {
			return;
		}

		// Need to convert lines and pages to pixels if we aren't already in pixels
		// There are three delta modes:
		//   * deltaMode 0 is by pixels, nothing to do
		//   * deltaMode 1 is by lines
		//   * deltaMode 2 is by pages
		if (orgEvent.deltaMode === 1) {
			var lineHeight = $.data(this, 'mousewheel-line-height');
			delta *= lineHeight;
			deltaY *= lineHeight;
			deltaX *= lineHeight;
		} else if (orgEvent.deltaMode === 2) {
			var pageHeight = $.data(this, 'mousewheel-page-height');
			delta *= pageHeight;
			deltaY *= pageHeight;
			deltaX *= pageHeight;
		}

		// Store lowest absolute delta to normalize the delta values
		absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

		if (!lowestDelta || absDelta < lowestDelta) {
			lowestDelta = absDelta;

			// Adjust older deltas if necessary
			if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
				lowestDelta /= 40;
			}
		}

		// Adjust older deltas if necessary
		if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
			// Divide all the things by 40!
			delta /= 40;
			deltaX /= 40;
			deltaY /= 40;
		}

		// Get a whole, normalized value for the deltas
		delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
		deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
		deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

		// Normalise offsetX and offsetY properties
		if (special.settings.normalizeOffset && this.getBoundingClientRect) {
			var boundingRect = this.getBoundingClientRect();
			offsetX = event.clientX - boundingRect.left;
			offsetY = event.clientY - boundingRect.top;
		}

		// Add information to the event object
		event.deltaX = deltaX;
		event.deltaY = deltaY;
		event.deltaFactor = lowestDelta;
		event.offsetX = offsetX;
		event.offsetY = offsetY;
		// Go ahead and set deltaMode to 0 since we converted to pixels
		// Although this is a little odd since we overwrite the deltaX/Y
		// properties with normalized deltas.
		event.deltaMode = 0;

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		// Clearout lowestDelta after sometime to better
		// handle multiple device types that give different
		// a different lowestDelta
		// Ex: trackpad = 3 and mouse wheel = 120
		if (nullLowestDeltaTimeout) {
			clearTimeout(nullLowestDeltaTimeout);
		}
		nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

	function nullLowestDelta() {
		lowestDelta = null;
	}

	function shouldAdjustOldDeltas(orgEvent, absDelta) {
		// If this is an older event and the delta is divisable by 120,
		// then we are assuming that the browser is treating this as an
		// older mouse wheel event and that we should divide the deltas
		// by 40 to try and get a more usable deltaFactor.
		// Side note, this actually impacts the reported scroll distance
		// in older browsers and can cause scrolling to be slower than native.
		// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
		return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	}

}));
/*!
 * hqGrid-hqgrid-scroll v1.0.0
 *
 * Thanks to: Antiscroll: cross-browser native OS X Lion scrollbars
 * https://github.com/Automattic/antiscroll
 * 
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-11-08
 * v1.0
 */


(function ($) {

  /**
   * scroll
   * @param {*} el 
   * @param {*} opts 
   * @param {*} relateEls 
   */
  function HQGridScroll(el, opts, relateEls) {

    this.el = $(el);
    this.options = opts || {};

    this.x = (false !== this.options.x) || this.options.forceHorizontal;
    this.y = (false !== this.options.y) || this.options.forceVertical;
    this.autoHide = false !== this.options.autoHide;
    //设置此参数，不显示滚动条
    this.hidden = this.options.hidden;
    this.padding = undefined == this.options.padding ? 2 : this.options.padding;

    this.box = this.el.find('.hqgrid-box');
    this.inner = this.el.find('.hqgrid-scroll-inner');

    //relate scroll elements -hq
    this.relateEls = {
      vertical: relateEls.vertical || [],
      verticalInner: this.getRelateInnerEls(relateEls.vertical),
      horizontal: relateEls.horizontal || [],
      horizontalInner: this.getRelateInnerEls(relateEls.horizontal)
    }

    this.refresh();
  }

  // 获取关联容器
  HQGridScroll.prototype.getRelateInnerEls = function (relateEls) {
    var result = [],
      el;
    if (relateEls instanceof Array) {
      for (var i = 0, len = relateEls.length; i < len; i++) {
        el = relateEls[i];
        el = $(el).find('.hqgrid-scroll-inner');
        if (el.length > 0) {
          result.push(el);
        }
      }

    }

    return result;
  }

  // 刷新
  HQGridScroll.prototype.refresh = function () {
    var self = this,
      box = this.box,
      innerbox = this.inner,
      needHScroll = this.inner.get(0).scrollWidth > this.el.width() + (this.y ? HQGridScrollBar.size() : 0),
      needVScroll = this.inner.get(0).scrollHeight > this.el.height() + (this.x ? HQGridScrollBar.size() : 0),
      boxWidth = box.width(),
      boxHeight = box.height(),
      innerWidth = boxWidth + (this.y ? HQGridScrollBar.size() : 0),
      innerHeight = boxHeight + (this.x ? HQGridScrollBar.size() : 0);

    this.inner.css({
      'width': innerWidth,
      'height': innerHeight
    });

    if (this.x) {
      if (!this.horizontal && needHScroll) {
        this.horizontal = new HQGridScrollBar.Horizontal(this);
      } else if (this.horizontal && !needHScroll) {
        this.horizontal.destroy();
        this.horizontal = null;
      } else if (this.horizontal) {
        this.horizontal.update();
      }
    }

    if (this.y) {
      if (!this.vertical && needVScroll) {
        this.vertical = new HQGridScrollBar.Vertical(this);
      } else if (this.vertical && !needVScroll) {
        this.vertical.destroy();
        this.vertical = null;
      } else if (this.vertical) {
        this.vertical.update();
      }
    }

  };

  // 销毁
  HQGridScroll.prototype.destroy = function () {
    if (this.horizontal) {
      this.horizontal.destroy();
      this.horizontal = null
    }
    if (this.vertical) {
      this.vertical.destroy();
      this.vertical = null
    }

    if (this.hidden) {
      this.el.unbind('mousewheel');
      this.inner.unbind('scroll');
    }
    return this;
  };

  // 重建
  HQGridScroll.prototype.rebuild = function () {
    this.destroy();
    this.inner.attr('style', '');
    HQGridScroll.call(this, this.el, this.options);
    return this;
  };


  /**
   * scroll-bar
   * @param {*} pane 
   */
  function HQGridScrollBar(pane) {

    var self = this;
    this.pane = pane;
    this.pane.el.append(this.el);
    this.innerEl = this.pane.inner.get(0);
    this.$innerEl = $(this.innerEl);
    this.hidden = pane.hidden;
    this.relateInnerEls = this.pane.relateInnerEls;

    this.dragging = false;
    this.enter = false;
    this.shown = false;

    // hovering
    this.pane.el.mouseenter($.proxy(this, 'mouseenter'));
    this.pane.el.mouseleave($.proxy(this, 'mouseleave'));

    // dragging
    this.el.mousedown($.proxy(this, 'mousedown'));

    // scrolling
    //使用$.proxy不能使用unbind解除监听方法
    this.innerPaneScrollListener = function (event) {
      return self.scroll(event);
    };
    this.pane.inner.bind('scroll', this.innerPaneScrollListener);

    // wheel -optional-
    this.innerPaneMouseWheelListener = function (ev, delta, x, y) {
      return self.mousewheel(ev, delta, x, y);
    };
    this.pane.inner.bind('mousewheel', this.innerPaneMouseWheelListener);

    // show
    var initialDisplay = this.pane.options.initialDisplay;

    if (initialDisplay !== false) {
      this.show();
      if (this.pane.autoHide) {
        this.hiding = setTimeout($.proxy(this, 'hide'), parseInt(initialDisplay, 10) || 3000);
      }
    }
  };

  HQGridScrollBar._size = null;

  HQGridScrollBar.size = function () {

    if (HQGridScrollBar._size === null) {
      var div = $(
        '<div class="hqgrid-scroll-inner" style="width:50px;height:50px;overflow-y:scroll;' +
        'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"/>' +
        '</div>'
      );

      $('body').append(div);
      var w1 = $(div).innerWidth();
      var w2 = $('div', div).innerWidth();
      $(div).remove();

      HQGridScrollBar._size = w1 - w2;
    }

    return HQGridScrollBar._size;
  };

  HQGridScrollBar.prototype.destroy = function () {
    this.el.remove();
    this.pane.inner.unbind('scroll', this.innerPaneScrollListener);
    this.pane.inner.unbind('mousewheel', this.innerPaneMouseWheelListener);
    return this;
  };

  HQGridScrollBar.prototype.mouseenter = function () {
    this.enter = true;
    this.show();
  };

  HQGridScrollBar.prototype.mouseleave = function () {
    this.enter = false;

    if (!this.dragging) {
      if (this.pane.autoHide) {
        this.hide();
      }
    }
  };

  //hq-scroll
  HQGridScrollBar.prototype.scroll = function () {
    //huangqing
    if (!this.shown) {
      this.show();
      if (!this.enter && !this.dragging) {
        if (this.pane.autoHide) {
          this.hiding = setTimeout($.proxy(this, 'hide'), 1500);
        }
      }
    }

    this.update();
  };

  HQGridScrollBar.prototype.mousedown = function (ev) {
    ev.preventDefault();

    this.dragging = true;

    this.startPageY = ev.pageY - parseInt(this.el.css('top'), 10);
    this.startPageX = ev.pageX - parseInt(this.el.css('left'), 10);

    // prevent crazy selections on IE
    this.el[0].ownerDocument.onselectstart = function () {
      return false;
    };

    var pane = this.pane,
      move = $.proxy(this, 'mousemove'),
      self = this

    $(this.el[0].ownerDocument)
      .mousemove(move)
      .mouseup(function () {
        self.dragging = false;
        this.onselectstart = null;

        $(this).unbind('mousemove', move);

        if (!self.enter) {
          self.hide();
        }
      });
  };

  HQGridScrollBar.prototype.show = function (duration) {

    if (!this.shown && this.update()) {
      //hq-hidden-scroll
      if (!this.hidden) {
        this.el.addClass('hqgrid-scroll-scrollbar-shown');
      }
      if (this.hiding) {
        clearTimeout(this.hiding);
        this.hiding = null;
      }
      this.shown = true;
    }
  };

  HQGridScrollBar.prototype.hide = function () {
    if (this.pane.autoHide !== false && this.shown) {
      // check for dragging
      this.el.removeClass('hqgrid-scroll-scrollbar-shown');
      this.shown = false;
    }
  };


  /**
   * scroll-bar-horizontal
   * @param {*} pane 
   */

  HQGridScrollBar.Horizontal = function (pane) {
    this.el = $('<div class="hqgrid-scroll-scrollbar hqgrid-scroll-scrollbar-horizontal"/>', pane.el);
    pane.relateInnerEls = pane.relateEls.horizontalInner;
    HQGridScrollBar.call(this, pane);
  };

  inherits(HQGridScrollBar.Horizontal, HQGridScrollBar);

  HQGridScrollBar.Horizontal.prototype.update = function () {
    var paneWidth = this.pane.el.width(),
      trackWidth = paneWidth - this.pane.padding * 2,
      $innerEl = this.$innerEl,
      innerEl = this.pane.inner.get(0),
      scrollLeft = innerEl.scrollLeft;

    this.el
      .css('width', trackWidth * paneWidth / innerEl.scrollWidth)
      .css('left', trackWidth * scrollLeft / innerEl.scrollWidth);

    return paneWidth < innerEl.scrollWidth;
  };

  HQGridScrollBar.Horizontal.prototype.mousemove = function (ev) {
    var trackWidth = this.pane.el.width() - this.pane.padding * 2,
      pos = ev.pageX - this.startPageX,
      barWidth = this.el.width(),
      innerEl = this.pane.inner.get(0),
      relateInnerEls = this.relateInnerEls,
      scrollLeft;

    // minimum top is 0, maximum is the track height
    var y = Math.min(Math.max(pos, 0), trackWidth - barWidth);

    scrollLeft = (innerEl.scrollWidth - this.pane.el.width()) *
      y / (trackWidth - barWidth);

    innerEl.scrollLeft = scrollLeft;

    this.setRelateScrollLeft(scrollLeft);
  };

  //hq-relate-left
  HQGridScrollBar.Horizontal.prototype.setRelateScrollLeft = function (scrollLeft) {
    var relateInnerEls = this.relateInnerEls,
      $innerEl = this.$innerEl;

    if ($innerEl.hasClass('scrollLeft-relate')) {
      $innerEl.removeClass('scrollLeft-relate');
      return;
    }
    if (!relateInnerEls) {
      return;
    }

    for (var i = 0, len = relateInnerEls.length; i < len; i++) {
      el = relateInnerEls[i];
      el.addClass('scrollLeft-relate');
      el[0].scrollLeft = scrollLeft;
    }
  }

  HQGridScrollBar.Horizontal.prototype.mousewheel = function (ev, delta, x, y) {

    if ((x < 0 && 0 == this.pane.inner.get(0).scrollLeft) ||
      (x > 0 && (this.innerEl.scrollLeft + Math.ceil(this.pane.el.width()) ==
        this.innerEl.scrollWidth))) {
      ev.preventDefault();
      return false;
    }
  };

  /**
   * scroll-bar-vertical
   * @param {*} pane 
   */

  HQGridScrollBar.Vertical = function (pane) {
    
    this.el = $('<div class="hqgrid-scroll-scrollbar hqgrid-scroll-scrollbar-vertical"/>', pane.el);
    pane.relateInnerEls = pane.relateEls.verticalInner;
    HQGridScrollBar.call(this, pane);
  };

  inherits(HQGridScrollBar.Vertical, HQGridScrollBar);

  //hq-update
  HQGridScrollBar.Vertical.prototype.update = function () {
    var paneHeight = this.pane.el.height(),
      trackHeight = paneHeight - this.pane.padding * 2,
      innerEl = this.innerEl,
      scrollTop = innerEl.scrollTop,
      self = this;

    var scrollbarHeight = trackHeight * paneHeight / innerEl.scrollHeight;
    scrollbarHeight = scrollbarHeight < 20 ? 20 : scrollbarHeight;

    var topPos = trackHeight * scrollTop / innerEl.scrollHeight;

    if ((topPos + scrollbarHeight) > trackHeight) {
      var diff = (topPos + scrollbarHeight) - trackHeight;
      topPos = topPos - diff - 3;
    }

    this.el
      .css('height', scrollbarHeight)
      .css('top', topPos);

    //console.log('update:' + innerEl.scrollTop);
    return paneHeight < innerEl.scrollHeight;
  };

  HQGridScrollBar.Vertical.prototype.mousemove = function (ev) {

    var paneHeight = this.pane.el.height(),
      trackHeight = paneHeight - this.pane.padding * 2,
      pos = ev.pageY - this.startPageY,
      barHeight = this.el.height(),
      innerEl = this.innerEl,
      relateInnerEls = this.relateInnerEls,
      scrollTop;

    // minimum top is 0, maximum is the track height
    var y = Math.min(Math.max(pos, 0), trackHeight - barHeight);

    scrollTop = (innerEl.scrollHeight - paneHeight) *
      y / (trackHeight - barHeight);

    innerEl.scrollTop = scrollTop;

    this.setRelateScrollTop(scrollTop);
  }

  //hq-relate-top
  HQGridScrollBar.Vertical.prototype.setRelateScrollTop = function (scrollTop) {
    var relateInnerEls = this.relateInnerEls,
      $innerEl = this.$innerEl;

    if ($innerEl.hasClass('scrollTop-relate')) {
      $innerEl.removeClass('scrollTop-relate');
      return;
    }
    if (!relateInnerEls) {
      return;
    }
    for (var i = 0, len = relateInnerEls.length; i < len; i++) {
      el = relateInnerEls[i];
      el.addClass('scrollTop-relate');
      el[0].scrollTop = scrollTop;
    }
  }

  //HQGridScrollBar.Vertical.prototype.timestamp = 0;

  //垂直滚动-控制速度
  HQGridScrollBar.Vertical.prototype.mousewheel = function (ev, delta, x, y) {

    var scrollTop = this.innerEl.scrollTop,
      offsetY = -ev.deltaFactor * delta,
      timestamp = this.timestamp,
      now;

    //console.log("scrollTop:" + scrollTop + "  delta:" + delta + " " + " x:" + x + "  y:" + y);

    if ((y > 0 && 0 == this.innerEl.scrollTop) ||
      (y < 0 && (scrollTop + Math.ceil(this.pane.el.height()) ==
        this.innerEl.scrollHeight))) {
      ev.preventDefault();
      return false;
    }

    scrollTop = delta > 0 ? scrollTop - 20 : scrollTop + 20;
    this.innerEl.scrollTop = scrollTop;
    this.setRelateScrollTop(scrollTop);

    return false;

    // 控制mousewheel速度
    // now = new Date().getTime();
    // if (now - timestamp < 60) {
    //   return false;
    // } else {
    //   this.timestamp = now;
    // }

  };

  // support functions
  function inherits(ctorA, ctorB) {
    function f() { };
    f.prototype = ctorB.prototype;
    ctorA.prototype = new f;
  };

  $.hqGrid = $.hqGrid || {};

  $.hqGrid._Scroll = HQGridScroll;

})(jQuery);
/*!
 * hqGrid-hqgrid-Clusterize v1.0.0
 *
 * Thanks to: Antiscroll: cross-browser native OS X Lion scrollbars
 * http://NeXTs.github.com/Clusterize.js/
 * 
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-11-08
 * v1.0
 */

;
(function (name, definition) {
  // if (typeof module != 'undefined') module.exports = definition();
  // else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  // else this[name] = definition();

  $.hqGrid = $.hqGrid || {};
  $.hqGrid[name] = definition();
}('_Clusterize', function () {
  "use strict"

  // detect ie9 and lower
  // https://gist.github.com/padolsey/527683#comment-786682
  var ie = (function () {
    for (var v = 3,
      el = document.createElement('b'),
      all = el.all || []; el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->',
      all[0];
    ) { }
    return v > 4 ? v : document.documentMode;
  }()),
    is_mac = navigator.platform.toLowerCase().indexOf('mac') + 1;
  var Clusterize = function (data) {
    if (!(this instanceof Clusterize))
      return new Clusterize(data);
    var self = this;

    var defaults = {
      // rows_in_block: 50,
      // blocks_in_cluster: 4,

      //rows_in_block: 10,
      //blocks_in_cluster: 6,
      rows_in_block: 20,
      blocks_in_cluster: 6,
      tag: null,
      show_no_data_row: false,
      no_data_class: 'clusterize-no-data',
      no_data_text: 'No data',
      keep_parity: true,
      callbacks: {}
    }

    // public parameters
    self.options = {};
    var options = ['rows_in_block', 'blocks_in_cluster', 'show_no_data_row', 'no_data_class', 'no_data_text', 'keep_parity', 'tag', 'callbacks'];
    for (var i = 0, option; option = options[i]; i++) {
      self.options[option] = typeof data[option] != 'undefined' && data[option] != null ?
        data[option] :
        defaults[option];
    }

    var elems = ['scroll', 'content'];
    for (var i = 0, elem; elem = elems[i]; i++) {
      self[elem + '_elem'] = data[elem + 'Id'] ?
        document.getElementById(data[elem + 'Id']) :
        data[elem + 'Elem'];
      if (!self[elem + '_elem'])
        throw new Error("Error! Could not find " + elem + " element");
    }

    //hqGrid instance
    self.hqGrid = data.hqGrid;
    //hqGrid position
    self.position = data.position;
    //reference hqGrid page
    self.page = this.hqGrid.data.current;
    //reference hqGrid pages
    self.pages = this.hqGrid.data.pages;
    //asyn load row
    self.loading = false;

    // tabindex forces the browser to keep focus on the scrolling list, fixes #11
    if (!self.content_elem.hasAttribute('tabindex'))
      self.content_elem.setAttribute('tabindex', 0);

    // private parameters
    // var rows = isArray(data.rows) ?
    //   data.rows :
    //   self.fetchMarkup(),
    //   cache = {},
    //   scroll_top = self.scroll_elem.scrollTop;

    var rows = [],
      cache = {},
      scroll_top = self.scroll_elem.scrollTop;

    // append initial data
    self.insertToDOM(rows, cache);

    // restore the scroll position
    self.scroll_elem.scrollTop = scroll_top;

    // adding scroll handler
    var last_cluster = false,
      scroll_debounce = 0,
      pointer_events_set = false,
      scrollEv = function () {
        log("into scrollEv");
        //保存编辑列表修改值
        self.saveEdit();
        // fixes scrolling issue on Mac #3
        if (is_mac) {
          if (!pointer_events_set) self.content_elem.style.pointerEvents = 'none';
          pointer_events_set = true;
          clearTimeout(scroll_debounce);
          scroll_debounce = setTimeout(function () {
            self.content_elem.style.pointerEvents = 'auto';
            pointer_events_set = false;
          }, 50);
        }
        if (last_cluster != (last_cluster = self.getClusterNum())) {
          self.delayLoading();
          //保存编辑列表修改值
          //self.saveEdit();
          self.insertToDOM(rows, cache);
        }
        if (self.options.callbacks.scrollingProgress) {
          self.options.callbacks.scrollingProgress(self.getScrollProgress());
        }
      },
      resize_debounce = 0,
      resizeEv = function () {
        clearTimeout(resize_debounce);
        resize_debounce = setTimeout(self.refresh, 100);
      },
      throttleEv = throttle(scrollEv, 200, true, true,
        function () {
          self.showLoading();
        },
        function () {
          self.hideLoading();
        });
    //on('scroll', self.scroll_elem, scrollEv);
    on('scroll', self.scroll_elem, throttleEv);
    //on('scroll', self.scroll_elem, throttle(scrollEv, 200, true, true));
    //on('scroll', self.scroll_elem, throttleScrollEv);
    on('resize', window, resizeEv);


    // public methods
    self.destroy = function (clean) {
      off('scroll', self.scroll_elem, scrollEv);
      off('resize', window, resizeEv);
      self.html((clean ? self.generateEmptyRow() : rows).join(''));
    }
    self.refresh = function (force) {
      if (self.getRowsHeight(rows) || force) {
        self.update(rows);
      }
    }
    self.update = function () {
      // rows = isArray(new_rows) ?
      //   new_rows : [];
  
      this.updatePage();
      rows = [];
      rows.length = this.getTotal();

      var scroll_top = self.scroll_elem.scrollTop;
      // fixes #39
      if (rows.length * self.options.item_height < scroll_top) {
        self.scroll_elem.scrollTop = 0;
        last_cluster = 0;
      }
      //强制清除缓存
      cache.data = '';
      self.insertToDOM(rows, cache);
      self.scroll_elem.scrollTop = scroll_top;
    }
    self.clear = function () {
      self.update([]);
    }
    self.getRowsAmount = function () {
      return rows.length;
    }
    self.getScrollProgress = function () {
      return this.options.scroll_top / (rows.length * this.options.item_height) * 100 || 0;
    }

    var add = function (where, _new_rows) {
      var new_rows = isArray(_new_rows) ?
        _new_rows : [];
      if (!new_rows.length) return;
      rows = where == 'append' ?
        rows.concat(new_rows) :
        new_rows.concat(rows);
      self.insertToDOM(rows, cache);
    }
    self.append = function (rows) {
      add('append', rows);
    }
    self.prepend = function (rows) {
      add('prepend', rows);
    }
  }

  Clusterize.prototype = {
    constructor: Clusterize,
    // fetch existing markup
    fetchMarkup: function () {
      var rows = [],
        rows_nodes = this.getChildNodes(this.content_elem);
      while (rows_nodes.length) {
        rows.push(rows_nodes.shift().outerHTML);
      }
      return rows;
    },
    // get tag name, content tag name, tag height, calc cluster height
    exploreEnvironment: function (rows, cache) {
      var opts = this.options;
      opts.content_tag = this.content_elem.tagName.toLowerCase();
      if (!rows.length || !this.page.length) {
        return;
      }
      if (ie && ie <= 9 && !opts.tag) opts.tag = rows[0].match(/<([^>\s/]*)/)[1].toLowerCase();
      if (this.content_elem.children.length <= 1) cache.data = this.html(rows[0] + rows[0] + rows[0]);
      if (!opts.tag) opts.tag = this.content_elem.children[0].tagName.toLowerCase();
      this.getRowsHeight(rows);
    },
    getRowsHeight: function (rows) {
      var opts = this.options,
        prev_item_height = opts.item_height;
      opts.cluster_height = 0;
      if (!rows.length || !this.page.length) {
        return;
      }
      var nodes = this.content_elem.children;
      var node = nodes[Math.floor(nodes.length / 2)];
      opts.item_height = node.offsetHeight;
      // consider table's border-spacing
      if (opts.tag == 'tr' && getStyle('borderCollapse', this.content_elem) != 'collapse')
        opts.item_height += parseInt(getStyle('borderSpacing', this.content_elem), 10) || 0;
      // consider margins (and margins collapsing)
      if (opts.tag != 'tr') {
        var marginTop = parseInt(getStyle('marginTop', node), 10) || 0;
        var marginBottom = parseInt(getStyle('marginBottom', node), 10) || 0;
        opts.item_height += Math.max(marginTop, marginBottom);
      }
      opts.block_height = opts.item_height * opts.rows_in_block;
      opts.rows_in_cluster = opts.blocks_in_cluster * opts.rows_in_block;
      opts.cluster_height = opts.blocks_in_cluster * opts.block_height;
      return prev_item_height != opts.item_height;
    },
    // get current cluster number
    getClusterNum: function () {
      this.options.scroll_top = this.scroll_elem.scrollTop;
      return Math.floor(this.options.scroll_top / (this.options.cluster_height - this.options.block_height)) || 0;
    },
    // generate empty row if no data provided
    generateEmptyRow: function () {
      var opts = this.options;
      if (!opts.tag || !opts.show_no_data_row) return [];
      var empty_row = document.createElement(opts.tag),
        no_data_content = document.createTextNode(opts.no_data_text),
        td;
      empty_row.className = opts.no_data_class;
      if (opts.tag == 'tr') {
        td = document.createElement('td');
        // fixes #53
        td.colSpan = 100;
        td.appendChild(no_data_content);
      }
      empty_row.appendChild(td || no_data_content);
      return [empty_row.outerHTML];
    },
    // generate cluster for current scroll position
    generate: function (rows, cluster_num) {
      var opts = this.options,
        rows_len = rows.length;

      if (rows_len < opts.rows_in_block) {
        for (var i = 0, len = rows_len; i < len; i++) {
          if (!this.generateItem(i, rows)) {
            break;
          };
        }
        return {
          top_offset: 0,
          bottom_offset: 0,
          rows_above: 0,
          rows: rows_len ? rows : this.generateEmptyRow()
        }
      }
      var items_start = Math.max((opts.rows_in_cluster - opts.rows_in_block) * cluster_num, 0),
        items_end = items_start + opts.rows_in_cluster,
        top_offset = Math.max(items_start * opts.item_height, 0),
        bottom_offset = Math.max((rows_len - items_end) * opts.item_height, 0),
        this_cluster_rows = [],
        rows_above = items_start;

      if (top_offset < 1) {
        rows_above++;
      }
      for (var i = items_start; i < items_end; i++) {
        //超出数据最大行数中断执行
        if (i >= rows_len) {
          break;
        }
        log("generate array index is " + i, false);
        if (!this.generateItem(i, this_cluster_rows, true)) {
          break;
        };
      }
      return {
        top_offset: top_offset,
        bottom_offset: bottom_offset,
        rows_above: rows_above,
        rows: this_cluster_rows
      }
    },
    generateItem: function (i, rows, isPush) {
      var row;

      row = this.renderRowHtml(i);
      if (row) {
        isPush ? rows.push(row) : rows[i] = row;
        return true;
      }

      this.loadRows(i + 1);
      this.loading = true;
      return false;
    },
    renderExtraTag: function (class_name, height) {
      var tag = document.createElement(this.options.tag),
        clusterize_prefix = 'clusterize-';
      tag.className = [clusterize_prefix + 'extra-row', clusterize_prefix + class_name].join(' ');
      height && (tag.style.height = height + 'px');
      return tag.outerHTML;
    },
    // if necessary verify data changed and insert to DOM
    insertToDOM: function (rows, cache) {
      log("insertToDom");
      // explore row's height
      if (!this.options.cluster_height) {
        this.renderTemplateRowHtml(rows);
        this.exploreEnvironment(rows, cache);
      }

      var data = this.generate(rows, this.getClusterNum());
      //需要异步加载数据，强制中断
      if (this.loading) {
        this.loading = false;
        cache.data = '';

        log('need wait asyn data');
        return;
      }
      var //data = this.generate(rows, this.getClusterNum()),
        this_cluster_rows = data.rows.join(''),
        this_cluster_content_changed = this.checkChanges('data', this_cluster_rows, cache),
        top_offset_changed = this.checkChanges('top', data.top_offset, cache),
        only_bottom_offset_changed = this.checkChanges('bottom', data.bottom_offset, cache),
        callbacks = this.options.callbacks,
        layout = [];

      if (this_cluster_content_changed || top_offset_changed) {
        if (data.top_offset) {
          this.options.keep_parity && layout.push(this.renderExtraTag('keep-parity'));
          layout.push(this.renderExtraTag('top-space', data.top_offset));
        }
        layout.push(this_cluster_rows);
        data.bottom_offset && layout.push(this.renderExtraTag('bottom-space', data.bottom_offset));
        callbacks.clusterWillChange && callbacks.clusterWillChange();

        this.html(layout.join(''));
        this.options.content_tag == 'ol' && this.content_elem.setAttribute('start', data.rows_above);
        this.content_elem.style['counter-increment'] = 'clusterize-counter ' + (data.rows_above - 1);
        callbacks.clusterChanged && callbacks.clusterChanged();
      } else if (only_bottom_offset_changed) {
        this.content_elem.lastChild.style.height = data.bottom_offset + 'px';
      }
    },
    renderTemplateRowHtml: function (rows) {
      if (rows.length > 0) {
        rows[0] = this.renderRowHtml(0);
      }
    },
    renderRowHtml: function (index) {
      var item = this.page[index],
        row = null;
      if (item) {
        row = this.hqGrid.renderClusterizeRowByIndex(this.position, item, index);
      }

      return row;
    },
    // unfortunately ie <= 9 does not allow to use innerHTML for table elements, so make a workaround
    html: function (data) {
      var content_elem = this.content_elem;
      if (ie && ie <= 9 && this.options.tag == 'tr') {
        var div = document.createElement('div'),
          last;
        div.innerHTML = '<table><tbody>' + data + '</tbody></table>';
        while ((last = content_elem.lastChild)) {
          content_elem.removeChild(last);
        }
        var rows_nodes = this.getChildNodes(div.firstChild.firstChild);
        while (rows_nodes.length) {
          content_elem.appendChild(rows_nodes.shift());
        }
      } else {
        content_elem.innerHTML = data;
      }
    },
    getChildNodes: function (tag) {
      var child_nodes = tag.children,
        nodes = [];
      for (var i = 0, ii = child_nodes.length; i < ii; i++) {
        nodes.push(child_nodes[i]);
      }
      return nodes;
    },
    checkChanges: function (type, value, cache) {
      var changed = value != cache[type];
      cache[type] = value;
      return changed;
    },
    showLoading: function () {
      this.hqGrid.showLoading(true);
    },
    hideLoading: function () {
      if (this.isLoading()) {
        return;
      }
      this.hqGrid.hideLoading();
    },
    delayLoading: function () {
      this.hqGrid.delayLoading(true);
    },
    isLoading: function () {
      return this.hqGrid.loading;
    },
    saveEdit: function () {
      this.hqGrid.saveEdited();
    },
    loadRows: function (index) {
      //异步请求数据
      log("clusterize asyn load: row index is " + index);
      this.hqGrid.loadClusterizeRollingRows(index);
    },
    updatePage: function () {
      this.page = this.hqGrid.data.current;
    },
    getTotal: function () {
      var hqGrid = this.hqGrid,
        length = this.page.length,
        paging = hqGrid.opt.paging,
        rollingload = hqGrid.opt.rollingload;

      if (paging && rollingload) {
        length = hqGrid.paging.pageCount;
      }

      return length;
    }
  }

  var ISSHOWLOG = false;

  // support functions
  function on(evt, element, fnc) {
    return element.addEventListener ? element.addEventListener(evt, fnc, false) : element.attachEvent("on" + evt, fnc);
  }

  function off(evt, element, fnc) {
    return element.removeEventListener ? element.removeEventListener(evt, fnc, false) : element.detachEvent("on" + evt, fnc);
  }

  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }

  function getStyle(prop, elem) {
    return window.getComputedStyle ? window.getComputedStyle(elem)[prop] : elem.currentStyle[prop];
  }

  /* 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次 
   * @param fn {function} 需要调用的函数 
   * @param delay {number} 延迟时间，单位毫秒 
   * @param immediate {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。 
   * @return {function}实际调用函数
   */
  function throttle(fn, delay, immediate, debounce, before_fn, exec_fn) {
    var curr = +new Date(),//当前事件
      last_call = 0,
      last_exec = 0,
      timer = null,
      diff, //时间差
      context,//上下文
      args,
      exec = function () {
        log("throttle exec");
        last_exec = curr;
        fn.apply(context, args);
        if (typeof exec_fn === "function") {
          exec_fn();
        }
      };
    return function (evt) {

      log("throttle in");
      if (typeof before_fn === "function") {
        before_fn();
      }
      curr = +new Date();
      context = this,
        args = arguments,
        diff = curr - (debounce ? last_call : last_exec) - delay;
      clearTimeout(timer);
      if (debounce) {
        if (immediate) {
          timer = setTimeout(exec, delay);
        } else if (diff >= 0) {
          exec();
        }
      } else {
        if (diff >= 0) {
          exec();
        } else if (immediate) {
          timer = setTimeout(exec, -diff);
        }
      }
      last_call = curr;
    }
  };

  /* 
  * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行 
  * @param fn {function} 要调用的函数 
  * @param delay {number} 空闲时间 
  * @param immediate {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。 
  * @return {function}实际调用函数
  */

  function debounce(fn, delay, immediate) {
    return throttle(fn, delay, immediate, true);
  };

  function log(message) {
    if (ISSHOWLOG) {
      window.console.log(message);
    }
  }

  return Clusterize;
}));
/*!
 * hqgrid-render v1.0.0
 *
 * 
 * @datetimepicker-homepage http://xdsoft.net/jqplugins/datetimepicker/
 * 
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-11-08
 * v1.0
 */

;
(function ($) {

    var render = {};

    $.hqGrid = $.hqGrid || {};
    $.hqGrid._Render = render;
    $.hqGrid.addRender = add;

    function add(name, args) {
        render[name] = $.extend({}, render.text, args);
    }

})(jQuery);
;
(function ($) {

    //render text type
    $.hqGrid.addRender('text', {
        className: {
            field: "text-field",
            height: ''
        },
        align: "left",
        sorter: function (a, b) { },
        filter: function (a, b) {
            a = a.value || a.text;
            b = b.value || b.text;

            if (!a) {
                return true;
            }

            if (b.indexOf(a) !== -1) {
                return true;
            }

            return false;
        },
        valueTransform: function (value, field) {
            return value;
        },
        itemTemplate: function (item, field) {
            var title = item.title || item.text || item.value,
                text = item.text || item.value;

            return ['<span title="', title, '">', text, '</span>'].join('');
        },
        editTemplate: function (item, field) {
            var fieldName = $.hqGrid.htmlEncode(field.name),
                fieldText = $.hqGrid.htmlEncode(field.text),
                value = item.value || item.text;

            return ['<input data-name="', fieldName, '" ', 'placeholder="', fieldText, '"', ' type="text" value="', value, '" />'].join('');
        },
        filterTemplate: null,
        insertTemplate: null,
        editEvent: function (field, params) {
            var $text = $(this),
                text = $text[0],
                length;

            //首次获取焦点，将光标定位到文本最后
            if (!$text.attr('data-focus')) {
                if ($text.length > 0) {
                    text.focus();
                    length = $text.val().length;
                    if (length > 0) {
                        $.hqGrid.setSelectionRange(text, length, length);
                    }
                    $text.attr('data-focus', true);
                }
            }

        },
        filterEvent: null,
        insertEvent: null,
        editValue: function (value) {
            var textElement = $(this);

            //获取值
            if (typeof value === "undefined") {
                return textElement.val();
            }

            //设置值
            textElement.val(value)

        },
        editElement: function () {
            return $(this).find('input')[0];
        }
    });

})(jQuery);

;
(function ($) {

    //render text type
    $.hqGrid.addRender('textvalue', {
        className: {
            field: "textvalue-field",
            height: ''
        },
        align: "left",
        sorter: function (a, b) { },
        filter: function (a, b) {
            a = a.value || a.text;
            b = b.value || b.text;

            if (!a) {
                return true;
            }

            if (b.indexOf(a) !== -1) {
                return true;
            }

            return false;
        },
        valueTransform: function (value, field) {
            return value;
        },
        itemTemplate: function (item, field) {
            var title = item.title || item.text || item.value,
                text = item.text || item.value;

            return ['<span title="', title, '">', text, '</span>'].join('');
        },
        editTemplate: function (item, field) {
            var fieldName = $.hqGrid.htmlEncode(field.name),
                fieldText = $.hqGrid.htmlEncode(field.text),
                value = item.text || item.value;

            return ['<input data-name="', fieldName, '" ', 'placeholder="', fieldText, '"', ' type="text" value="', value, '"', ' readOnly="true"  ', ' />'].join('');
        },
        filterTemplate: null,
        insertTemplate: null,
        editEvent: function (field, row, index, grid) {
            var $text = $(this),
                item = $text.data('value') || $.extend(true, {}, row[field.name]),
                fn = function ($text, field, row, index, get, set) {
                    var event = field.editEvent,
                        fn = event;

                    if (typeof field.event === 'string') {
                        fn = window[event];
                    }

                    if (typeof fn === 'function') {
                        fn.call($text, field, row, index, get, set);
                    }

                },
                set = function (value) {
                    $text.data('value', value);
                    $text.val(value.text);
                },
                get = function () {
                    return $text.data('value');
                };

            $text.data('value', item);
            fn($text, field, row, index, get, set);
        },
        filterEvent: null,
        insertEvent: null,
        editValue: function (value) {
            var $textElement = $(this);

            //获取值
            if (typeof value === "undefined") {
                return $textElement.data('value');
            }

            //设置值
            $textElement.val(value.text);
        },
        editElement: function () {
            return $(this).find('input')[0];
        }
    });

})(jQuery);

;
(function ($) {

    //render text type
    $.hqGrid.addRender('editbutton', {
        className: {
            field: "editbutton-field",
            height: ''
        },
        align: "left",
        sorter: function (a, b) { },
        filter: function (a, b) {
            a = a.value || a.text;
            b = b.value || b.text;

            if (!a) {
                return true;
            }

            if (b.indexOf(a) !== -1) {
                return true;
            }

            return false;
        },
        valueTransform: function (value, field) {
            return value;
        },
        itemTemplate: function (item, field) {

            var title = item.title || item.text || item.value,
                text = item.text || item.value;

            return ['<span title="', title, '">', text, '</span>'].join('');
        },
        editTemplate: function (item, field) {
            var fieldName = $.hqGrid.htmlEncode(field.name),
                fieldText = $.hqGrid.htmlEncode(field.text),
                value = item.text || item.value;

            return ['<input data-name="', fieldName, '" ', 'placeholder="', fieldText, '"', ' type="text" value="', value, '"', ' readOnly="true"  ', ' />'].join('');
        },
        filterTemplate: null,
        insertTemplate: null,
        editEvent: function (field, row, index, grid) {
            var $text = $(this),
                item = $text.data('value') || $.extend(true, {}, row[field.name]),
                fn = function ($text, field, row, index, get, set) {
                    var event = field.editEvent,
                        fn = event;

                    if (typeof field.event === 'string') {
                        fn = window[event];
                    }

                    if (typeof fn === 'function') {
                        fn.call($text, field, row, index, get, set);
                    }

                },
                set = function (value) {
                    $text.data('value', value);
                    $text.val(value.text);
                },
                get = function () {
                    return $text.data('value');
                };

            $text.data('value', item);
            fn($text, field, row, index, get, set);
        },
        filterEvent: null,
        insertEvent: null,
        editValue: function (value) {
            var $textElement = $(this);

            //获取值
            if (typeof value === "undefined") {
                return $textElement.data('value');
            }

            //设置值
            $textElement.val(value.text);
        },
        editElement: function () {
            return $(this).find('input')[0];
        }
    });

})(jQuery);

;
(function ($) {
    //render checkbox type
    $.hqGrid.addRender('checkbox', {
        className: {
            field: "checkbox-field"
        },
        align: "center",
        sorter: function (a, b) {
            a = a.value;
            b = b.value;

            if (!a) {
                return -1;
            }
            return 1;
        },
        filter: function (a, b) {
            a = a.value;
            b = b.value;

            if (typeof a === 'undefined' || a === null) {
                return true;
            }

            if (a === b) {
                return true;
            }

            return false;
        },
        itemTemplate: function (item, field) {
            var title = item.title || item.text || item.value,
                value = item.text || item.value,
                fieldName = $.hqGrid.htmlEncode(field.name);

            //var checked = value ? 'checked-view' : 'unchecked-view';

            // if (value === '') {
            //     checked = 'indeterminate-view';
            // } else
            if (value) {
                checked = 'checked-view';
            } else {
                checked = 'unchecked-view';
            }

            return ['<span class="hqgrid-icon hqgrid-icons-', checked, '"  data-name="', fieldName, '"', '  data-checked="', value, '"', '/>'].join('');
        },
        editTemplate: function (item, field) {
            var checked,
                name = $.hqGrid.htmlEncode(field.name),
                value = !!(item.value || item.text);

            if (value === '') {
                checked = 'indeterminate';
            } else if (value) {
                checked = 'checked';
            } else {
                checked = 'unchecked';
            }

            return ['<span class="hqgrid-icon hqgrid-icons-', checked, '"  data-name="', name, '"', '  data-checked="', value, '"', '/>'].join('');
        },
        filterTemplate: function (item, field) {
            var checked,
                fieldName = $.hqGrid.htmlEncode(field.name),
                value = item.value || item.text;

            if (value === '') {
                checked = 'indeterminate';
            } else if (value) {
                checked = 'checked';
            } else {
                checked = 'unchecked';
            }

            return ['<span class="hqgrid-icon hqgrid-icons-', checked, '"  data-name="', fieldName, '"', '  data-checked="', value, '"', '/>'].join('');
        },
        editEvent: function (field, params) {

            var $elem = $(this),
                checked,
                className = 'hqgrid-icon ',
                change = $elem.attr('data-change');

            //激活时不改变checked值
            if (!change) {
                $elem.attr('data-change', true);
                return;
            }

            if ($elem.attr('data-checked') === 'true') {
                checked = false;
                className += 'hqgrid-icons-unchecked';
            } else if ($elem.attr('data-checked') === 'false') {
                checked = true;
                className += 'hqgrid-icons-checked';
            }

            $elem.attr({
                'data-checked': checked,
                'class': className
            });
        },
        filterEvent: function (field, params) {

            var $elem = $(this),
                checked,
                className = 'hqgrid-icon ';

            if ($elem.attr('data-checked') === '') {
                checked = true;
                className += 'hqgrid-icons-checked';
            } else if ($elem.attr('data-checked') === 'true') {
                checked = false;
                className += 'hqgrid-icons-unchecked';
            } else if ($elem.attr('data-checked') === 'false') {
                checked = '';
                className += 'hqgrid-icons-indeterminate';
            }

            $elem.attr({
                'data-checked': checked,
                'class': className
            });
        },
        insertEvent: function (field, params) {
            var $elem = $(this),
                checked,
                className = 'hqgrid-icon ',
                change = $elem.attr('data-change');

            if ($elem.attr('data-checked') === 'true') {
                checked = false;
                className += 'hqgrid-icons-unchecked';
            } else {
                checked = true;
                className += 'hqgrid-icons-checked';
            }

            $elem.attr({
                'data-checked': checked,
                'class': className
            });
        },
        editElement: function () {
            return $(this).find('span')[0];
        },
        editValue: function (value) {
            var $elem = $(this),
                checked,
                className = 'hqgrid-icon ';

            //获取值
            if (typeof value === "undefined") {
                value = {
                    'true': true,
                    'false': false,
                    '': null
                }
                return value[$elem.attr('data-checked')];
            }

            //设置值
            // if (value === '' || value === null) {
            //     checked = '';
            //     className += 'hqgrid-icons-indeterminate';
            // } else if (value === true) {
            //     checked = true;
            //     className += 'hqgrid-icons-checked';
            // } else if (value === false) {
            //     checked = false;
            //     className += 'hqgrid-icons-unchecked';
            // }

            if (value) {
                checked = true;
                className += 'hqgrid-icons-checked';
            } else {
                checked = false;
                className += 'hqgrid-icons-unchecked';
            }

            $elem.attr({
                'data-checked': checked,
                'class': className
            });
        }

    });

})(jQuery);
;
(function ($) {
    //render datetime type
    $.hqGrid.addRender('datetime', {
        className: {
            field: "datetime-field"
        },
        align: "center",
        editTemplate: function (item, field) {
            var fieldName = $.hqGrid.htmlEncode(field.name),
                fieldText = $.hqGrid.htmlEncode(field.text),
                value = item.value || item.text;

            return ['<input readonly="readonly" data-name="', fieldName, '" ',
                'placeholder="', fieldText, '"', ' type="text" value="', value, '" />'
            ].join('');
        },
        editElement: function () {
            return $(this).find('input')[0];
        },
        editValue: function (value) {
            var datetimepicker = $(this);

            //获取值
            if (typeof value === "undefined") {
                datetimepicker.hqDatetimepicker('destroy');
                return datetimepicker.val();
            }

            //设置值
            datetimepicker.val(value);
        },
        editEvent: function (field, row, index, grid) {
            var datetimepicker = $(this);

            $.hqDatetimepicker.setLocale('zh');
            datetimepicker.hqDatetimepicker('destroy');
            datetimepicker.hqDatetimepicker({
                lang: 'zh',
                //https://www.php.net/manual/zh/function.date.php
                format: field.format || 'Y-m-d H:i:s',
                //坐标容器
                coordinate: grid.container[0],
                onClose: function (ct, $i) {
                    $i.hqDatetimepicker('destroy');
                }
            });
            datetimepicker.hqDatetimepicker('show');
        }
    });

})(jQuery);
;
(function ($) {
    //render date type
    $.hqGrid.addRender('date', $.extend({}, $.hqGrid.addRender.datetime, {
        className: {
            field: "date-field"
        },
        align: "center",
        editEvent: function (field, row, index, grid) {
            var datetimepicker = $(this);

            $.hqDatetimepicker.setLocale('zh');
            datetimepicker.hqDatetimepicker('destroy');
            datetimepicker.hqDatetimepicker({
                lang: 'zh',
                timepicker: false,
                format: field.format || 'Y-m-d',
                coordinate: grid.container[0],
                onClose: function (ct, $i) {
                    $i.hqDatetimepicker('destroy');
                }
            });
            datetimepicker.hqDatetimepicker('show');
        }
    }));
})(jQuery);
;
(function ($) {

    //render time type
    $.hqGrid.addRender('time', $.extend({}, $.hqGrid.addRender.datetime, {
        className: {
            field: "time-field"
        },
        align: "center",
        valueTransform: function (item, field) {
            return item;
        },
        editEvent: function (field, row, index, grid) {

            var datetimepicker = $(this);

            $.hqDatetimepicker.setLocale('zh');
            datetimepicker.hqDatetimepicker('destroy');
            datetimepicker.hqDatetimepicker({
                lang: 'zh',
                step: 30,
                datepicker: false,
                coordinate: grid.container[0],
                format: 'H:i',
                onClose: function (ct, $i) {
                    $i.hqDatetimepicker('destroy');
                }
            });
            datetimepicker.hqDatetimepicker('show');
        }
    }));
})(jQuery);

;
(function ($) {
    //render icon type
    $.hqGrid.addRender('icon', {
        className: {
            field: "icon-field"
        },
        align: "center",
        filter: function (a, b) {
            return true;
        },
        itemTemplate: function (item, field) {
            var title = item.title,
                src = item.value,
                html;

            if (!src) {
                html = ['<span title="', title, '" class="hqgrid-img hqgrid-icons-image-none" />'].join('');
            } else {
                html = ['<img title="', title, '"  class="hqgrid-img" src="', src, '"/>'].join('');
            }

            return html;
        },
        editTemplate: function (item, field) {
            var value = item.value || item.text,
                title = item.title,
                html;

            if (!value) {
                html = ['<span class="hqgrid-img hqgrid-icons-image-none" />'].join('');
            } else {
                html = ['<img title="', title, '" class="hqgrid-img" src="', value, '"/>'].join('');
            }

            return html;
        },
        editElement: function () {

            return $(this).find('img')[0];
        },
        editEvent: function (field, params) {

        },
        editValue: function (value) {

            var img = $(this);
            //获取值
            if (typeof value === "undefined") {
                value = img.attr('src');
                value = $.hqGrid.htmlDecode(value);
                return value;
            }

            //设置值
            value = $.hqGrid.htmlEncode(value);
            img.attr('src', value);
        }
    });

})(jQuery);


;
(function ($) {
    //render number type
    $.hqGrid.addRender('number', {
        className: {
            field: "number-field"
        },
        align: "right",
        sorter: function (a, b) {
            a = a.value || a.text;
            b = b.value || b.text;

            return a - b;
        },
        filter: function (a, b) {
            a = a.value || a.text;
            b = b.value || b.text;

            if (!a) {
                return true;
            }

            if (a == b) {
                return true;
            }

            return false;
        },
        editTemplate: function (item, field) {
            var fieldName = $.hqGrid.htmlEncode(field.name),
                fieldText = $.hqGrid.htmlEncode(field.text),
                text = item.value || item.text;

            if (text !== '') {
                text = Number(text) + 0;
            }

            return ['<input data-name="', fieldName, '"', 'placeholder="', fieldText, '"', ' type="text" value="', text, '" />'].join('');
        },
        editElement: function () {
            return $(this).find('input')[0];
        },
        editValue: function (value) {
            var numberElement = $(this);

            //获取值
            if (typeof value === "undefined") {
                value = numberElement.val();
                if (value === '') {
                    return '';
                } else {
                    return Number(value) + 0;
                }
            }

            //设置值
            if (value !== '') {
                value = Number(value) + 0;
            }
            numberElement.val(value);

        }
    });

})(jQuery);
;
(function ($) {

    //render select type
    $.hqGrid.addRender('select', {
        className: {
            field: "select-field"
        },
        align: "center",
        cascadeEvent: "change",
        filter: function (a, b, field) {
            a = a.value;
            b = b.value;

            if (!a) {
                return true;
            }

            if (a == b) {
                return true;
            }

            return false;
        },
        itemTemplate: function (item, field, row, index) {
            var items = field.items||[],
                fieldItem,
                value = item.value,
                text = item.text,
                title;

            if (!text) {
                items = this._getItems(field, row, index)||[];
                for (var i = 0, len = items.length; i < len; i++) {
                    fieldItem = items[i];
                    if (fieldItem[field.valueField] == value) {
                        text = fieldItem[field.textField];
                        text = $.hqGrid.htmlEncode(text);
                        break;
                    }
                }
            }

            title = item.title || item.text;

            return ['<span title="', title, '">', text, '</span>'].join('');
        },
        editTemplate: function (item, field, row, index) {
            var items = this._getItems(field, row, index);
            return this._editTemplate(item, field, items);
        },
        editElement: function () {
            return $(this).find('select')[0];
        },
        editEvent: function (field, params) {

        },
        editValue: function (value) {
            var selectElement = $(this),
                text;

            //获取值
            if (typeof value === "undefined") {
                value = selectElement.val();
                text = selectElement.find('option[value="' + value + '"]').text();
                if (!isNaN(value) && value !== "") {
                    value = parseInt(value);
                }
                return {
                    text: text,
                    value: value
                };
            }

            //设置值
            selectElement.val(value);

        },
        _getItems: function (field, row, index) {
            var items = field.items,
                fn;

            if (typeof items === 'string') {
                items = window[items];
            }

            if (typeof items === 'function') {
                fn = items;
                //同步获取数据
                items = fn(field, row, index);
                if (field.cache !== false) {
                    field.items = items;
                }
            }

            return items;
        },
        _editTemplate: function (item, field, items) {

            var value = item.value,
                fieldName = $.hqGrid.htmlEncode(field.name),
                cell = [],
                selected = '';

            items=items||[];
            cell.push('<select data-name="' + fieldName + '">');
            // cell.push('<option value=""></option>');
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                if (value == item[field.valueField]) {
                    selected = ' selected="true"';
                } else {
                    selected = '';
                }
                cell.push('<option ' + selected + ' value="' + $.hqGrid.htmlEncode(item[field.valueField]) + '">' +
                    $.hqGrid.htmlEncode(item[field.textField]) +
                    '</option>');
            }

            cell.push('</select>');
            cell.push('</div>');

            return cell.join('');
        }
    });

})(jQuery);
;
(function ($) {
    $.hqGrid.addRender('stacklevelbar', $.extend({}, $.hqGrid.addRender.number, {
        className: {
            field: "stacklevelbar-field",
            height: "height-x4",
            padding: "padding-none"
        },
        width: 36,
        align: "center",
        itemTemplate: function (item, field) {

            var title = item.title || item.text || item.value,
                value = item.value || item.text || 0,
                level = field.level,
                min = 0,
                max = 0,
                i,
                len,
                range,
                lineSytle,
                item,
                height,
                scale,
                html = [];

            if (!level) {
                return;
            }

            for (i = 0, len = level.length; i < len; i++) {
                item = level[i];
                if (max < item.max) {
                    max = item.max;
                }
                if (min > item.min) {
                    min = item.min;
                }
            }
            range = max - min;

            html.push('<div title="' + title + '" class="height-max padding-h-half-x2">');
            for (len = level.length, i = len - 1; i >= 0; i--) {
                item = level[i];
                //分组
                height = ((item.max || 0) - (item.min || 0)) / (range || 1) * 100;
                height = Math.floor(height, 2);
                //数值
                scale = 0;
                //分割线
                lineSytle = item.line ? ('border-top: ' + item.line + ' 2px dotted') : '';
                //显示值
                if (value >= item.max) {
                    scale = 100;
                } else if (value < item.max) {
                    scale = (value - item.min) / (item.max - item.min) * 100;
                }

                html.push(['<div style="width:100%;height:', height, '%;', lineSytle, ';">',
                    '   <div style="width:100%;height:', 100 - scale, '%;"></div>',
                    '   <div style="width:100%;height:', scale, '%;background-color:', item.color, ';"></div>',
                    '</div>'
                ].join(''));
            }
            html.push('</div>');

            return html.join('');
        }
    }));
})(jQuery);
;
(function ($) {
    $.hqGrid.addRender('tree', {
        className: {
            field: "tree-field",
            height: ''
        },
        align: "left",
        customEvents: [
            {
                //按照className筛选
                filter: 'hqgrid-icons-collapse',
                fn: 'expandEvent'
            },
            {
                filter: 'hqgrid-icons-expand',
                fn: 'collapseEvent'
            },
            {
                filter: 'hqgrid-tree-icon',
                fn: 'treeIconEvent'
            }
        ],
        sorter: function (a, b) { },
        filter: function (a, b) {
            a = a.value || a.text;
            b = b.value || b.text;

            if (!a) {
                return true;
            }

            if (b.indexOf(a) !== -1) {
                return true;
            }

            return false;
        },
        valueTransform: function (item, field) {
            return item;
        },
        valueDisplay: function (item, field) {
        },
        itemTemplate: function (item, field) {
            var title = item.title || item.text || item.value,
                text = item.text || item.value,
                icons = item.icons,
                level = item.level,
                children = item.children,
                loaded = (children && children.length > 0) || item.loaded,
                hidden = loaded && (!children || children.length === 0),
                icon,
                src,
                expand = loaded ? item.expand : false,
                html = '';

            html = '<span class="hqgrid-tree-level" ' + ' style="margin-left:' + (level - 1) * 16 + 'px; "' + '></span>';
            if (hidden) {
                html += '<span class="hqgrid-icon-x16"></span>';
            }
            else if (expand) {
                html += '<span class="hqgrid-icon-x16 hqgrid-icons-expand"></span>';
            }
            else {
                html += '<span class="hqgrid-icon-x16 hqgrid-icons-collapse"></span>';
            }

            if (icons) {
                for (var i = 0, len = icons.length; i < len; i++) {
                    icon = icons[i];
                    src = icon;
                    if (typeof icon === 'object') {
                        title = icon.title || title;
                        src = icon.src;
                    }
                    html += ['<img title="', title, '"  class="hqgrid-img hqgrid-tree-icon" src="', src, '"/>'].join('');
                }
            }

            html += ['<span class="hqgrid-tree-text" title="', title, '">', text, '</span>'].join('');

            return html;
        },
        editTemplate: function (item, field) {
            var fieldName = $.hqGrid.htmlEncode(field.name),
                fieldText = $.hqGrid.htmlEncode(field.text),
                value = item.value || item.text;

            return ['<input data-name="', fieldName, '" ', 'placeholder="', fieldText, '"', ' type="text" value="', value, '" />'].join('');
        },
        filterTemplate: null,
        insertTemplate: null,
        editEvent: function (field, row, index, params) {
            var $text = $(this),
                text = $text[0],
                length;

            //首次获取焦点，将光标定位到文本最后
            if (!$text.attr('data-focus')) {
                if ($text.length > 0) {
                    text.focus();
                    length = $text.val().length;
                    if (length > 0) {
                        $.hqGrid.setSelectionRange(text, length, length);
                    }
                    $text.attr('data-focus', true);
                }
            }

        },
        expandEvent: function (field, row, index, grid) {
            var node = row[field.name];
            if (node.loaded || (node.children && node.children.length > 0)) {
                grid.treeNodeExpand(node, index, $(this));
            }
            else {
                grid.loadTreeByAsyn(node, index, $(this));
            }
        },
        collapseEvent: function (field, row, index, grid) {
            grid.treeNodeCollapse($(this), field, row, index);
        },
        treeIconEvent: function (field, row, index, grid) {
            grid.treeIconClick($(this), field, row, index);
        },
        filterEvent: null,
        insertEvent: null,
        editValue: function (value) {
            var textElement = $(this);

            //获取值
            if (typeof value === "undefined") {
                return textElement.val();
            }

            //设置值
            textElement.val(value)

        },
        editElement: function () {
            return $(this).find('input')[0];
        }
    });
})(jQuery);
/*!
 * hqgrid-language v1.0.0
 *
 * 
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-12-19
 * v1.0
 */

;
(function ($) {

    var language = {};

    $.hqGrid = $.hqGrid || {};
    $.hqGrid._Language = language;


    language.zh = {
        noDataContent: '暂无数据',
        total: '总计',
        page: {
            numberFormat: '共 {pageNumber} 页',
            countFormat: "第 {start} - {end} 共 {pageCount} 行",
            filterFormat:'筛选出 {number} 行 / '
        }
    };

    language.en = {
        noDataContent: 'no-data',
        total: 'total',
        page: {
            numberFormat: 'of {pageNumber}',
            countFormat: "Rows {start} - {end} of {pageCount}",
            filterFormat:'filter {number} Rows / '
        }

    };

})($);
/*!
 * hqgrid-validation v1.0.0
 *
 * 
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-12-08
 * v1.0
 */

;
(function ($) {

    var validation = {};

    $.hqGrid = $.hqGrid || {};
    $.hqGrid._Validation = validation;

    validation.required = {
        validator: function (field, value, row, param) {
            if (value === '') {
                return false;
            }

            return true;
        },
        message: function (field, value, row) {
            return 'required';
        },
        param: []
    }

    validation.rangeLength = {
        validator: function (field, value, row, param) {
            var min = param[0],
                max = param[1],
                value,
                length;

            if (!value) {
                value = '';
            }
            if (typeof value === 'object') {
                value = value.value;
            }

            length = value.length;

            if (length >= min && length <= max) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value length should be between " + param[0] + " and " + param[1] + ".\nThe value \"" + value + "\" is out of specified length range.";
        },
        param: []
    }

    validation.minLength = {
        validator: function (field, value, row, param) {
            var min = param[0],
                value,
                length;

            if (!value) {
                value = '';
            }
            length = value.length;

            if (length >= min) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value length should be greater than or equal to  " + param[0] + ". The value \"" + value + "\" is out of specified range.";
        },
        param: []
    }

    validation.maxLength = {
        validator: function (field, value, row, param) {
            var max = param[0],
                value,
                length;

            if (!value) {
                value = '';
            }
            length = value.length;

            if (length <= max) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value length should be greater than or equal to " + param[0] + ". The value \"" + value + "\" is out of specified range.";
        },
        param: []
    }

    validation.min = {
        validator: function (field, value, row, param) {
            var min = param[0];

            if (isNaN(value)) {
                return false;
            }

            if (value >= min) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value  should be less than or equal to " + param[0] + ". The value \"" + value + "\" is out of specified range.";
        },
        param: []
    }

    validation.max = {
        validator: function (field, value, row, param) {
            var max = param[0];

            if (isNaN(value)) {
                return false;
            }

            if (value <= max) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value should be less than or equal to " + param[0] + ". The value \"" + value + "\" is out of specified range.";
        },
        param: []
    }

    validation.range = {
        validator: function (field, value, row, param) {
            var min = param[0],
                max = param[1];

            if (isNaN(value)) {
                return false;
            }

            if (min <= value && value <= max) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value should be between " + param[0] + " and " + param[1] + ". The value \"" + value + "\" is out of specified range.";
        },
        param: []
    }

    validation.pattern = {
        validator: function (field, value, row, param) {
            var pattern = param[0],
                regExp = new RegExp(pattern, 'g');

            if (reg.test(value)) {
                return true;
            }

            return false;
        },
        message: function (field, value, row, param) {
            return "The value not conform to the pattern";
        },
        param: []
    }

})($);
/*!
 * hqGrid -  jQuery  plug
 *
 * Includes jquery.js (version>1.7)
 * Includes jquery-mousewheel.js
 * Includes datetimepicker
 * reference antiscroll.js
 * reference clusterize.js
 * 
 * https://github.com/Automattic/antiscroll
 * http://NeXTs.github.com/Clusterize.js/
 * 
 * https://github.com/xdan/datetimepicker
 * 
 * https://www.fancygrid.com/samples/themes/bootstrap
 * https://www.ag-grid.com/
 * http://js-grid.com/demos/
 * http://opensource.addepar.com/ember-table/#/overview
 * 
 *
 * Copyright © 2017-2018 huangqing
 * Released under the MIT license
 *
 * Date: 2017-11-08
 * v1.0
 */


;
(function ($, window, undefined) {
    'use strict';

    var HQGridScroll,
        Clusterize,
        Render,
        Validation,
        Language;

    $.hqGrid = $.hqGrid || {};
    $.hqGrid._Grid = HQGrid;

    Render = $.hqGrid._Render;
    Validation = $.hqGrid._Validation;
    Language = $.hqGrid._Language;

    HQGridScroll = $.hqGrid._Scroll;
    Clusterize = $.hqGrid._Clusterize;

    function HQGrid(elem, options) {
        this.opt = $.extend(true, {
            defaultField: {
                fieldType: {}
            },
            config: {
                fields: {},
                render: {}
            },
            fields: [],
            data: [],
            tree: [],
            autoload: true,
            rollingload: false,
            fixedIndex: false,

            width: "auto",
            height: "auto",
            defaultHeight: 200,

            language: "zh",

            heading: true,
            filtering: false,
            inserting: false,
            editing: false,
            selecting: true,
            selectingAll: true,
            sorting: false,

            paging: true,
            pageSize: 20,
            pageCache: 3,

            rowSingleSelect: true,
            autoResize: true,
            style: {
                row: {
                    _height: '',
                    height: ''
                }
            },
            control: {
                insert: true,
                remove: true,
                save: true
            },
            events: {
                beforeEdit: function (field, row, index, selected) { },
                edited: function (field, row, index, selected) { },
                changed: function (field, prev, current, index, selected) { },
                updated: function (rows) { },
                rowClick: function (field, row, index, selected) { },
                goto: function (row, index, selected) { },
                treeExpand: function (field, row, index, selected) { },
                treeCollapse: function (field, row) { },
                treeIconClick: function (field, row, index, selected) { },
            }

        }, options);

        this.POSITION = {
            LEFT: 'left',
            MIDDLE: 'middle'
        }

        this.ELEMTYPE = {
            HEADER: 'header',
            BODY: 'body',
            FOOT: 'foot'
        }

        this.SCROLLSOURCETYPE = {
            LEFT: 'left',
            MAIN: 'main',
            HEADER: 'header',
            FOOT: 'foot'
        }

        this.RENDERTYPE = {
            VIEW: 'itemTemplate',
            FILTER: 'filterTemplate',
            INSERT: 'insertTemplate',
            EDIT: 'editTemplate',
            EDITEVENT: 'editEvent',
            INSERTEVENT: 'insertEvent',
            FILTEREVENT: 'filterEvent',
            EDITVALUE: 'editValue',
            VALUETRANSFORM: 'valueTransform',
            CUSTOMEVENTS: 'customEvents',
            VALUEDISPLAY: 'valueDisplay'
        }

        this.MODETYPE = {
            LIST: 'list',
            TREE: 'tree'
        }

        if (!this.opt.editing) {
            this.opt.inserting = false;
        }

        this.container = elem;

        this.fields = {
            origin: [],
            group: [],
            groupFields: {
                left: [],
                middle: []
            },
            left: [],
            middle: [],
            hidden: [],
            hash: {},
            render: {},
            filter: {},
            sort: {},
            extendField: {
                name: '_hqgrid_extend_field',
                text: '',
                width: 0
            },
            fixedField: {
                name: '_hqgrid_extend_fixed_field',
                text: '',
                index: 99999,
                width: 0,
                fixed: true
            }
        }

        this.elements = {
            header: {
                box: null,
                left: {
                    outerbox: null,
                    box: null,
                    innerbox: null,
                    contentbox: null,
                    scrollbox: null,
                    tablebox: null
                },
                middle: {
                    outerbox: null,
                    box: null,
                    innerbox: null,
                    contentbox: null,
                    scrollbox: null,
                    tablebox: null
                }
            },
            body: {
                box: null,
                left: {
                    outerbox: null,
                    box: null,
                    innerbox: null,
                    contentbox: null,
                    scrollbox: null,
                    tablebox: null
                },
                middle: {
                    outerbox: null,
                    box: null,
                    innerbox: null,
                    contentbox: null,
                    scrollbox: null,
                    tablebox: null
                }
            },
            foot: {
                left: {
                    outerbox: null,
                    box: null,
                    innerbox: null,
                    contentbox: null,
                    scrollbox: null,
                    tablebox: null
                },
                middle: {
                    outerbox: null,
                    box: null,
                    innerbox: null,
                    contentbox: null,
                    scrollbox: null,
                    tablebox: null
                }
            },
            paging: {
                box: null
            },
            loading: {
                box: null
            }
        }

        this.instance = {
            header: {
                left: {
                    scroll: null,
                    clusterize: null
                },
                middle: {
                    scroll: null,
                    clusterize: null
                }
            },
            body: {
                left: {
                    scroll: null,
                    clusterize: null,
                    rows: []
                },
                middle: {
                    scroll: null,
                    clusterize: null,
                    rows: []
                }
            },
            foot: {
                left: {
                    scroll: null,
                    clusterize: null
                },
                middle: {
                    scroll: null,
                    clusterize: null
                }
            }
        }

        this.scroll = {
            top: 0,
            left: 0
        }

        this.data = {
            fn: null,
            origin: [],
            page: [],
            filter: [], // filter rowIndex
            sort: [], // sort rowIndex
            current: [],
            pages: {},
            rollingload: []
        }

        this.location = {
            id: null,
            state: null//loadingTree loadingContent goToRow
        };

        this.tree = {
            name: null,
            fn: null,
            origin: null,
            list: null
        }

        this.paging = {
            pageIndex: 1,
            pageSize: this.opt.pageSize,
            pageCount: 0,
            pageNumber: 0
        }

        this.total = this.opt.total || null;

        this.edit = {
            prev: {
                index: null,
                $cell: null,
                field: null,
                type: null,
                changed: false
            },
            current: {
                index: null,
                $cell: null,
                field: null,
                type: null,
                changed: false
            },
            changed: {

            }
        }

        this.selected = {};
        this.inserted = {};
        this.removed = [];
        this.invalidation = {};

        this.loading = false;
        this.loadingPageIndex = -1;

        this.language = Language[this.opt.language] || Language.zh;
        this.fontSize = this.opt.fontSize || 12;

        this.init();
    }

    HQGrid.prototype.init = function () {
        this.createContainer();
        this.loadFields();
    }

    HQGrid.prototype._init = function () {
        this.initFields();
        this.initTree();
        this.initData();
        this.initPaging();
        this.create();
        this.bindEvent();
    }

    HQGrid.prototype.loadFields = function (callback) {
        var fn = this.opt.fields,
            self = this,
            resolve = function (result) {
                if (!self.container) {
                    self = null;
                    return;
                }
                if (result.success) {
                    self.fields.origin = result.data;
                    self._init();
                    self.hideLoading();
                } else {
                    console.warn("load fields is not success!");
                    self.hideLoading();
                }

            };

        //异步加载
        if (typeof fn === 'function') {
            this.showLoading();
            fn({}, resolve);
        } else {
            self.fields.origin = this.opt.fields;
            this._init();
        }
    }

    HQGrid.prototype.initFields = function () {
        var render = $.extend(true, {}, Render),
            ren,
            extendRen;

        this.fields.render = render;

        for (var i in render) {
            ren = render[i];
            extendRen = this.opt.config.render[i];
            if (extendRen) {
                $.extend(ren, extendRen);
            }
        }

        //格式化-多表头
        this.formatFields();
    }

    HQGrid.prototype.loadFieldsDatasource = function () {

    }

    HQGrid.prototype.setFixedIndexField = function (fields) {
        if (this.opt.fixedIndex) {
            fields.push(this.fields.fixedField);
        }
    }

    // 格式化fields
    HQGrid.prototype.formatFields = function () {
        var fields = this.fields.origin.concat();

        this.setFixedIndexField(fields);
        this.sortFields(fields);
        for (var i = 0, len = fields.length; i < len; i++) {
            var field = fields[i];
            if (typeof field.width === 'number' && field.width <= 0) {
                field.hidden = true;
            }
            //[TODO]暂时强制为false
            field.fixed = false;
            this._formatFields(field, 0);
        }

        this.calculateRowspan();
        this.formatGroupFields();
    }

    // 计算列表头rowspan
    HQGrid.prototype.calculateRowspan = function () {

        function _calculateRowspan(fields) {
            var rowCount = fields.length,
                items,
                field,
                rowspan;

            for (var i = 0, len = fields.length; i < len; i++) {
                items = fields[i];
                for (var j = 0, lenj = items.length; j < lenj; j++) {
                    field = items[j];
                    rowspan = rowCount - field.rowslevel + 1;
                    field.rowspan = rowspan;
                    delete field.rowslevel;
                }
            }
        }

        _calculateRowspan(this.fields.groupFields.left);
        _calculateRowspan(this.fields.groupFields.middle);
    }

    // 递归列表头
    HQGrid.prototype._formatFields = function (field, index) {
        var colspan = 0,
            rowslevel = 0,
            result,
            width = 0,
            childFields,
            childField,
            fieldHash = this.fields.hash,
            fixed,
            extendDefaultField;

        this.initValidateFields(field);

        childFields = field.fields;
        if (childFields && childFields.length > 0) {
            this.sortFields(childFields);
            //fixed field format
            for (var i = 0, len = childFields.length; i < len; i++) {
                childField = childFields[i];
                if (childField.fixed) {
                    field.fixed = true;
                    break;
                }
            }
            for (var i = 0, len = childFields.length; i < len; i++) {
                childField = childFields[i];
                if (field.hidden) {
                    childField.hidden = true;
                }
                //由上到下
                if (field.fixed) {
                    childField.fixed = true;
                }
                result = this._formatFields(childField, index + 1);
                colspan += result.colspan;
                rowslevel = result.rowslevel;
                width += result.width;
                if (result.fixed) {
                    fixed = true;
                }
            }
        } else {
            //base-fields
            extendDefaultField = this.extendDefaultField(field);
            this.initDivideFields(extendDefaultField);
            fieldHash[field.name] = extendDefaultField;
            //style-row-height
            this.calculateRenderStyle(field);
            rowslevel = index + 1;
            colspan = 1;
            fixed = !!field.fixed;
            if (extendDefaultField.hidden) {
                width = 0;
                --colspan;
            } else {
                width = field.width || extendDefaultField.width || '';
                if (!field.width && field.fixed) {
                    width = this.getFieldWidthByText(field.text);
                }
            }
        }

        field.colspan = colspan;
        field.rowslevel = rowslevel;
        field.width = width;
        field.fixed = fixed;

        this.initDivideGroupFields(field, index);

        return {
            colspan: colspan,
            rowslevel: rowslevel,
            width: width,
            fixed: fixed
        };
    }

    // fields-has-fixed-fields
    HQGrid.prototype.hasFixedFields = function () {
        return (this.fields.left && this.fields.left.length > 0);
    }

    HQGrid.prototype.calculateRenderStyle = function (field) {
        var render = this.fields.render[field.type] || this.fields.render.text,
            rowStyle = this.opt.style.row,
            last,
            current,
            classNameHeight = render.className.height;

        if (classNameHeight) {
            if (rowStyle._height) {
                last = rowStyle._height.replace(/height-x/, '');
                current = classNameHeight.replace(/height-x/, '');
                if (last < current) {
                    rowStyle._height = classNameHeight;
                }
            } else {
                rowStyle._height = classNameHeight;
            }
        }
    }

    HQGrid.prototype.sortFields = function (fields) {
        var i, j, len,
            a, b,
            temp;

        if (!fields) {
            return;
        }
        for (i = 0, len = fields.length; i < len - 1; i++) {
            var c = fields[i];
            for (j = 1; j < len; j++) {
                a = fields[j - 1];
                b = fields[j];

                //未设置序号的默认优先显示
                if (typeof a.index !== 'number') {
                    a.index = -999;
                }
                if (typeof b.index !== 'number') {
                    b.index = -999;
                }
                //强制树类型在第一列
                if (a.type === "tree") {
                    a.index = -9999;
                }
                if (b.type === 'tree') {
                    b.index = -9999;
                }

                if (a.index > b.index) {
                    temp = fields[j];
                    fields[j] = fields[j - 1];
                    fields[j - 1] = temp;
                }
            }
        }
    }

    HQGrid.prototype.sortGroupFields = function (groupField) {
        var i, len, fields;

        if (!groupField) {
            return;
        }
        for (i = 0, len = groupField.length; i < len; i++) {
            fields = groupField[i];
            this.sortFields(fields);
        }
    }

    HQGrid.prototype.extendDefaultField = function (field) {
        var defaultField = this.opt.defaultField,
            fieldType = defaultField.fieldType[field.type] || {},
            render = this.fields.render[field.type] || {},
            tempField;

        tempField = $.extend(true, {
            width: render.width || ''
        }, fieldType, field);

        field = tempField;


        return field;
    }

    HQGrid.prototype.initDivideGroupFields = function (field, index) {
        var groupFields = this.fields.groupFields,
            fixedFields = groupFields.left[index],
            commonFields = groupFields.middle[index];

        if (!groupFields.left[index]) {
            fixedFields = [];
            groupFields.left[index] = fixedFields;
        }

        if (!groupFields.middle[index]) {
            commonFields = [];
            groupFields.middle[index] = commonFields;
        }

        if (!field.hidden && field.fixed) {
            fixedFields.push(field);
        } else if (!field.hidden) {
            commonFields.push(field);
        }
    }

    HQGrid.prototype.formatGroupFields = function () {
        var groupFields = this.fields.groupFields,
            fixedFields = groupFields.left,
            commonFields = groupFields.middle;

        if (fixedFields.length > 1) {
            this.formatGroupExtendField(fixedFields, this.fields.left);
            this.formatGroupExtendField(commonFields, this.fields.middle);
        }
    }

    HQGrid.prototype.formatGroupExtendField = function (fields, baseFields) {
        var isPushExtendField = true,
            extendField = this.fields.extendField,
            items,
            fields;

        if (fields instanceof Array && fields.length > 0) {
            for (var i = 0, len = fields.length; i < len; i++) {
                items = fields[i];
                if (i === 0 && items.length === 0) {
                    isPushExtendField = false;
                    break;
                }
                items.push(extendField);
            }

            if (isPushExtendField) {
                baseFields.push(extendField);
            }

        }
    }

    HQGrid.prototype.initDivideFields = function (field) {

        if (field.hidden) {
            this.fields.hidden.push(field);
        } else if (field.fixed === true) {
            this.fields.left.push(field);
        } else {
            this.fields.middle.push(field);
        }
    }

    HQGrid.prototype.initValidateFields = function (field) {
        var validate,
            validateItem,
            fn;

        if (field.validate) {
            for (var i = 0, len = field.validate.length; i < len; i++) {
                validateItem = field.validate[i];
                if (typeof validateItem.validator === 'string') {

                    fn = Validation[validateItem.validator];
                    if (typeof fn === 'object') {
                        validate = $.extend({}, fn, validateItem);
                        validate.validator = fn.validator;
                        field.validate[i] = validate;
                    }
                }
            }
        }
    }

    HQGrid.prototype.initTree = function () {
        var fn = this.opt.tree,
            item;

        if (typeof fn === 'function') {
            this.tree.fn = fn;
        }

        if (this.fields && this.fields.hash) {

            for (var i in this.fields.hash) {
                item = this.fields.hash[i];
                if (item.type === 'tree') {
                    this.tree.name = item.name;
                }
            }
        }
    }

    HQGrid.prototype.initData = function () {
        var data = this.opt.data;

        if (typeof data === 'function') {
            this.data.fn = data;
        } else {
            this.data.origin = this.opt.data || [];
        }

    }

    HQGrid.prototype.initPaging = function () {
        this.paging.pageIndex = 1;

        if (!this.opt.paging || this.opt.pageSize <= 0) {
            this.paging.pageCount = this.data.origin.length;
            this.paging.pageSize = this.paging.pageCount || -1;
        }
    }

    HQGrid.prototype.reloadData = function () {
        var row,
            data = this.data.page,
            filter = this.fields.filter,
            sort = this.fields.sort,
            buf = [];

        this.data.filter = [];

        //筛选
        if (JSON.stringify(filter) !== '{}') {
            for (var i = 0, len = data.length; i < len; i++) {
                row = data[i];

                if (this.filterData(row)) {
                    buf.push(row);
                    this.data.filter.push(this.getRowIndex(i, true));
                }
            }
        } else {
            buf = data;
        }

        //排序
        if (JSON.stringify(sort) !== '{}') {
            buf = buf;
        }

        this.data.current = buf;

        this.displayNoData();
    }

    HQGrid.prototype.displayNoData = function () {
        if (this.data.current.length === 0) {
            this.container.find('.hqgrid-body-nodata').show();
        } else {
            this.container.find('.hqgrid-body-nodata').hide();
        }
    }

    HQGrid.prototype.filterData = function (row) {

        var filter = this.fields.filter,
            field,
            fieldsHash = this.fields.hash,
            filterValue,
            render = this.fields.render,
            checked = true,
            a,
            b,
            fn;

        for (var j in filter) {
            if (filter.hasOwnProperty(j)) {
                field = fieldsHash[j];
                fn = render[field.type].filter;
                if (typeof fn === 'function') {
                    filterValue = filter[j];

                    a = this.getItem(filterValue, false);
                    b = this.getItem(row[j], false);

                    checked = fn(a, b, field);
                    if (checked === false) {
                        break;
                    }
                }
            }
        }

        return checked;
    }

    HQGrid.prototype.sortData = function () {

    }

    HQGrid.prototype.createContainer = function () {
        var container;

        this.container.addClass('hqgrid-container');
        container = $('<div class="hqgrid"></div>');
        container.appendTo(this.container);
        this.container = container;

        this.createLoading();
    }

    // create-all
    HQGrid.prototype.create = function () {
        this.createHeader();
        this.createBody();
        this.createNoData();
        this.createContent();
        this.createFoot();
        this.createPaging();
        this.createScroll();
        this.resize();
        this.load();
    }

    // element-set
    HQGrid.prototype.setElements = function (elemType, position, container) {

        this.elements[elemType][position]['outerbox'] = container;
        this.elements[elemType][position]['box'] = container.find('.hqgrid-box')
        this.elements[elemType][position]['innerbox'] = container.find('.hqgrid-box-inner');
        this.elements[elemType][position]['tablebox'] = container.find('table');
        this.elements[elemType][position]['contentbox'] = container.find('.hqgrid-box-content');
        this.elements[elemType][position]['scrollbox'] = container.find('.hqgrid-box-scroll');
    }

    // index-hidden
    HQGrid.prototype.hiddenIndex = function (position) {
        var result = false;
        if (position === this.POSITION.MIDDLE && this.fields.left && this.fields.left.length > 0) {
            result = true;
        }

        return result;
    }

    /**
     * LOADING
     */

    // loading-create
    HQGrid.prototype.createLoading = function () {

        var loading = $(['<div class="hqgrid-loading">',
            '<div class="hqgrid-loading-bg"></div>',
            '<div class="hqgrid-icons-loading"></div>',
            '</div>'
        ].join(''));

        this.elements.loading.box = loading;
        loading.appendTo(this.container);
    }

    // loading-show
    HQGrid.prototype.showLoading = function (hideBg) {
        var $elem = this.elements.loading.box;
        if (hideBg) {
            $elem.addClass('hqgrid-loading-bg-hide');
        }
        else {
            $elem.removeClass('hqgrid-loading-bg-hide');
        }
        this.elements.loading.box.show();
    }

    // loading-hide
    HQGrid.prototype.hideLoading = function () {
        if (!this.loading) {
            this.elements.loading.box.hide();
        }
    }

    HQGrid.prototype.delayLoading = function (hideBg, time) {
        var _this = this;
        this.showLoading(hideBg);
        setTimeout(function () {
            if (!_this.loading) {
                _this.hideLoading();
            }
        }, time || 1000);
    }

    /**
     * HEADER
     */


    HQGrid.prototype.createHeader = function () {
        var header = $('<div class="hqgrid-header"></div>');

        this.elements.header.box = header;
        this.resetFields();
        header.appendTo(this.container);
    }

    HQGrid.prototype.resetFields = function () {
        var header = this.elements.header.box,
            leftHeader,
            middleHeader;

        leftHeader = this.createLeftHeader();
        middleHeader = this.createMiddleHeader();
        header.empty().append(leftHeader)
            .append(middleHeader);
    }

    HQGrid.prototype.createHeaderElem = function (position) {

        var elem,
            hiddenIndex = this.hiddenIndex(position),
            theader,
            controlName = '',
            filter = function (show) {
                if (!show) {
                    return '';
                };

                return ['<tr class="hqgrid-thead-filter">',
                    ' ', this.createFilterHtml(this.fields[position], hiddenIndex),
                    '</tr>',
                ].join('');

            },
            insert = function (show) {
                if (!show) {
                    return '';
                };

                return ['<tr class="hqgrid-thead-insert">',
                    ' ', this.createInsertHtml(this.fields[position], hiddenIndex),
                    '</tr>',
                ].join('');
            };

        controlName += this.opt.filtering ? ' hqgrid-thead-filter' : ' ';
        controlName += this.opt.inserting ? ' hqgrid-thead-insert' : ' ';

        theader = [
            '<div class="hqgrid-box-wrap hqgrid-scroll-wrap ', 'hqgrid-header-', position, controlName, ' ">',
            '   <div class="hqgrid-box">',
            '       <div class="hqgrid-box-scroll hqgrid-scroll-inner" >',
            '           <div class="hqgrid-box-inner" >',
            '               <table>',
            '                   <thead>',
            '                       ', this.createGroupFieldsHtml(this.fields.groupFields[position], hiddenIndex),
            '                       ', filter.call(this, this.opt.filtering),
            '                       ', insert.call(this, this.opt.inserting),
            '                   </thead>',
            '               </table>',
            '           </div>',
            '       </div>',
            '   </div>',
            '</div>',
        ].join('');


        elem = $(theader);

        this.setElements(this.ELEMTYPE.HEADER, position, elem);

        return elem;
    }

    HQGrid.prototype.createGroupFieldsHtml = function (groupFields, hiddenIndex) {

        var rows = [],
            fields,
            field,
            width = "",
            className = "",
            rowspan,
            colspan,
            text = "",
            resizable = this.opt.fieldsResizable;


        if (!groupFields || groupFields.length === 0) {
            return '';
        }

        for (var i = 0, len = groupFields.length; i < len; i++) {
            fields = groupFields[i];
            rows.push('<tr class="hqgrid-thead-title">');
            for (var j = 0, lenj = fields.length; j < lenj; j++) {
                field = fields[j];
                //序号 checkbox
                if (i === 0 && j === 0) {
                    if (!hiddenIndex) {
                        rowspan = groupFields.length;
                        rows.push(this.renderContentIndex('', 'th', rowspan));
                        rows.push(this.renderSelecting('th', !this.opt.selectingAll, null, rowspan));
                    }
                }

                text = field.text || "";
                if (field.width) {
                    width = ' width="' + field.width + '" ';
                } else {
                    width = '';
                }
                rowspan = field.rowspan > 1 ? (' rowspan="' + field.rowspan + '" ') : '';
                colspan = field.colspan > 1 ? (' colspan="' + field.colspan + '" ') : '';
                text = htmlEncode(text);

                rows.push([
                    '<th ', className, ' data-name="', htmlEncode(field.name), '"  title="', text, '" ', width, rowspan, colspan, '>',
                    '<div class="field-text">', text, '</div>',
                    resizable && field.rowspan === groupFields.length - i && field.resizable !== false ?
                        '<div class="hqgrid-thead-resize"/>' : '',
                    '</th>'
                ].join(''));
            }
            rows.push('</tr>');
        }
        return rows.join('');

    }

    HQGrid.prototype.createFieldsHtml = function (fields, hiddenIndex) {

        var row = [],
            field,
            width = "",
            text = "";

        if (!fields || fields.length === 0) {
            return '';
        }

        if (!hiddenIndex) {
            row.push(this.renderContentIndex('', 'th'));
            row.push(this.renderSelecting('th'));
        }
        for (var i = 0, len = fields.length; i < len; i++) {

            field = fields[i];
            text = field.text || "";
            if (field.width) {
                width = ' width="' + field.width + '"';
            } else {
                width = '';
            }
            text = htmlEncode(text);

            row.push([
                '<th data-name="', htmlEncode(field.name), '"  title="', text, '" ', width, '>',
                '<div>' + text + '</div>',
                '</th>'
            ].join(''));

        }
        return row.join('');
    }

    HQGrid.prototype.createFilterHtml = function (fields, hiddenIndex) {

        var row = [],
            field;

        if (!fields || fields.length === 0) {
            return '';
        }

        if (!hiddenIndex) {
            row.push(this.renderIndexFieldInFilterRow());
            row.push(this.renderSelectFieldInFilterRow());
        }
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                field = fields[i];
                if (this.isExtendField(field)) {
                    row.push('<td></td>');
                    continue;
                }
                row.push(this.renderCell(field, '', [this.RENDERTYPE.FILTER, this.RENDERTYPE.EDIT]));
            }
        }
        return row.join('');
    }

    HQGrid.prototype.createInsertHtml = function (fields, hiddenIndex) {

        var row = [],
            field,
            width = "",
            text = "";

        if (!fields || fields.length === 0) {
            return '';
        }

        if (!hiddenIndex) {
            row.push(this.renderIndexFieldInsertRow());
            row.push(this.renderSelectFieldInsertRow());
        }
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                field = fields[i];
                if (this.isExtendField(field)) {
                    row.push('<td></td>');
                    continue;
                }
                row.push(this.renderCell(field, '', [this.RENDERTYPE.INSERT, this.RENDERTYPE.EDIT]));
            }
        }
        return row.join('');
    }

    HQGrid.prototype.createLeftHeader = function () {
        var elem = '';
        if (!this.hasFixedFields()) {
            return elem;
        }
        var elem = this.createHeaderElem(this.POSITION.LEFT);
        if (this.hasFixedFields()) {
            elem.removeClass('hqgrid-header-hidden');
        } else {
            elem.addClass('hqgrid-header-hidden');
        }

        return elem;
    }

    HQGrid.prototype.createMiddleHeader = function () {
        var elem = this.createHeaderElem(this.POSITION.MIDDLE);
        return elem;
    }

    HQGrid.prototype.resizeFieldWidth = function (name, width) {
        var $head = this.elements.header.box,
            $bhead = this.elements.body.box,
            $foot = this.elements.foot.box,
            filter = 'th[data-name="' + name + '"]';

        $head && $head.find(filter).attr('width', width);
        $bhead && $bhead.find(filter).attr('width', width);
        $foot && $foot.find(filter).attr('width', width);

        this.resizeScroll();
    }

    /**
     * FOOT
     */

    HQGrid.prototype.createFoot = function () {
        if (!this.opt.total) {
            return;
        }
        var foot = $('<div class="hqgrid-foot"></div>'),
            leftFoot,
            middleFoot;

        leftFoot = this.createLeftFoot();
        middleFoot = this.createMiddleFoot();

        if (!this.total) {
            foot.addClass('hqgrid-foot-hidden');
        }

        foot.append(leftFoot)
            .append(middleFoot)
            .appendTo(this.container);

        this.elements.foot.box = foot;
    }

    HQGrid.prototype.createFootElem = function (position) {

        var $elem,
            hiddenIndex = this.hiddenIndex(position),
            foot;

        foot = [
            '<div class="hqgrid-box-wrap hqgrid-scroll-wrap ', 'hqgrid-foot-', position, '">',
            '   <div class="hqgrid-box">',
            '       <div class="hqgrid-box-scroll hqgrid-scroll-inner" >',
            '           <div class="hqgrid-box-inner" >',
            '               <table>',
            '                   <thead>',
            '                       <tr class="hqgrid-foot-title">',
            '                       ', this.createFieldsHtml(this.fields[position], hiddenIndex),
            '                       </tr>',
            '                       <tr class="hqgrid-foot-total">',
            '                       ', this.createTotalHtml(this.fields[position], hiddenIndex),
            '                       </tr>',
            '                   </thead>',
            '               </table>',
            '           </div>',
            '       </div>',
            '   </div>',
            '</div>',
        ].join('');


        $elem = $(foot);

        this.setElements(this.ELEMTYPE.FOOT, position, $elem);

        return $elem;
    }

    HQGrid.prototype.createTotalHtml = function (fields, hiddenIndex) {

        var row = [],
            field,
            width = "",
            text = "",
            total = this.total;

        if (!total || !fields || fields.length === 0) {
            return '';
        }

        if (!hiddenIndex) {
            row.push(this.renderContentIndex(this.language.total));
            row.push(this.renderSelecting('td', true));
        }
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                field = fields[i];
                row.push(this.renderTotalCell(field, '', this.RENDERTYPE.VIEW));
            }
        }
        return row.join('');
    }

    HQGrid.prototype.renderTotalCell = function (field, value, renderType) {
        var cell = [],
            _field,
            className = '',
            name = ' data-name="' + field.name + '" ',
            render = this.fields.render.text;

        cell.push('<td ' + name + className + '>');
        _field = $.extend(true, {}, field, {
            type: 'text'
        });
        cell.push(this.renderCellContent(_field, value, render, [renderType]));
        cell.push('</td>');

        return cell.join('');
    }

    HQGrid.prototype.createLeftFoot = function () {
        var elem = '';
        if (!this.hasFixedFields()) {
            return elem;
        }
        var elem = this.createFootElem(this.POSITION.LEFT);
        if (this.hasFixedFields()) {
            elem.removeClass('hqgrid-foot-hidden');
        } else {
            elem.addClass('hqgrid-foot-hidden');
        }

        return elem;
    }

    // foot-middle
    HQGrid.prototype.createMiddleFoot = function () {
        var elem = this.createFootElem(this.POSITION.MIDDLE);
        return elem;
    }

    //total-update
    HQGrid.prototype.updateTotal = function () {

        var paging = $.extend({}, this.paging),
            fields = $.extend(true, {}, this.fields.origin),
            filter = $.extend({}, this.fields.filter),
            rows = this.data.current,
            fn = this.total,
            self = this,
            resolve = function (row) {
                if (!self.container) {
                    self = null;
                    return;
                }
                var i,
                    text,
                    fields = self.fields.hash,
                    field,
                    left = self.elements.foot.left.tablebox,
                    middle = self.elements.foot.middle.tablebox,
                    container,
                    html;

                for (i in row) {
                    text = row[i];
                    field = fields[i];
                    html = self.renderTemplate(field, [self.RENDERTYPE.VIEW], text);
                    if (field.fixed) {
                        container = left;
                    } else {
                        container = middle;
                    }

                    container.find('td[data-name="' + field.name + '"]').html(html);
                }

            };

        if (typeof fn === 'function') {
            fn({
                fields: fields,
                filter: filter,
                paging: paging,
                rows: rows
            }, resolve);
        }
    }


    /**
     * NO-DATA
     */

    HQGrid.prototype.createNoData = function () {
        var image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAACICAYAAACIsFVdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMjE4ODJmMC04YjUxLTAyNDUtYjljNy1jOTJhMzQxODUyYjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTM1REJFMzIyODI1MTFFOEI2RTBENTEyMDdFNkI1NTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTM1REJFMzEyODI1MTFFOEI2RTBENTEyMDdFNkI1NTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZWQwMGVkY2EtMzA5OS1mYjQ2LTg5ZjItNmRjNzViMzk4M2E1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyMTg4MmYwLThiNTEtMDI0NS1iOWM3LWM5MmEzNDE4NTJiMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psb1nZYAAAr/SURBVHja7J0LsFVVGcfXDeTpBe7lYfZQQiklkWqGGMaKLCzsoTgRWAj4yqJS4lKi0YNIU9PUInOcfIBoSCmljE5RmtjLpoeEUjNqSmLCjUQI5I2372utOx323Xvfc85+7/P7zfznnrP2Ofec863zP3u9vrWb1q5da3LC0aLloreJ7hTNFu0zACXkVTl6L1eLxot6i84VnUP1AMZLnuM890+gegDjpU8PqgcwHgBgPIAi0zOD1+wvmijq5Skf6Ll/jOijnrIXRL8VdVB1UGSaUp5OGCJ61JmqXnSq4SyqDmhqVs+0iKZTpouOpeoA41XPlhj+xwHRS1QdYLzq+bHoRxH6aLtFnxO9SNVBkUl7cGW/aKqo2ee1fy0aVXH/VtHnPY/Z4c54ABivDnb4lB303N+bwyblYNGZog+IRouOMF1HZ+FQtA6fFT0sWipaR0iyM17R6COaI7pENIhw1ESLky5+bxOtdnF8jD4ehPEa0W9EV2K6WHif6A+iq0SHYbz8kYeUoKGiNe7XGuJD1+FeLHqoUX/M8mS8hzz3H8xBbFYY5gyT5B2u3odivOzQdv8i0f2iGaJVGb+fs0UnBxzT1TeniwaImlCoNEYniW4y/iPSbxXdbRosG6UpRxnoeftBeko0wufY9cZOcxwkTDUzTnSfaJjPsa+LvsIZr7F5Z4Dp7hDNxXR183vRacbO53qZL3oDxmts3u9TtlV0IaGJxXw3+ZTrfOgnMV5jM8Gn7EbRNkITC7cHlJ+awmvrqqmLRD8XtYt2iTYaO7/4GVE/+njZ0e7TDxkr+iOhiQVdkLDbp3x3wl/8j4u+bWx6WhCbXHdiBWe89GnxKXucsMTGnoDyvgm+5leNzeUc0s3jjhTdJfoyxksfvxUVewlLYdHpqYU1Pkents7EeAD1oStjrvdp0uoZcKRr9r5R9A3TdbXUtcZuVYLxAGrkPFFrxX0dTHmvO6M97VoyOme7wNi9gPZ4mp3nY7zaeK3oS6JHXIdZ5946qpQfHSXXy6J/GJsX+R3Rh0w5FjFP9tzXM9vvAh77K9G3PGWnJ/Gmyjiq2cMZ7lJjt4OH+vmX6AbRdcY/hzIKQT9wTTG/znZjl611Mtz9wARxjDsTdvKC+xHHeCEcLlopOgXPxIq2GD5h7Draohmvo8b/rzmqlStr9rp+IE3NAHTlw72YLhG0r7PKDUgUDe+Z+qhuHu89nsj+PmUy3s2i9+CRxNAzxUJjs0iKhHerie72ZJ3hub8e4wUz3SdgnTxsbNbzQEOKTpg0PrpUbonolZBYX26C06XyyL2e+zp6OTbgsZq+NN9Tdh+DK/70dp3h1/kc053Kzjds+V4r2nLQHLmWgONPit5sou34llYfTz/DM+bQTPeX3Q+ILgt73jUvZ4m+YA4dkNts7FzfTozXFV1/d6dPuZpRdwLbg4/q4l2iX4a0iqaI7imA8Ywz1ZI6W1I/oKnpT9A8yw2YLhI6/7ks5PiUAn0W3VZwUY3PWZiU6cpivKD2+s/wTmRuCTk2rmCfRUdkZxqbVxnGJteK+lqSbyaoqTnc2D1HdFDieNfxbndt5fvdL8GGnARU1935zbP0M/6pJ1A9OvG8PeCYtiaiZBOk2dSsRL/L54jOcN9t3Wjp36InjB1I+X4SfbrujKdfVl1S82kTvlxIO9WaGKpDy7sy/nJkVYGNQtjAVBP1Fr2pqZOkuoZtjul+jZ7O7us2CHqRyGF8NwHqM15/1yc6scbnj3Gn5z6EEqB2411m7NB7JTocf4Gx82M6tzHCnQ03+HSyFxFKgNr6eEcbm49U2bzUAZSpAf23ZneWe7eno63JhBsL3Mfr5fq32vFuzbhedEX8CteHznore/p4CZ3xzvaYTi+pNM0ED5rootPJHpNpU3N6wWOhFyWZlwPTKXqhlLnuPUFJjeddzX+FsUtqwtAh5qs9ZR8ueCxm8Z4gTeMd7yn7aZXP9V5k5DjCCVC98bxNq/Yqn7vZc39gwWOxlPcEaRrPu4TmiCqfe2Sdhs0rOpChWxzk4fLPL7n3cglf0fIa72+esmq30Z7ouf9swWOho4dtrgWQdW5cq3sv+/iKltd4qz1luknQgG6eN8h9MSr5BeEEqN54Szy/rMONnUNqDniOmlI3FHp9RZmu3byVcAJUb7znRN/1lE8y9loBnxLpBLuuQtdLEs925d7U/8Xu/wBAFXRmJ6ixNNu4nhwrvSzxhAz7I2QnZBPfqDEmO8HYvDWdAK/1MlSPGXuFTwYBAOownrLF2H02rqvCSPvd405yzwOAOpqaXjp3XdLlZLqyZYAz2N9FD4iW56hPR1OTpmZpjFeGLwbGw3iFaGo2MpoSdI2x23WX7SpA/3SfrRfVnB96EoL/oek3c0v62TTFaJ77kW2jqjnj5YlZfEbAeAAYryFYymcE+njpo+k3OhCh+620lOyzaYqRrqP9ItWcH5hOgHrjGzXGTCcAAMYDwHgAgPEAMB4AYDwAjAcAGA8A4wFgPFDIx4NUYa2mhXw84IyXAeTjAcYDwHiNAfl4QB8vA8jHg1QhHw/qjW/UGJOPBwAYDwDjAUDdDDb2MncYDyAlRhh7efJnRGdgPIB00GtNNjuPTcR4AOnQFHAb4wFkBRPoAPE1La8w9lqSSmvFsSmit7vbevXlxRgPIB4WiU4OODbUqZPRNDUt5ONBVB6p4bFrWDJmudaUNx+vE71mfVuM8a01xknUW94YWdHUnCS6zN2+29icT2W/aD1NTUuj5OORCJssT1XcflPF7S2iP1U+kKYmQAZgPAv5eBA3L1bcbvceTKKp2U/0QdGjoo0FCRL5eBA3q0UXGTuaeU2XjmwCgyt3iaaJNhu7QHRfwh+QfLxs4hs1xuTjxcwo9/fVTgBAHw8A4wFgvDroLXpAtLVCoyqOr6so19vHEnKA6MYbIzrV2JHATvWoOD6wony06GOEHCC68R431a9Re170E0IOEH0eT1McJnjK1rmzm6LTCc8RZoB4z3gAgPEAGtd4G9xfXau2uSBxIB8PCtXH80PTTz5i7KDLvoLEgevjQaqQCPv/s3Nryeta51IHxxjfWmOcRL3R1AQAjFcr5ONB4ft4RYR8vHTpE1C+C+M1FjoINM8JkufEgPInaGoCJMfMgPIfYjyAZNAdly/wKd8mug3jAcTPeNEq0WE+x3QudSt9PIB4OFz0FtEM0bkB37mtzpAjQv7PdtErVb7mQdF/MB6UlY6Y/o8uXlif0nvWZYwrRBebDFdW0dSERkM34JojWkAfDyB9TsN4AOmT6UAOfTzIgloGSqKgV+bZ6SnTft2fRQsxHhQVduumqQmA8QCgQY3Xh+qNTN+QY7sIT2Mbb1tA+RiqNzIjQ479hfA0tvGCNlSaQfVGJmyuaznhaWzjBeVw6Qr4cVRx3ej+LBcGHNPk2mWEqLGN92BAua6A14W346nmmmkWrRQNCzj+zZAmPlRBHncZG2Rqmx/Sx+s1HPoHHD8gusX9Qmu/ZGdJ61IHk/pG/B9DRKeI5ouOCniM7tM5VrSnyv+p8d+B1bo3np4pLhWd5SoiKrpSQK+n0BbSLFSjLXCPaaFaSscmY7fVoF8YYrzFos8m8Fq6TOgEY68a5GW26HtUR6nRFKJJotWEomsfT++fl9Br6bXypgYcm0lVlP9HnnoON16S6zd7hvwaQvk5QAj8jaeBuSeh19LO+MqAYzdSFQ3R1LyNMPgbT9H5r9tNvEuC/iqaLHo64Pgy1/neRJWUkidF00RrCIXlvwIMADLPIth6KT7uAAAAAElFTkSuQmCC',
            html = ['<div class="hqgrid-body-nodata" >',
                //'<div class="hqgrid-icons-no-data hqgrid-body-nodata-image" />',
                '<div class="hqgrid-body-nodata-content">',
                '   <img class="hqgrid-body-nodata-image" src="', image, '"/>',
                '   <div  class="hqgrid-body-nodata-text">', this.language.noDataContent, '</div>',
                '</div>'
                , '</div>'].join('');
        $(html).appendTo(this.elements.body.box);
    }

    /**
     * TBODY
     */

    // tbody-create
    HQGrid.prototype.createBody = function () {
        var body = $('<div class="hqgrid-body"></div>');

        this.elements.body.box = body;

        this.resetBody();
        body.appendTo(this.container);
    }

    HQGrid.prototype.resetBody = function () {
        var body = this.elements.body.box,
            leftBody = this.createLeftBody(),
            middleBody = this.createMiddleBody();

        body.empty().append(leftBody).append(middleBody);

    }

    // tbody-create
    HQGrid.prototype.createBody = function () {
        var body = $('<div class="hqgrid-body"></div>');

        this.elements.body.box = body;

        this.resetBody();
        body.appendTo(this.container);
    }

    // tbody-left
    HQGrid.prototype.createLeftBody = function () {
        var elem = '';
        if (!this.hasFixedFields()) {
            return elem;
        }

        var elem = this.createBodyElem(this.POSITION.LEFT);

        if (this.hasFixedFields()) {
            elem.removeClass('hqgrid-body-hidden');
        } else {
            elem.addClass('hqgrid-body-hidden');
        }

        return elem;
    }

    // tbody-middle
    HQGrid.prototype.createMiddleBody = function () {
        return this.createBodyElem(this.POSITION.MIDDLE);
    }

    // tbody-element
    HQGrid.prototype.createBodyElem = function (position) {
        var elem,
            hiddenIndex = this.hiddenIndex(position),
            tbody = [
                '<div class="hqgrid-box-wrap hqgrid-scroll-wrap ', 'hqgrid-body-', position, '">',
                '   <div class="hqgrid-box">',
                '       <div class="hqgrid-box-scroll hqgrid-scroll-inner hqgrid-clusterize-scroll" >',
                '           <div class="hqgrid-box-inner" >',
                '               <table>',
                '                   <thead>',
                '                       <tr>',
                '                       ', this.createFieldsHtml(this.fields[position], hiddenIndex),
                '                       </tr>',
                '                   </thead>',
                '                   <tbody class="hqgrid-box-content hqgrid-clusterize-content">',
                '                       <tr class="hqgrid-clusterize-no-data">',
                '                       </tr>',
                '                   </tbody>',
                '               </table>',
                '           </div>',
                '       </div>',
                '   </div>',
                '</div>',
            ].join('');


        elem = $(tbody);

        this.setElements(this.ELEMTYPE.BODY, position, elem);

        return elem;
    }

    /**
     * CONTENT
     */

    // content-create
    HQGrid.prototype.createContent = function () {
        this.createLeftContent();
        this.createMiddleContent();
    }

    // content-create-left
    HQGrid.prototype.createLeftContent = function () {
        if (!this.hasFixedFields()) {
            return;
        }
        this.createClusterize(this.POSITION.LEFT);
    }

    // content-create-middle
    HQGrid.prototype.createMiddleContent = function () {
        if (!this.fields.middle) {
            return;
        }
        this.createClusterize(this.POSITION.MIDDLE);
    }


    /**
     * RENDER
     */

    HQGrid.prototype.getRender = function (field) {
        var render;

        if (field) {
            render = this.fields.render[field.type];
        }

        if (!render) {
            render = this.fields.render.text;
        }

        return render;
    }

    HQGrid.prototype.getRenderFunction = function (render, funNames) {
        var funName,
            fn,
            i,
            len;

        if (render) {
            if (funNames instanceof Array) {
                for (i = 0, len = funNames.length; i < len; i++) {
                    funName = funNames[i];
                    fn = render[funName];
                    if (typeof fn === 'function') {
                        break;
                    }
                }
            }

        }

        return fn;
    }

    HQGrid.prototype.renderTemplate = function (field, funNames, value, row, index) {
        var item,
            render = this.getRender(field),
            fn = this.getRenderFunction(render, funNames),
            displayFn = this.getRenderFunction(render, [this.RENDERTYPE.VALUEDISPLAY]),
            displayText;

        item = this.getItem(value);

        if (render && fn) {
            if (typeof displayFn === 'function' && funNames.indexOf(this.RENDERTYPE.VIEW) !== -1) {
                displayText = displayFn(item);
                if (displayText && typeof displayText !== 'object') {
                    item.value = displayText;
                }
            }
            return fn.call(render, item, field, row, index);
        }

        return '';
    }

    HQGrid.prototype.renderEvent = function (field, funNames, $cell, row, index) {
        var elem,
            render = this.getRender(field),
            fn = this.getRenderFunction(render, funNames);

        if (render && fn) {
            elem = render.editElement.call($cell[0]);
            fn.call(elem || $cell, field, row, index, this);
        }
    }

    HQGrid.prototype.renderValue = function (field, funNames, value, cell) {
        var elem,
            render = this.getRender(field),
            fn = this.getRenderFunction(render, funNames);

        if (render && fn) {
            if (cell) {
                elem = render.editElement.call(cell[0]);
            }
            //value为undefined时取值
            return fn.call(elem || render, value, field);
        }

        return '';
    }

    HQGrid.prototype.renderRow = function (index, item, position, hiddenIndex, renderType) {
        var fields = this.fields[position],
            field,
            className,
            row,
            //获取缓存中记录的选中行信息
            selected = this.selected[this.paging.pageIndex] && this.selected[this.paging.pageIndex][index];

        className = (index && index % 2 == 0) ? 'hqgrid-body-alt-row' : '';
        className += selected ? ' hqgrid-row-selected' : '';

        row = ['<tr class="hqgrid-body-row ', className, '" data-index="', index, '">'];

        if (index && hiddenIndex !== true) {
            row.push(this.renderContentIndex(index));
            row.push(this.renderSelecting('td', false, selected));
        }

        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                field = fields[i];
                row.push(this.renderCell(field, item[field.name], [renderType]));
            }
        }

        row.push('</tr>');

        return row.join('');
    }

    HQGrid.prototype.getRowHeightStyle = function () {
        var rowStyle = this.opt.style.row;

        return (rowStyle.height || rowStyle._height || '');
    }

    HQGrid.prototype.renderContentIndex = function (index, tagName, rowspan) {
        var classHeight = this.getRowHeightStyle(),
            tagName = tagName || 'td',
            rowspan = rowspan > 1 ? (' rowspan="' + rowspan + '" ') : '';

        if (tagName === 'th') {
            classHeight = '';
        }

        return ['<', tagName, ' class="hqgrid-index" title="' + index + '" ', rowspan, '>',
            '  <div class="', classHeight, '">',
            '    <span>', index, '</span>',
            '  </div>',
            '</', tagName, '>'].join('');
    }

    HQGrid.prototype.renderIndexFieldInFilterRow = function () {

        return ['<td class="hqgrid-index">',
            '<div>',
            '   <span class="hqgrid-icon hqgrid-icons-search hqgrid-button hqgrid-filter-search-button " />',
            '   <span class="hqgrid-icon hqgrid-icons-clean hqgrid-button hqgrid-filter-clean-button"/>',
            '</div>',
            '</td>'
        ].join('');
    }

    HQGrid.prototype.renderIndexFieldInsertRow = function () {
        return ['<td class="hqgrid-index">',
            '<div class="hqgrid-align-center">',
            this.opt.control.save ? '   <span class="hqgrid-icon hqgrid-icons-save hqgrid-button hqgrid-save-button " />' : '',
            this.opt.control.remove ? '   <span class="hqgrid-icon hqgrid-icons-add hqgrid-button hqgrid-add-button " />' : '',
            '</div>',
            '</td>'
        ].join('');
    }

    HQGrid.prototype.renderSelectFieldInFilterRow = function () {
        var html = '';

        if (this.opt.selecting) {
            html = '<td></td>';
        }

        return html;
    }

    HQGrid.prototype.renderSelectFieldInsertRow = function () {
        var html = '';

        if (this.opt.selecting) {
            html = ['<td>',
                '<div class="hqgrid-align-center">',
                this.opt.control.remove ? '  <span class="hqgrid-icon hqgrid-icons-remove hqgrid-button hqgrid-remove-button"/>' : '',
                '</div>',
                '</td>'
            ].join('');
        }

        return html;
    }

    HQGrid.prototype.renderSelecting = function (tagName, empty, selected, rowspan) {
        var //classHeight = this.getRowHeightStyle(),
            classHeight = '',
            result,
            tagName = tagName || 'td',
            rowspan = rowspan > 1 ? (' rowspan="' + rowspan + '" ') : '',
            checked = selected ? 'checked' : 'unchecked';

        // if (tagName === 'th') {
        //     classHeight = '';
        // }

        if (this.opt.selecting) {
            result = ['<', tagName, ' class="hqgrid-selecting" ', rowspan, '>',
                '<div class="', classHeight, '">',
                (empty ? '' : ('<span class="hqgrid-icon hqgrid-icons-' + checked + '" ></span>')),
                '</', tagName, '>',
                '</div>'
            ].join('');
        }

        return result;
    }

    HQGrid.prototype.renderCell = function (field, value, renderType) {
        var cell = [],
            render = this.getRender(field),
            className = '',
            name = ' data-name="' + field.name + '" ';

        className = (renderType[0] !== this.RENDERTYPE.VIEW) ? 'hqgrid-cell-state-edit ' : 'hqgrid-cell-state-view ';

        cell.push('<td ' + name + ' class="' + className + '">');
        cell.push(this.renderCellContent(field, value, render, renderType));
        cell.push('</td>');

        return cell.join('');
    }

    HQGrid.prototype.formatStyle = function (style) {
        var result = [];
        if (typeof style === 'object') {
            for (var i in style) {
                result.push(i + ":" + style[i]);
            }
        }

        return result.join(';') || '';
    }

    HQGrid.prototype.renderCellContent = function (field, value, render, renderType, validate, row, index) {
        var cell = [],
            className = '',
            style = value ? value.style || '' : '',
            name = ' data-name="' + field.name + '" ',
            classFieldType = 'hqgrid-cell hqgrid-cell-' + render.className.field,
            classAlign = ' hqgrid-align-' + (field.align || render.align),
            classHeight = ' ' + this.getRowHeightStyle(),
            classPadding = ' ' + (render.className.padding || ''),
            checked,
            classChecked;

        if (!validate) {
            validate = {
                checked: true,
                message: ''
            };
        }
        checked = validate.checked;
        classChecked = !checked ? ' hqgrid-validate ' : '';
        if (style) {
            style = this.formatStyle(style) || '';
        }
        //value = this.renderValue(field, [this.RENDERTYPE.VALUETRANSFORM], value);
        className = classFieldType + classAlign + classHeight + classPadding + classChecked;
        cell.push(' <div class="' + className + '" ' + 'style="' + style + '"' + '>');
        cell.push(this.renderTemplate(field, renderType, value, row, index));
        cell.push(!checked ? ('<span title="' + validate.message + '" class="hqgrid-validate-sign" ></span>') : '');
        cell.push(' </div>');

        return cell.join('');
    }

    HQGrid.prototype.changeCell = function (editOption) {
        var content = '',
            field = editOption.field,
            renderType = editOption.type,
            $td = editOption.$cell,
            render,
            validate,
            rowIndex = editOption.index,
            dataIndex = this.getDataIndex(rowIndex),
            row = this.data.current[dataIndex],
            _value = row[field.name],
            value;

        render = this.fields.render[field.type] || {};

        if (renderType === this.RENDERTYPE.EDIT) {
            $td.addClass('hqgrid-cell-state-edit');
            value = _value;
        } else {
            $td.removeClass('hqgrid-cell-state-edit');
            value = (typeof editOption.value === 'undefined') ?
                this.renderValue(field, [this.RENDERTYPE.EDITVALUE], undefined, $td) :
                editOption.value;
            value = this.renderValue(field, [this.RENDERTYPE.VALUETRANSFORM], value);

            if (typeof _value === 'object') {

                value = $.extend(true, {}, _value,
                    typeof value === 'object' ? value : { value: value }
                );
            }

            //验证
            validate = this.checkValidate(field, value, row);
            this.setValidateChecked(field, validate.checked, row, rowIndex);
            if (validate.checked) {
                //更改值
                editOption.changed = this.changeValue(field, value, row, rowIndex);
            }
        }

        render = this.getRender(field);
        content = this.renderCellContent(field, value, render, [renderType], validate, row, rowIndex);

        $td.empty().append(content);
    }

    HQGrid.prototype.changeValue = function (field, value, row, rowIndex) {
        var changed = this.edit.changed,
            lastValue = row[field.name],
            item,
            lastItem;

        lastItem = this.getItem(lastValue, false);
        item = this.getItem(value, false);
        if (lastItem.value !== item.value) {
            this.setItem(row, field.name, value);
            if (!changed[rowIndex]) {
                changed[rowIndex] = {};
            }
            changed[rowIndex][field.name] = true;
            return true;
        }

        return false;
    }

    HQGrid.prototype.setValidateChecked = function (field, checked, row, index) {
        if (checked) {
            if (this.invalidation[index] && this.invalidation[index][field.name]) {
                delete this.invalidation[index][field.name];
            }
        } else {
            if (!this.invalidation[index]) {
                this.invalidation[index] = {};
            }
            this.invalidation[index][field.name] = true;
        }
    }

    HQGrid.prototype.checkValidate = function (field, value, row) {
        var fn,
            validate,
            validateMsg = '',
            checked = true,
            item;

        value = typeof value === 'object' ? value.value : value;
        validate = field.validate;
        if (validate instanceof Array) {
            for (var i = 0, len = validate.length; i < len; i++) {
                item = validate[i];
                fn = item.validator;
                checked = true;

                if (fn(field, value, row, item.param)) {
                    checked = true;
                } else {
                    checked = false;
                    validateMsg = "";
                    if (typeof item.message === 'function') {
                        validateMsg = htmlEncode(item.message(field, value, row, item.param));
                    }
                    break;
                }
            }
        }

        return {
            checked: checked,
            message: validateMsg
        }
    }


    /**
     * IS
     */

    HQGrid.prototype.isExtendField = function (field) {
        var name = field.name;

        return name === this.fields.extendField.name ||
            name === this.fields.fixedField.name;
    }

    HQGrid.prototype.isViewCell = function ($cell) {
        return !$cell.hasClass('hqgrid-cell-state-edit');
    }

    HQGrid.prototype.isSelectingColumnByCell = function ($cell) {
        return $cell.hasClass('hqgrid-selecting')
    }

    HQGrid.prototype.isEditable = function (field, index) {
        var editable = true,
            row = this.getRowData(index),
            item = field ? row[field.name] : null;

        if (!field) {
            editable = false;
        }
        else if (this.opt.editing === false) {
            editable = false;
        }
        else if (item.hasOwnProperty('editable') && item.editable === false) {
            editable = false;
        }
        else if (!item.hasOwnProperty('editable') && field.hasOwnProperty('editable') && field.editable === false) {
            editable = false;
        }

        return editable;
    }

    HQGrid.prototype.isTreeType = function () {
        return this.tree.name && typeof (this.tree.fn) === 'function';
    }

    HQGrid.prototype.isSelectedByIndex = function (index) {
        var selected = this.selected,
            page;

        for (var i in selected) {
            page = selected[i];
            for (var j in page) {
                if (j === index) {
                    return true;
                }
            }
        }

        return false;
    }

    HQGrid.prototype.isEditingState = function (name, index) {
        var editing = this.edit.current;
        if (editing) {
            return editing.index === index && editing.field.name === name;
        }

        return false;
    }

    /**
     * GET
     */

    HQGrid.prototype.getFieldByCell = function ($cell) {
        var fieldName,
            field;

        fieldName = htmlDecode($cell.attr('data-name'));
        field = fieldName ? $.extend(true, {}, this.fields.hash[fieldName]) : null;

        return field;
    }

    HQGrid.prototype.getRowIndexByCellElem = function ($cell) {
        return this.getRowIndexByRowElem($cell.parent());
    }

    HQGrid.prototype.getRowIndexByRowElem = function ($row) {
        return parseInt($row.attr('data-index'));
    }

    HQGrid.prototype.getRowElemByIndex = function (index) {
        var container = $(this.elements.body.box);
        return container.find('tr.hqgrid-body-row' + '[data-index="' + index + '"]');
    }

    HQGrid.prototype.getCellElemByIndex = function (index, name) {
        return this.getRowElemByIndex(index).find('td.hqgrid-cell-state-view[data-name="' + name + '"]');
    }


    /**
     * UPDATE
     */

    HQGrid.prototype.refreshContent = function () {
        this.reloadData();
        this.updateClusterize();
        this.updatePaging();
        this.updateTotal();
        this.resizeScroll();
        this.changeSelectAll();
    }

    HQGrid.prototype.updateContent = function () {
        this.disablePaging();

        if (typeof this.data.fn === 'function') {
            this.updateContentByAsyn();
        } else {
            this.updateContentByMemory();
        }
    }

    HQGrid.prototype.updateContentByMemory = function () {
        var pageIndexStart;

        this.paging.pageCount = this.data.origin.length || 0;
        this.getPagingNumber();
        if (this.paging.pageNumber < 1 && this.paging.pageIndex > 1) {
            this.paging.pageIndex = 1;
            console.warn('pageNumber equal 0 ! Reset pageNumber equal 1 .');
        } else if (this.paging.pageNumber < this.paging.pageIndex) {
            this.paging.pageIndex = this.paging.pageNumber;
            console.warn('pageNumber less than pageIndex ! Reset go to the  pageIndex equal ' + this.paging.pageNumber + '.');
        }
        pageIndexStart = (this.paging.pageIndex - 1) * this.paging.pageSize;
        this.data.page = this.data.origin.slice(pageIndexStart, pageIndexStart + this.paging.pageSize);
        this.refreshContent();
    }

    HQGrid.prototype.updateContentByAsynResolve = function (result, pageInfo) {
        if (!this.container) {
            this.hideLoading();
            return;
        }

        if (result && result.success) {
            this.rowsTransform(result.data);

            if (this.tree.name && typeof this.tree.fn === 'function') {
                this.updateDataByTreeRollingType(result, pageInfo);
            }
            else if (this.opt.rollingload) {
                this.updateDataByRollingType(result, pageInfo);
            } else {
                this.updateDataByPagingType(result);
            }

            this.loading = false;
            this.loadingPageIndex = -1;
            this.hideLoading();
            this.refreshContent();
            //定位到指定行
            this.goTreeRowById();
        }
    }

    HQGrid.prototype.updateContentByAsyn = function () {
        this.loadingPageIndex = this.paging.pageIndex;
        this.loading = true;

        if (this.tree.name && typeof this.tree.fn === 'function') {
            this.updateContentByTreeType();
        }
        else if (this.opt.rollingload) {
            this.updateContentByRollingType();
        } else {
            this.updateContentByPagingType();
        }

    }

    HQGrid.prototype.updateContentByPagingType = function () {
        var fn = this.data.fn,
            self = this,
            pageInfo,
            resolve = function (result) {
                self.updateContentByAsynResolve(result);
            },
            pageCache;

        this.loading = true;
        this.showLoading();
        pageInfo = {
            pageIndex: this.paging.pageIndex,
            pageSize: this.paging.pageSize
        };

        pageCache = this.getDataFromPageCache(pageInfo.pageIndex);
        if (pageCache) {
            setTimeout(function () {
                resolve(pageCache);
            }, 100);
        }
        else {
            fn.call(this.container, pageInfo, resolve);
        }
    }

    HQGrid.prototype.updateContentByRollingType = function () {
        var fn = this.data.fn,
            self = this,
            pageInfo,
            resolve = function (result) {
                self.updateContentByAsynResolve(result);
            },
            pageCache;

        this.showLoading();
        pageInfo = {
            pageIndex: this.paging.pageIndex,
            pageSize: this.paging.pageSize
        };

        pageCache = this.getDataFromPageCache(pageInfo.pageIndex);
        if (pageCache) {
            setTimeout(function () {
                resolve(pageCache);
            }, 100);
        }
        else {
            fn.call(this.container, pageInfo, resolve);
        }

    }

    HQGrid.prototype.updateContentByTreeType = function () {
        var fn = this.data.fn,
            _this = this,
            pageInfo,
            resolve = function (result) {
                var pageInfo = {
                    pageIndex: _this.paging.pageIndex,
                    pageSize: _this.paging.pageSize,
                    query: request
                };
                _this.updateContentByAsynResolve(result, pageInfo);
            },
            query,
            request,
            cache,
            sent;

        this.loading = true;
        this.showLoading();

        query = this.getTreePageQuery(this.paging.pageIndex);
        request = query.request;
        sent = query.sent;
        cache = query.cache;
        pageInfo = {
            pageIndex: this.paging.pageIndex,
            pageSize: this.paging.pageSize,
            query: sent
        };

        //载入缓存中存在的数据
        this.setTreeDataToPage(cache, null);
        //请求未加载过的数据
        if (request && request.length > 0) {
            fn.call(this.container, pageInfo, resolve);
            return;
        }
        resolve({ data: [], success: true });
    }

    HQGrid.prototype.updateRow = function (index, item, name) {
        var editing = this.isEditingState(name, index),
            fields = this.fields.hash,
            row;

        if (item) {
            row = this.formatRowData(index, item, name);
            if (row && !editing) {
                if (name) {
                    this.updateCell(index, row, name);
                }
                else {
                    for (var i in fields) {
                        if (item[i]) {
                            this.updateCell(index, row, i);
                        }
                    }
                }
            }
        }
        else if (this.isTreeType()) {
            //自动请求数据
            this.updateRowByAsynTreeType(index);
        }
    }

    HQGrid.prototype.updateCell = function (index, item, name) {
        var field = this.fields.hash[name],
            render = this.getRender(field),
            html,
            $cell,
            validate,
            row = this.getRowData(index),
            node,
            pass = false;

        if (!field) {
            console.log('updateCell field: ' + name + ' non-existent');
            return;
        }

        if (row) {
            pass = true;
        }
        else if (!row && this.isTreeType() && name === this.tree.name) {
            node = this.tree.list[index - 1].node;
            pass = node ? true : false;
        }

        if (!pass) {
            return;
        }

        //验证
        validate = this.checkValidate(field, item[name], item);
        this.setValidateChecked(field, validate.checked, row, index);
        if (validate.checked) {
            if (typeof item[name] === 'object') {
                node ?
                    $.extend(node, item[name]) :
                    $.extend(row[name], item[name]);
            }
            else {
                row[name] = item[name];
                // if (this.isTreeType() && name === this.tree.name) {
                //     this.tree.list.node = row[name];
                // }
            }

        }
        html = this.renderCellContent(field, item[name], render, [this.RENDERTYPE.VIEW], validate);
        $cell = this.getCellElemByIndex(index, name);
        $cell.html(html);
    }

    HQGrid.prototype.updateRowByAsynTreeType = function (index) {
        var row;

        delete this.invalidation[index];
        index = this.getDataIndex(index);
        row = this.tree.list[index];
        //row = this.getRowData(index);

        if (row) {
            row.reload = true;
            this.updateContent();
        }
    }

    HQGrid.prototype.setSelectingAll = function (checked) {
        this.setAllSelectedRows(checked);
        this.changeSelectAll();
        this.updateAllSelectedRows(checked);
    }

    HQGrid.prototype.setSelecting = function (rowsIndex, checked) {
        this.setSelectedRows(rowsIndex, checked);
        this.updateSelectedRows(rowsIndex, checked);
        this.changeSelectAll();
    }

    HQGrid.prototype.fieldCustomEvents = function (field, $cell, e) {
        var render = this.getRender(field),
            events = render[this.RENDERTYPE.CUSTOMEVENTS],
            event,
            $target = $(e.target),
            $row,
            row,
            index,
            result = false;

        if (events && events.length > 0) {
            for (var i = 0, len = events.length; i < len; i++) {
                event = events[i];
                if ($target.hasClass(event.filter)) {
                    this.opt.editing && this.saveEdited();
                    $row = row || $cell.parent();
                    index = index || this.getRowIndexByRowElem($row);
                    row = this.getRowData(index);
                    this.renderEvent(field, [event.fn], $cell, row, index);
                    result = true;
                }
            }
        }

        return result;
    }

    HQGrid.prototype.saveEdited = function (field, $cell) {
        var prev = this.edit.prev,
            current = this.edit.current,
            self = this,
            prevRow,
            prevIndex,
            currentRow,
            _field,
            selected,
            editable = true,
            //item,
            fn;

        //恢复上一次编辑的单元格为浏览模式并保存
        if (current.index !== null) {
            $.extend(prev, current);
            prev.type = this.RENDERTYPE.VIEW;
            this.edit.prev = prev;
            prevIndex = current.index;
            prevRow = clone(this.getRowData(prevIndex), ['children']);
            this.changeCell(prev);
            currentRow = clone(this.getRowData(current.index), ['children']);

            if (prev.changed === true) {
                //文本内容改变事件
                fn = this.opt.events.changed;
                if (typeof fn === "function") {
                    _field = $.extend(true, {}, current.field);
                    selected = this.isSelectedByIndex(current.index);

                    fn.call(current.cell,
                        _field,
                        prevRow,
                        currentRow,
                        current.index,
                        selected
                    );
                }
            }
            //编辑完毕事件
            fn = this.opt.events.edited;
            if (typeof fn === "function") {
                _field = $.extend(true, {}, current.field);
                fn.call(current.cell, _field, currentRow, current.index);
            }

        }

        //设置编辑模式
        if ($cell) {
            this.setCurrentEdit(field, $cell);

            currentRow = $.extend(true, {}, this.getRowData(current.index));
            editable = this.isEditable(field, current.index);
            if (!editable) {
                this.cleanCurrentEdit();
                return;
            }

            //准备编辑前事件
            fn = this.opt.events.beforeEdit;
            if (typeof fn === "function") {
                fn.call($cell, $.extend(true, {}, field), currentRow, current.index);
            }

            //获取级联编辑数据,并异步加载显示
            this.cascadeTo(field, $cell, function () {
                //改变单元格
                self.changeCell(current);
                //编辑事件
                self.renderEvent(field, [self.RENDERTYPE.EDITEVENT], $cell, currentRow, current.index);
            });
            //通用编辑显示
            if (!field.cascadeFrom) {
                //改变单元格
                this.changeCell(current);
                //编辑事件
                this.renderEvent(field, [this.RENDERTYPE.EDITEVENT], $cell, currentRow, current.index);
            }
            //级联事件
            this.cascadeFrom(field, $cell);
        } else if (current.index !== null) {
            this.cleanCurrentEdit();
        }
    }

    HQGrid.prototype.setCurrentEdit = function (field, $cell) {
        var $row,
            current = this.edit.current;

        $row = $cell.parent();
        current.index = this.getRowIndexByRowElem($row);
        current.$cell = $cell;
        current.type = this.RENDERTYPE.EDIT;
        current.field = field;
    }

    HQGrid.prototype.cleanCurrentEdit = function () {
        var current = this.edit.current;

        current.index = null;
        current.$cell = null;
        current.type = null;
        current.field = null;
        current.changed = false;
    }

    HQGrid.prototype.cascadeFrom = function (field, cell) {
        var render = this.fields.render[field.type] || {},
            cascadeToField,
            cascadeFromField,
            cascadeTo,
            cascadeFrom,
            row,
            self = this,
            cascadeResolve;

        //级联编辑事件
        if (field.cascadeTo) {

            row = cell.parent('tr.hqgrid-body-row');

            cascadeResolve = function (fromValue, items) {
                if (!self.container) {
                    self = null;
                    return;
                }
                var elem = cascadeTo;

                if (!cascadeToField._cascadeItems) {
                    cascadeToField._cascadeItems = {};
                }
                cascadeToField._cascadeItems[fromValue] = items;
                elem.attr('data-cascadeValue', fromValue);

                self.changeCell({
                    index: self.getRowIndexByRowElem(row),
                    $cell: cascadeTo,
                    field: cascadeToField,
                    type: self.RENDERTYPE.VIEW,
                    value: "",
                    changed: true
                });
            }

            cascadeFromField = field;
            cascadeFrom = cell;
            cascadeToField = this.fields.hash[field.cascadeTo];
            cascadeTo = row.find('[data-name="' + cascadeToField.name + '"]');

            this.cascadeFromEvent(render, field, cascadeFrom, cascadeTo, cascadeFromField, cascadeToField, cascadeResolve);
        }

    }

    HQGrid.prototype.cascadeFromEvent = function (render, field, cascadeFrom, cascadeTo, cascadeFromField, cascadeToField, resolve) {
        var select = $(render.editElement.call(cascadeFrom)),
            eventName = render.cascadeEvent,
            self = this;

        if (field.cascadeTo) {
            select.unbind(eventName);
            select.bind(eventName, function (event) {
                var value = self.renderValue(field, [self.RENDERTYPE.EDITVALUE], undefined, cascadeFrom);
                self.showLoading();
                cascadeToField.cascadeItems.call(cascadeToField, value, function (fromValue, items) {
                    resolve(fromValue, items);
                    self.hideLoading();
                });
            });

        }
    }

    HQGrid.prototype.cascadeTo = function (field, cell, callback) {
        var render = this.fields.render[field.type] || {},
            fn,
            cascadeToField,
            cascadeFromField,
            cascadeTo,
            cascadeFrom,
            cascadeFromValue,
            row,
            self = this,
            items,
            rowIndex,
            dataIndex,
            cascadeResolve = function (fromValue, items) {
                if (!self.container) {
                    self = null;
                    return;
                }
                var elem = cascadeTo;

                if (!cascadeToField._cascadeItems) {
                    cascadeToField._cascadeItems = {};
                }
                cascadeToField._cascadeItems[fromValue] = items;
                elem.attr('data-cascadeValue', fromValue);
                cascadeToField.items = items;
                callback(field, cell);
            };

        //获取级联编辑数据
        if (field.cascadeFrom) {

            row = cell.parent('tr.hqgrid-body-row');
            cascadeToField = field;
            cascadeTo = cell;
            cascadeFromField = this.fields.hash[field.cascadeFrom];
            cascadeFrom = row.find('[data-name="' + cascadeFromField.name + '"]');

            cascadeFromValue = cascadeTo.attr('data-cascadeValue');

            rowIndex = this.getRowIndexByRowElem(row);
            dataIndex = this.getDataIndex(rowIndex);

            if (typeof cascadeFromValue === 'undefined') {
                cascadeFromValue = (this.data.current[dataIndex][cascadeFromField.name]) + '';
            }

            if (cascadeFromValue === '') {
                cascadeResolve(cascadeFromValue, []);
            } else if (cascadeToField._cascadeItems && cascadeToField._cascadeItems[cascadeFromValue]) {
                // cache
                items = cascadeToField._cascadeItems[cascadeFromValue] || [];
                cascadeResolve(cascadeFromValue, items);
            } else {
                self.showLoading();
                cascadeToField.cascadeItems.call(cascadeToField, cascadeFromValue, function (fromValue, items) {
                    cascadeResolve(fromValue, items);
                    self.hideLoading();
                });
            }
        }

    }


    /**
     * DATA
     */

    HQGrid.prototype.updateDataByPagingType = function (result) {
        var data = result.data,
            pageCount = this.getPagingCount(result.totalCount),
            pageIndex = this.paging.pageIndex,
            pageSize = this.paging.pageSize,
            pageNumber = pageSize === -1 ? 1 : this.calculatePagingNumber(pageCount, pageSize);

        if (pageNumber < pageIndex) {
            this.paging.pageIndex = this.paging.pageLastIndex;
            this.updatePaging();
            this.hideLoading();
            if (pageCount === 0) {
                console.warn('data length is ' + data.length + ' ;pageCount is 0.');
            }
            else {
                console.warn('pageNumber less than pageIndex ! Stop go to pageIndex ' + pageIndex + '.');
            }
            return;
        }
        this.setPagingCount(pageCount);
        this.setDataToPageCache(pageIndex, data);
        this.data.page = data;
    }

    HQGrid.prototype.updateDataByRollingType = function (result) {
        var page,
            data,
            range;

        this.setPagingCount(result.totalCount);
        page = this.data.page;
        data = result.data;
        range = this.getPagingRange();

        if (range.start > 0) {
            for (var i = 0, len = range.end - range.start; i <= len; i++) {
                page[range.start - 1 + i] = data[i];
            }
        }

        this.data.page = page;
        //重置页码，始终为1
        this.paging.pageIndex = 1;
    }

    HQGrid.prototype.updateDataByTreeRollingType = function (result, pageInfo) {
        var query = pageInfo.query,
            data = result.data,
            updated = this.opt.events.updated,
            row,
            items = [];

        if (data.length !== query.length) {
            console.warn("response data length not equal the query length");
        }

        //排除异步更新中删除的行
        // for (var i = data.length - 1; i >= 0; i--) {
        //     row = this.tree.list[query[i].index - 1];
        //     if (!row) {
        //         query.split(i, 1);
        //     }
        // }

        this.mergeTreeListData(query, data);
        this.setTreeDataToPage(query, data);

        if (typeof updated === 'function') {
            for (var i = 0, len = query.length; i < len; i++) {
                items.push(this.exportRow(query[i].index));
            }
            updated.call(null, items);
        }
        //重置页码，始终为1
        this.paging.pageIndex = 1;
    }

    HQGrid.prototype.getDataFromPageCache = function (index) {
        var data = this.data.pages[index];

        if (data) {
            return {
                data: data,
                totalCount: this.getPagingCount(),
                success: true
            }
        }

        return null;
    }

    HQGrid.prototype.cleanDataFromPageCache = function () {
        this.data.pages = {};
    }

    HQGrid.prototype.setDataToPageCache = function (index, data) {
        this.data.pages[index] = data;
    }

    HQGrid.prototype.moveDataToPage = function (index, length) {
        var list = [];

        list.length = length;
        list.unshift(index, 0);
        Array.prototype.splice.apply(this.data.page, list);
    }

    HQGrid.prototype.deleteDataToPage = function (index, length) {
        this.data.page.splice(index, length);
    }

    HQGrid.prototype.updateContentByNoAutoload = function () {
        var opt = {
            pageIndex: this.paging.pageIndex,
            pageSize: this.paging.pageSize
        },
            fn = this.opt.data;

        if (typeof fn === 'function') {
            fn.call(this, opt);
        }

        this.updatePaging();
    }

    HQGrid.prototype.rowsTransform = function (rows, fieldName) {
        var row;

        if (!(rows && rows.length > 0)) {
            return;
        }
        for (var i = 0, len = rows.length; i < len; i++) {
            row = rows[i];
            this.rowTransform(row, fieldName);
        }

    }

    HQGrid.prototype.rowTransform = function (row, fieldName) {
        if (fieldName) {
            this.valueTransform(row, fieldName);
        }
        else {
            for (var name in row) {
                this.valueTransform(row, name);
            }
        }
    }

    HQGrid.prototype.valueTransform = function (items, name) {
        var render = this.fields.render,
            ren,
            fields = this.fields.hash,
            field,
            items,
            fn;

        if (items.hasOwnProperty(name)) {
            field = fields[name];
            if (!field) {
                return;
            }
            ren = render[field.type] || {};
            fn = ren[this.RENDERTYPE.VALUETRANSFORM];
            if (typeof fn === 'function') {
                items[name] = fn(items[name], field);
            }
        }
    }

    HQGrid.prototype.formatRowData = function (index, item, name) {
        var original, row, obj;

        original = this.getRowData(index);
        if (!original) {
            row = {};
            if (name) {
                row[name] = item;
            }
            else {
                row = item;
            }
            return row;
        }
        row = $.extend(true, {}, original);
        // if (!row) {
        //     console.warn('update method not find the row data at ' + index + ' rowindex');
        //     return false;
        // }

        obj = row && name ? row[name] : row;

        if (!item) {
            return false;
        }

        if (typeof obj === 'object' && typeof item !== 'object') {
            $.extend(obj, { value: item });
        }
        else if (typeof obj !== 'object' && name) {
            row[name] = item;
        }
        else {
            $.extend(obj, item);
        }

        if (!name && item) {
            this.rowTransform(row);
        }
        else {
            this.rowTransform(row, name);
        }

        return row;
    }

    /**
     * TREE DATA
     */


    HQGrid.prototype.getTreePageQuery = function (pageIndex) {
        var range,
            list = this.tree.list,
            item,
            node,
            request = [],
            sent = [],
            cache = [];

        if (!this.isTreeType()) {
            return null;
        }

        range = this.getPagingRange(pageIndex);
        if (range.start > 0 && range.end >= range.start) {
            for (var i = range.start - 1, len = range.end; i < len; i++) {
                item = list[i];
                if (!item.content || item.reload) {
                    node = item.node;
                    node = clone(node, ['children']);
                    request.push({ index: i + 1, item: node });
                    sent.push(node);
                    delete item.reload;
                }
                else {
                    cache.push({ index: i + 1, item: item.content });
                }

            }
        }
        return {
            sent: sent,
            request: request,
            cache: cache
        };
    }

    HQGrid.prototype.mappingTreeData = function (tree, list, parent) {
        var item,
            _node,
            children,
            level = parent ? parent.level + 1 : 1,
            id = parent ? parent.id + '' : null;

        if (tree && tree.length > 0) {
            for (var i = 0, len = tree.length; i < len; i++) {
                item = tree[i];
                item.level = level;
                item.id = id ? id + '.' + (i + 1) : i + 1 + '';
                _node = !item.node && !item.content ?
                    { node: item, content: null } :
                    item;

                list.push(_node);
                tree[i] = _node;
                item = _node.node;
                children = item.children;
                if (children && children.length > 0 && item.expand) {
                    item.loaded = true;
                    item.expand = true;
                    this.mappingTreeData(item.children, list, item);
                }
            }
        }
    }

    HQGrid.prototype.loadTreeRoot = function (data) {
        var list = [];

        this.mappingTreeData(data, list);
        this.tree.origin = data;
        this.tree.list = list;
        this.data.page = [];
        this.loading = false;
        this.setPagingCount(list.length);
        this.hideLoading();
        this.updateContent();
    }

    HQGrid.prototype.loadTreeChildren = function (node, data, index, $cell, expand) {
        if (node.expand) {
            this.removeTreeNodeChildren(node, index);
        }

        expand = expand === false ? false : true;
        node.expand = expand;
        node.children = data;
        node.loaded = true;

        if (expand) {
            this.treeNodeExpand(node, index, $cell);
        }
        else {
            this.updateContent();
        }
    }

    HQGrid.prototype.mergeTreeListData = function (query, data) {
        var list = this.tree.list,
            name = this.tree.name,
            index,
            item,
            value;

        if (!name) {
            return null;
        }
        if (query && data && data.length >= query.length) {
            for (var i = 0, len = query.length; i < len; i++) {
                index = query[i].index - 1;
                item = list[index].node;
                value = data[i][name];

                typeof value !== 'object' ?
                    item.value = value : $.extend(item, value);
                data[i][name] = item;
                list[index].node = item;
                list[index].content = data[i];
            }
        }

    }

    HQGrid.prototype.setTreeDataToPage = function (query, data) {
        var page = this.data.page || [];

        if (query && query.length > 0) {
            if (data && data.length > 0 && data.length >= query.length) {
                for (var i = 0, len = query.length; i < len; i++) {
                    page[query[i].index - 1] = data[i];
                }
            }
            else {
                for (var i = 0, len = query.length; i < len; i++) {
                    page[query[i].index - 1] = query[i].item;
                }
            }
        }
        this.data.page = page;
    }

    HQGrid.prototype.addTreeListData = function (list, index) {
        var length = list.length;
        if (list && length) {
            list.unshift(index, 0);
            Array.prototype.splice.apply(this.tree.list, list);
            this.moveDataToPage(index, length);
            this.setPagingCount(this.tree.list.length);
        }
    }

    HQGrid.prototype.deleteTreeListData = function (index, length) {
        var list = this.tree.list,
            start = index + 1,
            end = index + length;

        //移除并删除选中
        list.splice(index, length);
        for (var i = start; i <= end; i++) {
            this.removeSelectingRow(i);
        }

        this.setPagingCount(list.length);
    }

    HQGrid.prototype.removeTreeNodeChildren = function (node, index) {
        var children = node.children,
            length,
            list = [];

        if (children && children.length > 0) {
            this.mappingTreeData(children, list);
            length = list.length;
            index + 1 <= this.edit.current.index <= length ?
                this.cleanCurrentEdit() : this.saveEdited();
            this.deleteTreeListData(index, length);
            this.deleteDataToPage(index, length);
            node.children = null;
        }
    }

    HQGrid.prototype.loadTreeByAsynResolve = function (result, node, index, $cell, expand) {
        if (!this.container) {
            this.hideLoading();
            return;
        }

        var data = result.data,
            success = result.success;

        console.dir({
            node: node,
            data: data,
            index: index
        });
        if (success) {
            //加载下级树结构
            if (node && index) {
                this.loadTreeChildren(node, data, index, $cell, expand);
                return;
            }
            this.loadTreeRoot(data);
        }
    }

    HQGrid.prototype.loadTreeByAsyn = function (node, index, $cell, param) {
        var fn = this.tree.fn,
            _this = this,
            resolve = function (result) {
                _this.loadTreeByAsynResolve(result, node, index, $cell, (param || {}).expand);
            };

        this.loading = true;
        this.showLoading();

        fn.call(this.container, { node: node, index: index, param: param }, resolve);
    }

    HQGrid.prototype.goTreeRowById = function (id) {
        var location = this.location,
            nodes = this.tree.origin,
            //loading = false,
            level = 1,
            expandNode,
            path,
            depth,
            node,
            index,
            _id;

        //每次树结构、内容数据更新后会执行此方法
        //通过location.state的状态执行后续的操作
        if (!id && !location.state) {
            return;
        }

        id = id || location.id;
        path = id.split('.');
        depth = path.length;

        //[3]state状态为selecting执行选中行并定位
        if (location && location.state === 'selecting') {
            location.id = null;
            location.state = null;
            this.locationRowById(id);
            return;
        }

        //指定id调用本方法时，计算查找id所在的位置
        _id = path.slice(0, level).join('.');
        while (level <= depth) {
            //本地缓存中查找到树节点id
            if (level === depth) {
                //[2]查找节点，查找到自动展开下级树结构数据
                //展开下级树结构后，再次执行本方法，执行[3]分支逻辑,进行定位
                location.id = id;
                location.state = 'selecting';
                if (expandNode) {
                    index = this.getIndexByNodeId(expandNode.id);
                    this.treeNodeExpand(expandNode, index);
                }
                else {
                    //执行[3]分支逻辑,进行定位
                    this.goTreeRowById();
                }
                break;
            }

            //[1]逐级查找树节点id
            node = this.findNodeById(nodes, _id);
            if (!node.expand && !expandNode) {
                expandNode = node;
            }
            node.expand = true;
            //[1]-1逐级设置节点为展开状态
            if (node && node.children && node.children.length > 0) {
                level++;
                nodes = node.children;
                _id = path.slice(0, level).join('.');
            }
            else {
                //[1]-2未加载下级树结构数据
                //[loading-tree]查找节点，未查找到自动加载下级树结构数据
                //加载树结构数据后，会执行updateContent，再次执行本方法，执行[1]分支逻辑
                if (location.state === 'loading') {
                    console.warn('goto row loading tree data is error');
                    return;
                }
                location.id = id;
                location.state = 'loading';
                index = this.getIndexByNodeId(node.id);
                this.loadTreeByAsyn(node, index, null, { level: depth, expand: false });
                break;
            }
        }

    }

    HQGrid.prototype.locationRowById = function (id) {
        var index,
            clusterize = this.instance.body.middle.clusterize,
            container = this.elements.body.middle.scrollbox,
            rowHeight,
            top,
            goto = this.opt.events.goto,
            row;

        index = this.getIndexByNodeId(id);
        this.setSelectingAll(false);
        this.setSelecting([index], true);
        if (clusterize) {
            rowHeight = this.instance.body.middle.clusterize.options.item_height;
            top = rowHeight * (index - 1);
            container.scrollTop(top);
        }

        if (typeof goto === 'function') {
            row = this.getRowData(index);
            goto.call(null, row, index, true);
        }

    }

    HQGrid.prototype.findNodeById = function (nodes, id) {
        var node,
            _node;

        if (!(nodes instanceof Array)) {
            nodes = [nodes];
        }

        for (var i = 0, len = nodes.length; i < len; i++) {
            _node = nodes[i];
            _node = _node.hasOwnProperty('node') && _node.hasOwnProperty('content') ?
                _node.node : _node;
            if (_node.id === id) {
                node = _node;
                break;
            }
        }

        return node;
    }

    HQGrid.prototype.load = function () {
        if (this.tree.fn && this.tree.name) {
            this.loadTreeByAsyn();
        }
        else if (this.opt.autoload && !this.loading) {
            this.updateContent();
        }
    }

    HQGrid.prototype.treeNodeExpand = function (node, index, $cell) {
        var list = [],
            row = this.data.current[index - 1],
            fn = this.opt.events.treeExpand,
            field = this.fields.hash[this.tree.name],
            selected = this.isSelectedByIndex(index);

        if (typeof fn === 'function') {
            fn.call($cell ? $cell[0] : null, field, row, index, selected);
        }

        node.expand = true;
        this.mappingTreeData(node.children, list, node);
        this.addTreeListData(list, index);
        this.updateContent();
    }

    HQGrid.prototype.treeNodeCollapse = function ($cell, field, row, index) {
        var list = [],
            length,
            node = row[field.name],
            fn = this.opt.events.treeCollapse,
            field,
            selected = this.isSelectedByIndex(index);

        if (typeof fn === 'function') {
            fn.call($cell[0], field, row, index, selected);
        }
        node.expand = false;
        this.mappingTreeData(node.children, list);
        length = list.length;
        this.deleteTreeListData(index, length);
        this.deleteDataToPage(index, length);
        this.updateContent();
    }

    HQGrid.prototype.treeIconClick = function ($cell, field, row, index) {
        var fn = this.opt.events.treeIconClick,
            selected = this.isSelectedByIndex(index);

        if (typeof fn === 'function') {
            fn.call($cell[0], field, row, index, selected);
        }
    }


    /**
     * GET/SET ITEM
     */


    HQGrid.prototype.getItem = function (value, encode, field) {
        var item;
        //[todo] 使用clone
        if (typeof value !== 'object') {
            item = {
                text: '',
                value: value,
                title: ''
            };
        } else {
            item = $.extend({}, value);
        }

        for (var i in item) {
            if (item.hasOwnProperty(i)) {
                if (typeof item[i] === 'string' && encode !== false) {
                    item[i] = htmlEncode(item[i]);
                }
            }
        }

        return item;
    }

    HQGrid.prototype.setItem = function (row, name, newItem) {
        var item = row[name];

        if (typeof item !== 'object') {

            if (typeof newItem !== 'object') {
                row[name] = newItem;
            } else {
                row[name] = newItem.value;
            }
            return;
        }

        if (typeof newItem !== 'object') {
            item.value = newItem;
        } else {
            $.extend(item, newItem);
        }

    }


    /**
     * CLUSTERIZE
     */

    // clusterize-create
    HQGrid.prototype.createClusterize = function (position) {

        var scrollbox = this.elements.body[position].scrollbox,
            contentbox = this.elements.body[position].contentbox,
            clusterize;

        if (!this.elements.body[position].outerbox) {
            return;
        }

        clusterize = new Clusterize({
            scrollElem: scrollbox[0],
            contentElem: contentbox[0],
            hqGrid: this,
            position: position
        });

        this.instance.body[position].clusterize = clusterize;

    }

    HQGrid.prototype.renderClusterizeRowByIndex = function (position, item, index) {
        var row,
            hiddenIndex = this.hiddenIndex(position);

        index = this.getRowIndex(index);
        row = this.renderRow(index, item, position, hiddenIndex, this.RENDERTYPE.VIEW);
        return row;
    }

    // clusterize-update
    HQGrid.prototype.updateClusterize = function () {
        if (this.hasFixedFields()) {
            this.updateClusterizeByPosition(this.POSITION.LEFT);
        }
        this.updateClusterizeByPosition(this.POSITION.MIDDLE);
    }

    // clusterize-updateby-position
    HQGrid.prototype.updateClusterizeByPosition = function (position) {
        var clusterize = this.instance.body[position].clusterize;
        if (clusterize) {
            clusterize.update();
        }
    }

    HQGrid.prototype.loadClusterizeRollingRows = function (rowIndex) {
        var pageIndex = this.getPagingIndex(rowIndex);
        if (pageIndex === this.loadingPageIndex && this.loading) {
            log("stop clusterize rolling load for pageIndex " + pageIndex);
            return;
        }
        log("load clusterize rolling load for pageIndex " + pageIndex);
        this.paging.pageIndex = pageIndex;
        this.updateContent();
    }

    /**
     * PAGING
     */

    HQGrid.prototype.getRowIndex = function (dataIndex, noFilter) {
        var index = dataIndex,
            filter = this.data.filter;

        if (!noFilter && filter.length > 0) {
            index = filter[index];
            return index;
        } else {
            ++index;
        }

        return index + ((this.paging.pageIndex - 1) * this.paging.pageSize);
    }

    HQGrid.prototype.getDataIndex = function (rowIndex) {
        var index = rowIndex,
            filter = this.data.filter;

        if (filter.length > 0) {
            index = filter.indexOf(rowIndex);
            return index;
        }
        // else {
        //     index = index - 1;
        // }
        else if (this.isTreeType()) {
            return index - 1;
        }
        else {
            return index - (this.paging.pageIndex - 1) * this.paging.pageSize;
        }

    }

    HQGrid.prototype.getRowData = function (rowIndex) {
        var index = this.getDataIndex(rowIndex);

        return this.isTreeType() ?
            (this.tree.list[index] || {}).content || null :
            this.data.current[index];

        //return this.data.current[this.getDataIndex(rowIndex)];
    }

    HQGrid.prototype.createPaging = function () {
        var html,
            $paging;

        if (this.opt.paging !== true) {
            return;
        }

        if (this.opt.rollingload) {
            html = this.createPaginByRolling();
        }
        else if (this.opt.pageSize > 0) {
            html = this.createPagingByExistData();
        }
        else {
            html = createPaginByNoData();
        }

        $paging = $(html);
        this.elements.paging.box = $paging;
        $paging.appendTo(this.container);
    }

    HQGrid.prototype.createPaginByNoData = function () {
        return [
            '<div class="hqgrid-paging">',
            this.createPagingTotal(),
            '</div>'
        ].join('');
    }

    HQGrid.prototype.createPaginByRolling = function () {
        return [
            '<div class="hqgrid-paging">',
            this.createPagingTotal(),
            '</div>'
        ].join('');
    }

    HQGrid.prototype.createPagingByExistData = function () {
        return [
            '<div class="hqgrid-paging">',
            this.createPagingBar(),
            this.createPagingTotal(),
            '</div>'
        ].join('');
    }

    HQGrid.prototype.createPagingBar = function () {
        return [
            '<div class="hqgrid-paging-pagebar">',
            '   <div class="hqgrid-paging-btn hqgrid-paging-first-btn disabled">', '<span/>', '<span/>', '</div>',
            '   <div class="hqgrid-paging-btn hqgrid-paging-prev-btn disabled">', '<span/>', '</div>',
            '   <div class="hqgrid-paging-separator">', '<span/>', '</div>',
            '   <div class="hqgrid-paging-select">', '<span class="hqgrid-paging-text"></span>', '<span class="hqgrid-paging-field">', '<input type="text" value="1" />', '</span>', '<span class="hqgrid-paging-number"> ', '', '</span>', '</div>',
            '   <div class="hqgrid-paging-separator">', '<span/>', '</div>',
            '   <div class="hqgrid-paging-btn hqgrid-paging-next-btn">', '<span/>', '</div>',
            '   <div class="hqgrid-paging-btn hqgrid-paging-last-btn">', '<span/>', '<span/>', '</div>',
            '</div>'
        ].join('');
    }

    HQGrid.prototype.createPagingTotal = function () {
        return [
            '<div class="hqgrid-paging-total">',
            '   <div class="hqgrid-paging-rows">',
            '       <span class="hqgrid-paging-filter"></span>',
            '       <span class="hqgrid-paging-count">', '</span>',
            '   </div>',
            '</div>'
        ].join('');
    }

    HQGrid.prototype.updatePaging = function () {
        var page = this.elements.paging.box;

        if (!page) {
            return;
        }

        if (this.opt.rollingload) {
            this.updatePagingByRolling();
        }
        else {
            this.updatePagingByBar();
        }
    }

    HQGrid.prototype.updatePagingByBar = function () {
        var page = this.elements.paging.box,
            info = this.getPagingInfo();

        page.find('.hqgrid-paging-number').text(info.numberMsg);
        page.find('.hqgrid-paging-filter').text(info.filterMsg);
        page.find('.hqgrid-paging-count').text(info.countMsg);
        page.find('.hqgrid-paging-field>input').val(info.index);
        this.setPaging();
    }

    HQGrid.prototype.updatePagingByRolling = function () {
        var page = this.elements.paging.box,
            info = this.getPagingInfo();

        page.find('.hqgrid-paging-count').text(info.countMsg);
    }

    HQGrid.prototype.getPagingInfo = function () {
        var number,
            count,
            filter,
            index;

        if (this.paging.pageSize === -1) {
            this.paging.pageSize = this.paging.pageCount;
        }

        number = this.getPagingNumber();
        count = this.getPagingCountText();
        filter = this.getPagingFilter();
        index = this.paging.pageIndex;

        return {
            numberMsg: number,
            countMsg: count,
            index: index,
            filterMsg: filter
        }
    }

    HQGrid.prototype.setPaging = function () {
        var page = this.elements.paging.box || null,
            index = this.paging.pageIndex,
            number = this.paging.pageNumber;

        if (!page) {
            return;
        }

        if (index <= 1 && number > 1) {
            page.find('.hqgrid-paging-first-btn,.hqgrid-paging-prev-btn').addClass('disabled');
            page.find('.hqgrid-paging-next-btn,.hqgrid-paging-last-btn').removeClass('disabled');
        } else if (index === number && number === 1) {
            page.find('.hqgrid-paging-first-btn,.hqgrid-paging-prev-btn,.hqgrid-paging-next-btn,.hqgrid-paging-last-btn').addClass('disabled');
        } else if (index >= number) {
            page.find('.hqgrid-paging-first-btn,.hqgrid-paging-prev-btn').removeClass('disabled');
            page.find('.hqgrid-paging-next-btn,.hqgrid-paging-last-btn').addClass('disabled');
        } else {
            page.find('.hqgrid-paging-first-btn,.hqgrid-paging-prev-btn,.hqgrid-paging-next-btn,.hqgrid-paging-last-btn').removeClass('disabled');
        }
    }

    HQGrid.prototype.disablePaging = function () {
        var page = this.elements.paging.box || null;

        if (!page) {
            return;
        }

        page.find('.hqgrid-paging-btn').addClass('disabled');
    }


    HQGrid.prototype.getPagingNumber = function () {
        this.paging.pageNumber = this.calculatePagingNumber(this.paging.pageCount, this.paging.pageSize);
        return this.language.page.numberFormat.replace(/\{pageNumber\}/, this.paging.pageNumber);
    }

    HQGrid.prototype.getPagingIndex = function (rowIndex) {
        var pageSize,
            index;

        pageSize = this.paging.pageSize;
        index = Math.ceil(rowIndex / pageSize);

        return index;
    }

    HQGrid.prototype.calculatePagingNumber = function (pageCount, pageSize) {
        return Math.ceil(pageCount / pageSize) || 0;
    }

    HQGrid.prototype.getPagingFilter = function () {

        if (this.data.page.length > this.data.current.length) {
            return this.language.page.filterFormat.replace(/\{number\}/, this.data.current.length);
        } else {
            return '';
        }
    }

    HQGrid.prototype.getPagingCountText = function () {
        var range = this.opt.rollingload ?
            {
                start: 1,
                end: this.paging.pageCount
            }
            : this.getPagingRange();

        return this.language.page.countFormat
            .replace(/\{start\}/, range.start)
            .replace(/\{end\}/, range.end)
            .replace(/\{pageCount\}/, this.paging.pageCount);
    }

    HQGrid.prototype.getPagingRange = function (pageIndex) {
        var start, end;
        pageIndex = pageIndex || this.paging.pageIndex;
        start = ((pageIndex - 1) * this.paging.pageSize) + 1;
        end = pageIndex * this.paging.pageSize;

        if (end > this.paging.pageCount) {
            end = this.paging.pageCount;
        }
        if (end === 0) {
            start = 0;
        }

        return {
            start: start,
            end: end
        }
    }

    HQGrid.prototype.getPaging = function () {
        return $.extend({}, this.paging);
    }

    HQGrid.prototype.getPagingCount = function (count) {
        return typeof count === 'number' ?
            count : this.paging.pageCount;
    }

    HQGrid.prototype.setPagingCount = function (count) {
        if (typeof count === 'number') {
            this.paging.pageCount = count;
        }
    }

    // paging-bing
    HQGrid.prototype.bindPaging = function () {
        if (this.opt.paging !== true) {
            return;
        }
        var paging = this.elements.paging.box,
            self = this;

        this.container.find(".hqgrid-paging>.hqgrid-paging-pagebar>.hqgrid-paging-btn").on('click', function (event) {
            var elem = $(this),
                className = elem.attr('class'),
                lastIndex = self.paging.pageIndex,
                opt,
                index;

            self.saveEdited();

            if (className.indexOf('disabled') !== -1) {
                return;
            } else if (className.indexOf('hqgrid-paging-first-btn') !== -1) {
                index = 1;
                self.paging.pageIndex = 1;
            } else if (className.indexOf('hqgrid-paging-prev-btn') !== -1) {
                index = self.paging.pageIndex - 1;
                if (index > 0) {
                    self.paging.pageIndex = index;
                }

            } else if (className.indexOf('hqgrid-paging-next-btn') !== -1) {
                index = self.paging.pageIndex + 1;
                if (index <= self.paging.pageNumber) {
                    self.paging.pageIndex = index;
                }
            } else if (className.indexOf('hqgrid-paging-last-btn') !== -1) {
                index = self.paging.pageNumber;
                self.paging.pageIndex = index;
            }


            if (lastIndex !== self.paging.pageIndex && self.opt.autoload) {
                self.updateContent();
            } else {
                self.updateContentByNoAutoload();
            }

        });
    }

    HQGrid.prototype.unbindPaging = function () {
        if (this.opt.paging !== true) {
            return;
        }

        this.container.find(".hqgrid-paging>.hqgrid-paging-btn").unbind('click');
    }

    /**
     * SCROLL
     */

    // scroll
    HQGrid.prototype.createScroll = function () {
        this.createLeftScroll();
        this.createMiddleScroll();
    }

    // scroll-left
    HQGrid.prototype.createLeftScroll = function () {
        this.createScrollInstance(this.ELEMTYPE.BODY, this.POSITION.LEFT, true, [this.elements.body.middle.outerbox]);
        this.createScrollInstance(this.ELEMTYPE.FOOT, this.POSITION.LEFT, true);
    }

    // scroll-middle
    HQGrid.prototype.createMiddleScroll = function () {

        this.createScrollInstance(this.ELEMTYPE.HEADER, this.POSITION.MIDDLE, true, null, [this.elements.body.middle.outerbox, this.elements.foot.middle.outerbox]);
        this.createScrollInstance(this.ELEMTYPE.BODY, this.POSITION.MIDDLE, false, [this.elements.body.left.outerbox], [this.elements.header.middle.outerbox, this.elements.foot.middle.outerbox]);
        this.createScrollInstance(this.ELEMTYPE.FOOT, this.POSITION.MIDDLE, true, null, [this.elements.header.middle.outerbox, this.elements.body.middle.outerbox]);
    }

    // scroll-instance
    HQGrid.prototype.createScrollInstance = function (elemType, position, isHidden, relateVerticalboxes, relateHorizontalboxes) {
        var outerbox = this.elements[elemType][position].outerbox,
            scroll;

        if (!outerbox) {
            return;
        }

        scroll = new HQGridScroll(outerbox, {
            hidden: isHidden
        }, {
            vertical: relateVerticalboxes,
            horizontal: relateHorizontalboxes
        });


        this.instance[elemType][position].scroll = scroll;
    }


    /**
     * RESIZE
     */

    // resize
    HQGrid.prototype.resize = function () {

        var size = {};

        this.container.css({
            width: 'auto'
        });

        size = this.calculateWidth();
        $.extend(size, this.calculateHeight());

        if (this.hasFixedFields()) {
            this.resizeLeftBox(size.leftboxWidth, size.bodyHeight, size.headerHeight);
        }
        this.resizeMiddleBox(size.middleboxWidth, size.bodyHeight, size.headerHeight);

        //this.elements.header.box.height(size.headerHeight);

        this.container.css({
            width: size.width,
            height: size.height
        });

        this.resizeScroll();
    }

    // resize-calculate-height
    HQGrid.prototype.calculateHeight = function () {
        if (!this.elements.header.middle.outerbox) {
            return;
        }
        var container = this.container,
            defaultHeight = this.opt.defaultHeight,
            height,
            headerElem = this.elements.header.middle.outerbox,
            headerHeight = headerElem.find('table').height(),
            footElem = this.elements.foot.middle.outerbox,
            footHeight = footElem ? footElem.height() : 0,
            pagingElem = this.elements.paging.box,
            pagingHeight = pagingElem ? pagingElem.height() : 0,
            footerHeight = 0,
            bodyHeight;

        if (this.opt.height === 'auto') {
            height = parseInt(container.parent().height());
            if (height <= defaultHeight) {
                height = defaultHeight;
            }

        } else {
            height = parseInt(this.opt.height);
        }

        bodyHeight = height - headerHeight - footHeight - pagingHeight;

        if (footHeight > 0) {
            bodyHeight += 1;
        }

        return {
            height: height,
            headerHeight: headerHeight,
            bodyHeight: bodyHeight,
            footHeight: footerHeight
        }
    }

    // resize-calculate-width
    HQGrid.prototype.calculateWidth = function () {

        var width,
            leftWidth = 0,
            middleWidth,
            bodyLeftContentbox = this.elements.body.left.contentbox,
            fixedFields = this.fields.left,
            field;

        if (!width || width === 'auto' || isNaN(parseInt(this.opt.width))) {
            width = parseInt(this.container.width());
        } else {
            width = parseInt(this.opt.width);
        }

        if (this.hasFixedFields()) {

            leftWidth = bodyLeftContentbox.attr('data-width-fixed');
            if (leftWidth) {
                leftWidth = parseInt(leftWidth);
            } else {
                leftWidth = this.elements.body.left.contentbox.width() || 0;
                bodyLeftContentbox.attr('data-width-fixed', leftWidth);
            }

            //IE
            if (leftWidth === 0) {
                if (fixedFields && fixedFields.length > 0) {
                    for (var i = 0, len = fixedFields.length; i < len; i++) {
                        field = fixedFields[i];
                        leftWidth += field.width;
                    }
                    leftWidth += (36 + 36);
                }
            }
        }

        middleWidth = width - leftWidth;

        return {
            width: width,
            leftboxWidth: leftWidth,
            middleboxWidth: middleWidth
        }
    }

    // resize-middle-fields
    HQGrid.prototype.resizeMiddleFields = function (width) {

        var fieldsWidthSum = 0,
            //未设置width值的field
            otherFieldsWidthSum = 0,
            i,
            count = 0,
            field,
            fields = this.fields.middle,
            len = fields.length,
            hhead = this.elements.header.middle.tablebox,
            thead = this.elements.body.middle.tablebox,
            fhead = this.elements.foot.middle.tablebox,
            fieldWidth = '';

        for (i = 0, len; i < len; i++) {
            field = fields[i];
            if (field.width && !isNaN(field.width)) {
                fieldsWidthSum += field.width;
                ++count;
            } else {
                fieldWidth = this.getFieldWidthByText(field.text);
                otherFieldsWidthSum += fieldWidth;
            }
        }

        for (i = 0; i < len; i++) {
            field = fields[i];
            if (!field.width) {

                if (count < len && fieldsWidthSum + otherFieldsWidthSum >= width) {
                    fieldWidth = this.getFieldWidthByText(field.text);
                } else {
                    fieldWidth = '';
                }

                hhead.find('th[data-name="' + htmlEncode(field.name) + '"]').attr('width', fieldWidth);
                thead.find('th[data-name="' + htmlEncode(field.name) + '"]').attr('width', fieldWidth);
                if (fhead) {
                    fhead.find('th[data-name="' + htmlEncode(field.name) + '"]').attr('width', fieldWidth);
                }
            }
        }
    }

    // resize-sizebyFont
    HQGrid.prototype.getFontSize = function () {

        var fontSize = this.fontSize;

        if (!fontSize) {
            //fontSize = parseInt(this.elements.header.middle.tablebox.find('th>div:first').css('font-size'));
            this.fontSize = 12;
        }

        return fontSize;
    }

    // resize-middle
    HQGrid.prototype.resizeMiddleBox = function (width, bodyHeight, headerHeight) {
        var tablebox;

        this.resizeMiddleFields(width);

        this.resizeBox(this.ELEMTYPE.BODY, this.POSITION.MIDDLE, width, bodyHeight);
        this.resizeBox(this.ELEMTYPE.HEADER, this.POSITION.MIDDLE, width, headerHeight || '');
        this.resizeBox(this.ELEMTYPE.FOOT, this.POSITION.MIDDLE, width, '');

        this.fixTable(this.ELEMTYPE.HEADER, this.POSITION.MIDDLE);
        this.fixTable(this.ELEMTYPE.FOOT, this.POSITION.MIDDLE);
    }

    // resize-left
    HQGrid.prototype.resizeLeftBox = function (width, bodyHeight, headerHeight) {
        if (!this.hasFixedFields()) {
            return;
        }

        this.resizeBox(this.ELEMTYPE.BODY, this.POSITION.LEFT, width, bodyHeight);
        this.resizeBox(this.ELEMTYPE.HEADER, this.POSITION.LEFT, width, headerHeight || '');
        this.resizeBox(this.ELEMTYPE.FOOT, this.POSITION.LEFT, width, '');

        this.fixTable(this.ELEMTYPE.BODY, this.POSITION.LEFT);
        this.fixTable(this.ELEMTYPE.HEADER, this.POSITION.LEFT);
        this.fixTable(this.ELEMTYPE.FOOT, this.POSITION.LEFT);
    }

    // resize-box
    HQGrid.prototype.resizeBox = function (elemType, position, width, height) {
        var size,
            outerbox = this.elements[elemType][position].outerbox,
            box = this.elements[elemType][position].box,
            scrollbox = this.elements[elemType][position].scrollbox,
            innerbox = this.elements[elemType][position].innerbox;

        if (!outerbox) {
            return;
        }
        //宽度小于20px,隐藏
        if (width <= 20) {
            outerbox.hide();
        } else {
            outerbox.show();
        }

        size = {
            width: width,
            height: height
        }

        if (box) {
            box.css(size);
            scrollbox.css(size);
            innerbox.css('width', size.width);
        }
    }

    // resize-table-fixed
    HQGrid.prototype.fixTable = function (elemType, position) {
        var elem = this.elements[elemType][position].tablebox;
        if (elem) {
            elem.addClass('hqgrid-table-fixed');
        }
    }

    // resize-scorll
    HQGrid.prototype.resizeScroll = function () {
        var scroll;

        // header-middle
        if (scroll = this.instance.header.middle.scroll) {
            scroll.refresh();
        }
        // body-left
        if (scroll = this.instance.body.left.scroll) {
            scroll.refresh();
        }
        // body-middle
        if (scroll = this.instance.body.middle.scroll) {
            scroll.refresh();
        }
        // foot-middle
        if (scroll = this.instance.foot.middle.scroll) {
            scroll.refresh();
        }
    }


    /**
     * SELECTING
     */

    HQGrid.prototype.addSelectingRow = function (rowIndex) {
        var selected = this.selected,
            pageIndex = this.paging.pageIndex,
            dataIndex = this.getDataIndex(rowIndex);

        if (!selected[pageIndex]) {
            selected[pageIndex] = {};
        }

        selected[pageIndex][rowIndex] = this.data.page[dataIndex] || true;

    }

    HQGrid.prototype.removeSelectingRow = function (rowIndex) {
        var selected = this.selected,
            pageIndex = this.paging.pageIndex;

        if (selected[pageIndex] && selected[pageIndex][rowIndex]) {
            delete selected[pageIndex][rowIndex];
        }
    }

    HQGrid.prototype.changeSelectAll = function () {

        var selectedAll = this.container.find('.hqgrid-header th.hqgrid-selecting span'),
            checked,
            selected = this.selected[this.paging.pageIndex],
            selectedLength = 0,
            i,
            data;

        for (i in selected) {
            if (selected.hasOwnProperty(i)) {
                ++selectedLength;
            }
        }
        if (this.data.filter.length > 0 && selected) {
            data = this.data.current;
            if (selectedLength < data.length) {
                checked = false;
            } else {
                checked = true;
                for (var i = 0, len = data.length; i < len; i++) {
                    if (!selected[this.getRowIndex(i)]) {
                        checked = false;
                        break;
                    }
                }
            }
        } else if (selected) {
            data = this.data.page;
            checked = selected && data.length === selectedLength ? true : false;
        } else {
            checked = false;
        }

        if (checked) {
            selectedAll.attr('class', 'hqgrid-icon hqgrid-icons-checked');
        } else {
            selectedAll.attr('class', 'hqgrid-icon hqgrid-icons-unchecked');
        }
    }

    HQGrid.prototype.exportRow = function (index, data, selected, field) {
        var node,
            item,
            result = {};

        if (this.isTreeType()) {
            item = this.tree.list[index - 1];
            //item = this.getRowData(index);
            node = item.node;
            result.node = node;
            result.nodeName = this.tree.name || null;
            data = typeof data === 'undefined' ? item.content : data;
        }
        selected = typeof selected === 'undefined' ?
            this.isSelectedByIndex(index) : selected;
        result.selected = selected;
        result.index = index;
        result.row = data;
        field = field || null;

        return result;
    }

    HQGrid.prototype.getSelectedRows = function (isToArray) {
        var selected,
            i,
            j,
            page,
            item,
            index,
            result = isToArray === false ? {} : [];

        selected = this.selected;
        for (i in selected) {
            page = selected[i];
            for (j in page) {
                index = j - 0;
                item = this.exportRow(index, this.getRowData(index) || page[j], true);
                if (isToArray === false) {
                    result[j] = item;
                } else {
                    result.push(item);
                }
            }
        }

        return result;
    }

    HQGrid.prototype.getSelectedRootRows = function (isToArray) {
        var result = [],
            obj = {},
            items = this.getSelectedRows(),
            selected,
            index,
            node,
            nodeId,
            item;

        if (this.isTreeType()) {
            for (var i = 0, len = items.length; i < len; i++) {
                selected = false;
                item = items[i];
                index = item.index;
                node = item.node;

                if (node.level === 1) {
                    selected = true;
                    index = index;
                }
                else {
                    nodeId = node.id.split('.')[0];
                    index = this.getIndexByNodeId(nodeId);
                }

                item = this.exportRow(index, item.content, selected);
                if (obj[index]) {
                    obj[index].selected = selected || obj[index].selected;
                }
                else {
                    obj[index] = item;
                    result.push(item);
                }
            }

            result = isToArray === false ? obj : result;
        }
        else {
            result = items;
        }

        return result;
    }

    HQGrid.prototype.getTopSelectedRows = function (isToArray) {
        var result = [],
            obj = {},
            items = this.getSelectedRows(),
            index,
            node,
            id,
            isChild,
            item;

        if (!this.isTreeType()) {
            return items;
        }


        for (var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            index = item.index;
            node = item.node;

            if (node.level === 1) {
                index = index;
                isChild = false;
            }
            else {
                isChild = false;
                for (var j = 0, lenj = result.length; j < lenj; j++) {
                    item = result[j].node;
                    index = item.id > node.id ?
                        item.id.indexOf(node.id) : node.id.indexOf(item.id);
                    if (index === 0) {
                        isChild = true;
                        break;
                    }
                }
                index = this.getIndexByNodeId(node.id);
            }

            if (isChild) {
                continue;
            }

            item = this.exportRow(index, item.content, true);
            obj[index] = item;
            result.push(item);
        }

        result = isToArray === false ? obj : result;


        return result;
    }

    HQGrid.prototype.getTreeFormatRow = function (items, list) {
        var i,
            len,
            j,
            lenj,
            item,
            selected,
            index,
            result = [],
            name = this.tree.name;

        for (i = 0, len = list.length; i < len; i++) {
            item = list[i];
            lenj = items.length;
            if (lenj === 0) {
                break;
            }
            for (var j = 0, lenj; j < lenj; j++) {
                if (item.node.id === items[j]) {
                    index = i + 1;
                    result.push(this.exportRow(index, item.content));
                    items.splice(j, 1);
                }
            }
        }

        return result;
    }

    HQGrid.prototype.getRootNodes = function () {
        var result = [],
            list = this.tree.list,
            index,
            item;

        for (var i = 0, len = list.length; i < len; i++) {
            item = list[i];
            if (item.node.level === 1) {
                index = i + 1;
                result.push(this.exportRow(index, item.content));
            }
        }

        return result;
    }

    HQGrid.prototype.getParentNodes = function (rows) {
        var result = [],
            list = this.tree.list,
            name = this.tree.name,
            index,
            item,
            items = [],
            node,
            selected,
            id,
            i,
            j,
            len,
            lenj;

        if (!(rows instanceof Array)) {
            rows = [rows];
        }

        for (i = 0, len = rows.length; i < len; i++) {
            item = rows[i];
            node = item.node ? (item.node || item.data[name]) : item[name];
            id = node.id;
            if (node.level === 1) {
                continue;
            }
            id = id.split('.');
            id.pop();
            id = id.join('.');
            if (items.indexOf(id) === -1) {
                items.push(id);
            }

        }

        for (i = 0, len = list.length; i < len; i++) {
            item = list[i];
            lenj = items.length;
            if (lenj === 0) {
                break;
            }
            for (j = 0, lenj; j < lenj; j++) {
                if (item.node.id === items[j]) {
                    index = i + 1;
                    selected = this.isSelectedByIndex(index);
                    result.push(this.exportRow(index));
                    items.splice(j, 1);
                }
            }
        }

        return result;
    }

    HQGrid.prototype.getNodesByIndex = function (indexes) {
        var result = [],
            index;

        for (var i = 0, len = indexes.length; i < len; i++) {
            index = indexes[i];
            result.push(this.exportRow(index));
        }

        return result;
    }

    HQGrid.prototype.getParentNodesByIndex = function (indexes) {
        var rows = null;

        if (this.isTreeType()) {
            rows = this.getNodesByIndex(indexes);
            rows = this.getParentNodes(rows);
        }
        return rows;
    }

    HQGrid.prototype.getChildrenNodes = function (rows) {
        var result = [],
            list = this.tree.list,
            name = this.tree.name,
            item,
            items = [],
            node,
            children,
            i,
            j,
            len,
            lenj;

        if (!(rows instanceof Array)) {
            rows = [rows];
        }

        for (i = 0, len = rows.length; i < len; i++) {
            item = rows[i];
            node = item.node ? (item.node || item.data[name]) : item[name];
            if (node.children && node.children.length > 0) {
                items = [];
                children = node.expand !== false ? node.children : null;
                if (children && children.length > 0) {
                    for (j = 0, lenj = children.length; j < lenj; j++) {
                        items.push(children[j].node.id);
                    }
                }
            }

            if (items.length === 0) {
                result[i] = null;
                continue;
            }
            result[i] = this.getTreeFormatRow(items, list);
        }

        return result;
    }

    HQGrid.prototype.getChildrenNodesByIndex = function (indexes) {
        var rows = null;

        if (this.isTreeType()) {
            rows = this.getNodesByIndex(indexes);
            rows = this.getChildrenNodes(rows);
        }

        return rows;
    }

    HQGrid.prototype.getIndexByNodeId = function (nodeId) {
        var list = this.tree.list,
            node,
            index = -1;

        for (var i = 0, len = list.length; i < len; i++) {
            node = list[i].node;
            if (node.id === nodeId) {
                index = i + 1;
                break;
            }
        }

        return index;
    }

    HQGrid.prototype.setSelectedRows = function (rowsIndex, checked) {
        var i,
            len,
            rowIndex;

        if (rowsIndex instanceof Array) {
            for (i = 0, len = rowsIndex.length; i < len; i++) {
                rowIndex = rowsIndex[i];
                checked ? this.addSelectingRow(rowIndex) :
                    this.removeSelectingRow(rowIndex);
            }
        }
    }

    HQGrid.prototype.setAllSelectedRows = function (checked) {
        var data = this.data.current,
            rowIndex,
            i,
            len;

        for (i = 0, len = data.length; i < len; i++) {
            rowIndex = this.getRowIndex(i);
            if (checked) {
                this.addSelectingRow(rowIndex);
            } else {
                this.removeSelectingRow(rowIndex);
            }
        }
    }

    HQGrid.prototype.updateSelectedRowByPosition = function (index, checked, position) {
        var checkboxClassNames = ["hqgrid-icons-checked", "hqgrid-icons-unchecked"],
            rowClassNames = ["hqgrid-row-selected"],
            $row,
            $checkbox,
            $table = this.elements.body[position].tablebox;

        if ($table && $table.length > 0) {
            $row = $table.find(".hqgrid-body-row[data-index='" + index + "']");
            $checkbox = $row.find(".hqgrid-selecting .hqgrid-icon");

            $checkbox.removeClass(checkboxClassNames.join(" "));
            $checkbox.addClass(checked ? checkboxClassNames[0] : checkboxClassNames[1]);

            $row.removeClass(rowClassNames.join(" "));
            if (checked) {
                $row.addClass(rowClassNames[0]);
            }
        }
    }

    HQGrid.prototype.updateSelectedRows = function (rowsIndex, checked) {
        var index;
        for (var i = 0, len = rowsIndex.length; i < len; i++) {
            index = rowsIndex[i];
            this.updateSelectedRowByPosition(index, checked, "left");
            this.updateSelectedRowByPosition(index, checked, "middle");
        }
    }

    HQGrid.prototype.updateAllSelectedRows = function (checked) {
        var $table = this.elements.body.left.tablebox || this.elements.body.middle.tablebox,
            $rows,
            $row,
            length,
            startIndex,
            endIndex,
            rowsIndex = [];

        if ($table && $table.length > 0) {
            $rows = $table.find(".hqgrid-body-row");
            length = $rows.length;
            if (length < 1) {
                return;
            }
            $row = $($rows[0]);
            startIndex = this.getRowIndexByRowElem($row);
            endIndex = startIndex + length;
            for (var i = startIndex; i < endIndex; i++) {
                rowsIndex.push(i);
            }
            this.updateSelectedRows(rowsIndex, checked);
        }
    }


    /**
     * ROWSTYPE
     */

    HQGrid.prototype.getInsertedRows = function () {
        var result = [],
            i,
            item;

        for (i in this.inserted) {
            item = this.inserted[i];
            result.push(item);
        }

        return result;
    }

    HQGrid.prototype.getRemovedRows = function () {
        var result = this.removed;

        return result;
    }

    HQGrid.prototype.getEditedRows = function () {
        var result = [],
            i,
            item;

        for (i in this.edit.changed) {
            item = this.data.page[this.getDataIndex(i)];
            result.push(item);
        }

        return result;
    }

    HQGrid.prototype.getInvalidations = function () {
        var result = [],
            index,
            item,
            field,
            invalidation = this.invalidation;

        for (index in invalidation) {
            item = invalidation[index];
            for (field in item) {
                result.push(this.exportRow(index, this.getRowData(index), undefined, field));
                break;
            }
        }

        return result;
    }

    HQGrid.prototype.resortStorageIndex = function (index, insert) {
        var storage,
            fnName = insert ? 'insert' : 'remove',
            pageIndex = this.paging.pageIndex,
            fn = {
                insert: function (storage, index) {
                    var result = {},
                        j;

                    for (var i in storage) {
                        j = i;
                        if (i >= index) {
                            ++j
                        }
                        result[j] = storage[i];
                    }

                    return result;
                },
                remove: function (storage, index) {
                    var result = {};

                    for (var i in storage) {

                        if (i < index) {
                            result[i] = storage[i];
                        } else if (i > index) {
                            result[i - 1] = storage[i];
                        }

                    }

                    return result;
                }
            };

        this.selected[pageIndex] = fn[fnName](this.selected[pageIndex], index);
        this.inserted = fn[fnName](this.inserted, index);
        this.edit.changed = fn[fnName](this.edit.changed, index);
    }

    HQGrid.prototype.clearRow = function (cells) {
        var cell,
            field;

        for (var i = 0, len = cells.length; i < len; i++) {
            cell = $(cells[i]);
            field = this.fields.hash[cell.attr('data-name')];

            this.renderValue(field, [this.RENDERTYPE.EDITVALUE], '', cell);
        }
    }

    HQGrid.prototype.save = function () {
        var rows;

        this.saveEdited();
        rows = {
            inserted: this.getInsertedRows(),
            removed: this.getRemovedRows(),
            edited: this.getEditedRows(),
            selected: this.getSelectedRows(true),
            rows: this.data.page,
            invalidation: this.getInvalidations()
        }

        return rows;
    }


    /**
     * DESTROY
     */

    HQGrid.prototype.destroy = function () {

        var container = this.container.parent();

        this.unbindEvent();
        this.destoryInstance();
        this.deleteProperty();

        container.removeClass('hqgrid-container');
        container.empty();
        container = null;
    }

    HQGrid.prototype.destoryInstance = function () {
        var i, j,
            elemType,
            position,
            scroll,
            clusterize,
            instance;

        for (i in this.ELEMTYPE) {
            elemType = this.ELEMTYPE[i];
            for (j in this.POSITION) {
                position = this.POSITION[j];
                instance = this.instance[elemType][position];
                instance.rows = [];
                //scroll
                scroll = instance.scroll;
                if (scroll) {
                    scroll.destroy();
                }
                //clusterize
                clusterize = instance.clusterize;
                if (clusterize) {
                    clusterize.clear();
                    clusterize.destroy();
                }
            }
        }
    }

    HQGrid.prototype.deleteProperty = function () {
        for (var i in this) {
            if (this.hasOwnProperty(i) && typeof this[i] === 'object') {
                this[i] = null;
            }
        }
    }

    HQGrid.prototype.getFieldWidthByText = function (str) {
        var length = 0,
            fontSize = this.getFontSize();

        if (str && typeof str === 'string') {
            for (var i = 0, len = str.length; i < len; i++) {
                if (str.charCodeAt(i) > 255) {
                    length += 2;
                } else {
                    length += 0.7;
                }
            }
        }

        return Math.ceil(length) * fontSize + fontSize;
    }

    /**
     * EVENT
     */

    HQGrid.prototype.bindResize = function () {
        if (this.opt.autoResize) {
            $(window).bind('resize', this, this.resizeEvent);
        }
    }

    HQGrid.prototype.resizeEvent = function (event) {
        var self = event.data;
        self.resize();
    }

    HQGrid.prototype.unbindResize = function () {
        $(window).unbind('resize', this.resizeEvent);
    }

    HQGrid.prototype.bindRowHover = function () {
        var row,
            relateRow,
            index,
            hasLeft = this.fields.left,
            className = 'hqgrid-body-row-over';

        this.container.find(".hqgrid-body")
            .on('mouseenter', '.hqgrid-body-row', function () {

                var row = $(this);
                index = row.index();
                if (hasLeft) {
                    relateRow = row.closest('.hqgrid-box-wrap').siblings().find('tbody tr:eq(' + index + ')');
                    relateRow.addClass(className);
                }

                row.addClass(className);


            }).on('mouseleave', '.hqgrid-body-row', function () {
                $(this).removeClass(className);
                if (relateRow) {
                    relateRow.removeClass(className);
                }

            })
    }

    HQGrid.prototype.unbindRowHover = function () {
        this.container.find(".hqgrid-body").unbind('mouseenter mouseleave');
    }

    HQGrid.prototype.bindFilterRowClick = function () {

        var row = this.container.find('tr.hqgrid-thead-filter'),
            cells = row.find('td.hqgrid-cell-state-edit'),
            self = this;

        row.on('click', 'td', function (event) {

            var cell = $(this),
                $target = $(event.target),
                isEditCell = cell.hasClass('hqgrid-cell-state-edit'),
                reset = $target.hasClass('hqgrid-filter-clean-button'),
                search = $target.hasClass('hqgrid-filter-search-button');

            if (reset) {
                //重置
                self.bindCleanButtonEvent.call(self, cells);
            } else if (search) {
                //查询
                self.bindSearchButtonEvent.call(self, cells);
            } else {
                //筛选
                self.bindFilterCellEvent.call(self, cell);
            }

        });

    }

    HQGrid.prototype.unbindFilterRowClick = function () {
        this.container.find('tr.hqgrid-thead-filter').unbind('click');
    }

    HQGrid.prototype.bindCleanButtonEvent = function (cells) {
        var field,
            cell,
            render,
            fn;

        this.clearRow(cells);

        this.fields.filter = {};
        this.fields.sort = {};
        this.refreshContent();
    }

    HQGrid.prototype.bindSearchButtonEvent = function (cells) {
        var cell,
            field,
            render,
            fn,
            value,
            filter = this.fields.filter = {};

        for (var i = 0, len = cells.length; i < len; i++) {
            cell = $(cells[i]);
            field = this.fields.hash[cell.attr('data-name')];

            value = this.renderValue(field, [this.RENDERTYPE.EDITVALUE], undefined, cell);
            if (value !== '' && value !== null && typeof value !== 'undefined') {
                filter[field.name] = value;
            }
        }

        this.refreshContent();
    }

    HQGrid.prototype.bindFilterCellEvent = function (cell) {
        var fieldName,
            field;

        //筛选
        fieldName = cell.attr('data-name');
        if (!fieldName) {
            return;
        }
        fieldName = htmlDecode(fieldName);
        field = this.fields.hash[fieldName];

        this.renderEvent(field, [this.RENDERTYPE.FILTEREVENT, this.RENDERTYPE.EDITEVENT], cell);
    }

    HQGrid.prototype.bindInsertRowClick = function () {
        var row = this.container.find('tr.hqgrid-thead-insert'),
            cells = row.find('td.hqgrid-cell-state-edit'),
            self = this;

        row.on('click', 'td', function (event) {

            var cell = $(this),
                $target = $(event.target),
                add = $target.hasClass('hqgrid-add-button'),
                save = $target.hasClass('hqgrid-save-button'),
                remove = $target.hasClass('hqgrid-remove-button');

            if (add) {
                self.bindAddRowButtonEvent.call(self, cells);
            } else if (save) {
                self.bindSaveRowsButtonEvent.call(self);
            } else if (remove) {
                self.bindRemoveRowsButtonEvent.call(self, cells);
            } else {
                self.bindInsertCellEvent.call(self, cell);
            }

        });

    }

    HQGrid.prototype.unbindInsertRowClick = function () {
        this.container.find('tr.hqgrid-thead-insert').unbind('click');
    }

    HQGrid.prototype.bindAddRowButtonEvent = function (cells) {
        var cell,
            field,
            value,
            row = {},
            validate,
            pass = true,
            checked;

        //获取插入行的值
        for (var i = 0, len = cells.length; i < len; i++) {
            cell = $(cells[i]);
            cell.find('.hqgrid-cell').removeClass('hqgrid-validate');
            cell.find('.hqgrid-validate-sign').remove();
            field = this.fields.hash[cell.attr('data-name')];

            value = this.renderValue(field, [this.RENDERTYPE.EDITVALUE], undefined, cell);
            this.setItem(row, field.name, value);
        }

        //验证
        for (i in row) {
            field = this.fields.hash[i];
            value = row[i];
            validate = this.checkValidate(field, value, row);
            checked = validate.checked;
            if (!checked) {
                pass = false;
                cell = cells.has('[data-name="' + i + '"]');
                cell.find('.hqgrid-cell').addClass('hqgrid-validate')
                    .append('<span title="' + validate.message + '" class="hqgrid-validate-sign" ></span>');
            }
        }

        //通过验证执行添加
        if (pass) {
            //保存
            this.saveEdited();
            //插入
            this.data.page.push(row);
            this.inserted[this.data.page.length + 1] = row;
            ++this.paging.pageCount;
            this.refreshContent();
            //置空
            this.clearRow(cells);
        }
    }

    HQGrid.prototype.bindSaveRowsButtonEvent = function () {
        var rows = this.save(),
            fn = this.opt.save;

        if (typeof fn === 'function') {
            fn.call(this.container, rows);
        }
    }

    HQGrid.prototype.bindRemoveRowsButtonEvent = function () {
        var selected = this.selected[this.paging.pageIndex],
            edit = this.edit.changed,
            inserted = this.inserted,
            data = this.data.page,
            removeList = [],
            rowIndex,
            dataIndex,
            row;

        if (!selected) {
            return;
        }

        this.saveEdited();

        for (var i in selected) {
            removeList.push(i);
            row = selected[i];

            delete edit[i];
            if (inserted[i]) {
                delete inserted[i];
            } else {
                this.removeSelectingRow(i);
                this.removed.push(row);
                --this.paging.pageCount;
            }
        }

        removeList.reverse();
        for (var i = 0, len = removeList.length; i < len; i++) {
            rowIndex = removeList[i];
            this.resortStorageIndex(rowIndex, false);
            dataIndex = this.getDataIndex(rowIndex);
            data.splice(dataIndex, 1);
        }
        this.refreshContent();

        // console.dir({
        //     selected: this.selected,
        //     edit: this.edit.changed,
        //     inserted: this.inserted,
        //     removed: this.removed
        // });
    }

    HQGrid.prototype.bindInsertCellEvent = function (cell) {
        var fieldName,
            field;

        //筛选
        fieldName = cell.attr('data-name');
        if (!fieldName) {
            return;
        }
        fieldName = htmlDecode(fieldName);
        field = this.fields.hash[fieldName];

        this.renderEvent(field, [this.RENDERTYPE.INSERTEVENT, this.RENDERTYPE.EDITEVENT], cell);
    }

    HQGrid.prototype.bindSelectingClick = function () {
        var self = this;

        if (!this.opt.selecting) {
            return;
        }

        // checkbox 全选
        this.container.find('.hqgrid-header th.hqgrid-selecting').on('click', function () {
            self.bindSelectingAllEvent.call(self, $(this));
        });

        //checkbox 多选
        this.container.find('.hqgrid-body').on('click', 'td.hqgrid-selecting', function (event) {
            self.bindSelectingEvent.call(self, $(this));
        });
    }

    HQGrid.prototype.unbindSelectingClick = function () {
        if (!this.opt.selecting) {
            return;
        }

        this.container.find('.hqgrid-header th.hqgrid-selecting').unbind('click');
        this.container.find('.hqgrid-body').unbind('click');
    }

    HQGrid.prototype.bindSelectingAllEvent = function ($cell) {
        var $elem = $cell.find('span'),
            checked = $elem.hasClass('hqgrid-icons-unchecked') ? true : false;

        this.setSelectingAll(checked);
    }

    HQGrid.prototype.bindSelectingEvent = function ($cell) {
        var $elem = $cell.find('span'),
            checked = $elem.hasClass('hqgrid-icons-unchecked') ? true : false,
            row = $cell.closest('tr'),
            rowIndex = this.getRowIndexByRowElem(row);

        this.setSelecting([rowIndex], checked);
    }

    HQGrid.prototype.bindRowClick = function () {
        var self = this;

        this.container.find('.hqgrid-body').on('click', 'td',
            function (event) {
                self.bindRowClickEvent($(this), event);
            });
    }

    HQGrid.prototype.unbindRowClick = function () {
        this.container.find('.hqgrid-body').unbind('click');
    }

    HQGrid.prototype.bindRowClickEvent = function ($cell, event) {
        this.triggerRowSingleSelect($cell);
        this.triggerRowClickEvent($cell);
    }

    HQGrid.prototype.triggerRowClickEvent = function ($cell) {
        var isViewCell = this.isViewCell($cell),
            isSelectingColumn = this.isSelectingColumnByCell($cell),
            field,
            rowClick,
            rowIndex,
            dataIndex,
            selected,
            row;

        field = this.getFieldByCell($cell);

        //执行rowClick事件
        if ($cell && isViewCell && !isSelectingColumn) {
            rowClick = this.opt.events.rowClick;
            if (typeof rowClick === 'function') {
                rowIndex = this.getRowIndexByCellElem($cell);
                dataIndex = this.getDataIndex(rowIndex);
                row = $.extend(true, {}, this.data.current[dataIndex]);
                selected = this.isSelectedByIndex(rowIndex);
                rowClick.call($cell[0], field, row, rowIndex, selected);
            }
        }
    }

    HQGrid.prototype.triggerRowSingleSelect = function ($cell) {
        var isViewCell = this.isViewCell($cell),
            isSingleSelect = this.opt.rowSingleSelect,
            isSelectingColumn = this.isSelectingColumnByCell($cell),
            field = this.getFieldByCell($cell),
            index = this.getRowIndexByCellElem($cell),
            editable = this.isEditable(field, index);

        if (isViewCell && isSingleSelect && !isSelectingColumn && !editable) {
            this.setSelectingAll(false);
            this.setSelecting([index], true);
        }
    }

    HQGrid.prototype.bindCellClick = function () {
        var _this = this;
        this.container.find('.hqgrid-body').on('click', 'td',
            function (event) {
                _this.opt.editing ?
                    _this.bindEditCellEvent(event, $(this)) :
                    _this.bindCellEvent(event, $(this));
            });
    }

    HQGrid.prototype.unbindCellClick = function () {
        this.container.find('.hqgrid-body').unbind('click');
    }

    HQGrid.prototype.bindCellEvent = function (event, $cell) {
        var fieldName,
            field;

        fieldName = htmlDecode($cell.attr('data-name'));
        field = this.fields.hash[fieldName];
        if (!field) {
            return;
        }
        this.fieldCustomEvents(field, $cell, event)
    }

    HQGrid.prototype.bindEditCellEvent = function (event, $cell) {
        var isEditCell = $cell.hasClass('hqgrid-cell-state-edit'),
            fieldName,
            field,
            $row = $cell.parent(),
            index = this.getRowIndexByRowElem($row),
            row = this.getRowData(index);

        fieldName = htmlDecode($cell.attr('data-name'));
        field = this.fields.hash[fieldName];
        if (!field) {
            return;
        }

        //执行编辑事件
        if ($cell && isEditCell) {
            this.renderEvent(field, [this.RENDERTYPE.EDITEVENT], $cell, row, index);
            return;
        }
        //执行自定义事件
        if (this.fieldCustomEvents(field, $cell, event)) {
            return;
        }
        //单元格切换
        this.saveEdited(field, $cell);
    }

    HQGrid.prototype.bindHeaderResize = function () {
        var _this = this,
            pageX,
            left,
            boundary = {
                left: 0,
                right: 0
            },
            $resize,
            $cell,
            mousedown = function (e) {
                var $elem = $(this),
                    position,
                    width,
                    paging = _this.elements.paging.box;

                $cell = $elem.parent();
                position = $cell.position();
                width = $cell.width();
                $resize = $('<div class="hqgrid-resize-h-container"><div class="hqgrid-resize-h"></div></div>');
                boundary.left = position.left;
                left = position.left + width + 2;
                console.log('mousedown:' + left);
                $resize.css({
                    left: left + 'px',
                    bottom: paging.height() + 2 + 'px'
                });
                _this.container.append($resize);
                pageX = e.pageX;
                _this.container.addClass('field-resizing');
            },
            mousemove = function (e) {
                if (!$resize) {
                    return;
                }
                var offsetX = e.pageX - pageX,
                    _left = left + offsetX;
                console.log('mousemove:' + offsetX);
                _left = _left < boundary.left ? boundary.left : _left;
                boundary.right = _left;
                $resize.css({
                    left: _left + 'px'
                });
            },
            mouseup = function (e) {
                if ($resize) {
                    console.log('into mouseup');
                    _this.resizeFieldWidth($cell.attr('data-name'), boundary.right - boundary.left);
                    $resize.remove();
                    $resize = null;
                    pageX = 0;
                    boundary.left = 0;
                    _this.container.removeClass('field-resizing');
                    emptySelection();
                }
            };

        if (this.opt.fieldsResizable) {
            this.container.find('.hqgrid-thead-resize').on('mousedown', mousedown);
            this.container.on('mousemove', mousemove);
            this.container.on('mouseup', mouseup);
            this.container.on('mouseleave', mouseup);
        }
    }

    HQGrid.prototype.unbindHeaderResize = function () {
        this.container.find('.hqgrid-thead-resize').unbind('mousedown');
        this.container.unbind('mousemove');
        this.container.unbind('mouseup');
        this.container.unbind('mouseleave');
    }

    HQGrid.prototype.bindEvent = function () {
        this.bindResize();
        this.bindRowHover();
        this.bindRowClick();
        this.bindFilterRowClick();
        this.bindInsertRowClick();
        this.bindSelectingClick();
        this.bindCellClick();
        this.bindPaging();
        this.bindHeaderResize();
    }

    HQGrid.prototype.unbindEvent = function () {
        this.unbindResize();
        this.unbindRowHover();
        this.unbindRowClick();
        this.unbindFilterRowClick();
        this.unbindInsertRowClick();
        this.unbindSelectingClick();
        this.unbindCellClick();
        this.unbindPaging();
        this.unbindHeaderResize();
    }


    /**
     * COMMON VAR/FUNCTION
     */

    // var-support
    var ISSHOWLOG = true,
        OS,
        OSTYPE;

    // os
    function getOS() {

        if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf('like Gecko"') > 0) {
            return "MSIE";
        }
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            return "Firefox";
        }
        if (navigator.userAgent.indexOf("Safari") > 0) {
            return "Safari";
        }
        if (navigator.userAgent.indexOf("Camino") > 0) {
            return "Camino";
        }
        if (navigator.userAgent.indexOf("Gecko/") > 0) {
            return "Gecko";
        }

    }

    OS = getOS();

    OSTYPE = {
        MSIE: 'MSIE',
        FIREFOX: 'Firefox',
        SAFARI: 'Safari'
    }

    // log
    function log(message) {
        if (ISSHOWLOG) {
            window.console.log(message);
        }
    }

    // encode
    function htmlEncode(str) {
        if (typeof str === 'number') {
            return str;
        }

        var s = str || "";
        s = s + "";

        if (s.length == 0) {
            return "";
        }
        s = s.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        //s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");

        return s;
    }

    // decode
    function htmlDecode(str) {
        var s = str || "";
        s = s + "";
        if (s.length == 0) {
            return "";
        }
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        //s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");

        return s;
    }

    // text-range
    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function clone(item, exclude) {
        var str,
            result;

        if (!item) {
            return item;
        }

        //IE浏览器使用JSON.stringify,使用定义key会造成IE内核崩溃
        if (isIE()) {
            if (item instanceof Array) {
                result = $.extend(true, [], item);
            }
            else if (item && typeof item === 'object') {
                result = $.extend(true, {}, item);
            }
            else {
                result = item;
            }

            return result;
        }

        str = JSON.stringify(item, function (key, value) {
            if (exclude && exclude instanceof Array && exclude.indexOf(key) !== -1) {
                return undefined;
            }
            return value;
        });
        result = JSON.parse(str);

        return result;
    }


    function emptySelection() {
        if (typeof window.getSelection === 'function') {
            window.getSelection().removeAllRanges();
        } else {
            document.selection.empty();
        }
    }

    function isIE() {
        return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
    }

    /**
     * $.hqGrid.xx
     */
    $.hqGrid.htmlEncode = htmlEncode;
    $.hqGrid.htmlDecode = htmlDecode;
    $.hqGrid.setSelectionRange = setSelectionRange;
    $.hqGrid.clone = clone;

    /**
     * PUBLIC API
     */
    var methods = {
        init: function (options, $elem) {
            if (arguments.length === 1) {
                options = {};
                $elem = arguments[0];
            }
            $elem.data('hqGrid', new HQGrid($elem, options));

            return $elem;
        },
        resize: function ($elem) {
            this.resize();
            return $elem;
        },
        reset: function (opt, $elem) {
            var _opt = {};

            if (this) {
                _opt = this.opt;
                methods.destroy.call(this, $elem);
            }

            for (var i in opt) {
                _opt[i] = opt[i];
            }
            methods.init.call(this, _opt, $elem);

            return $elem;
        },
        fields: function (fields, $elem) {
            methods.reset.call(this, {
                fields: fields
            }, $elem);

            return $elem;
        },
        data: function () {
            var data, $elem, pageCount, result;

            if (this.opt.autoload) {
                var data = arguments[0],
                    $elem = arguments[arguments.length - 1];

                this.opt.data = data;
                this.initData();
                this.initPaging();
                this.updateContent();
                return $elem;
            }

            //仅支持数组
            var data = arguments[0],
                pageCount = arguments[1],
                $elem = arguments[arguments.length - 1];

            if (data instanceof Array) {
                //平台兼容方案，弃用
                //this.changeContent(data, pageCount, $elem);
            }

            return $elem;
        },
        getRows: function (rows, type) {
            var result;

            if (!this.isTreeType()) {
                return [];
            }

            switch (type) {
                case 'root':
                    result = this.getRootNodes();
                    break;
                case 'parent':
                    result = this.getParentNodes(rows);
                    break;
                case 'children':
                    result = this.getChildrenNodes(rows);
                    break;
                default:
                    break;
            }

            return clone(result);
        },
        getRowsByIndex: function (indexes, type) {
            var result;

            switch (type) {
                case 'parent':
                    result = this.getParentNodesByIndex(indexes);
                    break;
                case 'children':
                    result = this.getChildrenNodesByIndex(indexes);
                    break;
                default:
                    result = this.getNodesByIndex(indexes);
                    break;
            }

            return clone(result);
        },
        update: function () {
            var index, item, name, $elem,
                length = arguments.length;

            $elem = arguments[length - 1];
            if (length >= 2) {
                index = arguments[0];
            }
            if (length >= 3) {
                item = arguments[1];
            }
            if (length >= 4) {
                name = arguments[2];
            }
            //this.saveEdited();
            if (length === 1) {
                this.updateContent();
            }
            else {
                this.updateRow(index, item, name);
            }
            return $elem;
        },
        refresh: function () {
            var $elem = arguments[arguments.length - 1];
            methods.reset.call(this, {}, $elem);
        },
        selected: function (index, checked, toArray) {
            var $elem = arguments[arguments.length - 1],
                result = [],
                checked = checked === false ? false : true;

            //设置选中行
            if (arguments.length > 1 && typeof index !== 'undefined') {
                if (typeof index === 'number') {
                    result.push(index);
                    this.setSelecting(result, checked);
                } else if (index instanceof Array) {
                    result = index;
                    this.setSelecting(result, checked);
                } else if (typeof index === 'string' && index === 'all') {
                    this.setSelectingAll(checked);
                }

                return $elem;
            }

            //获取选中行
            if (arguments.length === 4 && toArray === false) {
                result = this.getSelectedRows(false);
            } else {
                result = this.getSelectedRows(true);
            }

            return clone(result);
        },
        getSelected: function (type, toArray) {
            var toArray = toArray === false ? false : true,
                result;

            switch (type) {
                case 'top':
                    result = this.getTopSelectedRows(toArray);
                    break;
                default:
                    result = this.getSelectedRows(toArray);
                    break;
            }

            return clone(result);
        },
        setSelected: function (index, checked, toArray) {
            var $elem = arguments[arguments.length - 1],
                result = [],
                checked = checked === false ? false : true;

            if (typeof index === 'number') {
                result.push(index);
                this.setSelecting(result, checked);
            } else if (index instanceof Array) {
                result = index;
                this.setSelecting(result, checked);
            } else if (typeof index === 'string' && index === 'all') {
                this.setSelectingAll(checked);
            }

            return $elem;
        },
        rowsTransform: function (data) {
            this.rowsTransform(data);
            return data;
        },
        load: function (row, type, param) {
            var node,
                row,
                index;

            type = type || this.MODETYPE.LIST;
            if (type === this.MODETYPE.TREE && row && row.node) {
                index = row.index;
                row = this.getRowData(index);
                node = row[this.tree.name];
                this.loadTreeByAsyn(node, index, null, param);
            }
            else {
                this.load();
            }
        },
        save: function () {
            return this.save();
        },
        gotoRow: function (value, key) {
            var length = arguments.length;
            if (length >= 2) {
                value = arguments[0];
            }
            if (length >= 3) {
                key = arguments[1];
            }

            this.isTreeType() ?
                this.goTreeRowById(value) :
                null;
        },
        paging: function (pageIndex, $elem) {
            if (arguments.length === 1) {
                return this.getPaging();
            }

            //设置分页的值
            if (isNaN(pageIndex) || pageIndex < 1) {
                pageIndex = 1;
                console.warn('pageIndex is NaN pageIndex less than 1 ! Reset pageIndex equal to 1.');
            }

            if (this.opt.autoload) {
                this.paging.pageLastIndex = this.paging.pageIndex;
                this.paging.pageIndex = pageIndex;
                this.updateContent();
            } else {
                //兼容旧api
                this.paging.pageIndex = pageIndex;
                this.updatePaging();
            }

            return $elem;
        },
        destroy: function ($elem) {
            this.destroy();
            $elem.removeData('hqGrid');
            return $elem;
        }
    }

    /**
     * JQUERY API
     */
    jQuery.fn.hqGrid = function () {
        var method = arguments[0],
            arg = arguments,
            instance = this.data('hqGrid');

        if (methods[method]) {
            method = methods[method];
            arg = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) === 'object' || !method) {
            arg = Array.prototype.slice.call(arguments);
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.hqGrid');
            return this;
        }

        if (!instance && method !== methods.init) {
            $.error('jQuery.hqGrid not instance');
            return this;
        }

        arg.push(this);
        return method.apply(instance, arg);
    };

})(jQuery, window);