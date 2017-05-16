(function() {
    'use strict';

    angular.module("app")
        .filter("addSpaces", function() {
            return function(spacelessString) {
                var res = spacelessString.replace(/([A-Z])/g, " $1").trim();
                return res.charAt(0).toUpperCase() + res.slice(1);
            };
        })
        .filter("ratioToPercent", function() {
            return function(ratio, fraction) {
                if (fraction === undefined) fraction = 1;
                if (isNaN(ratio)) return ratio;
                return (ratio * 100).toFixed(fraction) + "%";
            };
        })
        .filter("timeToString", function() {
            return function(dateTimeObject, formatString) {
                return dateTimeObject.format(formatString);
            };
        })
        .filter("toHourPercent", function() {
            return function(dateTimeObject) {
                return (dateTimeObject.hours() * 100 / 24) + "%";
            };
        })
        .filter("toMinutePercent", function() {
            return function(dateTimeObject) {
                return (dateTimeObject.minutes() * 100 / 60) + "%";
            };
        })
        .filter("toSecondPercent", function() {
            return function(dateTimeObject) {
                return (dateTimeObject.seconds() * 100 / 60) + "%";
            };
        });
})();