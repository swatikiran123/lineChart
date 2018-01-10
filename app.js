angular.module("MyApp", [])
.controller("MyCtrl", ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.title = 'Upload CSV';
  
  $scope.getGraph= function(data)
  {
    console.log(data);

    var chart= Highcharts.chart('chartContainer', {
      title: {
        text:""
      },
      credits: {
    enabled: false
  },
      xAxis:{
        type: 'category'
      },
      series: [{
        data: []
      }]
    });
    var series1 = data[0];
    chart.series[0].setData(series1, true);
    for (var i = 1; i < data.length; i++) {
      var series= series+i
      series = data[i];

      chart.addSeries({data: series}, true);
    };

  }

}])

.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
            var contents = e.target.result;
            scope.$apply(function () {
              var data=[]
              var a=[];
              scope.testing = contents;
              var allLinesArray = scope.testing.split('\n');
              var count=1;
              var lines= allLinesArray.length;
              for (var i = 0; i < allLinesArray.length; i++) {
                var row = allLinesArray[i].split(',')
                var a=[];

                for (var j = 1; j < row.length; j++) {

                  var xy = row[j].split('|')
                  xy[1]=Number(xy[1]);
                  a.push({name:xy[0],y:xy[1]})
                  count++;

                }

                if (row.length === j) {
                  data.push(a);
                };

              };
              scope.fileReader = data;


            });
          };

          r.readAsText(files[0]);
        }
      });
}
};
})