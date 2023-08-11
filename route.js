var myApp = angular.module('myApp', ["ngRoute"]);

myApp.service('UserService', function() {
    var user = {
        id: 0,
        username: "",
        password: "",
        phone: ""
    };

    // Lấy dữ liệu người dùng từ localStorage (nếu có)
    var storedUser = localStorage.getItem('user');
    if (storedUser) {
        user = JSON.parse(storedUser);
    }

    // Setter để thiết lập thông tin người dùng và lưu vào localStorage
    this.setUser = function(userData) {
        user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Getter để lấy thông tin người dùng
    this.getUser = function() {
        return user;
    };
  
    // // Setter để thiết lập thông tin người dùng
    // this.setUser = function(userData) {
    //     user = userData;
    // };
  
    // // Getter để lấy thông tin người dùng
    // this.getUser = function() {
    //     return user;
    // };
});

// myApp.directive('logoutDirective', ['UserService', function(UserService) {
//     return {
//       restrict: 'A',
//       link: function(scope, element) {
//         element.on('click', function() {
//           UserService.setUser({});
//           localStorage.removeItem('user');
//           // Thực hiện các xử lý đăng xuất khác nếu cần
//         });
//       }
//     };
//   }]);

myApp.controller('trangChuController', trangChuController);
myApp.controller('gioiThieuController', gioiThieuController);
myApp.controller('dangKyController', dangKyController);
myApp.controller('dangNhapController', dangNhapController);
myApp.controller('doiMatKhauController', doiMatKhauController);
myApp.controller('sanPhamController', sanPhamController);
myApp.controller('chiTietSanPhamController', chiTietSanPhamController);
myApp.controller('gioHangController', gioHangController);
myApp.controller('sanPhamDaMuaController', sanPhamDaMuaController);
myApp.controller('muaHangController', muaHangController);
myApp.controller('quanLySanPhamController', quanLySanPhamController);
myApp.controller('quanLyDanhMucController', quanLyDanhMucController);

myApp.controller('headerController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    // $scope.NguoiDung = UserService.getUser().username;

    $scope.logout = function() {
        if (UserService.getUser().id == 0) {
            alert("Bạn chưa đăng nhập");
        } else {
            UserService.setUser( {
                id: 0,
                username: "",
                password: "",
                phone: ""
            }); // Đặt thông tin người dùng thành rỗng
            localStorage.removeItem('user'); // Xóa dữ liệu người dùng từ localStorage
            alert("Đăng xuất thành công");
            $location.path('/trang_chu');
        }
    };

    $scope.dangKy = function() {
        if (UserService.getUser().id !== 0) {
            alert("Vui lòng đăng xuất trước khi đăng ký");
        } else {
            // Thực hiện điều hướng đến đường dẫn href
            $location.path('/dang_ky');
        }
    }

    $scope.login = function() {
        if (UserService.getUser().id !== 0) {
            alert("Bạn đã đăng nhập rồi");
        } else {
            // Thực hiện điều hướng đến đường dẫn href
            $location.path('/dang_nhap');
        }
    }

    $scope.doiMatKhau = function() {
        //Object.keys(UserService.getUser()).length === 0 || UserService.getUser().constructor === Object
        // if(UserService.getUser() == null) {
        //     alert("Vui lòng đăng nhập trước khi đổi mật khẩu")
        // }
        if (UserService.getUser().id == 0) {
            alert("Vui lòng đăng nhập trước khi đổi mật khẩu");
        } else {
            // Thực hiện điều hướng đến đường dẫn href
            $location.path('/doi_mat_khau');
        }
    }

    $scope.quanLy = function() {
        if (UserService.getUser().id !== 0) {
            console.log(UserService.getUser().role)
            if(UserService.getUser().role == "admin") {
                $location.path('/quan_ly_san_pham');
            } else {
                alert("Bạn không có quyền quản lý")
            }
        } else {
            // Thực hiện điều hướng đến đường dẫn href
            alert("Bạn không có quyền quản lý")
        }
    }
  }]);

myApp.config(function($routeProvider, $locationProvider){

    $locationProvider.hashPrefix("");

    $routeProvider
    .when('/trang_chu', {
        templateUrl: './pages/trang_chu.html',
        controller: 'trangChuController'
    })
    .when('/gioi_thieu', {
        templateUrl: './pages/gioi_thieu.html',
        controller: 'gioiThieuController'
    })
    .when('/dang_ky', {
        templateUrl: './pages/dang_ky.html',
        controller: 'dangKyController'
    })
    .when('/dang_nhap', {
        templateUrl: './pages/dang_nhap.html',
        controller: 'dangNhapController'
    })
    .when('/doi_mat_khau', {
        templateUrl: './pages/doi_mat_khau.html',
        controller: 'doiMatKhauController'
    })
    .when('/san_pham', {
        templateUrl: './pages/san_pham.html',
        controller: 'sanPhamController'
    })  
    .when('/chi_tiet_san_pham/:id', {
        templateUrl: './pages/chi_tiet_san_pham.html',
        controller: 'chiTietSanPhamController'
    }) 
    .when('/gio_hang', {
        templateUrl: './pages/gio_hang.html',
        controller: 'gioHangController'
    }) 
    .when('/san_pham_da_mua', {
        templateUrl: './pages/san_pham_da_mua.html',
        controller: 'sanPhamDaMuaController'
    }) 
    .when('/mua_hang', {
        templateUrl: './pages/mua_hang.html',
        controller: 'muaHangController'
    }) 
    .when('/quan_ly_san_pham', {
        templateUrl: './pages/quan_ly_san_pham.html',
        controller: 'quanLySanPhamController'
    }) 
    .when('/quan_ly_danh_muc', {
        templateUrl: './pages/quan_ly_danh_muc.html',
        controller: 'quanLyDanhMucController'
    }) 
    .when('/lien_he', {
        templateUrl: './pages/lien_he.html',

    }) 
    .otherwise({
        redirectTo: '/trang_chu'
    });
});
