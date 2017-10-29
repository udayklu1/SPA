var app = angular.module("angularapp", ['ngRoute']);

// =====================================
// configure the route navigation
// =====================================
app.config(function ($routeProvider) {
    $routeProvider
    .when('/Home',
    {
        templateUrl: 'Home.html',
        controller: 'HomeController'
    })
    .when('/Details',
    {
        templateUrl: 'Details/List.html',
        controller: "PDController"
    })
    .when('/Login',
    {
        templateUrl: 'Account/login.html',
        controller: "LoginController"
    })
     .when('/Register',
    {
        templateUrl: 'Account/Register.html',
        controller: "RegisterController"
    })
    .when('/About',
    {
        templateUrl: 'About.html',
        controller: 'AboutController'
    })
    .when('/Contact',
    {
        templateUrl: 'Contact.html',
        controller: 'ContactController'
    })
    .otherwise({
        templateUrl: 'Welcome.html',
        controller: 'WelcomeController'
    });
});


app.controller("angularController", function ($scope, $rootScope) {

});

app.controller("HomeController", function ($scope) {
    $scope.Title = "List of Restaraunts";
    $rootScope.loading = false;
});

// About controller
app.controller("AboutController", function ($scope) {
    $scope.Title = "About us";
});
app.controller("DeleteController", function ($scope, RegistrationService, $routeParams) {
    var id = $routeParams.id;
    $rootScope.loading = true;
    var PromiseGet = RegistrationService.Delete(id);
    PromiseGet.then(
        function (response) {
            if (response.status == 200 && response.data.Status == "Success") {
                $rootScope.ValidationMessage = response.data.Reason;
                $rootScope.loading = false;
                $('#myModal').modal('show');
            } else {
                $rootScope.ValidationMessage = response.data.Reason;
                $rootScope.loading = false;
                $('#myModal').modal('show');
            }

          
        },
        function (response) {
            $rootScope.ValidationMessage = response.data.Reason;
            $rootScope.loading = false;
            $('#myModal').modal('show');
        });
    $rootScope.loading = false;

});
// Contact controller
app.controller("ContactController", function ($scope) {
    $scope.Title = "Contact us";
});

// Contact controller
app.controller("IndexController", function ($scope) {
    $scope.Title = "Welcome To FoodDay!!!";
});

app.controller("WelcomeController", function ($scope) {
    $scope.Title = "Welcome To FoodDay!!!";
});

app.controller("LoginController", function ($scope) {
    $scope.Title = "Signin!!";
});


app.controller("PDController", function ($scope,$rootScope, RegistrationService) {
    $rootScope.Title = "Person List";
    $rootScope.loading = true;

    var PromiseGet = RegistrationService.get();
    PromiseGet.then(
        function (response) {
            $scope.UserDetails = response.data.Data;
        },
        function (response) {
            $rootScope.ValidationMessage = response.data.Reason;
            $rootScope.loading = false;
            $('#myModal').modal('show');
        });
    $scope.Delete = function (Id) {
        debugger;
        var Id = this.user.UserID;
        $rootScope.loading = true;
        try{
            var PromiseDelete = RegistrationService.Delete(Id);
            PromiseDelete.then(
                function (response) {
                    if(response.data.Status == "Success" && response.status == 200)
                    {
                        $rootScope.ValidationMessage = response.data.Reason;
                        $rootScope.loading = false;
                        $('#myModal').modal('show');
                    }
                },
                function (response) {
                    $rootScope.ValidationMessage = response.data.Reason;
                    $rootScope.loading = false;
                    $('#myModal').modal('show');
                });
        }
        catch(ex)
        {
            $rootScope.ValidationMessage = ex.message;
            $rootScope.loading = false;
            $('#myModal').modal('show');
        }
    }
    $scope.sort = function(sortkey)
    {
        $scope.sortKey = sortkey;
        $scope.reverse = !$scope.reverse;
    }
});

app.controller("RegisterController", function ($scope,RegistrationService, $rootScope) {
    $scope.Title = "Registration Form";
    $rootScope.loading = true;
    $scope.IsFormValid = false;
    $scope.$watch('myForm.$valid', function (newVal) {
        $scope.IsFormValid = newVal;
    });
    $rootScope.loading = false;
    $scope.Register = function () {
        $rootScope.loading = true;
        var Param = {};
        Param["UserName"] = $scope.UserName;
        Param["UserPassword"] = $scope.UserPassword;
        Param["FirstName"] = $scope.FirstName;
        Param["LastName"] = $scope.LastName;
        if ($scope.IsFormValid) {
            var PromisePost = RegistrationService.post(Param);

            PromisePost.then(
                function (response) {
                    if (response.status == 200 && response.data.Status == "Success") {
                        $rootScope.ValidationMessage = response.Reason;
                        $rootScope.loading = false;
                        $('#myModal').modal('show');
                    }
                    $('#UserForm').trigger("reset");
                },
                function (response) {
                    $rootScope.ValidationMessage = response.Reason;
                    $rootScope.loading = false;
                    $('#myModal').modal('show');
                });
        }
        else {
            $rootScope.ValidationMessage = "Enter all the Fields";
            $rootScope.loading = false;
            $('#myModal').modal('show');
        }
    }
});
