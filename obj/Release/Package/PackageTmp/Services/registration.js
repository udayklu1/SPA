app.service("RegistrationService", function ($http) {
    this.get = function () {
        return $http.get("http://192.168.1.16/WebAPI/api/Registration");
    }
    this.getId = function (id) {
        return $http.get("http://192.168.1.16/WebAPI/api/Registration",id);
    }
    this.Delete = function (id) {
        var promise = $http({
            method: 'DELETE',
            url: 'http://192.168.1.16/WebAPI/api/Registration/' + id
        })
       .then(function (response) {
           return response.data;
       },
       function (response) {
           return response.data;
       });

        return promise;
    };
    
    this.post = function (param) {
        return $http.post("http://192.168.1.16/WebAPI/api/Registration", param);  
    }
});