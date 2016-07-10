/**
 * Created by eli.l on 02/07/2016.
 */
(function () {
    'use strict';

    var pwComment =  angular.module('pwComment', []);
    
    pwComment.directive('pwComment', function () {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/commentsComponent/commentComponent/commentTemplate.html',
            scope: {},
            bindToController: {
                comment: '=',
                availableTags: '=',
                deleteComment: '&',
                updateComment: '&'
            },
            controllerAs: "vm",
            controller: 'pwCommentController'
        };
        return directive;
    });

    pwComment.controller('pwCommentController', pwCommentController);

    function pwCommentController($scope){
        var vm = this;

        function getDefaultComment(){
            return {
                title: "",
                text: "",
                tags: []
            }
        }

        function setMode(){
            if(!(vm.comment && vm.comment.title)){ //new comment
                vm.newMode = true;
                vm.displayMode = false;
                vm.tempComment = getDefaultComment();
            } else {
                vm.newMode = false;
                vm.displayMode = true;
            }
        }

        function init() {
            setMode();
        }

        vm.editComment = function () {
            vm.tempComment = angular.copy(vm.comment);
            vm.editMode = true;
            vm.displayMode = false;
        };

        vm.submit = function () {
            vm.updateComment({comment: vm.tempComment});
            if(vm.newMode){
                vm.tempComment = getDefaultComment();
            }
        };

        vm.cancel = function(){
            vm.editMode = false;
            vm.displayMode = true;
        };

        $scope.$watch('vm.comment', function (newValue, oldValue) {
            if(newValue && newValue !== oldValue){
                setMode();
            }
        });

        init();
    }
})();