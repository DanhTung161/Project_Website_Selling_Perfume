function sanPhamController($scope, $http) {
  $scope.arrNuocHoa = [];

  const apiNuocHoaUrl = "http://localhost:3000/nuochoa";

  $http
    .get(apiNuocHoaUrl)
    .then(function (response) {
      $scope.arrNuocHoa = response.data;

      $scope.begin = 0;
      $scope.pageCount = Math.ceil($scope.arrNuocHoa.length / 9);

      $scope.first = function () {
        $scope.begin = 0;
        console.log($scope.begin);
      };

      $scope.last = function () {
        $scope.begin = ($scope.pageCount - 1) * 9;
        console.log($scope.begin);
      };

      $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 9) {
          $scope.begin += 9;
          console.log($scope.begin);
        }
      };
      $scope.prev = function () {
        if ($scope.begin > 0) {
          $scope.begin -= 9;
          console.log($scope.begin);
        }
      };
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.showAll = function () {
    $http
      .get(apiNuocHoaUrl)
      .then(function (response) {
        $scope.arrNuocHoa = response.data;
        $scope.products = [];
        for (var i = 0; i < $scope.arrNuocHoa.length; i++) {
          $scope.products.push($scope.arrNuocHoa[i]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.arrThuongHieu = [];

  const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

  $http
    .get(apiThuongHieuUrl)
    .then(function (response) {
      $scope.arrThuongHieu = response.data;

      console.log($scope.arrNuocHoa);

      $scope.products = $scope.arrNuocHoa;
      $scope.index = -1;

      $scope.showSon = function (index) {
        $scope.index = index;
        $scope.products = [];

        $scope.first();

        console.log(index);
        for (var i = 0; i < $scope.arrNuocHoa.length; i++) {
          if (
            $scope.arrNuocHoa[i].thuongHieu ==
            $scope.arrThuongHieu[index].thuongHieu
          ) {
            $scope.products.push($scope.arrNuocHoa[i]);
          }
        }
        $scope.index = -1;
      };
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.gioHang = function (id) {
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
          trangThai: 1,
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
    alert("Sản phẩm đã vào giỏ hàng");
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
