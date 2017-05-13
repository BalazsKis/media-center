(function () {
    'use strict';
    
    angular.module("app")
    .constant("dateTimeFormats", {
        dateFormat: "yyyy.MM.dd.",
        dateTimeFormat: "yyyy.MM.dd. HH:mm",
        shortDateTimeFormat: "MM/dd HH:mm:ss.sss"

    });
})();