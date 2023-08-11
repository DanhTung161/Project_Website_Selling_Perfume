function dangNhapController($scope, $http, UserService) {

    const apiUserUrl = "http://localhost:3000/user"

    $scope.arrUsers = [];

    $scope.user = {
        username: "",
        password: ""
    }


    $http
    .get(apiUserUrl)
    .then(function (response) {
        $scope.arrUsers = response.data;
        console.log($scope.arrUsers)

        $scope.onSubmit = function(event) {
            event.preventDefault();

            $scope.isLogin = false;
            $scope.index = 0;
    
            for(var i = 0; i < $scope.arrUsers.length; i++) {
                if($scope.user.username == $scope.arrUsers[i].username) {
                    if($scope.user.password == $scope.arrUsers[i].password) {
                        $scope.index = i;
                        $scope.isLogin = true;
                        break;
                    } else {
                        // alert("Tài khoản đúng, mật khẩu sai")
                        $scope.isLogin = false;
                    }
                }
            }
            console.log($scope.isLogin)

            if($scope.isLogin) {
                UserService.setUser($scope.arrUsers[i]);
           
                console.log(UserService.getUser());

                alert("Đăng nhập thành công")
            } else {
                alert("Đăng nhập thất bại")
            }
        }
     
    })
    .catch(function (error) {
        console.log(error);
    }) 

    
}