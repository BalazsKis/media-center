(function() {
    'use strict';

    angular.module("app")
        .constant("dateTimeFormats", {
            timeFormat: "HH:mm",
            timeFormatWithSeconds: "HH:mm:ss",
            dateFormat: "MMMM Do YYYY",
            dayFormat: "dddd",
            dateFormatWithDay: "dddd, MMMM Do, YYYY"
        });
})();