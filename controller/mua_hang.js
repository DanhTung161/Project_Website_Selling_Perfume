function muaHangController($scope, $http) {
  $scope.arrNuocHoa = [];
  $scope.arrMuaHang = [];

  const apiNuocHoaUrl = "http://localhost:3000/nuochoa";

  $http
    .get(apiNuocHoaUrl)
    .then(function (response) {
      $scope.arrNuocHoa = response.data;

      for (var i = 0; i < $scope.arrNuocHoa.length; i++) {
        if ($scope.arrNuocHoa[i].trangThai == 2) {
          $scope.arrMuaHang.push($scope.arrNuocHoa[i]);
        }
      }

      $scope.tongGiaTri = 0;

      for (var i = 0; i < $scope.arrMuaHang.length; i++) {
        $scope.tongGiaTri +=
          $scope.arrMuaHang[i].soLuong * $scope.arrMuaHang[i].gia;
      }

      console.log($scope.tongGiaTri);

      console.log($scope.arrNuocHoa);
      console.log($scope.arrMuaHang);

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

  $scope.deleteMuaHang = function (id) {
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
    alert("Sản phẩm đã được xóa khỏi mua hàng");
  };

  var citis = document.getElementById("city");
  var districts = document.getElementById("district");
  var wards = document.getElementById("ward");
  var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "application/json",
  };
  var promise = axios(Parameter);
  promise.then(function (result) {
    renderCity(result.data);
  });

  function renderCity(data) {
    for (const x of data) {
      citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }
    citis.onchange = function () {
      district.length = 1;
      ward.length = 1;
      if (this.value != "") {
        const result = data.filter((n) => n.Id === this.value);

        for (const k of result[0].Districts) {
          district.options[district.options.length] = new Option(k.Name, k.Id);
        }
      }
    };
    district.onchange = function () {
      ward.length = 1;
      const dataCity = data.filter((n) => n.Id === citis.value);
      if (this.value != "") {
        const dataWards = dataCity[0].Districts.filter(
          (n) => n.Id === this.value
        )[0].Wards;

        for (const w of dataWards) {
          wards.options[wards.options.length] = new Option(w.Name, w.Id);
        }
      }
    };
  }
}
