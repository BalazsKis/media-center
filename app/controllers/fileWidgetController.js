(function() {
    'use strict';

    angular.module('app')
        .controller('fileWidgetController', ['$interval', '$scope',
            function($interval, $scope) {

                var mediaDirectory = "C:\\Users\\Balazs_Kis\\Desktop\\MediaDir";
                var mediaExtensions = [".txt", ".mkv", ".srt"];

                var fileUpdateIntervalSeconds = 60;

                var fs = require('fs');
                var path = require('path');

                $scope.files = [];

                $interval(update, fileUpdateIntervalSeconds * 1000);

                function update() {
                    fs.readdir(mediaDirectory, processFileList);
                }

                function processFileList(error, files) {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    var result = [];

                    files.forEach(file => {
                        var fileInfo = processFile(file);
                        if (fileInfo) {
                            result.push(fileInfo);
                        }
                    });

                    result.sort((a, b) => b.creationDate - a.creationDate);
                    $scope.files = result;
                }

                function processFile(file) {
                    var ext = path.extname(file);
                    var completeFilePath = path.join(mediaDirectory, file);
                    if (mediaExtensions.includes(ext)) {
                        return {
                            fileName: path.basename(file, ext),
                            extension: ext.substr(1).toUpperCase(),
                            fullPath: completeFilePath,
                            creationDate: fs.statSync(completeFilePath).birthtime
                        };
                    } else {
                        return null;
                    }
                }

                $scope.selected = function(fileInfo) {
                    //TODO: Open file.
                    console.log(fileInfo);
                }

                function hashCode(text) {
                    var hash = 0;
                    for (var i = 0; i < text.length; i++) {
                        hash = text.charCodeAt(i) + ((hash << 5) - hash);
                    }
                    return hash;
                }

                function intToRGB(i) {
                    var c = (i & 0x00FFFFFF).toString(16);
                    return "#" + "00000".substring(0, 6 - c.length) + c;
                }

                $scope.colorForText = function(text) {
                    return intToRGB(hashCode(text));
                }

                update();
            }
        ]);
})();