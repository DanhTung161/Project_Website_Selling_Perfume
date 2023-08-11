function quanLyDanhMucController($scope, $http) {
    $scope.arrThuongHieu = [];

    const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

    $scope.indexSelected = -1;

    $scope.thuongHieu = {
        id: 0,
        thuongHieu: ""
    }

    $http
    .get(apiThuongHieuUrl)
    .then(function(response) {
        $scope.arrThuongHieu = response.data;
    })
    .catch(function(error) {
        console.log(error);
    })

    $scope.select = function(index) {
        $scope.indexSelected = index;
        var id = $scope.arrThuongHieu[index].id;

        $http
        .get(apiThuongHieuUrl + "/" + id)
        .then(function(response) {
            $scope.thuongHieu = response.data;
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    $scope.clear = function() {
        $scope.thuongHieu = {}
        console.log($scope.thuongHieu)
    }

    $scope.onSubmit = function(event) {
        event.preventDefault();

        if($scope.indexSelected == -1) {
            $http
            .post(apiThuongHieuUrl, $scope.thuongHieu)
            .then(function() {
                $scope.arrThuongHieu.push($scope.thuongHieu)
                alert("Thêm thành công")
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
            $http
            .put(apiThuongHieuUrl + "/" + $scope.thuongHieu.id, $scope.thuongHieu)
            .then(function() {
                $scope.arrThuongHieu.splice($scope.thuongHieu.id, 1, $scope.thuongHieu)
                $scope.indexSelected = -1;
                alert("Sửa thành công")
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }

    $scope.delete = function(index) {
        $scope.indexSelected = index;
        var id = $scope.arrThuongHieu[index].id;

        $http
        .delete(apiThuongHieuUrl + "/" + id)
        .then(function() {
            $scope.arrThuongHieu.splice(id, 1)
            $scope.indexSelected = -1;
            alert("Xóa thành công")
        })
        .catch(function(error) {
            console.log(error);
        })
    }
}