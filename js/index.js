/**
  * instructioQn: this file for filemenage, be based on angular
  * author: helinwei
  * time: 2017-02-20
*/
(function(){
  var app = angular.module('myApp', ['ngAnimate']);
  app.run(function($templateCache){
    var _data = [{
      name: '根目录',//目录名称
      haschild: true,//是否有子目录
      hascur: false,//当前文件是否在当前目录下
      data: [{
        name: '目录一',
        haschild: true,
        hascur: false,
        data: [{
          name: '目录一一',
          haschild: false,
          hascur: true
        }]
      },{
        name: '目录二',
        hashchild: false,
        hascur: false
      }]
    }];
    var str = '<div class="confirmlayer" ng-class="layerAni" ng-switch-when="delete">'+
    '<div class="layer-title" ng-title="标题">'+
      '<span>删除文件</span>'+
      '<i class="icon-close pull-right" ng-click="closeLayer($event)"></i>'+
    '</div>'+
    '<div class="layer-content">'+
      '<div>确定要删除这个文件吗？<span class="help-block">已删除的文件可以在回收站找到</span></div>'+
    '</div>'+
    '<div class="layer-footer">'+
      '<a class="btn btn-confirm" ng-click="confirmLayer($event)">确定</a>'+
      '<a class="btn btn-cancel" ng-click="cancelLayer($event)">取消</a>'+
    '</div></div>';
    str += '<div class="movelayer"  ng-class="layerAni" ng-switch-when="move">'+
    '<div class="layer-title" ng-title="标题">'+
      '<span>选择存储位置</span>'+
      '<i class="icon-close pull-right" ng-click="closeLayer($event)"></i>'+
    '</div>'+
    '<div class="layer-content">'+
      '<div class="fileinfo">'+
        '<i class="icon icon-doc-m"></i>'+
        '<p class="filename">文件名文件名</p>'+
        '<p class="filesize">1.3k</p>'+
      '</div>'+
      '<div class="trans-box">'+
        '<div class="trans-nav">移动到：根目录\\目录一</div>'+
        '<div class="trans-tree">';

        function recurrence(data, _level) {
          var _str = '<ul>';
          _level ++;
          for(var i=0;i<data.length;i++){
            _str += '<li class="ui-level-'+ _level +'"><a ng-click="treenodeClick($event, $index)" data-iscur="'+ data[i].hascur +'"><span class="tree-text"><i class="icon-file"></i>'+
            data[i].name + '</span></a>'+ (data[i].haschild ? recurrence(data[i].data, _level) : '') +'</li>';
            _level = 2;
          }
          _str += '</ul>';
          return _str;
        }

        str += recurrence(_data, 0) +'</div>'+
      '</div>'+
    '</div>'+
    '<div class="layer-footer">'+
      '<span class="footer-tips" ng-show="showtips">文件已经在该文件夹下了</span>'+
      '<a class="btn btn-confirm" ng-click="confirmLayer1($event)">确定</a>'+
      '<a class="btn btn-cancel" ng-click="cancelLayer($event)">取消</a>'+
    '</div></div>';
    $templateCache.put('confirm.html','<div ng-switch="judgeLayer">'+ str +'</div>');
  });
  //当内容改变时
  app.directive('changeContent', function($window){
    return {
      restrict : 'A',
      scope : false,
      link : function($scope, element, attrs){
        var w = angular.element($window);
        w.on('hashchange', function(a){
          var hash = location.hash;
          switch (hash) {
            case '#recent':

              break;
            case '#disk':

              break;
            case '#doc':

              break;
            case '#album':

              break;
            case '#video':

              break;
            case '#note':

              break;
            case '#audio':

              break;
            case '#photo-time':

              break;
            case '#photo-location':

              break;
            case '#photo-tags':

              break;
            case '#recycle':

              break;

            default:

          }
        });
      }
    }
  });

  //左菜单自适应高度
  app.directive('autoHeight', function($window){
    //自适应高度
    function resizeHeight ($scope, element) {
      var windowHeight = $window.innerHeight;//获取窗口高度
      var headerHeight = 60,
          w = angular.element($window);
      element.css('height', (windowHeight - headerHeight) / 100 + 'rem');
      w.on('resize', function (a) {
        resizeHeight($scope, element);
      });
    }
    return function ($scope, element) {
      //自适应高度
      resizeHeight($scope, element);
    };
  });

  //固定内容区域高度
  app.directive('autoHeightBody', function($window){
    //自适应高度
    function resizeHeight ($scope, element) {
      var windowHeight = $window.innerHeight;//获取窗口高度
      var headerHeight = 110,
          w = angular.element($window);
      element.css('height', (windowHeight - headerHeight) / 100 + 'rem');
      w.on('resize', function (a) {
        resizeHeight($scope, element);
      });
    }
    return function ($scope, element) {
      //自适应高度
      resizeHeight($scope, element);
    };
  });

  //弹出层
  app.directive('layerContent', function($log){
    return {
      restrict: 'EA',//使用元素（E）、属性(A)、注释(M)还是类(C)
      templateUrl: 'confirm.html',//模板
      replace: false,//是否替换当前自定义元素
      scope: false,//是否继承父作用域
      link: function deleteLink(scope, elem, attrs) {//链接函数，负责注册DOM事件和更新DOM
        scope.closeLayer = function () {
          scope.layershow = false;
          scope.layerAni = '';
        }
        scope.confirmLayer = function($event){
          if(scope.delteType == 'trash'){
            for(var i=0;i<scope.curIndexArr.length;i++){
              scope.info.operate.splice((scope.curIndexArr[i]-i), 1);
            }
          }else{
            scope.info.operate.splice(scope.curIndex, 1);
          }
          scope.layershow = false;
          scope.showList = false;
          scope.logobg = '#F5F6F9';
        }
        scope.confirmLayer1 = function($event){

          scope.layershow = false;
        }
        scope.cancelLayer = function(){
          scope.layershow = false;
          scope.layerAni = '';
        }
        scope.treenodeClick = function($event, $index){
          var ele = angular.element($event.currentTarget);
          var cur = document.querySelectorAll('.cur');
          for(var i=0;i<cur.length;i++){
            angular.element(cur[i]).removeClass('cur');
          }
          ele.addClass('cur');
          if(ele.hasClass('active')){
            ele.removeClass('active');
          }else{
            ele.addClass('active').addClass('cur');
          }
          if(ele.attr('data-iscur') == 'true'){
            scope.showtips = true;
          }else{
            scope.showtips = false;
          }
        }
      }
    }
  });

  app.controller('bodyCtrl' , function($scope, $log){
    $scope.info = {};
    //数据
    $scope.info.operate = [
      {'img': '../img/img1.jpg', 'unid': 'unid001', 'name': 'user-image1', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
      {'img': '', 'unid': 'unid002', 'name': 'word1', 'size': '30.1k', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
      {'img': '', 'unid': 'unid003', 'name': 'excel1', 'size': '1M', 'time': '2017-05-10 21:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
      {'img': '', 'unid': 'unid004', 'name': 'ppt1', 'size': '442k', 'time': '2017-02-14 12:32', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
      {'img': '../img/img2.jpg', 'unid': 'unid001', 'name': 'user-image2', 'size': '54.9k', 'time': '2017-04-21 14:40', 'href': 'http//:www.baidu.com', 'type': 'image'},
      {'img': '', 'unid': 'unid002', 'name': 'word2', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
      {'img': '', 'unid': 'unid003', 'name': 'excel2', 'size': '3.1k', 'time': '2016-11-30 01:37', 'href': 'http//:www.baidu.com', 'type': 'excel'},
      {'img': '', 'unid': 'unid004', 'name': 'ppt2', 'size': '3.1k', 'time': '2017-04-23 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
      {'img': '../img/img3.jpg', 'unid': 'unid001', 'name': 'user-image3', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
      {'img': '', 'unid': 'unid002', 'name': 'word3', 'size': '3.1k', 'time': '2017-07-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
      {'img': '', 'unid': 'unid003', 'name': 'excel3', 'size': '3.1k', 'time': '2017-05-14 22:40', 'href': 'http//:www.baidu.com', 'type': 'excel'},
      {'img': '', 'unid': 'unid004', 'name': 'ppt3', 'size': '3.1k', 'time': '2017-01-23 11:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
      {'img': '../img/img4.jpg', 'unid': 'unid001', 'name': 'user-image4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
      {'img': '', 'unid': 'unid002', 'name': 'word4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
      {'img': '', 'unid': 'unid003', 'name': 'excel4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
      {'img': '', 'unid': 'unid004', 'name': 'ppt4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'}
    ];
    //名称是否可编辑数组
    $scope.conedit = [];

    for(var i=0;i<$scope.info.operate.length;i++){
      $scope.conedit.push(false);
    }
    //重命名点击事件
    $scope.renameClick = function($event, $index){
      var _conedit = $scope.conedit,
      _index = _conedit.indexOf(true);
      _conedit.splice(_index, 1, false);
      $scope.conedit[$index] = true;
    }
    //重命名鼠标离开事件
    $scope.remoublur = function($event, $index){
      var _text = $event.currentTarget.innerText;
      $scope.conedit[$index] = false;
      $log.log(_text);
    }
    //删除文件事件
    $scope.deleteFn = function($event, $index){
      $scope.delteType = angular.element($event.currentTarget).attr('data-action');
      $scope.curIndex = $index;//删除单个元素
      $scope.judgeLayer = 'delete';//弹出层类型
      $scope.layershow = true;//是否显示弹出层
      $scope.layerAni = 'layer-animate';//弹出层动画
    }
    //移动文件事件
    $scope.removeFn = function($event, $index){
      $scope.curIndex = $index;//当前元素
      $scope.judgeLayer = 'move';//弹出层类型
      $scope.layershow = true;//是否显示弹出层
      $scope.layerAni = 'layer-animate';//弹出层动画
      $scope.showtips = false;
    }
    //分享文件事件
    $scope.shareFn = function($event, $index){

    }
    //文件二维码事件
    $scope.qr_codeFn = function($event, $index){

    }
    //选中文件
    $scope.checkClick = function($event, $index, type){
      var isshowindex = 0,
          _main_content = document.getElementById('_main_content'),//内容显示区域
          checkboxes = _main_content.querySelectorAll('.icon-checkbox'),//显示区域所有的复选框
          allselect = angular.element(document.getElementById('multi-file-check')),//全选按钮
          currentT = $event.currentTarget;//当前元素
      //当前元素在数组中的位置数组
      if(type){
        checkboxes = _main_content.querySelectorAll('.thumview-checkbox');
        angular.element(currentT).parent().toggleClass('active');
      }
      //如果已经全选，则去掉全选
      if(allselect.hasClass('active')){
        allselect.removeClass('active');
      }

      $scope.curIndexArr = [];
      angular.element(currentT).toggleClass('active');
      angular.forEach(checkboxes, function(value, key){
        if(value.className.indexOf('active') != -1){
          $scope.curIndexArr.push(key);
          isshowindex ++;
        }
      });
      if(isshowindex){
        $scope.showList = true;
        $scope.logobg = '#4195fc';
      }else{
        $scope.showList = false;
        $scope.logobg = '#F5F6F9';
      }
      $scope.selectNum = isshowindex;
    }
    //取消选择事件
    $scope.cancelSelect = function(){
      var checkboxes = document.getElementById('layout-main').querySelectorAll('.icon-checkbox');//显示区域所有的复选框
      $scope.showList = false;
      $scope.logobg = '#F5F6F9';
      angular.element(checkboxes).removeClass('active');

    }
  });

  app.controller('headerCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.uploadClick = function(){
      document.getElementById('upload_input').click();
    }
  }]);

  //菜单点击/悬停事件
  app.directive('navButton', function($window){
    var link_func = function(scope, element, attr){
      //点击事件
      scope.leftMenuClick = function($event){
        var lis = document.querySelectorAll('.menu-list li'),//左菜单所有的li
            currentT = $event.currentTarget,//当前元素
            angularCur = angular.element(currentT),
            _main_content = document.getElementById('_main_content'),//内容显示区域
            multicheck = document.getElementById('multi-file-check'),//全选
            checkboxes = _main_content.querySelectorAll('.icon-checkbox');//显示区域所有的复选框
        //头部显示阵列点击事件
        if(currentT.className.indexOf('item-list') > -1){
          angularCur.parent().children().removeClass('active');
          angularCur.addClass('active');
        }else if(currentT.className.indexOf('left-menu-item') > -1){
          //左边菜单点击事件
          angular.element(lis).removeClass('active');
          angularCur.addClass('active');
        }else if(currentT.className.indexOf('icon-checkbox') > -1){
          //复选框点击事件
          if(currentT.id.indexOf('multi-file-check') > -1){
            //多选框点击事件
              if(multicheck.className.indexOf('active') == -1){
                if(scope.info.viewtype == 'thumview'){
                  checkboxes = _main_content.querySelectorAll('.thumview-checkbox');//显示区域所有的复选框
                  angular.element(checkboxes).parent().addClass('active');
                }else{
                  angular.element(checkboxes).addClass('active');
                }
                scope.showList = true;
                scope.logobg = '#4195fc';
              }else{
                if(scope.info.viewtype == 'thumview'){
                  checkboxes = _main_content.querySelectorAll('.thumview-checkbox');//显示区域所有的复选框
                  angular.element(checkboxes).parent().removeClass('active');
                }else{
                  angular.element(checkboxes).removeClass('active');
                }
                scope.showList = false;
                scope.logobg = '#F5F6F9';
              }
          }
          scope.selectNum = angular.element(checkboxes).length;
          angularCur.toggleClass('active');
        }
        //scope.showloading = true;
        //左菜单点击切换数据
        var dataMod = angularCur.attr('data-mod');
        switch (dataMod) {
          case 'recent':
              scope.info.operate = [
                {'img': '../img/img1.jpg', 'unid': 'unid001', 'name': 'user-image1', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word1', 'size': '30.1k', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel1', 'size': '1M', 'time': '2017-05-10 21:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt1', 'size': '442k', 'time': '2017-02-14 12:32', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img2.jpg', 'unid': 'unid001', 'name': 'user-image2', 'size': '54.9k', 'time': '2017-04-21 14:40', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word2', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'}
              ];
            break;
            case 'disk':
              scope.info.operate = [
                {'img': '../img/img1.jpg', 'unid': 'unid001', 'name': 'user-image1', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word1', 'size': '30.1k', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel1', 'size': '1M', 'time': '2017-05-10 21:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt1', 'size': '442k', 'time': '2017-02-14 12:32', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img2.jpg', 'unid': 'unid001', 'name': 'user-image2', 'size': '54.9k', 'time': '2017-04-21 14:40', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word2', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel2', 'size': '3.1k', 'time': '2016-11-30 01:37', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt2', 'size': '3.1k', 'time': '2017-04-23 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img3.jpg', 'unid': 'unid001', 'name': 'user-image3', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word3', 'size': '3.1k', 'time': '2017-07-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel3', 'size': '3.1k', 'time': '2017-05-14 22:40', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt3', 'size': '3.1k', 'time': '2017-01-23 11:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img4.jpg', 'unid': 'unid001', 'name': 'user-image4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'}
              ];
            break;
            case 'doc':
              scope.info.operate = [
                {'img': '', 'unid': 'unid002', 'name': 'word1', 'size': '30.1k', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel1', 'size': '1M', 'time': '2017-05-10 21:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt1', 'size': '442k', 'time': '2017-02-14 12:32', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '', 'unid': 'unid002', 'name': 'word2', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel2', 'size': '3.1k', 'time': '2016-11-30 01:37', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt2', 'size': '3.1k', 'time': '2017-04-23 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '', 'unid': 'unid002', 'name': 'word3', 'size': '3.1k', 'time': '2017-07-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel3', 'size': '3.1k', 'time': '2017-05-14 22:40', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt3', 'size': '3.1k', 'time': '2017-01-23 11:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '', 'unid': 'unid002', 'name': 'word4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'}
              ];
            break;
            case 'album':
              scope.info.operate = [
                {'img': '../img/img1.jpg', 'unid': 'unid001', 'name': 'user-image1', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '../img/img2.jpg', 'unid': 'unid001', 'name': 'user-image2', 'size': '54.9k', 'time': '2017-04-21 14:40', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '../img/img3.jpg', 'unid': 'unid001', 'name': 'user-image3', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '../img/img4.jpg', 'unid': 'unid001', 'name': 'user-image4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'}
              ];
            break;
            case 'video':

            break;
            case 'note':

            break;
            case 'audio':
              scope.info.operate = [
                {'img': '', 'unid': 'unid002', 'name': 'someone like you.mp3', 'size': '3.1M', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'audio'},
                {'img': '', 'unid': 'unid002', 'name': '喜欢你.mp3', 'size': '30.1M', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'audio'},
                {'img': '', 'unid': 'unid002', 'name': '李白.mp3', 'size': '5.23M', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'audio'}
              ];
            break;
            case 'photo-time':

            break;
            case 'photo-location':

            break;
            case 'photo-photo-tags':

            break;
            case 'recycle':

            break;
            case 'listview':
              scope.info.viewtype = 'listview';
            break;
            case 'thumview':
              scope.info.viewtype = 'thumview';
            break;
            case 'timesort':
              scope.info.operate = [
                {'img': '', 'unid': 'unid004', 'name': 'ppt3', 'size': '3.1k', 'time': '2017-01-23 11:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '', 'unid': 'unid002', 'name': 'word4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img4.jpg', 'unid': 'unid001', 'name': 'user-image4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '../img/img1.jpg', 'unid': 'unid001', 'name': 'user-image1', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '../img/img3.jpg', 'unid': 'unid001', 'name': 'user-image3', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'word2', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt1', 'size': '442k', 'time': '2017-02-14 12:32', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '', 'unid': 'unid002', 'name': 'word1', 'size': '30.1k', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '../img/img2.jpg', 'unid': 'unid001', 'name': 'user-image2', 'size': '54.9k', 'time': '2017-04-21 14:40', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid004', 'name': 'ppt2', 'size': '3.1k', 'time': '2017-04-23 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '', 'unid': 'unid003', 'name': 'excel1', 'size': '1M', 'time': '2017-05-10 21:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid003', 'name': 'excel3', 'size': '3.1k', 'time': '2017-05-14 22:40', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid002', 'name': 'word3', 'size': '3.1k', 'time': '2017-07-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'excel2', 'size': '3.1k', 'time': '2016-11-30 01:37', 'href': 'http//:www.baidu.com', 'type': 'excel'}
              ];
            break;
            case 'lettersort':
              scope.info.operate = [
                {'img': '../img/img1.jpg', 'unid': 'unid001', 'name': 'A-user-image1', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'B-word1', 'size': '30.1k', 'time': '2017-03-06 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'C-excel1', 'size': '1M', 'time': '2017-05-10 21:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'D-ppt1', 'size': '442k', 'time': '2017-02-14 12:32', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img2.jpg', 'unid': 'unid001', 'name': 'E-user-image2', 'size': '54.9k', 'time': '2017-04-21 14:40', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'F-word2', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'G-excel2', 'size': '3.1k', 'time': '2016-11-30 01:37', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'H-ppt2', 'size': '3.1k', 'time': '2017-04-23 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img3.jpg', 'unid': 'unid001', 'name': 'A-user-image3', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'I-word3', 'size': '3.1k', 'time': '2017-07-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'J-excel3', 'size': '3.1k', 'time': '2017-05-14 22:40', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'K-ppt3', 'size': '3.1k', 'time': '2017-01-23 11:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'},
                {'img': '../img/img4.jpg', 'unid': 'unid001', 'name': 'L-user-image4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'image'},
                {'img': '', 'unid': 'unid002', 'name': 'M-word4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'word'},
                {'img': '', 'unid': 'unid003', 'name': 'N-excel4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'excel'},
                {'img': '', 'unid': 'unid004', 'name': 'O-ppt4', 'size': '3.1k', 'time': '2017-02-14 12:30', 'href': 'http//:www.baidu.com', 'type': 'ppt'}
              ];
            break;
          default:

        }

      };
      var isblur = true;
      //鼠标进入事件
      scope.mouseenter = function($event){
        angular.element($event.currentTarget).find('div').eq(7).addClass('active');
      }
      //鼠标离开事件
      scope.mouseleave = function($event){
        angular.element($event.currentTarget).find('div').eq(7).removeClass('active');
      }
      //搜索框获取焦点事件
      scope.searchFocus = function($event){
        angular.element($event.currentTarget).css('width', '2rem');
        angular.element($event.currentTarget).next().css('opacity', '1');
      }
      //搜索框失去焦点事件
      scope.searchBlur = function($event){
        if(isblur){
          angular.element($event.currentTarget).css('width', '1rem');
          angular.element($event.currentTarget).next().css('opacity', '0');
        }
      }
      //搜索框删除按钮
      scope.searchClose = function($event,element){
        angular.element($event.currentTarget).parent().find('input').val('');
        angular.element($event.currentTarget).parent().find('input')[0].focus();
      }
      scope.closemouseenter = function($event){
        isblur = false;
      }
      scope.closemouseleave = function($event){
        isblur = true;
      }
    };
    return {
      restrict: 'A',
      scope: false,
      link: link_func
    }
  });

  //搜索框的搜索事件
  app.controller('searchBar', function($scope, $timeout){
    $scope.searchKeyup = function(){
      var timer = $timeout(function(){
        document.querySelector('.btn-search').style.background = 'url(../img/loading.gif) no-repeat -2px -2px';
        //搜索接口
      }, 500)
    }
  })
})();
