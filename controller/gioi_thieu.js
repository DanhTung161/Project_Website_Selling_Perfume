function gioiThieuController($scope, UserService) {
    var userLogin = UserService.getUser();
    console.log(userLogin);
}