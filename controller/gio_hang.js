function gioHangController($scope, $http) {
  $scope.arrNuocHoa = [];
  $scope.arrGioHang = [];

  const apiNuocHoaUrl = "http://localhost:3000/nuochoa";

  $http
    .get(apiNuocHoaUrl)
    .then(function (response) {
      $scope.arrNuocHoa = response.data;

      for (var i = 0; i < $scope.arrNuocHoa.length; i++) {
        if ($scope.arrNuocHoa[i].trangThai == 1) {
          $scope.arrGioHang.push($scope.arrNuocHoa[i]);
        }
      }
      console.log($scope.arrNuocHoa);
      console.log($scope.arrGioHang);

      $scope.begin = 0;
      $scope.pageCount = Math.ceil($scope.arrNuocHoa.length / 3);

      $scope.first = function () {
        $scope.begin = 0;
        console.log($scope.begin);
      };

      $scope.last = function () {
        $scope.begin = ($scope.pageCount - 1) * 3;
        console.log($scope.begin);
      };

      $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 3) {
          $scope.begin += 3;
          console.log($scope.begin);
        }
      };
      $scope.prev = function () {
        if ($scope.begin > 0) {
          $scope.begin -= 3;
          console.log($scope.begin);
        }
      };
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.deleteGioHang = function (id) {
    console.log("ID:" + id);
    for (var i = 0; i < $scope.arrNuocHoa.length; i++) {
      if ($scope.arrNuocHoa[i].id == id) {
        console.log("Trước: " + $scope.arrNuocHoa[i].trangThai);

        $scope.son = {
          id: $scope.arrNuocHoa[i].id,
          hinhAnh: $scope.arrNuocHoa[i].hinhAnh,
          ten: $scope.arrNuocHoa[i].ten,
          thuongHieu: $scope.arrNuocHoa[i].thuongHieu,
          soLuong: $scope.arrNuocHoa[i].soLuong,
          gia: $scope.arrNuocHoa[i].gia,
          thongTin: $scope.arrNuocHoa[i].thongTin,
          trangThai: 0,
        };

        $http
          .put(apiNuocHoaUrl + "/" + $scope.arrNuocHoa[i].id, $scope.son)
          .then(function () {
            $scope.arrNuocHoa.splice($scope.arrNuocHoa[i].id, 1, $scope.son);
            $scope.indexSelected = -1;
            console.log("Sau: " + $scope.arrNuocHoa[i].trangThai);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    alert("Sản phẩm đã được xóa khỏi giỏ hàng");
  };

  $scope.muaHang = function (id) {
    console.log("ID:" + id);
    for (var i = 0; i < $scope.arrNuocHoa.length; i++) {
      if ($scope.arrNuocHoa[i].id == id) {
        console.log("Trước: " + $scope.arrNuocHoa[i].trangThai);

        $scope.son = {
          id: $scope.arrNuocHoa[i].id,
          hinhAnh: $scope.arrNuocHoa[i].hinhAnh,
          ten: $scope.arrNuocHoa[i].ten,
          thuongHieu: $scope.arrNuocHoa[i].thuongHieu,
          soLuong: $scope.arrNuocHoa[i].soLuong,
          gia: $scope.arrNuocHoa[i].gia,
          thongTin: $scope.arrNuocHoa[i].thongTin,
          trangThai: 2,
        };

        $http
          .put(apiNuocHoaUrl + "/" + $scope.arrNuocHoa[i].id, $scope.son)
          .then(function () {
            $scope.arrNuocHoa.splice($scope.arrNuocHoa[i].id, 1, $scope.son);
            $scope.indexSelected = -1;
            console.log("Sau: " + $scope.arrNuocHoa[i].trangThai);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    alert("Sản phẩm đã vào mua hàng");
  };
}
