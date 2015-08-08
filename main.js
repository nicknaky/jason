var app = angular.module("myApp", []);

app.factory("githubService", ["$http", function($http) {
    
    var doRequest = function(username, path) {
      return $http({
        method: "JSONP",
        url: "https://api.github.com/users/" + username + "/" + path + "?callback=JSON_CALLBACK"
      });
    }
    return {
      events: function(username) { return doRequest(username, "events"); },
    };
}]);



app.controller('ServiceController', ['$scope', "$timeout", 'githubService',
    function($scope, $timeout, githubService) {
      $scope.$watch('username', function(newUsername) {
        githubService.events(newUsername)

        //so I'd like to know the difference between .then() and .success() and why the results they return aren't necessarily the same

        //if we use .then() then we have to add the extra "data"
          .then(function(response) {
            $scope.events = response.data.data;
        //but if we use .success() then we only use one "data"
        //.success(function(response) {
        //  $scope.events = response.data;

            console.log(response);
          });
      });

}]);