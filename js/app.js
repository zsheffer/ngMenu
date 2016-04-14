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
                '<div class="navbar navbar-fixed-top">' +
                  '<div class="navbar-collapse collapse">' +
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
                '</div>'
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
    });