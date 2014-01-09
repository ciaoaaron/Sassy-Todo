'use strict';

angular.module('checkoffApp')
  .controller('MainCtrl', function ($scope, $filter) {
   $scope.todos = (function(){
	if( localStorage && localStorage['coTodos'] ){
		return $filter('orderBy')( JSON.parse(localStorage['coTodos']), '-timeStmp');
	}
	return [];
   }());
   $scope.newItemName = 'new item';
	//functions
	function makeID( digits ){
		var stringLetters = 'abcdefghijklmnopqrstuvwxyz',
			stringNums = '1234567890',
			letters = stringLetters.split(''),
			numbers = stringNums.split(''),
			characters = letters.concat(numbers),
			result = '',
			i;
			for( i = digits; i > 0; i -- ){
				result += characters[ Math.floor(Math.random()*characters.length) ];
			}
			return result;
	}
	$scope.saveList = function(){
		if( localStorage ){
			localStorage['coTodos'] = JSON.stringify($scope.todos);
	    }
	}
	$scope.addItem = function( itemName ){
		var d, l = $scope.todos.length, todos;
		$scope.todos.unshift({
			uid: makeID( 8 ),
			name: itemName,
			complete: false,
			timeStmp: new Date()
		});
		$scope.saveList();
	}

	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

	//success helper
	function onFsSuccess( fs ){
		function readError( e ){
			console.dir( e );
		}
		function makeError( e ){
			console.dir( e );
		} 
		$scope.readFile = function( s ){
			fs.root.getFile( s, {}, function(fileEntry){
				fileEntry.file(function(file){
					var reader = new FileReader();

					reader.onloadend = function( e ){
						var txtArea = document.createElement('textarea');
						txtArea.value = this.result;
						document.body.appendChild(txtArea);
					};

					reader.readAsText(file);
				}, readError);
			}, readError);
		}
		$scope.makeFile = function( s ){
			fs.root.getFile( s, {create: true}, function(fileEntry){
				fileEntry.createWriter(function(fileWriter){
					fileWriter.onwriteend = function( e ){
						console.log('complete writing');
					}
					fileWriter.onwriteerror = function(e){
						console.lof('cannot write to file');
					}
					var blob = new Blob([ JSON.stringify($scope.todos) ], {type: 'text/pain'});

					fileWriter.write(blob);
				}, makeError)

			}, makeError);
		}
		$scope.removeFile = function( s ){
			fs.root.getFile( s, {create:false}, function(fileEntry){
				fileEntry.remove(function(){
					console.log('removed');
				}, readError);
			});
		}
	}
	function onFsFail( e ){
		console.dir( e );
	}
	function onFileFail( e ){
		console.dir( e )
	}
	window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, onFsSuccess, onFsFail);


	
	

	
  });
