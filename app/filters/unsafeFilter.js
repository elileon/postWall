/**
 * Created by eli.l on 02/07/2016.
 */
(function(){
    'use strict';
    angular.module('pwFilters')
        .filter('unsafe', function($sce) { return $sce.trustAsHtml; });
})();