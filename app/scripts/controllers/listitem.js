'use strict';

angular.module('checkoffApp')
  .controller('ListitemCtrl', function ($scope) {
  	$scope.hideId = false;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.deleteItem = function(){
      var i;
    	for( i = $scope.todos.length-1; i >= 0; i-- ){
        if( $scope.todos[ i ].uid === $scope.uid ){
          $scope.todos.splice( i, 1 );
        }
      }
      $scope.saveList();
    }
  });
