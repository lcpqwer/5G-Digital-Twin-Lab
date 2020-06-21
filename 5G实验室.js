document.title = "5G实验室"
//加载场景代码
var app = new THING.App({
    // 场景地址
    "url": "http://www.thingjs.com/./uploads/wechat/bWVzb255Y2hpZA==/scene/5G%E5%AE%9E%E9%AA%8C%E5%AE%A4",
    //背景设置
    // "skyBox": "BlueSky"
    background: '0xffffff'
});
// 修改进入层级场景响应
// {String} ev.level 当前层级标识枚举值 可通过 THING.LevelType 获取枚举值，如建筑层级标识为 THING.LevelType.Building
// {THING.BaseObject} ev.object 当前层级对象（将要进入的层级对象）
// {THING.BaseObject} ev.current 当前层级对象（将要进入的层级对象）
// {THING.BaseObject} ev.previous 上一层级对象（离开的层级对象）
app.on(THING.EventType.EnterLevel, '.Building||.Floor', function (ev) {
    var object = ev.object;
    app.background = '0xffffff'
}, 'customEnterLevel');

//  停止进入物体层级的默认行为
app.pauseEvent(THING.EventType.EnterLevel, '.Thing', THING.EventTag.LevelSceneOperations);


// 封装上料buffer类 FeedingBuffer====================================================
function FeedingBuffer(obj) {
    this.obj = obj;
    // console.log(obj)
    // this.info = {
    //     "MachineId": this.obj.userData.MachineID,
    //     "Production": this.obj.userData.Production,
    //     "Status": this.obj.userData.Status,
    //     "Alarm": this.obj.userData.Alarm,
    //     "TrackNumber": this.obj.userData.TrackNumber
    // }
    this.info = {
        "MachineId": this.obj.id,
        "Production": 'null',
        "Status": 'null',
        "Alarm": 'null',
        "Robot": 'null'
    }
    let plane = new THING.widget.Panel({
        titleText: '上料buffer', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // 设置面板宽度
        width: '300px',
        template: "default2",
        // cornerType 角标样式
        // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
        cornerType: 'polyline',
        opacity: 0.8,
    })
    for (var key in this.info)
        plane.add(this.info, key);
    this.uiAnchor = app.create({
        // 类型
        type: 'UIAnchor',
        // 父节点设置
        parent: this.obj,
        // 要绑定的页面的 element 对象
        element: plane.domElement,
        // 设置 localPosition 为 [0, 0, 0]
        localPosition: [0, 0, 0],
        // 指定页面的哪个点放到localPosition位置上(百分比)
        pivot: [-0.2, 1.5]
    });
    this.uiAnchor.visible = false
}

FeedingBuffer.prototype.hide = function () {
    this.uiAnchor.visible = false
}

FeedingBuffer.prototype.show = function () {
    this.uiAnchor.visible = true
}
// =============================================================
// 封装下料buffer BlankingBuffer================================================
function BlankingBuffer(obj) {
    this.obj = obj;
    this.info = {
        "MachineId": this.obj.id,
        "Production": 'null',
        "Status": "null",
        "Alarm": "null",
        "Robot": 'null'
    }
    let plane = new THING.widget.Panel({
        titleText: '下料buffer', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // 设置面板宽度
        width: '300px',
        template: "default2",
        // cornerType 角标样式
        // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
        cornerType: 'polyline',
        opacity: 0.8,
    })
    for (var key in this.info)
        plane.add(this.info, key);
    this.uiAnchor = app.create({
        // 类型
        type: 'UIAnchor',
        // 父节点设置
        parent: this.obj,
        // 要绑定的页面的 element 对象
        element: plane.domElement,
        // 设置 localPosition 为 [0, 0, 0]
        localPosition: [0, 0, 0],
        // 指定页面的哪个点放到localPosition位置上(百分比)
        pivot: [-0.2, 1.5]
    });
    this.uiAnchor.visible = false
}

BlankingBuffer.prototype.hide = function () {
    this.uiAnchor.visible = false
}

BlankingBuffer.prototype.show = function () {
    this.uiAnchor.visible = true
}
// ===============================================
// 封装上料自动化==================================
function FeedingAutomation(obj) {
    this.obj = obj;
    console.log(obj.userData)
    // this.info = {
    //     "MachineId": this.obj.id,
    //     "Production": this.obj.userData.Production,
    //     "Status": this.obj.userData.Status,
    //     "Alarm": this.obj.userData.Alarm,
    //     "RobotCommStatus": this.obj.userData.RobotCommStatus,
    //     "TrackCassetteNumber": this.obj.userData.TrackCassetteNumber,
    //     "BufferCellNumber": this.obj.userData.BufferCellNumber,
    // }
    // console.log(this.info)
    this.info = {
        "MachineId": this.obj.id,
        "Production": 'null',
        "Status": "null",
        "Alarm": 'null',
        "RobotCommStatus": 'null',
        "TrackNumber": 'null',
        "BufferCellNumber": 'null',
    }
    var plane = new THING.widget.Panel({
        titleText: '上料自动化', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // 设置面板宽度
        width: '300px',
        template: "default2",
        // cornerType 角标样式
        // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
        cornerType: 'polyline',
        opacity: 0.8,
    })
    for (var key in this.info)
        plane.add(this.info, key);
    this.uiAnchor = app.create({
        // 类型
        type: 'UIAnchor',
        // 父节点设置
        parent: obj,
        // 要绑定的页面的 element 对象
        element: plane.domElement,
        // 设置 localPosition 为 [0, 0, 0]
        localPosition: [0, -1.5, 0],
        // 指定页面的哪个点放到localPosition位置上(百分比)
        pivot: [-0.2, 1.5]
    });
    this.uiAnchor.visible = false
}

FeedingAutomation.prototype.hide = function () {
    this.uiAnchor.visible = false
}

FeedingAutomation.prototype.show = function () {
    this.uiAnchor.visible = true
}
// =================================================
// 封装下料自动化BlankingAutomation======================
function BlankingAutomation(obj) {
    this.obj = obj;
    this.info = {
        "MachineId": this.obj.id,
        "Production": 'null',
        "Status": "null",
        "RobotCommStatus": 'null',
        "TrackNumber": 'null',
        "BufferCellNumber": 'null',
    }
    // this.info = {
    //     "MachineId": this.obj.id,
    //     "Production": this.obj.userData.Production,
    //     "Status": this.obj.userData.Status,
    //     // "Alarm": this.obj.userData.Alarm,
    //     "RobotCommStatus": this.obj.userData.RobotCommStatus,
    //     "TrackCassetteNumber": this.obj.userData.TrackCassetteNumber,
    //     "BufferCellNumber": this.obj.userData.BufferCellNumber,
    // }
    let plane = new THING.widget.Panel({
        titleText: '下料自动化', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // 设置面板宽度
        width: '300px',
        template: "default2",
        // cornerType 角标样式
        // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
        cornerType: 'polyline',
        opacity: 0.8,
    })
    for (var key in this.info)
        plane.add(this.info, key);
    let that = this
    this.uiAnchor = app.create({
        // 类型
        type: 'UIAnchor',
        // 父节点设置
        parent: that.obj,
        // 要绑定的页面的 element 对象
        element: plane.domElement,
        // 设置 localPosition 为 [0, 0, 0]
        localPosition: [0, -1.5, 0],
        // 指定页面的哪个点放到localPosition位置上(百分比)
        pivot: [-0.2, 1.5]
    });
    this.uiAnchor.visible = false
}

BlankingAutomation.prototype.hide = function () {
    this.uiAnchor.visible = false
}

BlankingAutomation.prototype.show = function () {
    this.uiAnchor.visible = true
}
// =================================================
// 封装ccd CCD ==================================
function CCD(obj) {
    this.obj = obj;
    this.info = {
        "MachineId": this.obj.id,
        "ModelName": 'null',
        "Total": "null",
        "Badness": "null",
        "MileageTotal": 'null',
        "MileBadness": 'null',
    }
    // this.info = {
    //     "MachineId": this.obj.id,
    //     "ModelName": this.obj.name,
    //     "Total": this.obj.userData.Total,
    //     "Badness": this.obj.userData.Badness,
    //     "MileageTotal": this.obj.userData.MileageTotal,
    //     "MileBadness": this.obj.userData.MileBadness,
    //     "Yield": this.obj.userData.Yield
    // }
    let plane = new THING.widget.Panel({
        titleText: 'CCD', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // 设置面板宽度
        width: '300px',
        template: "default2",
        // cornerType 角标样式
        // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
        cornerType: 'polyline',
        opacity: 0.8,
    })
    for (var key in this.info)
        plane.add(this.info, key);
    this.uiAnchor = app.create({
        // 类型
        type: 'UIAnchor',
        // 父节点设置
        parent: this.obj,
        // 要绑定的页面的 element 对象
        element: plane.domElement,
        // 设置 localPosition 为 [0, 0, 0]
        localPosition: [0, -1.5, 0],
        // 指定页面的哪个点放到localPosition位置上(百分比)
        pivot: [-0.2, 1.5]
    });
    this.uiAnchor.visible = false
}

CCD.prototype.hide = function () {
    this.uiAnchor.visible = false
}

CCD.prototype.show = function () {
    this.uiAnchor.visible = true
}
// 封装AGV
function AGV(obj) {
    this.obj = obj;
    this.info = {
        "name": this.obj.name,
        "ip": 'null',
        "theta": "null",
        "vf": "null",
        "vr": 'null',
        "battery": 'null',
        "status": 'null',
        "mode": 'null',
    }
    let plane = new THING.widget.Panel({
        titleText: 'CCD', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // 设置面板宽度
        width: '300px',
        template: "default2",
        // cornerType 角标样式
        // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
        cornerType: 'polyline',
        opacity: 0.8,
    })
    for (var key in this.info)
        plane.add(this.info, key);
    this.uiAnchor = app.create({
        // 类型
        type: 'UIAnchor',
        // 父节点设置
        parent: this.obj,
        // 要绑定的页面的 element 对象
        element: plane.domElement,
        // 设置 localPosition 为 [0, 0, 0]
        localPosition: [0, -1.5, 0],
        // 指定页面的哪个点放到localPosition位置上(百分比)
        pivot: [-0.2, 1.5]
    });
    this.uiAnchor.visible = false
}

AGV.prototype.hide = function () {
    this.uiAnchor.visible = false
}

AGV.prototype.show = function () {
    this.uiAnchor.visible = true
}
var robot, robot_inspection, robotOrigin;
app.on('load', function (ev) {
    document.title = "5G实验室"
    app.camera.distanceLimited = [0, 40];// 设置摄像机距离范围[最小值, 最大值]
    app.camera.yAngleLimited = [10, 80];// 限制摄像机俯仰角[最小值，最大值]
    // app.camera.position = [10, 20, 10];
    // app.level.change(ev.campus)
    robotOrigin = app.query('robotOrigin')[0]
    // debugger
    robot = app.query('robot')[0]
    console.log(robot)
    // debugger
    init()
    robot_inspection = app.query('robot_inspection')[0]
    robot_inspection.visible = false
})
function init() {
    newObject()
    addMap()
    addHtml()
    move()
    createTL()
    createOperationPanel()
    getDeviceInfo()
    getRobotInfo()
    setInterval(getOption, 1000)
}
// ========= 创建设备面板 ==========

// 连接设备ws接口
var webSocket;
function getDeviceInfo() {
    if (!webSocket) {
        // 如果网站是 https 则对应 wss
        // 如果网站是 http 则对应 ws 即可
        webSocket = new WebSocket('ws://36.153.37.242:47181');
        // 建立 websocket 连接成功触发事件
        webSocket.onopen = function () {
            console.log("websoket服务器连接成功...");
        };
        // 接收服务端数据时触发事件
        webSocket.onmessage = function (evt) {
            // console.log("websoket接收数据：" + evt.data);
            let info = JSON.parse(evt.data)
            // console.log(info)
            // if (info.MachineName == "下料自动化") {
            //     console.log(info)
            //     console.log(info.MachineName, info.Flag, info.Value)
            // }
            if (!info.Value) {
                info.Value = 'null'
            }

            switch (info.MachineName) {
                case '上料buffer':
                    if (feedingbuffer.info[info.Flag]) {
                        feedingbuffer.info[info.Flag] = info.Value
                    }
                    break
                case '下料buffer':
                    if (blankingbuffer.info[info.Flag]) {
                        blankingbuffer.info[info.Flag] = info.Value
                    }
                    break
                case '上料自动化':
                    if (feedingautomation.info[info.Flag]) {
                        feedingautomation.info[info.Flag] = info.Value
                    }
                    break
                case '下料自动化':
                    if (blankingautomation.info[info.Flag]) {
                        blankingautomation.info[info.Flag] = info.Value
                    }
                    break
                case 'ccd':
                    if (ccd.info[info.Flag]) {
                        ccd.info[info.Flag] = info.Value
                    }
                    break
            }
            // app.query(info.MachineName)[0].userData[info.Flag] = info.Value


        };
        webSocket.onclose = function (evt) {
            console.log("websoket关闭...");
            webSocket = null;
            getDeviceInfo()
        }
    }
}
var webSocket2, robotFirst = true, robotThObj = {"uBot150Q-001": 0, "uBot150Q-002": 0, 'robot': -90 }
function getRobotInfo() {
    if (!webSocket2) {
        // 如果网站是 https 则对应 wss
        // 如果网站是 http 则对应 ws 即可
        webSocket2 = new WebSocket('ws://36.153.37.242:48079');
        // 建立 websocket 连接成功触发事件
        webSocket2.onopen = function () {
            console.log("websoket2服务器连接成功...");
        };
        // 接收服务端数据时触发事件
        webSocket2.onmessage = function (evt) {
            // console.log("websoket2接收数据：", evt.data);
            let robotInfo = JSON.parse(JSON.parse(evt.data).message)
            console.log(robotInfo)
            console.log(new Date().getTime())
            // console.log(robotInfo[0])
            // debugger
            // debugger
            robotMove(robotInfo)

        };
        webSocket2.onclose = function (evt) {
            console.log("websoket2关闭...");
            webSocket2 = null;
            getRobotInfo()
        }
    }
}

// ws接口中的机器人移动
function robotMove(robotInfo) {
    for (let i = 0; i < robotInfo.length; i++) {
        let item = robotInfo[i]
        let robotObj = app.query(item.name)[0]
        if (!robotObj) { continue } else { console.log(item.name) }
        // let position1 = [Math.abs(item.x) / 1000, robotObj.position[1], Math.abs(item.y) / 1000]
        let position1 = [9 + (item.x / 1000), robotObj.position[1], 26 - (item.y / 1000)]
        // console.log(position1)
        // console.log(robotOrigin.selfToWorld(position1))
        // let position = robotOrigin.selfToWorld(position1)
        // // debugger
        if (item.theta != robotThObj[item.name]) {
            console.log(item.theta - robotThObj[item.name], '角度')
            // debugger
            if (robotFirst){
                robotObj.rotateY(360-(item.theta - robotThObj[item.name]))
            }else {
                robotObj.rotateTo({
                    angles: [0, 360-(item.theta - robotThObj[item.name]), 0], // 旋转角度
                    time: 1000, // 总时间
                })
            }
            robotThObj[item.name] = item.theta
            // debugger
        }

        if (JSON.stringify(robotObj.position) != JSON.stringify(position1)) {
            console.log('需要移动')
            if (robotFirst) {
                console.log('第一次')
                robotObj.position = position1
            } else {
                console.log('移动')
                robotObj.moveTo({
                    position: position1,
                    time: 2500,
                    orientToPath: false,
                })
            }
        } else {
            console.log('不需要移动')
        }
    }
    robotFirst = false
}

// 定义对象
var feedingbuffer,
    blankingbuffer,
    feedingautomation,
    blankingautomation,
    ccd;
// 设备坐标
var fb_position,
    bb_position,
    fa_position,
    ba_position,
    ccd_position;
function newObject() {
    let obj1 = app.query('上料buffer')[0];
    feedingbuffer = new FeedingBuffer(obj1)
    fb_position = obj1.position
    let obj2 = app.query("下料buffer")[0];
    blankingbuffer = new BlankingBuffer(obj2)
    bb_position = obj2.position
    let obj3 = app.query("上料自动化")[0];
    feedingautomation = new FeedingAutomation(obj3)
    // feedingautomation.show()
    fa_position = obj3.position
    let obj4 = app.query("下料自动化")[0];
    ba_position = obj4.position
    blankingautomation = new BlankingAutomation(obj4)
    let obj5 = app.query("ccd")[0];
    ccd = new CCD(obj5)
    ccd_position = obj5.position
}
// 添加logo
const initPass = 'abc123'
function addHtml() {
    THING.Utils.dynamicLoad(['/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/index.css'],
        function () {
            let html1 = `<div class="top-img">
                    <img class="img1" mode="widthFix" src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/5G.png'>   
                </div>
                <div class="bottom-img" style="display: none">
                    <img class="img1" mode="widthFix" src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/aws.jpg'>   
                    <img class="img1" mode="widthFix" src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/logo.png'>   
                </div>
                <div class="c-warpper" id="inversion_control">
                    <div>
                        <img src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/top.png' class="c-top" mode="widthFix" onclick="passShow('up')">
                    </div>
                    <div>
                        <img src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/left.png' class="c-left" mode="widthFix" onclick="passShow('left')">
                        <img src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/bottom.png' class="c-bottom" mode="widthFix" onclick="passShow('down')">
                        <img src='/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/right.png' class="c-right" mode="widthFix" onclick="passShow('right')">
                    </div>
                    
                </div>
                <input type="file" style="display: none" accept="image/*" multiple id="add-pic-btn">`
            $('#div3d').append($(html1))
            
            // $('#inversion_control').hide()
            let html2 = `<div class="mask" id="mask">
                    <div class="mask-main">
                        <div class="nav">请输入密码</div>
                        <input type="text" name="" id="password" value="" />
                        <div class="pass-sub">
                            <button id="affirm" type="button">确认</button>
                            <button id="cancel" type="button">取消</button>
                        </div>
                    </div>
                </div>`
            $('body').append($(html2))
            $('div#mask').hide()
            $('#affirm').click(function () {
                let password = $('#password').val()
                console.log(password)
                if (password === initPass) {
                    $("div#mask").hide();
                    inversionControl()
                }

            })
            $('#cancel').click(function () {
                $('div#mask').hide()
            })
        },
        true, // 选填 是否带时间戳
        true // 选填 是否按顺序下载
    )
}
function addMap() {
    var control = new THING.MiniMapControl({
        width: 166,
        height: 166,
        position: THING.CornerType.RightBottom,
        opacity: 0.8,
        cameraViewImg: 'https://www.thingjs.com/static/images/minimap1.png',
        cameraCenterImg: 'https://www.thingjs.com/static/images/minimap0.png',
        // hasClose: true, // 是否有关闭按钮（默认没有）当点击关闭按钮时，小地图 enable 为 false
        // closeBtnImg: 'https://www.thingjs.com/static/images/minimap2.png'
    })
    // 添加小地图控件
    app.addControl(control);
}
// 量子纠缠
function move() {
    let avg7 = app.query('AGV007')[0]
    let avg8 = app.query('AGV008')[0]
    let x_init = (avg7.position[0] + avg8.position[0]) / 2
    let y_init = (avg7.position[2] + avg8.position[2]) / 2
    let z_init = (avg7.position[1] + avg8.position[1]) / 2
    // 创建圆形路径
    var points = [];
    var radius = 0.75;
    for (var degree = 0; degree <= 360; degree += 10) {
        var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
        var y = Math.sin(degree * 2 * Math.PI / 360) * radius;
        points.push([x + x_init, 0.1, y + y_init]);
    }
    var line = app.create({
        type: 'Line',
        color: 0x00FF00, // 轨迹线颜色
        // dotSize: 2, // 轨迹点的大小
        // dotColor: 0xFF0000, // 轨迹点的颜色
        points: points,
    })
    let points2 = points.slice(19).concat(points.slice(0, 19))

    avg7.movePath({
        'path': points, // 轨迹路线
        'time': 10000, // 移动时间
        'orientToPath': true, // 物体移动时沿向路径方向
        loopType: THING.LoopType.Repeat,
    });
    avg8.movePath({
        'path': points2, // 轨迹路线
        'time': 10000, // 移动时间
        'orientToPath': true, // 物体移动时沿向路径方向

        loopType: THING.LoopType.Repeat,
    });

    // // robot.position = [5.967, 0.02, 11.554]

    // start()
}
/* 创建左通栏，操作面板、2D/3D转换、机器人反向控制、机器人监控 */
// 创建通栏
var img2, bannerObj;
var baseURL = '/uploads/wechat/bWVzb255Y2hpZA%3D%3D/file/5G实验室/';
function createTL() {
    // console.log(app.query('上料buffer')[0])
    bannerObj = {
        view: false, // 视图切换 true 2D false 3D
        panel: true, // 操作面板 true 面板展示 false 面板隐藏
        control: true, // 反向控制按钮展示
        robotCamera: false, // 机器人摄像头展示/隐藏 true 展示 false 隐藏
        up: false,
        open: false
    };
    // 创建一个左侧通栏
    var banner_left = THING.widget.Banner({
        column: 'left', // 通栏类型： top 为上通栏(默认)， left 为左通栏
        template: 'default2',
        zIndex: 100,
    });
    // 向左侧通栏中添加按钮
    var img1 = banner_left.addImageBoolean(bannerObj, 'panel').caption('操作面板').imgUrl(baseURL + 'a.png');
    img2 = banner_left.addImageBoolean(bannerObj, 'view').caption('2D视图').imgUrl(baseURL + '2D.png');
    var img3 = banner_left.addImageBoolean(bannerObj, 'control').caption('反向控制').imgUrl(baseURL + 'inversionControl.png');
    var img4 = banner_left.addImageBoolean(bannerObj, 'robotCamera').caption('机器人监控').imgUrl(baseURL + 'robotCamera.png');
    var img5 = banner_left.addImageBoolean(bannerObj, 'up').caption('上传人脸图片').imgUrl(baseURL + 'upload.png');
    img1.on('change', function (value) {
        click('panel', value)
    });
    img2.on('change', function (value) {
        click('view', value)
    });
    img3.on('change', function (value) {
        click('control', value)
    })
    img4.on('change', function (value) {
        click('robotCamera', value)
    })
    img5.on('change',function(value){
        click('up', value)
    })
}
app.pauseEvent(THING.EventType.EnterLevel, '.Thing', THING.EventTag.LevelFly);
// 通栏事件
function click(key, boolValue) {
    if (key == 'panel') { // 操作面板的展示与隐藏
        operationPanel.visible = boolValue
        if (boolValue) {
            bannerObj.view = false
            // bannerObj.control = false
            // if (app.camera.viewMode != 'normal'){
            //     app.level.change(app.query('.Campus')[0])
            //     app.camera.viewMode = THING.CameraView.Normal;
            // }
            operationObj.radio = '场景视角'
        }
    } else if (key == 'view') { // 3D/2D切换

        let img = boolValue ? '3D.png' : '2D.png';
        let name = boolValue ? '3D视图' : '2D视图';
        img2.imgUrl(baseURL + img)
        img2.caption(name)
        if (boolValue) {

            bannerObj.panel = false
            bannerObj.control = false
            // 摄像机切换2D 
            app.level.change(app.query('.Floor')[0])
            //  层级切换飞行结束
            app.on(THING.EventType.EnterLevel, '.Floor', function (ev) {
                app.camera.viewMode = THING.CameraView.TopView;   //2D视图  
                app.off(THING.EventType.EnterLevel, '.Floor', 'customLevelFly')
                // app.resumeEvent(THING.EventType.EnterLevel, '.Thing', THING.EventTag.LevelFly);
            }, 'customLevelFly');
        } else {
            app.level.change(app.query('.Campus')[0])
            app.camera.viewMode = THING.CameraView.Normal;  //3D视图
        }
    } else if (key == 'control') {
        if (boolValue) {
            bannerObj.view = false
            // bannerObj.panel = false
            $('#inversion_control').show()
        } else {
            $('#inversion_control').hide()
        }
    } else if (key == 'robotCamera') {
        robotCameraPanel.visible = boolValue
    } else if (key === 'up') {
        upPanel.visible = boolValue
    }
}

//  修改进入层级飞行响应
// {String} ev.level 当前层级标识枚举值 可通过 THING.LevelType 获取枚举值，如建筑层级标识为 THING.LevelType.Building
// {THING.BaseObject} ev.object 当前层级对象（将要进入的层级对象）
// {THING.BaseObject} ev.current 当前层级对象（将要进入的层级对象）
// {THING.BaseObject} ev.previous 上一层级对象（离开的层级对象）


//  停止进入物体层级的默认飞行行为


// 初始化场景 标签隐藏 update事件取消
function appInit() {
    robot.off('update')
    robot_inspection.off('update')
    robot.visible = true
    if (last_device) {
        last_device.hide()
        last_device = null
    }
}
// 添加操作面板
var n = true;
var fa;
var operationPanel, operationObj, robotCameraPanel,upPanel
const init_position = [0.4982431673707346, 3.599360185067993, 0.6606788403663391];
const init_target = [11.679250071577743, 0.2166611365588316, 16.249781900377748];
const iframeObj = {
    // iframe: 'http://www.baidu.com',
    // iframe1: 'http://www.baidu.com',
    iframe2: 'http://36.153.37.242:44080/FACE/',
    iframe: 'http://36.153.37.242:44080/WEB/camera/pano',
    iframe1: 'http://36.153.37.242:44080/WEB/camera/robot'

}
function createOperationPanel() {
    // 操作面板
    operationPanel = new THING.widget.Panel({
        titleText: '操作面板', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // closeIcon: true, // 是否有关闭按钮
        dragable: true, // 是否可拖拽
        // retractable: true, // 是否可收缩
        opacity: 0.9, // 设置透明度
        hasTitle: true, // 设置标题
        zIndex: 100, // 设置层级
        template: 'default2',
        
    });
    operationPanel.position = [10, 10];
    operationObj = {
        radio: '场景视角',
        open: false,
        video: false,
        // height: 10,
        // maxSize: 1.0,
    };
    var radio = operationPanel.addRadio(operationObj, 'radio', ['场景视角', '机器人视角', "机器人巡检"]);
    radio.on('change', function (ev) {
        // console.log(ev);
        if (ev == '机器人视角') {
            appInit()
            robot.visible = false
            operationObj.open = false
            robot.on('update', function () {
                app.camera.position = robot.selfToWorld([0, 2.5, 0]);
                app.camera.target = robot.selfToWorld([0, 2.5, 1])
            }, '机器人视角')
            robot_inspection.visible = false
        } else if (ev == '场景视角') {
            appInit();
            operationObj.open = false
            app.camera.position = init_position;
            app.camera.target = init_target
            robot_inspection.visible = false
        } else {
            operationObj.open = false
            start()
        }
    })
    var open1 = operationPanel.addBoolean(operationObj, 'open').caption('展示标签');
    var open2 = operationPanel.addBoolean(operationObj, 'video').caption('全景视频');
    open1.on('change', function(ev) {
        console.log(ev)
        if (ev){
            feedingbuffer.show()
            blankingbuffer.show()
            feedingautomation.show()
            blankingautomation.show()
            ccd.show()
        }else {
            feedingbuffer.hide()
            blankingbuffer.hide()
            feedingautomation.hide()
            blankingautomation.hide()
            ccd.hide()
        }
    })
    
    // operationPanel.visible = false;
    // 加载iframe组件
    // var iframe = operationPanel.addIframe(iframeObj, 'iframe').caption('视频').setHeight('234px');;
    // iframe.visible = false
    let iframe
    open2.on('change',function(val){
        if (val){
            iframe = operationPanel.addIframe(iframeObj, 'iframe').caption('').setHeight('234px');;
        }else {
            operationPanel.remove(iframe)
        }
    })
    robotCameraPanel = new THING.widget.Panel({
        titleText: '机器人Camera', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // closeIcon: true, // 是否有关闭按钮
        dragable: true, // 是否可拖拽
        // retractable: true, // 是否可收缩
        opacity: 0.9, // 设置透明度
        hasTitle: true, // 设置标题
        zIndex: 999, // 设置层级
        template: 'default2',
    });
    robotCameraPanel.visible = false
    robotCameraPanel.position = [350, 10];
    var iframe1 = robotCameraPanel.addIframe(iframeObj, 'iframe1').caption('').setHeight('234px');;
    upPanel = new THING.widget.Panel({
        titleText: '图片上传', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
        hasTitle: true, // 设置标题
        // closeIcon: true, // 是否有关闭按钮
        dragable: false, // 是否可拖拽
        // retractable: true, // 是否可收缩
        opacity: 0.9, // 设置透明度
        hasTitle: true, // 设置标题
        zIndex: 999, // 设置层级
        template: 'default2',
        width: '100%'
    });
    upPanel.visible = false
    var iframe2 = upPanel.addIframe(iframeObj, 'iframe2').caption('').setHeight('600px');;
}
// 巡检
var str;
var last_device;
function start() {
    appInit()
    robot_inspection.visible = true
    let z = robot_inspection.position[1]
    robot.visible = false
    robot_inspection.position = [4,z,4]
    // 
    let path = [[4, z, 4], [4, z, 5], [4, z, 23], [5, z, 23], [5, z, 22], [5, z, 4], [4, z, 4], [4, z, 4.1]]
    robot_inspection.movePath({
        'path': path, // 轨迹路线
        'time': 80000, // 移动时间
        'orientToPath': true, // 物体移动时沿向路径方向
        loopType: THING.LoopType.No,
        complete: function () {
            console.log('结束')
            robot_inspection.visible = false
            appInit()
        }
    });
    robot_inspection.on('update', function () {
        // 摄像机位置为 移动小车后上方
        // 为了便于计算 这里用了坐标转换 将相对于小车的位置 转换为 世界坐标
        app.camera.position = robot_inspection.selfToWorld([0, 2, -3.5]);
        app.camera.target = robot_inspection.selfToWorld([0, 2, 1])
        // 摄像机目标点为 移动小车的坐标
        // app.camera.target = robot.position
        let robot_position = robot_inspection.position
        let dis_arr = [];
        let dis_fa,
            dis_ba,
            dis_fb,
            dis_bb,
            dis_ccd;

        // console.log(robot.worldToSelf(fa_position))
        if (robot_inspection.worldToSelf(ccd_position)[2] > 0) {
            dis_ccd = Math.sqrt(Math.pow(ccd_position[0] - robot_position[0], 2) + Math.pow(ccd_position[2] - robot_position[2], 2))
            dis_arr.push(dis_ccd)
        }
        if (robot_inspection.worldToSelf(fa_position)[2] > 0) {
            dis_fa = Math.sqrt(Math.pow(fa_position[0] - robot_position[0], 2) + Math.pow(fa_position[2] - robot_position[2], 2))
            dis_arr.push(dis_fa)
        }
        if (robot_inspection.worldToSelf(ba_position)[2] > 0) {
            dis_ba = Math.sqrt(Math.pow(ba_position[0] - robot_position[0], 2) + Math.pow(ba_position[2] - robot_position[2], 2))
            dis_arr.push(dis_ba)
        }
        if (robot_inspection.worldToSelf(fb_position)[2] > 0) {
            dis_fb = Math.sqrt(Math.pow(fb_position[0] - robot_position[0], 2) + Math.pow(fb_position[2] - robot_position[2], 2))
            dis_arr.push(dis_fb)
        }
        if (robot_inspection.worldToSelf(bb_position)[2] > 0) {
            dis_bb = Math.sqrt(Math.pow(bb_position[0] - robot_position[0], 2) + Math.pow(bb_position[2] - robot_position[2], 2))
            dis_arr.push(dis_bb)
        }

        // console.log(bubbleSort([dis_fa,dis_ba]))
        if (last_device) { last_device.hide() }
        // console.log(bubbleSort(dis_arr)[0])
        // console.log(dis_fa)
        // console.log(dis_ba)
        switch (bubbleSort(dis_arr)[0]) {
            case dis_fa:
                if (str != 'feedingautomation') {
                    str = 'feedingautomation'
                    console.log('feedingautomation')
                }
                last_device = feedingautomation
                break
            case dis_ba:
                if (str != 'blankingautomation') {
                    str = 'blankingautomation'
                    console.log("blankingautomation")
                }
                last_device = blankingautomation
                break
            case dis_fb:
                if (str != 'feedingbuffer') {
                    str = 'feedingbuffer'
                    console.log("feedingbuffer")
                }
                last_device = feedingbuffer
                break
            case dis_bb:
                if (str != 'blankingbuffer') {
                    str = 'blankingbuffer'
                    console.log("blankingbuffer")
                }
                last_device = blankingbuffer
                break
            case dis_ccd:
                if (str != 'ccd') {
                    str = 'ccd'
                    console.log("ccd")
                }
                last_device = ccd
                break
        }
        last_device.show()
        // console.log(Math.pow(fa_position[0]-robot_position[0],2)+Math.pow(fa_position[2]-robot_position[2],2))

    }, '自定义摄影机跟随');
}
// 距离排序
function bubbleSort(arr) {
    let arr1 = arr
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; i < len - 1 - i; i++) {
            if (arr[j] > arr[j + 1]) {//相邻元素两两对比
                let temp = arr[j + 1];//元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 机器人反向控制
const controlBaseURL = 'http://36.153.37.242:44080/5G/robot/';
var controlType;
function passShow(type) {
    controlType = type;
    $('div#mask').show()
};
function inversionControl() {
    if (controlType) {
        let controlURL = controlBaseURL + controlType;
        $.ajax({
            url: controlURL,
            type: 'get',
            dataType: "json",
            jsonpCallback: "callback",
            success: function (res) {
                console.log('success', res)
            },
            error: function () {
                console.log('error')
            }
        })
    } else {
        $('div#mask').hide()
    }

}

// 机器人坐标
var firstAjax = true;
function getOption() {
    $.ajax({
        url: 'http://36.153.37.242:44080/5G/robot/info',
        type: 'get',
        dataType: "json",
        jsonpCallback: "callback",
        success: function (res) {
            // console.log('option', res)
            if (res.code == 200) {
                let json_data = JSON.parse(res.data)
                // console.log(json_data)
                let position = [(json_data.x / 1000) + 9, robot.position[1], 26 - (json_data.y / 1000)]
                // console.log(position)
                if (firstAjax) {
                    robot.rotateY(json_data.th - robotThObj.robot);
                    robot.position = position
                } else {
                    if (json_data.th != robotThObj.robot) {
                        robot.rotateTo({
                            angles: [0, json_data.th - robotThObj.robot],
                            time: 1000
                        })
                    }
                    if (JSON.stringify(position) != JSON.stringify(robot.position)) {
                        robot.moveTo({
                            position: position,
                            time: 1000,
                            orientToPath: false,
                        })
                    }

                }
                firstAjax = false
                robotThObj.robot = json_data.th

            }
        },
        error: function () { console.log('error') }
    })
}


