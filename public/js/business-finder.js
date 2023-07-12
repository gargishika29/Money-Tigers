var myModules = angular.module("myModule", []);

myModules.controller("myController", function ($scope, $http) {

    // fetch all sharks card
    $scope.jsonAry = [];
    $scope.doShowAll = function () {
        // var url = "/angular-find-all-pitchers"
        var url = "/angular-find-all-pitchers?category=" + $scope.selcategoryObj.category + "&revenue=" + $scope.selRev + "&gross=" + $scope.selGross;
        $http.get(url).then(pass, fail)
        alert(url);


        function pass(resp) {
            $scope.jsonAry = resp.data;
        }
        function fail(resp) {
            alert(resp.data);
        }
    }

    // fetch category
    $scope.arr = [];
    $scope.fetchcategory = function () {
        var url = "/fetch-category";
        $http.get(url).then(pass, fail);
        function pass(resp) {
            $scope.categoryAry = resp.data;
        }
        function fail(resp) {
            alert(resp.data);
        }
    }

    $scope.doShow=function(index)
    {
        $scope.obj=$scope.jsonAry[index];
    }
});

