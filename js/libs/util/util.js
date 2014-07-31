define(
['jquery', 'handlebars'], 
function ($) {
	var util = {
		// ISO8601 date parser to support date parsing in < IE9
		parseISO8601: function(str) {
			var parts = str.split('T'),
			dateParts = parts[0].split('-'),
			timeParts = parts[1].split('Z'),
			timeSubParts = timeParts[0].split(':'),
			timeSecParts = timeSubParts[2].split('.'),
			timeHours = Number(timeSubParts[0]),
			_date = new Date;

			_date.setUTCFullYear(Number(dateParts[0]));
			_date.setUTCMonth(Number(dateParts[1])-1);
			_date.setUTCDate(Number(dateParts[2]));
			_date.setUTCHours(Number(timeHours));
			_date.setUTCMinutes(Number(timeSubParts[1]));
			_date.setUTCSeconds(Number(timeSecParts[0]));
			if (timeSecParts[1]) _date.setUTCMilliseconds(Number(timeSecParts[1]));

			// by using setUTC methods the date has already been converted to local time(?)
			return _date;
		}
	};
	// Template formatters for numbers and dates
	Handlebars.registerHelper('formatNumber', function(num) {
	    return Math.round(num).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	});
	Handlebars.registerHelper('toDateString', function(lsDate) {
		var date = util.parseISO8601(lsDate);
		return date.toDateString() + ' ' + date.toLocaleTimeString()
	});
	Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
		if (arguments.length < 3)
			throw new Error("Handlebars Helper equal needs 2 parameters");
		if (lvalue!=rvalue) {
			return options.inverse(this);
		} else {
			return options.fn(this);
		}
	});	
	return util;
});

