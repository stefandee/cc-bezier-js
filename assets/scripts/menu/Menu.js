const i18n = require('i18n');
const SceneList = require('SceneList');
const TipsManager = require('TipsManager');

const MainScene = 'TestList.fire';

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.RichText,
        readme: cc.ScrollView,
        btnInfo: cc.Button,
        btnBack: cc.Button,
        testList: cc.ScrollView,
        uiCamera: cc.Camera,
        sceneTitle: cc.Label
    },

    onLoad: function () {
        this._isLoadingScene = false;
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = MainScene;
        this.contentPos = null;
        this.btnBack.node.active = false;
        this.loadInstruction(this.currentSceneUrl);
        this.node.zIndex = 999;

        cc.game.addPersistRootNode(this.testList.node);
        if (this.testList && this.testList.content) {
            // in main scene
            this.sceneList = this.testList.content.getComponent(SceneList);
            this.sceneList.init(this);
        }
        if (typeof cocosAnalytics !== 'undefined' && cocosAnalytics.isInited && cocosAnalytics.isInited()) {
            // Cocos Analytics service, to learn more please visit:
            // https://analytics.cocos.com/docs/
            cocosAnalytics.CAEvent.onEvent({
                eventName: "打开范例"
            });
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.macro.KEY.b || event.keyCode === cc.macro.KEY.back) {
                this.backToList();
            }
        }, this);

        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
    },

    _onSceneLaunched () {
        let cameras = cc.Camera.cameras;
        for (let i = 0, l = cameras.length; i < l; i++) {
            let camera = cameras[i];
            if (camera === this.uiCamera) {
                camera.cullingMask = 1 << this.node.groupIndex;
            }
            else {
                camera.cullingMask = camera.cullingMask & (~(1 << this.node.groupIndex));
            }
        }
    },

    backToList: function () {
        this.loadScene(MainScene);
    },

    loadScene: function (url) {
        if (this._isLoadingScene) {
            return;
        }
        this._isLoadingScene = true;

        this.showReadme(null, false);
        this.contentPos = this.testList.getContentPosition();

        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));

        if (typeof cocosAnalytics !== 'undefined' && cocosAnalytics.isInited && cocosAnalytics.isInited()) {
            // Cocos Analytics service, to learn more please visit:
            // https://analytics.cocos.com/docs/
            cocosAnalytics.CALevels.begin({
                level: url
            });
        }
    },

    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);


        this.testList.node.active = false;

        let isMenu = url.endsWith(MainScene);
        this.btnBack.node.active = this.sceneTitle.node.active = !isMenu;
        this.testList.node.active = isMenu;
        if (isMenu) {
            if (this.contentPos) {
                this.testList.setContentPosition(this.contentPos);
            }
        }
        else {
            this.sceneTitle.string = url.replace('db://assets/cases/', '');
        }

        this._isLoadingScene = false;
    },

    _getAdjacentScenes () {
        let res = { next: '', prev: '' };
        let sceneList = this.sceneList.sceneList;

        function findAvailableScene (startIndex, step) {
            for (var i = startIndex; 0 <= i && i < sceneList.length; i += step) {
                let url = sceneList[i].url;
                if (url) {
                    let sceneName = cc.path.basename(url, '.fire');
                    let available = TipsManager.hasSupport(sceneName, true);
                    if (available) {
                        return url;
                    }
                }
            }
            return MainScene;
        }

        if (this.currentSceneUrl.endsWith(MainScene)) {
            res.next = findAvailableScene(0, 1);
            res.prev = findAvailableScene(sceneList.length - 1, -1);
        }
        else {
            // findIndex
            let i = -1;
            sceneList.some((item, index) => {
                if (item.url === this.currentSceneUrl) {
                    i = index;
                    return true;
                }
                return false;
            });

            if (i !== -1) {
                res.next = findAvailableScene(i + 1, 1);
                res.prev = findAvailableScene(i - 1, -1);
            }
        }
        return res;
    },

    nextScene () {
        let { next } = this._getAdjacentScenes();
        if (next) {
            this.loadScene(next);
        }
    },

    prevScene () {
        let { prev } = this._getAdjacentScenes();
        if (prev) {
            this.loadScene(prev);
        }
    },

    loadInstruction: function (url) {
        let self = this;
        let urlArr = url.split('/');
        let fileName = urlArr[urlArr.length - 1].replace('.fire', '');
        cc.loader.loadRes('readme/' + fileName, cc.TextAsset, function (err, asset) {
            if (err) {
                self.text.string = i18n.t("scripts/Global/Menu.js.1");
                return;
            }
            self.text.string = asset.text;
        });
    },

    showReadme: function (event, active) {
        if (active === undefined) {
            active = !this.readme.node.active;
        }

        this.readme.node.active = active;
        if (active) {
            this.readme.scrollToTop();
        }

        // en: fix Collider DebugDraw always displayed on top of the problem.
        // zh：解决 Collider DebugDraw 一直显示在最上层的问题。
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.node.active) {
            this.showDebugDraw = enabledDebugDraw;
            cc.director.getCollisionManager().enabledDebugDraw = false;
        }
        else {
            cc.director.getCollisionManager().enabledDebugDraw = this.showDebugDraw;
        }

        // en: fix Video Player always displayed on top of the problem.
        // zh：修复 Video Player 一直显示在最上层的问题。
        var videoPlayer = cc.find('Canvas/VideoPlayer');
        if (videoPlayer) {
            videoPlayer.active = !this.readme.node.active;
        }
    },

    restart: function () {
        cc.game.restart();
    },
    
    gc: function () {
        cc.sys.garbageCollect();
    }
});
