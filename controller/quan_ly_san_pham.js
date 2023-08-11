function quanLySanPhamController($scope, $http, $document) {
  $scope.arrNuocHoa = [];
  $scope.arrThuongHieu = [];
  $scope.indexSelected = -1;
  $scope.nuochoa = {
    id: 0,
    hinhAnh: "",
    ten: "",
    thuongHieu: "",
    soLuong: 0,
    gia: 0,
    thongTin: "",
    trangThai: 0,
  };

  // $scope.nuochoa.thuongHieu = $scope.arrThuongHieu[1];

  const apinuochoaUrl = "http://localhost:3000/nuochoa";

  const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

  $http
    .get(apiThuongHieuUrl)
    .then(function (response) {
      $scope.arrThuongHieu = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  $http
    .get(apinuochoaUrl)
    .then(function (response) {
      $scope.arrNuocHoa = response.data;

      $scope.begin = 0;
      $scope.pageCount = Math.ceil($scope.arrNuocHoa.length / 5);

      $scope.first = function () {
        $scope.begin = 0;
        console.log($scope.begin);
      };

      $scope.last = function () {
        $scope.begin = ($scope.pageCount - 1) * 5;
        console.log($scope.begin);
      };

      $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 5) {
          $scope.begin += 5;
          console.log($scope.begin);
        }
      };
      $scope.prev = function () {
        if ($scope.begin > 0) {
          $scope.begin -= 5;
          console.log($scope.begin);
        }
      };
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.select = function (index) {
    $scope.indexSelected = index + $scope.begin;
    var id = $scope.arrNuocHoa[$scope.indexSelected].id;

    console.log("Bắt đầu: " + $scope.begin);
    console.log("Index Selected: " + $scope.indexSelected);
    console.log("Id: " + id);
    console.log($scope.arrNuocHoa[$scope.indexSelected]);

    $http
      .get(apinuochoaUrl + "/" + id)
      .then(function (response) {
        $scope.nuochoa = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.clear = function () {
    $scope.nuochoa = {};
    console.log($scope.nuochoa);
  };

  $scope.onSubmit = function (event) {
    event.preventDefault();

    if ($scope.indexSelected == -1) {
      $http
        .post(apinuochoaUrl, $scope.nuochoa)
        .then(function () {
          $scope.arrNuocHoa.push($scope.nuochoa);

          alert("Thêm thành công");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      $http
        .put(apinuochoaUrl + "/" + $scope.nuochoa.id, $scope.nuochoa)
        .then(function () {
          $scope.arrNuocHoa.splice($scope.nuochoa.id, 1, $scope.nuochoa);
          $scope.indexSelected = -1;
          alert("Sửa thành công");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  $scope.delete = function (index) {
    $scope.indexSelected = index + $scope.begin;
    var id = $scope.arrNuocHoa[$scope.indexSelected].id;

    console.log("Index xóa: " + $scope.indexSelected);
    console.log("Id xóa: " + id);
    $http
      .delete(apinuochoaUrl + "/" + id)
      .then(function () {
        $scope.arrNuocHoa.splice(id, 1);
        $scope.indexSelected = -1;
        alert("Xóa thành công");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
