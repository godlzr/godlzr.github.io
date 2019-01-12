/*! Built with http://stenciljs.com */
const { h } = window.ImagesViewer;

let lastId = 1;
function createOverlay(element, opts) {
  // convert the passed in overlay options into props
  // that get passed down into the new overlay
  Object.assign(element, opts);
  element.overlayId = lastId++;
  // append the overlay element to the document body
  const doc = element.ownerDocument;
  const appRoot = doc.querySelector("ion-app") || doc.body;
  appRoot.appendChild(element);
  return element.componentOnReady();
}
function dismissOverlay(data, role, overlays, id) {
  id = id >= 0 ? id : getHighestId(overlays);
  const overlay = overlays.get(id);
  if (!overlay) {
    return Promise.reject("overlay does not exist");
  }
  return overlay.dismiss(data, role);
}
function getTopOverlay(overlays) {
  return overlays.get(getHighestId(overlays));
}
function getHighestId(overlays) {
  let minimum = -1;
  overlays.forEach((_, id) => {
    if (id > minimum) {
      minimum = id;
    }
  });
  return minimum;
}
function removeLastOverlay(overlays) {
  const toRemove = getTopOverlay(overlays);
  return toRemove ? toRemove.dismiss() : Promise.resolve();
}
async function present(overlay, enterAnimation, opts) {
  if (overlay.presented) {
    return;
  }
  overlay.presented = true;
  overlay.willPresent.emit();
  // get the user's animation fn if one was provided
  const animationBuilder = enterAnimation;
  await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
  document.body.classList.add("disabledScroll");
  overlay.didPresent.emit();
}
async function dismiss(overlay, data, role, leaveAnimation, opts) {
  if (!overlay.presented) {
    return;
  }
  overlay.presented = false;
  overlay.willDismiss.emit({ data, role });
  const animationBuilder = leaveAnimation;
  await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
  document.body.classList.remove("disabledScroll");
  overlay.didDismiss.emit({ data, role });
  overlay.el.remove();
}
async function overlayAnimation(overlay, animationBuilder, baseEl, opts) {
  if (overlay.keyboardClose) {
    const activeElement = baseEl.ownerDocument.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
  }
  if (overlay.animation) {
    overlay.animation.destroy();
    overlay.animation = undefined;
  }
  const animation = (overlay.animation = await overlay.animationDelegate.create(
    animationBuilder,
    baseEl,
    opts
  ));
  overlay.animation = animation;
  if (!overlay.willAnimate) {
    animation.duration(0);
  }
  await animation.playAsync();
  animation.destroy();
  overlay.animation = undefined;
}
const BACKDROP = "backdrop";

const CSS_PROP = (function(docEle) {
  // transform
  const transformProp =
    [
      "webkitTransform",
      "-webkit-transform",
      "webkit-transform",
      "transform"
    ].find(key => docEle.style[key] !== undefined) || "transform";
  const transitionProp =
    ["webkitTransition", "transition"].find(
      key => docEle.style[key] !== undefined
    ) || "transition";
  // The only prefix we care about is webkit for transitions.
  const prefix = transitionProp.indexOf("webkit") > -1 ? "-webkit-" : "";
  return {
    transitionDurationProp: prefix + "transition-duration",
    transitionTimingFnProp: prefix + "transition-timing-function",
    transformProp,
    transitionProp
  };
})(document.documentElement);
const CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
const DURATION_MIN = 32;
const TRANSITION_END_FALLBACK_PADDING_MS = 400;

function transitionEnd(el, callback) {
  let unRegTrans;
  const opts = { passive: true };
  function unregister() {
    unRegTrans && unRegTrans();
  }
  function onTransitionEnd(ev) {
    if (el === ev.target) {
      unregister();
      callback(ev);
    }
  }
  if (el) {
    el.addEventListener("webkitTransitionEnd", onTransitionEnd, opts);
    el.addEventListener("transitionend", onTransitionEnd, opts);
    unRegTrans = function() {
      el.removeEventListener("webkitTransitionEnd", onTransitionEnd, opts);
      el.removeEventListener("transitionend", onTransitionEnd, opts);
    };
  }
  return unregister;
}

const TRANSFORM_PROPS = {
  translateX: 1,
  translateY: 1,
  translateZ: 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  rotate: 1,
  rotateX: 1,
  rotateY: 1,
  rotateZ: 1,
  skewX: 1,
  skewY: 1,
  perspective: 1
};
const raf = window.requestAnimationFrame || (f => f());
class Animator {
  constructor() {
    this._hasDur = false;
    this._hasTweenEffect = false;
    this._isAsync = false;
    this._isReverse = false;
    this._destroyed = false;
    this.hasChildren = false;
    this.isPlaying = false;
    this.hasCompleted = false;
  }
  addElement(el) {
    if (el) {
      if (el.length) {
        for (let i = 0; i < el.length; i++) {
          this._addEl(el[i]);
        }
      } else {
        this._addEl(el);
      }
    }
    return this;
  }
  /**
   * NO DOM
   */
  _addEl(el) {
    if (el.nodeType === 1) {
      (this._elements = this._elements || []).push(el);
    }
  }
  /**
   * Add a child animation to this animation.
   */
  add(childAnimation) {
    childAnimation.parent = this;
    this.hasChildren = true;
    (this._childAnimations = this._childAnimations || []).push(childAnimation);
    return this;
  }
  /**
   * Get the duration of this animation. If this animation does
   * not have a duration, then it'll get the duration from its parent.
   */
  getDuration(opts) {
    if (opts && opts.duration != null) {
      return opts.duration;
    } else if (this._duration != null) {
      return this._duration;
    } else if (this.parent) {
      return this.parent.getDuration();
    }
    return 0;
  }
  /**
   * Returns if the animation is a root one.
   */
  isRoot() {
    return !this.parent;
  }
  /**
   * Set the duration for this animation.
   */
  duration(milliseconds) {
    this._duration = milliseconds;
    return this;
  }
  /**
   * Get the easing of this animation. If this animation does
   * not have an easing, then it'll get the easing from its parent.
   */
  getEasing() {
    if (this._isReverse && this._reversedEasingName) {
      return this._reversedEasingName;
    }
    return this._easingName != null
      ? this._easingName
      : (this.parent && this.parent.getEasing()) || null;
  }
  /**
   * Set the easing for this animation.
   */
  easing(name) {
    this._easingName = name;
    return this;
  }
  /**
   * Set the easing for this reversed animation.
   */
  easingReverse(name) {
    this._reversedEasingName = name;
    return this;
  }
  /**
   * Add the "from" value for a specific property.
   */
  from(prop, val) {
    this._addProp("from", prop, val);
    return this;
  }
  /**
   * Add the "to" value for a specific property.
   */
  to(prop, val, clearProperyAfterTransition) {
    const fx = this._addProp("to", prop, val);
    if (clearProperyAfterTransition) {
      // if this effect is a transform then clear the transform effect
      // otherwise just clear the actual property
      this.afterClearStyles([fx.trans ? CSS_PROP.transformProp : prop]);
    }
    return this;
  }
  /**
   * Shortcut to add both the "from" and "to" for the same property.
   */
  fromTo(prop, fromVal, toVal, clearProperyAfterTransition) {
    return this.from(prop, fromVal).to(
      prop,
      toVal,
      clearProperyAfterTransition
    );
  }
  /**
   * NO DOM
   */
  _getProp(name) {
    if (this._fxProperties) {
      return this._fxProperties.find(prop => prop.effectName === name);
    }
    return undefined;
  }
  _addProp(state, prop, val) {
    let fxProp = this._getProp(prop);
    if (!fxProp) {
      // first time we've see this EffectProperty
      const shouldTrans = TRANSFORM_PROPS[prop] === 1;
      fxProp = {
        effectName: prop,
        trans: shouldTrans,
        // add the will-change property for transforms or opacity
        wc: shouldTrans ? CSS_PROP.transformProp : prop
      };
      (this._fxProperties = this._fxProperties || []).push(fxProp);
    }
    // add from/to EffectState to the EffectProperty
    const fxState = {
      val: val,
      num: 0,
      effectUnit: ""
    };
    fxProp[state] = fxState;
    if (typeof val === "string" && val.indexOf(" ") < 0) {
      const r = val.match(CSS_VALUE_REGEX);
      if (r) {
        const num = parseFloat(r[1]);
        if (!isNaN(num)) {
          fxState.num = num;
        }
        fxState.effectUnit = r[0] !== r[2] ? r[2] : "";
      }
    } else if (typeof val === "number") {
      fxState.num = val;
    }
    return fxProp;
  }
  /**
   * Add CSS class to this animation's elements
   * before the animation begins.
   */
  beforeAddClass(className) {
    (this._beforeAddClasses = this._beforeAddClasses || []).push(className);
    return this;
  }
  /**
   * Remove CSS class from this animation's elements
   * before the animation begins.
   */
  beforeRemoveClass(className) {
    (this._beforeRemoveClasses = this._beforeRemoveClasses || []).push(
      className
    );
    return this;
  }
  /**
   * Sets a CSS class during the duration of the animation.
   */
  duringAddClass(className) {
    this.beforeAddClass(className);
    this.afterRemoveClass(className);
    return this;
  }
  /**
   * Set CSS inline styles to this animation's elements
   * before the animation begins.
   */
  beforeStyles(styles) {
    this._beforeStyles = styles;
    return this;
  }
  /**
   * Clear CSS inline styles from this animation's elements
   * before the animation begins.
   */
  beforeClearStyles(propertyNames) {
    this._beforeStyles = this._beforeStyles || {};
    for (let i = 0; i < propertyNames.length; i++) {
      this._beforeStyles[propertyNames[i]] = "";
    }
    return this;
  }
  /**
   * Add a function which contains DOM reads, which will run
   * before the animation begins.
   */
  beforeAddRead(domReadFn) {
    (this._readCallbacks = this._readCallbacks || []).push(domReadFn);
    return this;
  }
  /**
   * Add a function which contains DOM writes, which will run
   * before the animation begins.
   */
  beforeAddWrite(domWriteFn) {
    (this._writeCallbacks = this._writeCallbacks || []).push(domWriteFn);
    return this;
  }
  /**
   * Add CSS class to this animation's elements
   * after the animation finishes.
   */
  afterAddClass(className) {
    (this._afterAddClasses = this._afterAddClasses || []).push(className);
    return this;
  }
  /**
   * Remove CSS class from this animation's elements
   * after the animation finishes.
   */
  afterRemoveClass(className) {
    (this._afterRemoveClasses = this._afterRemoveClasses || []).push(className);
    return this;
  }
  /**
   * Set CSS inline styles to this animation's elements
   * after the animation finishes.
   */
  afterStyles(styles) {
    this._afterStyles = styles;
    return this;
  }
  /**
   * Clear CSS inline styles from this animation's elements
   * after the animation finishes.
   */
  afterClearStyles(propertyNames) {
    this._afterStyles = this._afterStyles || {};
    for (let i = 0; i < propertyNames.length; i++) {
      this._afterStyles[propertyNames[i]] = "";
    }
    return this;
  }
  /**
   * Play the animation.
   */
  play(opts) {
    const self = this;
    // If the animation was already invalidated (it did finish), do nothing
    if (self._destroyed) {
      return;
    }
    // this is the top level animation and is in full control
    // of when the async play() should actually kick off
    // if there is no duration then it'll set the TO property immediately
    // if there is a duration, then it'll stage all animations at the
    // FROM property and transition duration, wait a few frames, then
    // kick off the animation by setting the TO property for each animation
    self._isAsync = self._hasDuration(opts);
    // ensure all past transition end events have been cleared
    self._clearAsync();
    // recursively kicks off the correct progress step for each child animation
    // ******** DOM WRITE ****************
    self._playInit(opts);
    // doubling up RAFs since this animation was probably triggered
    // from an input event, and just having one RAF would have this code
    // run within the same frame as the triggering input event, and the
    // input event probably already did way too much work for one frame
    raf(() => {
      raf(() => {
        self._playDomInspect(opts);
      });
    });
  }
  playAsync(opts) {
    return new Promise(resolve => {
      this.onFinish(resolve, {
        oneTimeCallback: true,
        clearExistingCallacks: true
      });
      this.play(opts);
      return this;
    });
  }
  playSync() {
    // If the animation was already invalidated (it did finish), do nothing
    if (!this._destroyed) {
      const opts = { duration: 0 };
      this._isAsync = false;
      this._clearAsync();
      this._playInit(opts);
      this._playDomInspect(opts);
    }
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _playInit(opts) {
    // always default that an animation does not tween
    // a tween requires that an Animation class has an element
    // and that it has at least one FROM/TO effect
    // and that the FROM/TO effect can tween numeric values
    this._hasTweenEffect = false;
    this.isPlaying = true;
    this.hasCompleted = false;
    this._hasDur = this.getDuration(opts) > DURATION_MIN;
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i]._playInit(opts);
      }
    }
    if (this._hasDur) {
      // if there is a duration then we want to start at step 0
      // ******** DOM WRITE ****************
      this._progress(0);
      // add the will-change properties
      // ******** DOM WRITE ****************
      this._willChange(true);
    }
  }
  /**
   * DOM WRITE
   * NO RECURSION
   * ROOT ANIMATION
   */
  _playDomInspect(opts) {
    const self = this;
    // fire off all the "before" function that have DOM READS in them
    // elements will be in the DOM, however visibily hidden
    // so we can read their dimensions if need be
    // ******** DOM READ ****************
    // ******** DOM WRITE ****************
    self._beforeAnimation();
    // for the root animation only
    // set the async TRANSITION END event
    // and run onFinishes when the transition ends
    const dur = self.getDuration(opts);
    if (self._isAsync) {
      self._asyncEnd(dur, true);
    }
    // ******** DOM WRITE ****************
    self._playProgress(opts);
    if (self._isAsync && !this._destroyed) {
      // this animation has a duration so we need another RAF
      // for the CSS TRANSITION properties to kick in
      raf(() => {
        self._playToStep(1);
      });
    }
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _playProgress(opts) {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i]._playProgress(opts);
      }
    }
    if (this._hasDur) {
      // set the CSS TRANSITION duration/easing
      // ******** DOM WRITE ****************
      this._setTrans(this.getDuration(opts), false);
    } else {
      // this animation does not have a duration, so it should not animate
      // just go straight to the TO properties and call it done
      // ******** DOM WRITE ****************
      this._progress(1);
      // since there was no animation, immediately run the after
      // ******** DOM WRITE ****************
      this._setAfterStyles();
      // this animation has no duration, so it has finished
      // other animations could still be running
      this._didFinish(true);
    }
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _playToStep(stepValue) {
    if (!this._destroyed) {
      const children = this._childAnimations;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          // ******** DOM WRITE ****************
          children[i]._playToStep(stepValue);
        }
      }
      if (this._hasDur) {
        // browser had some time to render everything in place
        // and the transition duration/easing is set
        // now set the TO properties which will trigger the transition to begin
        // ******** DOM WRITE ****************
        this._progress(stepValue);
      }
    }
  }
  /**
   * DOM WRITE
   * NO RECURSION
   * ROOT ANIMATION
   */
  _asyncEnd(dur, shouldComplete) {
    const self = this;
    function onTransitionEnd() {
      // congrats! a successful transition completed!
      // ensure transition end events and timeouts have been cleared
      self._clearAsync();
      // ******** DOM WRITE ****************
      self._playEnd();
      // transition finished
      self._didFinishAll(shouldComplete, true, false);
    }
    function onTransitionFallback() {
      console.debug(
        "Animation onTransitionFallback, CSS onTransitionEnd did not fire!"
      );
      // oh noz! the transition end event didn't fire in time!
      // instead the fallback timer when first
      // if all goes well this fallback should never fire
      // clear the other async end events from firing
      self._timerId = undefined;
      self._clearAsync();
      // set the after styles
      // ******** DOM WRITE ****************
      self._playEnd(shouldComplete ? 1 : 0);
      // transition finished
      self._didFinishAll(shouldComplete, true, false);
    }
    // set the TRANSITION END event on one of the transition elements
    self._unregisterTrnsEnd = transitionEnd(self._transEl(), onTransitionEnd);
    // set a fallback timeout if the transition end event never fires, or is too slow
    // transition end fallback: (animation duration + XXms)
    self._timerId = setTimeout(
      onTransitionFallback,
      dur + TRANSITION_END_FALLBACK_PADDING_MS
    );
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _playEnd(stepValue) {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i]._playEnd(stepValue);
      }
    }
    if (this._hasDur) {
      if (stepValue !== null && stepValue !== undefined) {
        // too late to have a smooth animation, just finish it
        // ******** DOM WRITE ****************
        this._setTrans(0, true);
        // ensure the ending progress step gets rendered
        // ******** DOM WRITE ****************
        this._progress(stepValue);
      }
      // set the after styles
      // ******** DOM WRITE ****************
      this._setAfterStyles();
      // remove the will-change properties
      // ******** DOM WRITE ****************
      this._willChange(false);
    }
  }
  /**
   * NO DOM
   * RECURSION
   */
  _hasDuration(opts) {
    if (this.getDuration(opts) > DURATION_MIN) {
      return true;
    }
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i]._hasDuration(opts)) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * NO DOM
   * RECURSION
   */
  _hasDomReads() {
    if (this._readCallbacks && this._readCallbacks.length) {
      return true;
    }
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i]._hasDomReads()) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Immediately stop at the end of the animation.
   */
  stop(stepValue) {
    if (stepValue === undefined) {
      stepValue = 1;
    }
    // ensure all past transition end events have been cleared
    this._clearAsync();
    this._hasDur = true;
    this._playEnd(stepValue);
  }
  /**
   * NO DOM
   * NO RECURSION
   */
  _clearAsync() {
    this._unregisterTrnsEnd && this._unregisterTrnsEnd();
    this._timerId && clearTimeout(this._timerId);
    this._timerId = this._unregisterTrnsEnd = undefined;
  }
  /**
   * DOM WRITE
   * NO RECURSION
   */
  _progress(stepValue) {
    // bread 'n butter
    let val;
    const elements = this._elements;
    const effects = this._fxProperties;
    if (!elements || elements.length === 0 || !effects || this._destroyed) {
      return;
    }
    // flip the number if we're going in reverse
    if (this._isReverse) {
      stepValue = 1 - stepValue;
    }
    let i = 0;
    let j = 0;
    let finalTransform = "";
    let fx;
    for (i = 0; i < effects.length; i++) {
      fx = effects[i];
      if (fx.from && fx.to) {
        const fromNum = fx.from.num;
        const toNum = fx.to.num;
        const tweenEffect = fromNum !== toNum;
        if (tweenEffect) {
          this._hasTweenEffect = true;
        }
        if (stepValue === 0) {
          // FROM
          val = fx.from.val;
        } else if (stepValue === 1) {
          // TO
          val = fx.to.val;
        } else if (tweenEffect) {
          // EVERYTHING IN BETWEEN
          const valNum = (toNum - fromNum) * stepValue + fromNum;
          const unit = fx.to.effectUnit;
          val = valNum + unit;
        }
        if (val !== null) {
          const prop = fx.effectName;
          if (fx.trans) {
            finalTransform += prop + "(" + val + ") ";
          } else {
            for (j = 0; j < elements.length; j++) {
              // ******** DOM WRITE ****************
              elements[j].style[prop] = val;
            }
          }
        }
      }
    }
    // place all transforms on the same property
    if (finalTransform.length) {
      if (
        (!this._isReverse && stepValue !== 1) ||
        (this._isReverse && stepValue !== 0)
      ) {
        finalTransform += "translateZ(0px)";
      }
      for (i = 0; i < elements.length; i++) {
        // ******** DOM WRITE ****************
        elements[i].style[CSS_PROP.transformProp] = finalTransform;
      }
    }
  }
  /**
   * DOM WRITE
   * NO RECURSION
   */
  _setTrans(dur, forcedLinearEasing) {
    // Transition is not enabled if there are not effects
    const elements = this._elements;
    if (!elements || elements.length === 0 || !this._fxProperties) {
      return;
    }
    // set the TRANSITION properties inline on the element
    const easing = forcedLinearEasing ? "linear" : this.getEasing();
    const durString = dur + "ms";
    const cssTransform = CSS_PROP.transitionProp;
    const cssTransitionDuration = CSS_PROP.transitionDurationProp;
    const cssTransitionTimingFn = CSS_PROP.transitionTimingFnProp;
    let eleStyle;
    for (let i = 0; i < elements.length; i++) {
      eleStyle = elements[i].style;
      if (dur > 0) {
        // ******** DOM WRITE ****************
        eleStyle[cssTransform] = "";
        eleStyle[cssTransitionDuration] = durString;
        // each animation can have a different easing
        if (easing) {
          // ******** DOM WRITE ****************
          eleStyle[cssTransitionTimingFn] = easing;
        }
      } else {
        eleStyle[cssTransform] = "none";
      }
    }
  }
  /**
   * DOM READ
   * DOM WRITE
   * RECURSION
   */
  _beforeAnimation() {
    // fire off all the "before" function that have DOM READS in them
    // elements will be in the DOM, however visibily hidden
    // so we can read their dimensions if need be
    // ******** DOM READ ****************
    this._fireBeforeReadFunc();
    // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
    // fire off all the "before" function that have DOM WRITES in them
    // ******** DOM WRITE ****************
    this._fireBeforeWriteFunc();
    // stage all of the before css classes and inline styles
    // ******** DOM WRITE ****************
    this._setBeforeStyles();
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _setBeforeStyles() {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        children[i]._setBeforeStyles();
      }
    }
    const elements = this._elements;
    // before the animations have started
    // only set before styles if animation is not reversed
    if (!elements || elements.length === 0 || this._isReverse) {
      return;
    }
    const addClasses = this._beforeAddClasses;
    const removeClasses = this._beforeRemoveClasses;
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const elementClassList = el.classList;
      // css classes to add before the animation
      if (addClasses) {
        for (let j = 0; j < addClasses.length; j++) {
          // ******** DOM WRITE ****************
          elementClassList.add(addClasses[j]);
        }
      }
      // css classes to remove before the animation
      if (removeClasses) {
        for (let j = 0; j < removeClasses.length; j++) {
          // ******** DOM WRITE ****************
          elementClassList.remove(removeClasses[j]);
        }
      }
      // inline styles to add before the animation
      if (this._beforeStyles) {
        for (const prop in this._beforeStyles) {
          // ******** DOM WRITE ****************
          el.style[prop] = this._beforeStyles[prop];
        }
      }
    }
  }
  /**
   * DOM READ
   * RECURSION
   */
  _fireBeforeReadFunc() {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM READ ****************
        children[i]._fireBeforeReadFunc();
      }
    }
    const readFunctions = this._readCallbacks;
    if (readFunctions) {
      for (let i = 0; i < readFunctions.length; i++) {
        // ******** DOM READ ****************
        readFunctions[i]();
      }
    }
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _fireBeforeWriteFunc() {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i]._fireBeforeWriteFunc();
      }
    }
    const writeFunctions = this._writeCallbacks;
    if (writeFunctions) {
      for (let i = 0; i < writeFunctions.length; i++) {
        // ******** DOM WRITE ****************
        writeFunctions[i]();
      }
    }
  }
  /**
   * DOM WRITE
   */
  _setAfterStyles() {
    let i, j;
    let el;
    let elementClassList;
    const elements = this._elements;
    if (!elements) {
      return;
    }
    let prop;
    for (i = 0; i < elements.length; i++) {
      el = elements[i];
      elementClassList = el.classList;
      // remove the transition duration/easing
      // ******** DOM WRITE ****************
      el.style[CSS_PROP.transitionDurationProp] = el.style[
        CSS_PROP.transitionTimingFnProp
      ] = "";
      if (this._isReverse) {
        // finished in reverse direction
        // css classes that were added before the animation should be removed
        const beforeAddClasses = this._beforeAddClasses;
        if (beforeAddClasses) {
          for (j = 0; j < beforeAddClasses.length; j++) {
            // ******** DOM WRITE ****************
            elementClassList.remove(beforeAddClasses[j]);
          }
        }
        // css classes that were removed before the animation should be added
        const beforeRemoveClasses = this._beforeRemoveClasses;
        if (beforeRemoveClasses) {
          for (j = 0; j < beforeRemoveClasses.length; j++) {
            // ******** DOM WRITE ****************
            elementClassList.add(beforeRemoveClasses[j]);
          }
        }
        // inline styles that were added before the animation should be removed
        const beforeStyles = this._beforeStyles;
        if (beforeStyles) {
          for (prop in beforeStyles) {
            // ******** DOM WRITE ****************
            el.style[prop] = "";
          }
        }
      } else {
        // finished in forward direction
        // css classes to add after the animation
        const afterAddClasses = this._afterAddClasses;
        if (afterAddClasses) {
          for (j = 0; j < afterAddClasses.length; j++) {
            // ******** DOM WRITE ****************
            elementClassList.add(afterAddClasses[j]);
          }
        }
        // css classes to remove after the animation
        const afterRemoveClasses = this._afterRemoveClasses;
        if (afterRemoveClasses) {
          for (j = 0; j < afterRemoveClasses.length; j++) {
            // ******** DOM WRITE ****************
            elementClassList.remove(afterRemoveClasses[j]);
          }
        }
        // inline styles to add after the animation
        const afterStyles = this._afterStyles;
        if (afterStyles) {
          for (prop in afterStyles) {
            // ******** DOM WRITE ****************
            el.style[prop] = afterStyles[prop];
          }
        }
      }
    }
  }
  /**
   * DOM WRITE
   * NO RECURSION
   */
  _willChange(addWillChange) {
    let wc;
    const effects = this._fxProperties;
    let willChange;
    if (addWillChange && effects) {
      wc = [];
      for (let i = 0; i < effects.length; i++) {
        const propWC = effects[i].wc;
        if (propWC === "webkitTransform") {
          wc.push("transform", "-webkit-transform");
        } else if (propWC) {
          wc.push(propWC);
        }
      }
      willChange = wc.join(",");
    } else {
      willChange = "";
    }
    const elements = this._elements;
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        // ******** DOM WRITE ****************
        elements[i].style.willChange = willChange;
      }
    }
  }
  /**
   * Start the animation with a user controlled progress.
   */
  progressStart() {
    // ensure all past transition end events have been cleared
    this._clearAsync();
    // ******** DOM READ/WRITE ****************
    this._beforeAnimation();
    // ******** DOM WRITE ****************
    this._progressStart();
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _progressStart() {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i]._progressStart();
      }
    }
    // force no duration, linear easing
    // ******** DOM WRITE ****************
    this._setTrans(0, true);
    // ******** DOM WRITE ****************
    this._willChange(true);
  }
  /**
   * Set the progress step for this animation.
   * progressStep() is not debounced, so it should not be called faster than 60FPS.
   */
  progressStep(stepValue) {
    // only update if the last update was more than 16ms ago
    stepValue = Math.min(1, Math.max(0, stepValue));
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i].progressStep(stepValue);
      }
    }
    // ******** DOM WRITE ****************
    this._progress(stepValue);
  }
  /**
   * End the progress animation.
   */
  progressEnd(shouldComplete, currentStepValue, dur) {
    if (this._isReverse) {
      // if the animation is going in reverse then
      // flip the step value: 0 becomes 1, 1 becomes 0
      currentStepValue = 1 - currentStepValue;
    }
    const stepValue = shouldComplete ? 1 : 0;
    const diff = Math.abs(currentStepValue - stepValue);
    if (dur === undefined) {
      dur = -1;
    }
    if (dur < 0) {
      dur = this._duration || 0;
    } else if (diff < 0.05) {
      dur = 0;
    }
    this._isAsync = dur > 30;
    this._progressEnd(shouldComplete, stepValue, dur, this._isAsync);
    if (this._isAsync) {
      // for the root animation only
      // set the async TRANSITION END event
      // and run onFinishes when the transition ends
      // ******** DOM WRITE ****************
      this._asyncEnd(dur, shouldComplete);
      // this animation has a duration so we need another RAF
      // for the CSS TRANSITION properties to kick in
      if (!this._destroyed) {
        raf(() => {
          this._playToStep(stepValue);
        });
      }
    }
  }
  /**
   * DOM WRITE
   * RECURSION
   */
  _progressEnd(shouldComplete, stepValue, dur, isAsync) {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // ******** DOM WRITE ****************
        children[i]._progressEnd(shouldComplete, stepValue, dur, isAsync);
      }
    }
    if (!isAsync) {
      // stop immediately
      // set all the animations to their final position
      // ******** DOM WRITE ****************
      this._progress(stepValue);
      this._willChange(false);
      this._setAfterStyles();
      this._didFinish(shouldComplete);
    } else {
      // animate it back to it's ending position
      this.isPlaying = true;
      this.hasCompleted = false;
      this._hasDur = true;
      // ******** DOM WRITE ****************
      this._willChange(true);
      this._setTrans(dur, false);
    }
  }
  /**
   * Add a callback to fire when the animation has finished.
   */
  onFinish(callback, opts) {
    if (opts && opts.clearExistingCallacks) {
      this._onFinishCallbacks = this._onFinishOneTimeCallbacks = undefined;
    }
    if (opts && opts.oneTimeCallback) {
      this._onFinishOneTimeCallbacks = this._onFinishOneTimeCallbacks || [];
      this._onFinishOneTimeCallbacks.push(callback);
    } else {
      this._onFinishCallbacks = this._onFinishCallbacks || [];
      this._onFinishCallbacks.push(callback);
    }
    return this;
  }
  /**
   * NO DOM
   * RECURSION
   */
  _didFinishAll(
    hasCompleted,
    finishAsyncAnimations,
    finishNoDurationAnimations
  ) {
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        children[i]._didFinishAll(
          hasCompleted,
          finishAsyncAnimations,
          finishNoDurationAnimations
        );
      }
    }
    if (
      (finishAsyncAnimations && this._isAsync) ||
      (finishNoDurationAnimations && !this._isAsync)
    ) {
      this._didFinish(hasCompleted);
    }
  }
  /**
   * NO RECURSION
   */
  _didFinish(hasCompleted) {
    this.isPlaying = false;
    this.hasCompleted = hasCompleted;
    if (this._onFinishCallbacks) {
      // run all finish callbacks
      for (let i = 0; i < this._onFinishCallbacks.length; i++) {
        this._onFinishCallbacks[i](this);
      }
    }
    if (this._onFinishOneTimeCallbacks) {
      // run all "onetime" finish callbacks
      for (let i = 0; i < this._onFinishOneTimeCallbacks.length; i++) {
        this._onFinishOneTimeCallbacks[i](this);
      }
      this._onFinishOneTimeCallbacks.length = 0;
    }
  }
  /**
   * Reverse the animation.
   */
  reverse(shouldReverse) {
    if (shouldReverse === undefined) {
      shouldReverse = true;
    }
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        children[i].reverse(shouldReverse);
      }
    }
    this._isReverse = !!shouldReverse;
    return this;
  }
  /**
   * Recursively destroy this animation and all child animations.
   */
  destroy() {
    this._destroyed = true;
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        children[i].destroy();
      }
    }
    this._clearAsync();
    if (this._elements) {
      this._elements.length = 0;
    }
    if (this._readCallbacks) {
      this._readCallbacks.length = 0;
    }
    if (this._writeCallbacks) {
      this._writeCallbacks.length = 0;
    }
    this.parent = undefined;
    if (this._childAnimations) {
      this._childAnimations.length = 0;
    }
    if (this._onFinishCallbacks) {
      this._onFinishCallbacks.length = 0;
    }
    if (this._onFinishOneTimeCallbacks) {
      this._onFinishOneTimeCallbacks.length = 0;
    }
  }
  /**
   * NO DOM
   */
  _transEl() {
    // get the lowest level element that has an Animator
    const children = this._childAnimations;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const targetEl = children[i]._transEl();
        if (targetEl) {
          return targetEl;
        }
      }
    }
    return this._hasTweenEffect &&
      this._hasDur &&
      this._elements &&
      this._elements.length > 0
      ? this._elements[0]
      : null;
  }
}

class AnimationDelegate {
  create(animationBuilder, baseEl, opts) {
    if (animationBuilder) {
      return animationBuilder(Animator, baseEl, opts);
    }
    return Promise.resolve(new Animator());
  }
}

function now(ev) {
  return ev.timeStamp || Date.now();
}

let detail;
let tapCount = 0;
let typeMemory;
function addEventListener() {
  this.overlay.el.addEventListener("touchstart", startHandle.bind(this), {
    passive: false
  });
  this.overlay.el.addEventListener("touchmove", moveHandle.bind(this), {
    passive: false
  });
  this.overlay.el.addEventListener("touchend", endHandle.bind(this), {
    passive: false
  });
}
function startHandle(e) {
  if (this.overlay.animationPlaying) {
    return;
  }
  tapCount++;
  if (e.touches.length === 1) {
    if (tapCount === 1) {
      const dblTapClock = setTimeout(() => {
        if (tapCount === 1) {
          detail.currentX = detail.startX;
          detail.currentY = detail.startY;
          detail.deltaX = 0;
          detail.deltaY = 0;
          detail.startTimeStamp = now(e);
          detail.event = e;
          this.dispatchEvent("click", detail);
        }
        tapCount = 0;
        clearTimeout(dblTapClock);
      }, 300);
      detail = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startTimeStamp: now(e)
      };
    } else if (tapCount === 2) {
      detail.currentX = e.touches[0].clientX;
      detail.currentY = e.touches[0].clientY;
      detail.deltaX = detail.currentX - detail.startX;
      detail.deltaY = detail.currentY - detail.startY;
      detail.timeStamp = now(e);
      detail.event = e;
      this.dispatchEvent("doubleTap", detail);
    }
  }
  e.stopPropagation();
  e.preventDefault();
}
function moveHandle(e) {
  if (this.overlay.animationPlaying) {
    return;
  }
  tapCount = 0;
  const touches = e.touches;
  if (touches.length === 1) {
    detail.currentX = e.touches[0].clientX;
    detail.currentY = e.touches[0].clientY;
    detail.deltaX = detail.currentX - detail.startX;
    detail.deltaY = detail.currentY - detail.startY;
    detail.timeStamp = now(e);
    detail.event = e;
    if (typeMemory !== "pan") {
      this.dispatchEvent("panStart", detail);
      typeMemory = "pan";
    } else {
      this.dispatchEvent("panMove", detail);
    }
  } else if (touches.length > 1) {
    detail.currentX = e.touches[0].clientX;
    detail.currentY = e.touches[0].clientY;
    detail.deltaX = detail.currentX - detail.startX;
    detail.deltaY = detail.currentY - detail.startY;
    detail.timeStamp = now(e);
    detail.event = e;
    if (typeMemory !== "pinch") {
      this.dispatchEvent("pinchStart", detail);
      typeMemory = "pinch";
    } else {
      this.dispatchEvent("pinchMove", detail);
    }
  }
  e.stopPropagation();
  e.preventDefault();
}
function endHandle(e) {
  if (this.overlay.animationPlaying) {
    return;
  }
  detail.timeStamp = now(e);
  detail.event = e;
  if (typeMemory === "pinch") {
    this.dispatchEvent("pinchEnd", detail);
    typeMemory = "pan";
  } else if (typeMemory === "pan") {
    this.dispatchEvent("panEnd", detail);
    typeMemory = undefined;
  }
  e.stopPropagation();
  e.preventDefault();
}

class GestureDelegate {
  constructor(overlay) {
    this.overlay = overlay;
    this.callbackMap = new Map();
  }
  init() {
    addEventListener.call(this);
  }
  bind(type, callback) {
    this.callbackMap.set(type, callback.bind(this.overlay));
  }
  dispatchEvent(type, detail) {
    // this.overlay.el.querySelector('.serial-number').textContent = type;
    const handler = this.callbackMap.get(type);
    if (handler) handler.call(this.overlay, detail);
  }
}

let transformConfig;
function transformInitialize(config) {
  transformConfig = config;
}
function transformDestroy() {
  transformConfig = null;
}
function queryElements(element, index) {
  const opacityEl = element.querySelector(transformConfig.opacitySelector);
  const slideEl = element.querySelector(transformConfig.slideSelector);
  const translateEl = element
    .querySelectorAll(transformConfig.translateSelector)
    .item(index);
  const scaleEl = element
    .querySelectorAll(transformConfig.scaleSelector)
    .item(index);
  return { opacityEl, slideEl, translateEl, scaleEl };
}
/**
 * 正则提取元素transform对应属性值，保留泛型以便未来进行扩展
 * @template T
 * @param {HTMLElement} element
 * @param {string} key 属性名
 * @param {T} defaultValue 默认值
 * @returns {(number | T)}
 */
function extractTransformValue(element, key, defaultValue) {
  const pattern = new RegExp(`${key}\\((\\S*)\\)`);
  const matchResult = element.style.transform.match(pattern);
  return matchResult !== null
    ? Number(matchResult[1].replace(/px/g, ""))
    : defaultValue;
}
/**
 * 获取元素的tranform信息
 */
function getElementTransform() {
  const root = transformConfig.root;
  const rootEl = transformConfig.root.el;
  const { opacityEl, slideEl, translateEl, scaleEl } = queryElements(
    rootEl,
    root.currentImageIndex
  );
  const transformDetail = {};
  transformDetail.opacity = Number(opacityEl.style.opacity) || 1;
  transformDetail.slide = extractTransformValue(slideEl, "translateX", 0);
  transformDetail.translateX = extractTransformValue(
    translateEl,
    "translateX",
    0
  );
  transformDetail.translateY = extractTransformValue(
    translateEl,
    "translateY",
    0
  );
  transformDetail.scale = extractTransformValue(scaleEl, "scale", 1);
  transformDetail.transformOrigin = scaleEl.style.transformOrigin
    ? scaleEl.style.transformOrigin
        .replace(/px/g, "")
        .split(" ")
        .map(n => Number(n))
    : [0, 0];
  return transformDetail;
}
/**
 * 设置transform到对应元素
 * @param {TransformDetail} transformDetail
 */
function setElementTransform(transformDetail) {
  const root = transformConfig.root;
  const rootEl = transformConfig.root.el;
  const { opacityEl, slideEl, translateEl, scaleEl } = queryElements(
    rootEl,
    root.currentImageIndex
  );
  if (transformDetail.opacity !== undefined) {
    opacityEl.style.opacity = transformDetail.opacity.toString();
  }
  if (transformDetail.slide !== undefined) {
    slideEl.style.transform = `translateX(${transformDetail.slide || 0}px)`;
  }
  if (
    transformDetail.translateX !== undefined ||
    transformDetail.translateY !== undefined
  ) {
    translateEl.style.transform = `translateX(${transformDetail.translateX ||
      0}px) translateY(${transformDetail.translateY || 0}px)`;
  }
  if (transformDetail.transformOrigin !== undefined) {
    scaleEl.style.transformOrigin = `${transformDetail.transformOrigin[0]}px ${
      transformDetail.transformOrigin[1]
    }px`;
  }
  if (transformDetail.scale !== undefined) {
    scaleEl.style.transform = `scale(${transformDetail.scale})`;
  }
}

let initialScale;
let initialTranslate;
function calcInitialTranslate(baseEl) {
  if (
    this.offset.width / this.offset.height >
    baseEl.offsetWidth / baseEl.offsetHeight
  ) {
    //图片宽高比大于容器宽高比（短图）
    initialScale = this.offset.width / baseEl.offsetWidth;
  } else {
    //图片宽高比大于容器宽高比（长图）
    initialScale = this.offset.height / baseEl.offsetHeight;
  }
  const offsetTop = Math.max(
    ((baseEl.offsetHeight -
      (this.offset.height / this.offset.width) * baseEl.offsetWidth) /
      2) *
      initialScale,
    0
  );
  const offsetLeft = Math.max(
    ((baseEl.offsetWidth -
      (this.offset.width / this.offset.height) * baseEl.offsetHeight) /
      2) *
      initialScale,
    0
  );
  return [this.offset.left - offsetLeft, this.offset.top - offsetTop];
}
/**
 * Image Viewer Enter Animation
 */
function enterAnimation(Animation, baseEl) {
  const imageIndex = baseEl.imageIndex;
  //背景幕（透明度）
  const backdropAnimation = new Animation();
  backdropAnimation.addElement(baseEl.querySelector(".image-backdrop"));
  backdropAnimation.fromTo("opacity", 1);
  //图片容器（位移）
  const imageContEl = baseEl.querySelectorAll(".images-viewer-container")[
    imageIndex
  ];
  const imageContAnimation = new Animation();
  imageContAnimation.addElement(imageContEl);
  initialTranslate = calcInitialTranslate.call(this, baseEl);
  imageContAnimation.fromTo("translateX", `${initialTranslate[0]}px`, "0px");
  imageContAnimation.fromTo("translateY", `${initialTranslate[1]}px`, `0px`);
  //图片元素（缩放）
  const imageEl = imageContEl.querySelector("img");
  const imageAnimation = new Animation();
  imageAnimation.addElement(imageEl);
  imageAnimation.fromTo("scale", initialScale, "1");
  const baseAnimation = new Animation();
  const ani = baseAnimation
    .addElement(baseEl)
    // .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(260)
    .add(backdropAnimation)
    .add(imageContAnimation)
    .add(imageAnimation);
  return Promise.resolve(ani);
}
/**
 * Image Viewer Leave Animation
 */
function leaveAnimation(Animation, baseEl) {
  const imageIndex = baseEl.imageIndex;
  const transformDetail = getElementTransform();
  //背景幕（透明度）
  const backdropEl = baseEl.querySelector(".image-backdrop");
  const backdropAnimation = new Animation();
  backdropAnimation.addElement(backdropEl);
  backdropAnimation.fromTo("opacity", transformDetail.opacity, 0);
  //图片容器（位移）
  const imageContainerEl = baseEl.querySelectorAll(".images-viewer-container")[
    imageIndex
  ];
  const imageContAnimation = new Animation();
  imageContAnimation.addElement(imageContainerEl);
  imageContAnimation.fromTo(
    "translateX",
    `${transformDetail.translateX}px`,
    `${initialTranslate[0]}px`
  );
  imageContAnimation.fromTo(
    "translateY",
    `${transformDetail.translateY}px`,
    `${initialTranslate[1]}px`
  );
  //图片元素（缩放）
  const imageEl = baseEl.querySelector(
    ".images-viewer-item.active>.images-viewer-container img"
  );
  const imageAnimation = new Animation();
  imageAnimation.addElement(imageEl);
  if (imageIndex === this.currentImageIndex) {
    imageAnimation.fromTo("scale", transformDetail.scale, initialScale);
    imageAnimation.fromTo(
      "transformOrigin",
      transformDetail.transformOrigin,
      "0px 0px 0px"
    );
  } else {
    imageAnimation.fromTo("opacity", 1, 0);
  }
  const baseAnimation = new Animation();
  const ani = baseAnimation
    .addElement(baseEl)
    .duration(260)
    .add(backdropAnimation)
    .add(imageContAnimation)
    .add(imageAnimation);
  return Promise.resolve(ani);
}

/**
 * 获取指定元素到屏幕上边界、左边界的距离
 * @param {HTMLElement} element 指定元素
 * @memberof ShowcasePanel
 */
function getOffset(element) {
  let top = 0,
    left = 0,
    width = element.offsetWidth,
    height = element.offsetHeight;
  while (element && element.tagName !== "BODY") {
    top += element.offsetTop;
    left += element.offsetLeft;
    top -= element.scrollTop;
    left -= element.scrollLeft;
    element = element.offsetParent;
  }
  top -= document.documentElement.scrollTop;
  left -= document.documentElement.scrollLeft;
  return { top, left, width, height };
}

function clickHandler() {
  this.dismiss();
}

/**
 * 计算图片实际缩放原点（三变量：上一次缩放的原点、缩放值、偏移量）
 */
function calcScaleOrigin(touches) {
  const imageContEl = this.el.querySelector(
    ".images-viewer-item.active>.images-viewer-container"
  );
  const imageEl = imageContEl.querySelector("img");
  const preTranslate = imageContEl.style.transform
    ? imageContEl.style.transform.match(/[-]?[0-9]+[.]?[0-9]*/g)
    : ["0", "0"];
  const preOrigin = imageEl.style.transformOrigin
    ? imageEl.style.transformOrigin.replace(/px/g, "").split(" ")
    : ["0", "0"];
  const preScale = imageEl.style.transform
    ? Number(imageEl.style.transform.match(/[-]?[0-9]+[.]?[0-9]*/g)[0])
    : 1;
  const touchXcenter = Math.abs((touches[0].clientX + touches[1].clientX) / 2);
  const touchYcenter =
    Math.abs((touches[0].clientY + touches[1].clientY) / 2) -
    getOffset(imageContEl).top;
  //去掉偏移量的影响
  let nextXcenter = touchXcenter - Number(preTranslate[0]);
  let nextYcenter = touchYcenter - Number(preTranslate[1]);
  //去掉上次缩放原点、缩放值的影响
  nextXcenter =
    (nextXcenter - Number(preOrigin[0])) / preScale + Number(preOrigin[0]);
  nextYcenter =
    (nextYcenter - Number(preOrigin[1])) / preScale + Number(preOrigin[1]);
  return [nextXcenter, nextYcenter];
}

function doubleTapHandler(detail) {
  const transformDetail = getElementTransform();
  if (transformDetail.scale === 1) {
    const touches = [detail.event.touches[0], detail.event.touches[0]];
    const transformOrigin = calcScaleOrigin.call(this, touches);
    scale.call(this, this.maxScale, transformOrigin);
  } else {
    resetScale.call(this);
  }
}
async function scale(ratio, transformOrigin) {
  const scaleAnimation = (Animation, _) => {
    const imageAnimation = new Animation();
    const imageEl = this.el.querySelector(
      ".images-viewer-item.active>.images-viewer-container>img"
    );
    imageEl.style.transformOrigin = `${transformOrigin[0]}px ${
      transformOrigin[1]
    }px`;
    imageAnimation.addElement(imageEl);
    imageAnimation.fromTo("scale", 1, ratio);
    imageAnimation.duration(200);
    return Promise.resolve(imageAnimation);
  };
  const animation = await this.animationDelegate.create(scaleAnimation);
  animation.playAsync();
}
async function resetScale() {
  const resetAnimation = (Animation, _) => {
    const contAnimation = new Animation();
    const imageAnimation = new Animation();
    const imageContEl = this.el.querySelector(
      ".images-viewer-item.active>.images-viewer-container"
    );
    const imageEl = imageContEl.querySelector("img");
    const transformDetail = getElementTransform();
    contAnimation.addElement(imageContEl);
    imageAnimation.addElement(imageEl);
    contAnimation.fromTo(
      "translateX",
      `${transformDetail.translateX}px`,
      `0px`
    );
    contAnimation.fromTo(
      "translateY",
      `${transformDetail.translateY}px`,
      `0px`
    );
    imageAnimation.fromTo("scale", transformDetail.scale, 1);
    contAnimation.duration(300).add(imageAnimation);
    return Promise.resolve(contAnimation);
  };
  const animation = await this.animationDelegate.create(resetAnimation);
  animation.playAsync();
}

let type;
/**
 * 图片未放大情况下处理x轴的滑动，实现切换图片操作
 */
var XAxisHandlers;
(function(XAxisHandlers) {
  function startHandle() {}
  XAxisHandlers.startHandle = startHandle;
  /**
   * X轴拖拽移动handler
   */
  function moveHandle(detail) {
    const moveOffset = detail.deltaX;
    const resumeTranslateOffset = getCurrentTranslateOffset.call(this);
    const transformDetail = { slide: moveOffset + resumeTranslateOffset };
    setElementTransform(transformDetail);
  }
  XAxisHandlers.moveHandle = moveHandle;
  /**
   * x轴拖拽停止handler，判断是否需要切换图片（1、滑动超过屏幕一半宽度；2、快速滑动），否则还原
   */
  async function endHandle(detail) {
    const moveOffset = detail.deltaX;
    const time = detail.timeStamp - detail.startTimeStamp;
    if (
      (moveOffset > this.el.offsetWidth / 2 ||
        (moveOffset > 0 && time < 300)) &&
      this.currentImageIndex > 0
    ) {
      this.currentImageIndex--;
    } else if (
      (-moveOffset > this.el.offsetWidth / 2 ||
        (moveOffset < 0 && time < 300)) &&
      this.currentImageIndex < this.imageUrls.length - 1
    ) {
      this.currentImageIndex++;
    }
    const xtouchEndAnimation = (Animation, _) => {
      const deckAnimation = new Animation();
      const ImagesViewerDeckEl = this.el.querySelector(".images-viewer-deck");
      const currentTranslateXOffset = ImagesViewerDeckEl.style.transform.match(
        /[-]?[0-9]+[.]?[0-9]*/g
      )[0];
      const resumeTranslateOffset = getCurrentTranslateOffset.call(this);
      deckAnimation.addElement(ImagesViewerDeckEl);
      deckAnimation.fromTo(
        "translateX",
        `${currentTranslateXOffset}px`,
        `${resumeTranslateOffset}px`
      );
      const ani = deckAnimation
        .easing("cubic-bezier(.36,.66,.04,1)")
        .duration(300);
      return Promise.resolve(ani);
    };
    const animation = await this.animationDelegate.create(xtouchEndAnimation);
    this.animationPlaying = true;
    await animation.playAsync();
    this.animationPlaying = false;
  }
  XAxisHandlers.endHandle = endHandle;
  /**
   * 计算当前图片原本滚动的位置
   */
  function getCurrentTranslateOffset() {
    if (this.currentImageIndex !== undefined) {
      return -this.currentImageIndex * (document.body.offsetWidth + 20);
    } else {
      return -this.imageIndex * (document.body.offsetWidth + 20);
    }
  }
})(XAxisHandlers || (XAxisHandlers = {}));
/**
 * 图片未放大情况下处理y轴的滑动，实现渐进退出
 */
var YAxisHandlers;
(function(YAxisHandlers) {
  /**
   * y轴拖拽开始handler
   */
  function startHandle(detail) {
    const imageItemEl = this.el.querySelector(".images-viewer-item.active");
    const imageEl = imageItemEl.querySelector("img");
    const currentImageOffset = getOffset(imageEl);
    imageEl.style.transformOrigin = `${detail.startX}px ${detail.startY -
      currentImageOffset.top}px`;
  }
  YAxisHandlers.startHandle = startHandle;
  /**
   * y轴拖拽移动handler
   */
  function moveHandle(detail) {
    const yMoveOffset = detail.deltaY;
    const xMoveOffset = detail.deltaX;
    const halfHeight = this.el.offsetHeight / 2;
    const transformDetail = {
      opacity: 1 - (0.7 * (yMoveOffset >= 0 ? yMoveOffset : 0)) / halfHeight,
      translateX: xMoveOffset,
      translateY: yMoveOffset,
      scale: 1 - (0.4 * (yMoveOffset >= 0 ? yMoveOffset : 0)) / halfHeight
    };
    setElementTransform(transformDetail);
  }
  YAxisHandlers.moveHandle = moveHandle;
  /**
   * y轴拖拽停止handler，判断是否退出，否则还原
   */
  async function endHandle(detail) {
    //快速滑动（滑动时间小于500毫秒）或滑动过长时退出
    const time = detail.timeStamp - detail.startTimeStamp;
    const moveOffset = detail.deltaY;
    const halfHeight = this.el.offsetHeight / 2;
    if ((moveOffset > 0 && time < 300) || moveOffset > (3 * halfHeight) / 4) {
      this.dismiss();
      return;
    }
    const ytouchEndAnimation = (Animation, _) => {
      const backdropAnimation = new Animation();
      const contAnimation = new Animation();
      const imageAnimation = new Animation();
      const backdropEl = this.el.querySelector(".image-backdrop");
      const ImagesViewerContEl = this.el.querySelector(
        ".images-viewer-item.active>.images-viewer-container"
      );
      const imageEl = ImagesViewerContEl.querySelector("img");
      const currentOpacity = backdropEl.style.opacity;
      const currentTransform = ImagesViewerContEl.style.transform.match(
        /[-]?[0-9]+[.]?[0-9]*/g
      );
      const currentTranslateXOffset = currentTransform[0];
      const currentTranslateYOffset = currentTransform[1];
      const currentScale = imageEl.style.transform.match(
        /[-]?[0-9]+[.]?[0-9]*/g
      )[0];
      backdropAnimation.addElement(backdropEl);
      contAnimation.addElement(ImagesViewerContEl);
      imageAnimation.addElement(imageEl);
      backdropAnimation.fromTo("opacity", currentOpacity, "1");
      contAnimation.fromTo("translateX", `${currentTranslateXOffset}px`, `0px`);
      contAnimation.fromTo("translateY", `${currentTranslateYOffset}px`, `0px`);
      imageAnimation.fromTo("scale", `${currentScale}`, "1");
      const ani = backdropAnimation
        // .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(200)
        .add(contAnimation)
        .add(imageAnimation);
      return Promise.resolve(ani);
    };
    const animation = await this.animationDelegate.create(
      ytouchEndAnimation.bind(this)
    );
    animation.playAsync();
  }
  YAxisHandlers.endHandle = endHandle;
})(YAxisHandlers || (YAxisHandlers = {}));
/**
 * 图片放大状态下实现拖拽
 */
var DragHandlers;
(function(DragHandlers) {
  let startTransformDetail;
  function startHandle() {
    startTransformDetail = getElementTransform();
  }
  DragHandlers.startHandle = startHandle;
  function moveHandle(detail) {
    const deltaX = detail.deltaX;
    const deltaY = detail.deltaY;
    const newTransformDetail = {
      translateX: deltaX + startTransformDetail.translateX,
      translateY: deltaY + startTransformDetail.translateY
    };
    setElementTransform(newTransformDetail);
  }
  DragHandlers.moveHandle = moveHandle;
  function endHandle() {}
  DragHandlers.endHandle = endHandle;
})(DragHandlers || (DragHandlers = {}));
const gestureMap = new Map([
  ["x", XAxisHandlers],
  ["y", YAxisHandlers],
  ["drag", DragHandlers]
]);
function panStartHandler(detail) {
  const transformDetail = getElementTransform();
  if (transformDetail.scale > 1) {
    type = "drag";
  } else {
    if (Math.abs(detail.deltaX) > Math.abs(detail.deltaY) / 2) {
      type = "x";
    } else {
      type = "y";
    }
  }
  gestureMap.get(type).startHandle.call(this, detail);
}
function panMoveHandler(detail) {
  gestureMap.get(type).moveHandle.call(this, detail);
}
function panEndHandler(detail) {
  gestureMap.get(type).endHandle.call(this, detail);
  type = undefined;
}

let initialOffset;
let initialOrigin;
let initialTranslate$1;
let currentTransformDetail;
/**双指缩放图片中 */
let isZooming = false;
/**最小缩放倍数 */
let minScale = 1;
function pinchStartHandler() {
  console.log(">>>>>>>>>>>>>>>>>.");
}
function pinchMoveHandler(detail) {
  const touches = detail.event.touches;
  const offsetX = touches[0].clientX - touches[1].clientX;
  const offsetY = touches[0].clientY - touches[1].clientY;
  const offset = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
  const translateX = (touches[0].clientX + touches[1].clientX) / 2;
  const translateY = (touches[0].clientY + touches[1].clientY) / 2;
  const translate = { translateX, translateY };
  console.log("><>>>>>", isZooming);
  if (!isZooming) {
    const newOrigin = calcScaleOrigin.call(this, touches);
    currentTransformDetail = getElementTransform();
    if (currentTransformDetail.scale !== 1) {
      redistribute(newOrigin);
      //应用新样式后重新获取新样式
      currentTransformDetail = getElementTransform();
    }
    initialOffset = offset;
    initialOrigin = newOrigin;
    initialTranslate$1 = translate;
    isZooming = true;
  }
  let scale = (offset / initialOffset) * currentTransformDetail.scale;
  if (scale > this.maxScale) {
    scale = this.maxScale;
  } else if (scale < minScale) {
    scale = minScale;
  }
  const transformDetail = {
    translateX:
      translate.translateX -
      initialTranslate$1.translateX +
      currentTransformDetail.translateX,
    translateY:
      translate.translateY -
      initialTranslate$1.translateY +
      currentTransformDetail.translateY,
    transformOrigin: initialOrigin,
    scale
  };
  setElementTransform(transformDetail);
}
function pinchEndHandler() {
  currentTransformDetail = initialOffset = initialOrigin = initialTranslate$1 = undefined;
  isZooming = false;
}
/**
 * 通过传入新的缩放原点计算出以新缩放原点进行缩放的新样式，并与老样式保持视觉效果不变
 */
function redistribute(newTransformOrigin) {
  const transformDetail = getElementTransform();
  const [offsetLeft, offsetTop] = transformDetail.transformOrigin;
  const [newOffsetLeft, newOffsetTop] = newTransformOrigin;
  const translateX = (transformDetail.scale - 1) * (newOffsetLeft - offsetLeft);
  const translateY = (transformDetail.scale - 1) * (newOffsetTop - offsetTop);
  const newTransformDetail = transformDetail;
  newTransformDetail.transformOrigin = newTransformOrigin;
  newTransformDetail.translateX = transformDetail.translateX + translateX;
  newTransformDetail.translateY = transformDetail.translateY + translateY;
  setElementTransform(newTransformDetail);
}

class ImagesViewer {
  constructor() {
    this.presented = false;
    this.animationPlaying = false;
    this.animationDelegate = new AnimationDelegate();
    this.gestureDelegate = new GestureDelegate(this);
    this.keyboardClose = true;
    /**
     * If true, the image viewer will be dismissed when the backdrop is clicked. Defaults to `true`.
     */
    this.enableBackdropDismiss = true;
    /**
     * If true, the image viewer will be translucent. Defaults to `false`.
     */
    this.translucent = false;
    /**
     * If true, the image viewer will animate. Defaults to `true`.
     */
    this.willAnimate = true;
  }
  /**当前滚动至的图片序号 */
  set currentImageIndex(value) {
    const preActItemEl = this.el.querySelector(".images-viewer-item.active");
    if (preActItemEl) {
      preActItemEl.className = "images-viewer-item";
    }
    const nextActItemEl = this.el
      .querySelectorAll(".images-viewer-item")
      .item(value);
    if (nextActItemEl) {
      nextActItemEl.className = "images-viewer-item active";
      this.el.querySelector(".serial-number").textContent = `${value + 1}/${
        this.imageUrls.length
      }`;
    }
    this._currentImageIndex = value;
  }
  get currentImageIndex() {
    if (this._currentImageIndex !== undefined) {
      return this._currentImageIndex;
    } else {
      return this.imageIndex;
    }
  }
  onBackdropTap() {
    this.dismiss(null, BACKDROP);
  }
  /**
   * Present the image viewer overlay after it has been created.
   */
  present() {
    return present(this, enterAnimation.bind(this)).then(this.init.bind(this));
  }
  /**
   * Dismiss the image viewer overlay after it has been presented.
   */
  dismiss(data, role) {
    return dismiss(this, data, role, leaveAnimation.bind(this)).then(
      this.destroy.bind(this)
    );
  }
  initGestureHandlers() {
    this.gestureDelegate.bind("click", clickHandler);
    this.gestureDelegate.bind("doubleTap", doubleTapHandler);
    this.gestureDelegate.bind("panStart", panStartHandler);
    this.gestureDelegate.bind("panMove", panMoveHandler);
    this.gestureDelegate.bind("panEnd", panEndHandler);
    this.gestureDelegate.bind("pinchStart", pinchStartHandler);
    this.gestureDelegate.bind("pinchMove", pinchMoveHandler);
    this.gestureDelegate.bind("pinchEnd", pinchEndHandler);
  }
  initTransformHelper() {
    const transformConfig = {
      root: this,
      opacitySelector: ".image-backdrop",
      slideSelector: ".images-viewer-deck",
      translateSelector: ".images-viewer-container",
      scaleSelector: ".images-viewer-container>img"
    };
    transformInitialize(transformConfig);
  }
  init() {
    this.initTransformHelper();
    this.initGestureHandlers();
    this.gestureDelegate.init();
    this.el.classList.add("activated");
  }
  destroy() {
    transformDestroy();
    this.el.classList.remove("activated");
  }
  render() {
    const imageEl = this.event.target;
    this.offset = getOffset(imageEl);
    const translateOffset = -this.imageIndex * (document.body.offsetWidth + 20);
    return [
      h("div", { class: "image-backdrop" }),
      h(
        "div",
        { class: "images-viewer-wrapper" },
        h(
          "div",
          {
            class: "images-viewer-deck",
            style: { transform: `translateX(${translateOffset}px)` }
          },
          this.imageUrls.map((imageUrl, index) =>
            h(
              "div",
              {
                class:
                  index === this.imageIndex
                    ? "images-viewer-item active"
                    : "images-viewer-item"
              },
              h(
                "div",
                { class: "images-viewer-container" },
                h("img", { src: imageUrl })
              )
            )
          )
        ),
        h(
          "div",
          { class: "serial-number" },
          `${this.imageIndex + 1}/${this.imageUrls.length}`
        )
      )
    ];
  }
  static get is() {
    return "images-viewer";
  }
  static get host() {
    return {
      theme: "images-viewer"
    };
  }
  static get properties() {
    return {
      cssClass: {
        type: String,
        attr: "css-class"
      },
      dismiss: {
        method: true
      },
      el: {
        elementRef: true
      },
      enableBackdropDismiss: {
        type: Boolean,
        attr: "enable-backdrop-dismiss"
      },
      event: {
        type: "Any",
        attr: "event"
      },
      imageIndex: {
        type: Number,
        attr: "image-index"
      },
      imageUrls: {
        type: "Any",
        attr: "image-urls"
      },
      keyboardClose: {
        type: Boolean,
        attr: "keyboard-close"
      },
      maxScale: {
        type: Number,
        attr: "max-scale"
      },
      overlayId: {
        type: Number,
        attr: "overlay-id"
      },
      present: {
        method: true
      },
      translucent: {
        type: Boolean,
        attr: "translucent"
      },
      willAnimate: {
        type: Boolean,
        attr: "will-animate"
      }
    };
  }
  static get events() {
    return [
      {
        name: "ionImagesViewerDidLoad",
        method: "ionImagesViewerDidLoad",
        bubbles: true,
        cancelable: true,
        composed: true
      },
      {
        name: "ionImagesViewerDidUnload",
        method: "ionImagesViewerDidUnload",
        bubbles: true,
        cancelable: true,
        composed: true
      },
      {
        name: "imagesViewerDidPresent",
        method: "didPresent",
        bubbles: true,
        cancelable: true,
        composed: true
      },
      {
        name: "imagesViewerWillPresent",
        method: "willPresent",
        bubbles: true,
        cancelable: true,
        composed: true
      },
      {
        name: "imagesViewerWillDismiss",
        method: "willDismiss",
        bubbles: true,
        cancelable: true,
        composed: true
      },
      {
        name: "imagesViewerDidDismiss",
        method: "didDismiss",
        bubbles: true,
        cancelable: true,
        composed: true
      }
    ];
  }
  static get listeners() {
    return [
      {
        name: "ionBackdropTap",
        method: "onBackdropTap"
      }
    ];
  }
  static get style() {
    return "images-viewer {\n  display: block;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n  images-viewer img {\n    width: 100%; }\n  images-viewer .image-backdrop {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #000; }\n  images-viewer .images-viewer-wrapper {\n    pointer-events: none;\n    position: absolute;\n    z-index: 10;\n    width: 100vw;\n    height: 100vh; }\n    images-viewer .images-viewer-wrapper .images-viewer-deck {\n      position: absolute;\n      top: 0;\n      left: 0;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      images-viewer .images-viewer-wrapper .images-viewer-deck .images-viewer-item {\n        position: relative;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 100vw;\n        height: 100vh;\n        margin: 0 10px; }\n        images-viewer .images-viewer-wrapper .images-viewer-deck .images-viewer-item .images-viewer-container {\n          pointer-events: initial;\n          height: 100%; }\n          images-viewer .images-viewer-wrapper .images-viewer-deck .images-viewer-item .images-viewer-container img {\n            -o-object-fit: contain;\n            object-fit: contain;\n            width: 100%;\n            height: 100%;\n            -webkit-transform-origin: 0 0;\n            transform-origin: 0 0; }\n      images-viewer .images-viewer-wrapper .images-viewer-deck .images-viewer-item:first-child {\n        margin-left: 0; }\n      images-viewer .images-viewer-wrapper .images-viewer-deck .images-viewer-item:last-child {\n        margin-right: 0; }\n    images-viewer .images-viewer-wrapper .serial-number {\n      visibility: hidden;\n      position: absolute;\n      z-index: 11;\n      top: 10%;\n      left: 0;\n      width: 100%;\n      text-align: center;\n      color: #fff;\n      text-shadow: 0 0 3px #000; }\n\nimages-viewer.activated .serial-number {\n  visibility: visible; }\n\n.disabledScroll {\n  overflow: hidden; }";
  }
}

class ImagesViewerController {
  constructor() {
    this.ImagesViewers = new Map();
  }
  ImagesViewerWillPresent(ev) {
    this.ImagesViewers.set(ev.target.overlayId, ev.target);
  }
  ImagesViewerWillDismiss(ev) {
    this.ImagesViewers.delete(ev.target.overlayId);
  }
  escapeKeyUp() {
    removeLastOverlay(this.ImagesViewers);
  }
  /*
   * Create an action sheet overlay with action sheet options.
   */
  create(opts) {
    return createOverlay(this.doc.createElement("images-viewer"), opts);
  }
  /*
   * Dismiss the open action sheet overlay.
   */
  dismiss(data, role, ImagesViewerId = -1) {
    return dismissOverlay(data, role, this.ImagesViewers, ImagesViewerId);
  }
  /*
   * Get the most recently opened action sheet overlay.
   */
  getTop() {
    return getTopOverlay(this.ImagesViewers);
  }
  static get is() {
    return "images-viewer-controller";
  }
  static get properties() {
    return {
      create: {
        method: true
      },
      dismiss: {
        method: true
      },
      doc: {
        context: "document"
      },
      getTop: {
        method: true
      }
    };
  }
  static get listeners() {
    return [
      {
        name: "body:ionImagesViewerWillPresent",
        method: "ImagesViewerWillPresent"
      },
      {
        name: "body:ionImagesViewerWillDismiss",
        method: "ImagesViewerWillDismiss"
      },
      {
        name: "body:ionImagesViewerDidUnload",
        method: "ImagesViewerWillDismiss"
      },
      {
        name: "body:keyup.escape",
        method: "escapeKeyUp"
      }
    ];
  }
}

export { ImagesViewer, ImagesViewerController };
