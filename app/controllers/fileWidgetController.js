(function() {
    'use strict';

    angular.module('app')
        .controller('fileWidgetController', ['$interval', '$scope',
            function($interval, $scope) {

                //var mediaDirectory = "\\\\HOMESERVER\\ShareDrive_WD";
                var mediaDirectory = "C:\\Users\\Balazs_Kis\\media-dir";

                var mediaExtensions = [".mkv", ".flv", ".avi", ".mov", ".mpg", ".mp4", ".wmv"];
                var ignoredKeywords = ["sample"];

                var fileUpdateIntervalSeconds = 60;

                var fs = require('fs');
                var path = require('path');
                var sys = require('util');
                var cp = require('child_process');

                $scope.files = [];

                $scope.colorForText = function(text) {
                    return intToRGB(hashCode(text));
                }

                $scope.selected = function(fileInfo) {
                    cp.exec(getOpenCommand() + " " + fileInfo.fullPath);
                }

                function update() {
                    walk(mediaDirectory, processFileList);
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

                    // Not a media file, ignore it.
                    if (!mediaExtensions.includes(ext)) {
                        return null;
                    }

                    // Contains an ignore keyword, ignore the file.
                    for (var i = 0; i < ignoredKeywords.length; i++) {
                        if (file.toLowerCase().includes(ignoredKeywords[i])) {
                            return null;
                        }
                    }

                    return {
                        fileName: path.basename(file, ext),
                        extension: ext.substr(1).toUpperCase(),
                        fullPath: file,
                        creationDate: fs.statSync(file).birthtime
                    };
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

                function walk(dir, done) {
                    var results = [];
                    fs.readdir(dir, function(err, list) {
                        if (err) return done(err);
                        var pending = list.length;
                        if (!pending) return done(null, results);
                        list.forEach(function(file) {
                            file = path.resolve(dir, file);
                            fs.stat(file, function(err, stat) {
                                if (stat && stat.isDirectory()) {
                                    walk(file, function(err, res) {
                                        results = results.concat(res);
                                        if (!--pending) done(null, results);
                                    });
                                } else {
                                    results.push(file);
                                    if (!--pending) done(null, results);
                                }
                            });
                        });
                    });
                }

                function getOpenCommand() {
                    switch (process.platform) {
                        case 'darwin':
                            return 'open';
                        case 'win32':
                            return 'start';
                        case 'win64':
                            return 'start';
                        default:
                            return 'xdg-open';
                    }
                }

                $interval(update, fileUpdateIntervalSeconds * 1000);
                update();
            }
        ]);
})();