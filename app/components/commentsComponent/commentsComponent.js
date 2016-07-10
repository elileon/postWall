/**
 * Created by eli.l on 02/07/2016.
 */
(function () {
    'use strict';

    var pwComments =  angular.module('pwComments', [
        'pwComment'
    ]);

    pwComments.directive('pwComments', function () {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/commentsComponent/commentsTemplate.html',
            scope: {},
            bindToController: true,
            controllerAs: "vm",
            controller: 'pwCommentsController'
        };
        return directive;
    });

    pwComments.controller('pwCommentsController', pwCommentsController);

    function pwCommentsController($scope, pwCommentsService, pwTagsFilter){
        var vm = this;

        function updateData(){
            pwCommentsService.getComments()
                .then(function(comments){
                    vm.comments = comments;
                    vm.tagsList = pwCommentsService.getTagsList();
                    vm.displayComments = pwTagsFilter(vm.comments, vm.selectedTags);
                });
        }

        function init() {
            vm.selectedTags = [];
            updateData();
        }

        $scope.$watch('vm.selectedTags', function (newValue, oldValue) {
            if(oldValue != newValue && newValue){
                vm.displayComments = pwTagsFilter(vm.comments, newValue);
            }
        });

        vm.updateComment = function (newComment) {
            pwCommentsService.updateComment(newComment);
            updateData();
        };
        
        vm.deleteComment = function (commentId) {
            pwCommentsService.deleteComment(commentId);
            updateData();
        };
        
        init();
    }
})();