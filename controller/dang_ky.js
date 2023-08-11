function dangKyController($scope, $http) {
    $scope.arrUser = [];

    $scope.user = {
        role: "admin",
        username: "",
        password: "",
        phone: ""
    }

    const apiUserUrl = "http://localhost:3000/user"

    $http
    .get(apiUserUrl)
    .then(function (response) {
        $scope.arrUser = response.data;
    })
    .catch(function (error) {
        console.log(error);
    })

    $scope.onSubmit = function (event) {
        event.preventDefault();
        if($scope.user.password !== $scope.password2) {
            alert("Mật khẩu không khớp");
        } else {
    
            console.log($scope.arrUser)
            console.log($scope.user)
    
            let userExists = false;
    
            for(let i = 0; i < $scope.arrUser.length; i++) {
                if($scope.arrUser[i].username == $scope.user.username) {
                    userExists = true;
                    alert("Tài khoản đã tồn tại")
                    break;
                }
            }
    
            if(!userExists) {
                $http
                .post(apiUserUrl, $scope.user)
                .then(function () {
                    alert("Tạo tài khoản thành công");           
                })
                .catch(function (error) {
                    alert("Tạo tài khoản thất bại");
                    console.log(error);
            
                })
            }
        }

    }

}