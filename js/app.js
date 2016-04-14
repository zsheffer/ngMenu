/**
 * @ngdoc object
 * @name menuApp
 */
angular.module('menuApp', [])
    /**
     * @ngdoc directive
     * @name myMenu
     * takes the json file attribute, displays the navbar
     */
    .directive('myMenu', function ($http, $compile) {
        return {
            //restrict to elements
            restrict: 'E',
            //use the file given in the parameter
            scope: {file:'@'},
            //reads the file in param and loads the menuItems scope
            controller: function ($scope, $http) {
                $http({url: $scope.file}).then(function(data) {
                    $scope.menuItems = data.data;
                }).catch(function(error) {
                    console.log(error);
                });
            },
            //template for navbar
            template:
                '<nav class="navbar navbar-default navbar-fixed-top">' +
                 '<div class="container-fluid">' +
                   '<div class="navbar-header">' +
                     '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"'+
                     ' data-target="#navbar-collapse-1" aria-expanded="false">'+
                      '<span class="icon-bar"></span>'+
                      '<span class="icon-bar"></span>'+
                      '<span class="icon-bar"></span>'+
                     '</button>'+
                     '<a class="navbar-brand" href="#">Brand</a>'+
                    '</div>'+
                    '<div class="navbar-collapse collapse" id="navbar-collapse-1">' +
                    '<ul class="nav navbar-nav">' +
                      '<li ng-repeat="menu in menuItems">' +
                        '<a href="#" data-toggle="dropdown">' +
                          '{{menu.name}}' +
                        '</a>' +
                        '<my-dropdown ng-if="menu.items.length>0" data="menu.items">'+
                        '</my-dropdown>' +
                      '</li>' +
                    '</ul>' +
                    '</div>'+
                   '</div>'+
                  '</nav>'
        };
    })
    /**
     * @ngdoc directive
     * @name myDropdown
     * displays the dropdown
     */
    .directive('myDropdown', function () {
        return {
            //restrict to elements
            restrict: 'E',
            //take data parameter
            scope: {
                data: '='
            },
            //template for dropdown
            template:
                '<ul class="dropdown-menu">' +
                  '<li ng-repeat="item in data" '+
                    'ng-class="{\'dropdown-submenu\': item.items && item.items.length>0}">' +
                      '<a href="#" data-toggle="dropdown">{{item.name}}</a>' +
                      '<my-dropdown ng-if="item.items.length>0" data="item.items">'+
                      '</my-dropdown>' +
                  '</li>' +
                '</ul>',
            replace: true

        };
    })
    /**
     * @ngdoc directive
     * @name myJsonDropdown
     * displays the dropdown menu picking up data from a json file in 'file' attribute
     */
    .directive('myJsonDropdown', function ($compile) {
        return {
            //restrict to attributes
            restrict: 'A',
            //take file and data parameters
            scope: {
              file: '@',
              data: '@',
              target: '@'
            },
            //reads the file in param and loads the menuItems scope
            controller: function ($scope, $http) {
              if ($scope.file)
              {
                $http({url: $scope.file}).then(function(data) {
                    $scope.data = data.data;
                }).catch(function(error) {
                    console.log(error);
                });
              }
            },
            //Adds the compiled dropdown menu to the element's parent
            link: function(scope, element, attrs, controller, transcludeFn) {
              scope.$watch('data', function(newval, oldval) {
                var el = angular.element(
                  '<ul class="dropdown-menu" id="{{target}}">' +
                  '<li ng-repeat="item in data" '+
                    'ng-class="{\'dropdown-submenu\': item.items && item.items.length>0}">' +
                      '<a href="#" data-toggle="dropdown">{{item.name}}</a>' +
                      '<my-dropdown ng-if="item.items.length>0" data="item.items">'+
                      '</my-dropdown>' +
                  '</li>' +
                '</ul>');
                $compile(el)(scope);
                element.parent().append(el);
              });
            },
            replace: true
        };
    });