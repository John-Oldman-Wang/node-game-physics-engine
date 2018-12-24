var Class = require('../../utils/Class');

var Animation = new Class({
  initialize: function Animation(parent) {
    this.parent = parent;

    this.animationManager = parent.scene.sys.anims;

    this.animationManager.once('remove', this.remove, this);

    this.isPlaying = false;

    this.currentAnim = null;

    this.currentFrame = null;

    this._timeScale = 1;

    this.frameRate = 0;

    this.duration = 0;

    this.msPerFrame = 0;

    this.skipMissedFrames = true;

    this._delay = 0;

    this._repeat = 0;

    this._repeatDelay = 0;

    this._yoyo = false;

    this.forward = true;

    this._reverse = false;

    this.accumulator = 0;

    this.nextTick = 0;

    this.repeatCounter = 0;

    this.pendingRepeat = false;

    this._paused = false;

    this._wasPlaying = false;

    this._pendingStop = 0;

    this._pendingStopValue;
  },

  setDelay: function(value) {
    if (value === undefined) {
      value = 0;
    }

    this._delay = value;

    return this.parent;
  },

  getDelay: function() {
    return this._delay;
  },

  delayedPlay: function(delay, key, startFrame) {
    this.play(key, true, startFrame);

    this.nextTick += delay;

    return this.parent;
  },

  getCurrentKey: function() {
    if (this.currentAnim) {
      return this.currentAnim.key;
    }
  },

  load: function(key, startFrame) {
    if (startFrame === undefined) {
      startFrame = 0;
    }

    if (this.isPlaying) {
      this.stop();
    }

    //  Load the new animation in
    this.animationManager.load(this, key, startFrame);

    return this.parent;
  },

  pause: function(atFrame) {
    if (!this._paused) {
      this._paused = true;
      this._wasPlaying = this.isPlaying;
      this.isPlaying = false;
    }

    if (atFrame !== undefined) {
      this.updateFrame(atFrame);
    }

    return this.parent;
  },

  resume: function(fromFrame) {
    if (this._paused) {
      this._paused = false;
      this.isPlaying = this._wasPlaying;
    }

    if (fromFrame !== undefined) {
      this.updateFrame(fromFrame);
    }

    return this.parent;
  },

  isPaused: {
    get: function() {
      return this._paused;
    }
  },

  play: function(key, ignoreIfPlaying, startFrame) {
    if (ignoreIfPlaying === undefined) {
      ignoreIfPlaying = false;
    }
    if (startFrame === undefined) {
      startFrame = 0;
    }

    if (ignoreIfPlaying && this.isPlaying && this.currentAnim.key === key) {
      return this.parent;
    }

    this.forward = true;
    this._reverse = false;

    return this._startAnimation(key, startFrame);
  },

  playReverse: function(key, ignoreIfPlaying, startFrame) {
    if (ignoreIfPlaying === undefined) {
      ignoreIfPlaying = false;
    }
    if (startFrame === undefined) {
      startFrame = 0;
    }

    if (ignoreIfPlaying && this.isPlaying && this.currentAnim.key === key) {
      return this.parent;
    }

    this.forward = false;
    this._reverse = true;

    return this._startAnimation(key, startFrame);
  },

  _startAnimation: function(key, startFrame) {
    this.load(key, startFrame);

    var anim = this.currentAnim;
    var gameObject = this.parent;

    //  Should give us 9,007,199,254,740,991 safe repeats
    this.repeatCounter = this._repeat === -1 ? Number.MAX_VALUE : this._repeat;

    anim.getFirstTick(this);

    this.isPlaying = true;
    this.pendingRepeat = false;

    if (anim.showOnStart) {
      gameObject.visible = true;
    }

    gameObject.emit('animationstart', this.currentAnim, this.currentFrame, gameObject);

    return gameObject;
  },

  reverse: function(key) {
    if (!this.isPlaying || this.currentAnim.key !== key) {
      return this.parent;
    }
    this._reverse = !this._reverse;
    this.forward = !this.forward;

    return this.parent;
  },

  getProgress: function() {
    var p = this.currentFrame.progress;

    if (!this.forward) {
      p = 1 - p;
    }

    return p;
  },

  setProgress: function(value) {
    if (!this.forward) {
      value = 1 - value;
    }

    this.setCurrentFrame(this.currentAnim.getFrameByProgress(value));

    return this.parent;
  },

  remove: function(key, animation) {
    if (animation === undefined) {
      animation = this.currentAnim;
    }

    if (this.isPlaying && animation.key === this.currentAnim.key) {
      this.stop();

      this.setCurrentFrame(this.currentAnim.frames[0]);
    }
  },

  getRepeat: function() {
    return this._repeat;
  },

  setRepeat: function(value) {
    this._repeat = value;

    this.repeatCounter = 0;

    return this.parent;
  },

  getRepeatDelay: function() {
    return this._repeatDelay;
  },

  setRepeatDelay: function(value) {
    this._repeatDelay = value;

    return this.parent;
  },

  restart: function(includeDelay) {
    if (includeDelay === undefined) {
      includeDelay = false;
    }

    this.currentAnim.getFirstTick(this, includeDelay);

    this.forward = true;
    this.isPlaying = true;
    this.pendingRepeat = false;
    this._paused = false;

    //  Set frame
    this.updateFrame(this.currentAnim.frames[0]);

    var gameObject = this.parent;

    gameObject.emit('animationrestart', this.currentAnim, this.currentFrame, gameObject);

    return this.parent;
  },

  stop: function() {
    this._pendingStop = 0;

    this.isPlaying = false;

    var gameObject = this.parent;

    gameObject.emit('animationcomplete', this.currentAnim, this.currentFrame, gameObject);

    return gameObject;
  },

  stopAfterDelay: function(delay) {
    this._pendingStop = 1;
    this._pendingStopValue = delay;

    return this.parent;
  },

  stopOnRepeat: function() {
    this._pendingStop = 2;

    return this.parent;
  },

  stopOnFrame: function(frame) {
    this._pendingStop = 3;
    this._pendingStopValue = frame;

    return this.parent;
  },

  setTimeScale: function(value) {
    if (value === undefined) {
      value = 1;
    }

    this._timeScale = value;

    return this.parent;
  },

  getTimeScale: function() {
    return this._timeScale;
  },

  getTotalFrames: function() {
    return this.currentAnim.frames.length;
  },

  update: function(time, delta) {
    if (!this.currentAnim || !this.isPlaying || this.currentAnim.paused) {
      return;
    }

    this.accumulator += delta * this._timeScale;

    if (this._pendingStop === 1) {
      this._pendingStopValue -= delta;

      if (this._pendingStopValue <= 0) {
        return this.currentAnim.completeAnimation(this);
      }
    }

    if (this.accumulator >= this.nextTick) {
      this.currentAnim.setFrame(this);
    }
  },

  setCurrentFrame: function(animationFrame) {
    var gameObject = this.parent;

    this.currentFrame = animationFrame;

    gameObject.texture = animationFrame.frame.texture;
    gameObject.frame = animationFrame.frame;

    if (gameObject.isCropped) {
      gameObject.frame.updateCropUVs(gameObject._crop, gameObject.flipX, gameObject.flipY);
    }

    gameObject.setSizeToFrame();

    if (animationFrame.frame.customPivot) {
      gameObject.setOrigin(animationFrame.frame.pivotX, animationFrame.frame.pivotY);
    } else {
      gameObject.updateDisplayOrigin();
    }

    return gameObject;
  },

  updateFrame: function(animationFrame) {
    var gameObject = this.setCurrentFrame(animationFrame);

    if (this.isPlaying) {
      if (animationFrame.setAlpha) {
        gameObject.alpha = animationFrame.alpha;
      }

      var anim = this.currentAnim;

      gameObject.emit('animationupdate', anim, animationFrame, gameObject);

      if (this._pendingStop === 3 && this._pendingStopValue === animationFrame) {
        this.currentAnim.completeAnimation(this);
      }
    }
  },

  setYoyo: function(value) {
    if (value === undefined) {
      value = false;
    }

    this._yoyo = value;

    return this.parent;
  },

  getYoyo: function() {
    return this._yoyo;
  },

  destroy: function() {
    this.animationManager.off('remove', this.remove, this);

    this.animationManager = null;
    this.parent = null;

    this.currentAnim = null;
    this.currentFrame = null;
  }
});

module.exports = Animation;
