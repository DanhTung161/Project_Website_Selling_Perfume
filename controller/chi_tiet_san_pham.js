function chiTietSanPhamController($scope, $http, $routeParams) {
  const apiNuocHoaUrl = "http://localhost:3000/nuochoa";

  console.log($routeParams);

  $http
    .get(apiNuocHoaUrl + "/" + $routeParams.id)
    .then(function (response) {
      console.log(response);
      $scope.son = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.arrThuongHieu = [];

  const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

  $http
    .get(apiThuongHieuUrl)
    .then(function (response) {
      $scope.arrThuongHieu = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
