function doiMatKhauController($scope, $http, UserService) {
    $scope.onSubmit = function(event) {
        event.preventDefault();

        if($scope.newPassword !== $scope.newPassword2) {
            alert("Mật khẩu không khớp");
        } else {
            const apiUserUrl = "http://localhost:3000/user"; 
    
            var userLogin = UserService.getUser();
            console.log(userLogin);
            console.log($scope.user.password)
    
            $scope.userNew = {
                id: userLogin.id,
                phone: userLogin.phone,
                username: userLogin.username,
                role: userLogin.role,
                password: $scope.newPassword
            }
    
            console.log($scope.userNew)
    
            if(userLogin.password !== $scope.user.password) {
                alert("Đổi mật khẩu thất bại");
            } else {
                $http
                .put(apiUserUrl + "/" + userLogin.id , $scope.userNew)
                .then(function() {
                    UserService.setUser($scope.userNew)
                    alert("Đổi mật khẩu thành công");
                    $scope.arrStudents.splice(userLogin.id, 1, $scope.userNew)
                })
                .catch(function(error) {
                    console.log(error);
                })
            }

        }
    }
}