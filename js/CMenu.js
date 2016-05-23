function CMenu() {
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
	var _oCreditsPanel = null;

    var _pStartPosAudio;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSpritePlay = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 + 560, oSpritePlay);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

		var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - PADDING, y: (oSprite.height / 2) + PADDING};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
			_pStartPosCredits = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:_pStartPosAudio.y};
        }else{
			_pStartPosCredits = {x: CANVAS_WIDTH - (oSprite.height / 2) - PADDING, y: (oSprite.height / 2) + PADDING};
		}

		_oButCredits = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, s_oSpriteLibrary.getSprite('but_credits'), true);
		_oButCredits.addEventListener(ON_MOUSE_UP, this._onCredits, this);

        if (s_bMobile === false) {
            _oAudioToggle.setCursorType("pointer");
            _oButPlay.setCursorType("pointer");
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(_oFade);
            _oFade = null;
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        s_oStage.removeChild(_oBg);
        _oBg = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oMenu = null;
    };
	
	this.exitFromCredits = function(){
		_oCreditsPanel = null;
	};

    this.refreshButtonPos = function (iNewX, iNewY) {
		if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
			_oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
		}
		_oButCredits.setPosition(_pStartPosCredits.x - iNewX, iNewY + _pStartPosCredits.y);
		
		if(_oCreditsPanel !== null){
			_oCreditsPanel.refreshButtonPos(iNewX, iNewY);
		}
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
	
	this._onCredits = function(){
		_oCreditsPanel = new CCreditsPanel();
	};

    this._onButPlayRelease = function () {
        this.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.play("click");
        }
        s_oMain.gotoLanguage();
    };
    s_oMenu = this;

    this._init();
}

var s_oMenu = null;