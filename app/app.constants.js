(function() {
    'use strict';

    angular.module("app")
        .constant("dateTimeFormats", {
            timeFormat: "H:mm",
            timeFormatWithSeconds: "H:mm:ss",
            dateFormat: "MMMM d, yyyy",
            dayFormat: "EEEE",
            dateFormatWithDay: "EEEE, d MMMM"
        });
})();