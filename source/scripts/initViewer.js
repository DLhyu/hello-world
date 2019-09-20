import Cesium from 'Cesium';

function initViewer(container) {
    // 默认指向中国
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(108.0, 27.0, 113.0, 31.0);
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 3.0;

    // 移动设备检测
    window.mobilecheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    // 谷歌影像（带注记）
    var googleImageryUrl = '//www.google.cn/maps/vt?lyrs=s,h&gl=CN&x={x}&y={y}&z={z}';

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMjhhMzU2NC1lNzNlLTRjMWYtYjU0Yy1mNDNkNzlkNWFlYTQiLCJpZCI6MTE3MzUsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk2NTEwNTF9.gB9Qvpj795fbB-6BXzg9qTSzxLKkTHUsWEoWYo_4mho'

    // 创建Viewer
    var viewer = new Cesium.Viewer(container, {
        // imageryProvider: Cesium.createTileMapServiceImageryProvider({
        //     url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII'),
        //     fileExtension: 'jpg',
        // }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({url:googleImageryUrl}),
        baseLayerPicker: false,
        geocoder: false,
        animation: false,
        fullscreenButton: false,
        vrButton: false,
        homeButton: false,
        // infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        shouldAnimate: true,
        contextOptions: {
            webgl: {
                antialias: !mobilecheck()
            }
        },
        terrainProvider: new Cesium.createWorldTerrain({
            requestWaterMask : true,
            requestVertexNormals : true
        }),
        scene3DOnly: false,
    });
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false; // 启用或禁用带地形的相机碰撞检测

    // 分辨率调整
    viewer._cesiumWidget._supportsImageRenderingPixelated = Cesium.FeatureDetection.supportsImageRenderingPixelated();
    viewer._cesiumWidget._forceResize = true;
    if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        var dpr = window.devicePixelRatio;
        // 适度降低分辨率
        while (dpr >= 2.0) {
            dpr /= 2.0;
        }
        //alert(dpr);
        viewer.resolutionScale = dpr;
    }

    // navigation插件设置
    if (Cesium.viewerCesiumNavigationMixin) {
        let navigationOptions = {};
        // navigationOptions.defaultResetView = Cesium.Rectangle.fromDegrees(71, 3, 90, 14);
        // Only the compass will show on the map
        navigationOptions.enableCompass = true;
        navigationOptions.enableZoomControls= false;
        navigationOptions.enableDistanceLegend= true;
        navigationOptions.enableCompassOuterRing= true;
        viewer.extend(Cesium.viewerCesiumNavigationMixin, navigationOptions);
    }

    // 加载谷歌中国卫星影像
    // var googleImageryUrl = "//mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"; // 不带标注
    // var googleImageryUrl = '//www.google.cn/maps/vt?lyrs=s,h&gl=CN&x={x}&y={y}&z={z}';
    // var googleImageryProvider = new Cesium.UrlTemplateImageryProvider({url:googleImageryUrl})viewerCesiumNavigationMixin
    // var googleImageryLayer = viewer.imageryLayers.addImageryProvider(googleImageryProvider);

    // 去掉默认的logo
    viewer._cesiumWidget._creditContainer.style.display = 'none';

    return viewer;
}

export default initViewer;
