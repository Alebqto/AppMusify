/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-search': '&#xf002;',
		'icon-envelope-o': '&#xf003;',
		'icon-check': '&#xf00c;',
		'icon-close': '&#xf00d;',
		'icon-remove': '&#xf00d;',
		'icon-times': '&#xf00d;',
		'icon-download': '&#xf019;',
		'icon-inbox': '&#xf01c;',
		'icon-pencil': '&#xf040;',
		'icon-plus-circle': '&#xf055;',
		'icon-minus-circle': '&#xf056;',
		'icon-question-circle': '&#xf059;',
		'icon-info-circle': '&#xf05a;',
		'icon-exclamation-circle': '&#xf06a;',
		'icon-comment': '&#xf075;',
		'icon-chevron-down': '&#xf078;',
		'icon-sign-out': '&#xf08b;',
		'icon-sign-in': '&#xf090;',
		'icon-upload': '&#xf093;',
		'icon-briefcase': '&#xf0b1;',
		'icon-group': '&#xf0c0;',
		'icon-users': '&#xf0c0;',
		'icon-user-plus': '&#xf234;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
