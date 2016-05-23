function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oGame;
    var _oGameOver;
    var _oLanguage;
    var _szUrlJSON;
    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_bMobile
        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        _szUrlJSON = "json/QUIZLogic.json";

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        this.loadJSON();

        //CARICARE IL FILE JSON DOPO LANCIARE LOADIMAGES
        this._loadImages();
        _bUpdate = true;
    };

    this.onLoadedJSON = function (data) {
        s_aQuestions = data;
    };

    this.loadJSON = function () {
        jQuery.getJSON(_szUrlJSON, this.onLoadedJSON);
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundtrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
              this.gotoMenu();
        }
    };


    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.ogg", "click");
            createjs.Sound.registerSound("./sounds/game_over.ogg", "gameover");
            createjs.Sound.registerSound("./sounds/guessed.ogg", "guessed");
            createjs.Sound.registerSound("./sounds/wrong.ogg", "wrong");
        } else {
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.mp3", "click");
            createjs.Sound.registerSound("./sounds/game_over.mp3", "gameover");
            createjs.Sound.registerSound("./sounds/guessed.mp3", "guessed");
            createjs.Sound.registerSound("./sounds/wrong.mp3", "wrong");
        }

        RESOURCE_TO_LOAD += 5;

    };

    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");

        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_gameover", "./sprites/bg_gameover.png");
        s_oSpriteLibrary.addSprite("load_level", "./sprites/load_level.png");

        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");

        s_oSpriteLibrary.addSprite("curtain_dx", "./sprites/curtain_dx.jpg");
        s_oSpriteLibrary.addSprite("curtain_sx", "./sprites/curtain_sx.jpg");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("logo_small", "./sprites/logo_small.png");

        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");

        s_oSpriteLibrary.addSprite("letterbox", "./sprites/letterbox.png");
        s_oSpriteLibrary.addSprite("letter", "./sprites/letter.png");
        s_oSpriteLibrary.addSprite("money_panel", "./sprites/money_panel.png");
        s_oSpriteLibrary.addSprite("level_panel", "./sprites/level_panel.png");

        s_oSpriteLibrary.addSprite("success", "./sprites/success.png");
        s_oSpriteLibrary.addSprite("mistake", "./sprites/mistake.png");

        s_oSpriteLibrary.addSprite("but_next", "./sprites/but_next.png");

        s_oSpriteLibrary.addSprite("text_copyright", "./sprites/text_copyright.png");

        s_oSpriteLibrary.addSprite("but_flag_it", "./sprites/but_flag_it.png");
        s_oSpriteLibrary.addSprite("but_flag_en", "./sprites/but_flag_en.png");
        s_oSpriteLibrary.addSprite("but_flag_fr", "./sprites/but_flag_fr.png");
        s_oSpriteLibrary.addSprite("but_flag_es", "./sprites/but_flag_es.png");
        s_oSpriteLibrary.addSprite("but_flag_ger", "./sprites/but_flag_ger.png");
        s_oSpriteLibrary.addSprite("but_flag_por", "./sprites/but_flag_por.png");

        s_oSpriteLibrary.addSprite("but_add_a_letter", "./sprites/but_add_a_letter.png");
        s_oSpriteLibrary.addSprite("but_remove_letters", "./sprites/but_remove_letters.png");
		s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
		s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");

        s_oSpriteLibrary.addSprite("ImgHome1", "./sprites/ImgHome1.png");
        s_oSpriteLibrary.addSprite("ImgHome2", "./sprites/ImgHome2.jpg");
        s_oSpriteLibrary.addSprite("ImgHome3", "./sprites/ImgHome3.jpg");
        s_oSpriteLibrary.addSprite("ImgHome4", "./sprites/ImgHome4.jpg");

        s_oSpriteLibrary.addSprite("ImgCat1", "./sprites/ImgCat1.jpg");
        s_oSpriteLibrary.addSprite("ImgCat2", "./sprites/ImgCat2.jpg");
        s_oSpriteLibrary.addSprite("ImgCat3", "./sprites/ImgCat3.jpg");
        s_oSpriteLibrary.addSprite("ImgCat4", "./sprites/ImgCat4.jpg");

        s_oSpriteLibrary.addSprite("ImgHappy1", "./sprites/ImgHappy1.jpg");
        s_oSpriteLibrary.addSprite("ImgHappy2", "./sprites/ImgHappy2.jpg");
        s_oSpriteLibrary.addSprite("ImgHappy3", "./sprites/ImgHappy3.jpg");
        s_oSpriteLibrary.addSprite("ImgHappy4", "./sprites/ImgHappy4.jpg");

        s_oSpriteLibrary.addSprite("ImgDrink1", "./sprites/ImgDrink1.jpg");
        s_oSpriteLibrary.addSprite("ImgDrink2", "./sprites/ImgDrink2.jpg");
        s_oSpriteLibrary.addSprite("ImgDrink3", "./sprites/ImgDrink3.jpg");
        s_oSpriteLibrary.addSprite("ImgDrink4", "./sprites/ImgDrink4.jpg");

        s_oSpriteLibrary.addSprite("ImgMinute1", "./sprites/ImgMinute1.jpg");
        s_oSpriteLibrary.addSprite("ImgMinute2", "./sprites/ImgMinute2.jpg");
        s_oSpriteLibrary.addSprite("ImgMinute3", "./sprites/ImgMinute3.jpg");
        s_oSpriteLibrary.addSprite("ImgMinute4", "./sprites/ImgMinute4.jpg");

        s_oSpriteLibrary.addSprite("ImgSound1", "./sprites/ImgSound1.jpg");
        s_oSpriteLibrary.addSprite("ImgSound2", "./sprites/ImgSound2.jpg");
        s_oSpriteLibrary.addSprite("ImgSound3", "./sprites/ImgSound3.jpg");
        s_oSpriteLibrary.addSprite("ImgSound4", "./sprites/ImgSound4.jpg");

        s_oSpriteLibrary.addSprite("ImgCacao1", "./sprites/ImgCacao1.jpg");
        s_oSpriteLibrary.addSprite("ImgCacao2", "./sprites/ImgCacao2.jpg");
        s_oSpriteLibrary.addSprite("ImgCacao3", "./sprites/ImgCacao3.jpg");
        s_oSpriteLibrary.addSprite("ImgCacao4", "./sprites/ImgCacao4.jpg");

        s_oSpriteLibrary.addSprite("ImgFull1", "./sprites/ImgFull1.jpg");
        s_oSpriteLibrary.addSprite("ImgFull2", "./sprites/ImgFull2.jpg");
        s_oSpriteLibrary.addSprite("ImgFull3", "./sprites/ImgFull3.jpg");
        s_oSpriteLibrary.addSprite("ImgFull4", "./sprites/ImgFull4.jpg");

        s_oSpriteLibrary.addSprite("ImgCold1", "./sprites/ImgCold1.jpg");
        s_oSpriteLibrary.addSprite("ImgCold2", "./sprites/ImgCold2.jpg");
        s_oSpriteLibrary.addSprite("ImgCold3", "./sprites/ImgCold3.jpg");
        s_oSpriteLibrary.addSprite("ImgCold4", "./sprites/ImgCold4.jpg");

        s_oSpriteLibrary.addSprite("ImgViolet1", "./sprites/ImgViolet1.jpg");
        s_oSpriteLibrary.addSprite("ImgViolet2", "./sprites/ImgViolet2.jpg");
        s_oSpriteLibrary.addSprite("ImgViolet3", "./sprites/ImgViolet3.jpg");
        s_oSpriteLibrary.addSprite("ImgViolet4", "./sprites/ImgViolet4.jpg");

        s_oSpriteLibrary.addSprite("ImgChord1", "./sprites/ImgChord1.jpg");
        s_oSpriteLibrary.addSprite("ImgChord2", "./sprites/ImgChord2.jpg");
        s_oSpriteLibrary.addSprite("ImgChord3", "./sprites/ImgChord3.jpg");
		s_oSpriteLibrary.addSprite("ImgChord4", "./sprites/ImgChord4.jpg");

        s_oSpriteLibrary.addSprite("ImgColors1", "./sprites/ImgColors1.jpg");
        s_oSpriteLibrary.addSprite("ImgColors2", "./sprites/ImgColors2.jpg");
        s_oSpriteLibrary.addSprite("ImgColors3", "./sprites/ImgColors3.jpg");
        s_oSpriteLibrary.addSprite("ImgColors4", "./sprites/ImgColors4.jpg");

        s_oSpriteLibrary.addSprite("ImgRubber1", "./sprites/ImgRubber1.jpg");
        s_oSpriteLibrary.addSprite("ImgRubber2", "./sprites/ImgRubber2.jpg");
        s_oSpriteLibrary.addSprite("ImgRubber3", "./sprites/ImgRubber3.jpg");
        s_oSpriteLibrary.addSprite("ImgRubber4", "./sprites/ImgRubber4.jpg");

        s_oSpriteLibrary.addSprite("ImgDelete1", "./sprites/ImgDelete1.jpg");
        s_oSpriteLibrary.addSprite("ImgDelete2", "./sprites/ImgDelete2.jpg");
        s_oSpriteLibrary.addSprite("ImgDelete3", "./sprites/ImgDelete3.jpg");
        s_oSpriteLibrary.addSprite("ImgDelete4", "./sprites/ImgDelete4.jpg");

        s_oSpriteLibrary.addSprite("ImgClimb1", "./sprites/ImgClimb1.jpg");
        s_oSpriteLibrary.addSprite("ImgClimb2", "./sprites/ImgClimb2.jpg");
        s_oSpriteLibrary.addSprite("ImgClimb3", "./sprites/ImgClimb3.jpg");
        s_oSpriteLibrary.addSprite("ImgClimb4", "./sprites/ImgClimb4.jpg");

        s_oSpriteLibrary.addSprite("ImgOrange1", "./sprites/ImgOrange1.jpg");
        s_oSpriteLibrary.addSprite("ImgOrange2", "./sprites/ImgOrange2.jpg");
        s_oSpriteLibrary.addSprite("ImgOrange3", "./sprites/ImgOrange3.jpg");
        s_oSpriteLibrary.addSprite("ImgOrange4", "./sprites/ImgOrange4.jpg");

        s_oSpriteLibrary.addSprite("ImgBed1", "./sprites/ImgBed1.jpg");
        s_oSpriteLibrary.addSprite("ImgBed2", "./sprites/ImgBed2.jpg");
        s_oSpriteLibrary.addSprite("ImgBed3", "./sprites/ImgBed3.jpg");
        s_oSpriteLibrary.addSprite("ImgBed4", "./sprites/ImgBed4.jpg");

        s_oSpriteLibrary.addSprite("ImgIsland1", "./sprites/ImgIsland1.jpg");
        s_oSpriteLibrary.addSprite("ImgIsland2", "./sprites/ImgIsland2.jpg");
        s_oSpriteLibrary.addSprite("ImgIsland3", "./sprites/ImgIsland3.jpg");
        s_oSpriteLibrary.addSprite("ImgIsland4", "./sprites/ImgIsland4.jpg");

        s_oSpriteLibrary.addSprite("ImgWine1", "./sprites/ImgWine1.jpg");
        s_oSpriteLibrary.addSprite("ImgWine2", "./sprites/ImgWine2.jpg");
        s_oSpriteLibrary.addSprite("ImgWine3", "./sprites/ImgWine3.jpg");
        s_oSpriteLibrary.addSprite("ImgWine4", "./sprites/ImgWine4.jpg");

        s_oSpriteLibrary.addSprite("ImgRound1", "./sprites/ImgRound1.jpg");
        s_oSpriteLibrary.addSprite("ImgRound2", "./sprites/ImgRound2.jpg");
        s_oSpriteLibrary.addSprite("ImgRound3", "./sprites/ImgRound3.jpg");
        s_oSpriteLibrary.addSprite("ImgRound4", "./sprites/ImgRound4.jpg");

        s_oSpriteLibrary.addSprite("ImgIron1", "./sprites/ImgIron1.jpg");
        s_oSpriteLibrary.addSprite("ImgIron2", "./sprites/ImgIron2.jpg");
        s_oSpriteLibrary.addSprite("ImgIron3", "./sprites/ImgIron3.jpg");
        s_oSpriteLibrary.addSprite("ImgIron4", "./sprites/ImgIron4.jpg");

        s_oSpriteLibrary.addSprite("but_menu", "./sprites/but_menu.png");

        s_oSpriteLibrary.addSprite("shadow", "./sprites/shadow_of_images.png");

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
		
		if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundtrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
              this.gotoMenu();
        }
    };

    this._onAllImagesLoaded = function () {
        
    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function (_iLang) {
        _oGame = new CGame(_iLang, _oData);
        _iState = STATE_GAME;


        $(s_oMain).trigger("game_start");
    };

    this.gotoGameOver = function (iMoney) {
        _oGameOver = new CGameOver(iMoney);

    };
    
    this.gotoLanguage = function () {
        _oLanguage = new CLanguageMenu();
        // _iState = STATE_LANGUAGE;
    };

    this.stopUpdate = function () {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");
    };

    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;
var s_oCanvas;
var s_iLanguageSelected;

var s_oSpriteSheetLora;

var s_aQuestions;

