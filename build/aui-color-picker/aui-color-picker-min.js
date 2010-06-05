AUI.add("aui-color-picker",function(S){var G=S.Lang,N=G.isArray,L=G.isObject,H="colorpicker",J=S.ClassNameManager.getClassName,a=S.WidgetStdMod,I=J(H,"canvas"),b=J(H,"hue-canvas"),Q=J(H,"container"),T=J(H,"controls"),M=J(H,"panel"),R=J(H,"swatch"),D=J(H,"swatch-current"),X=J(H,"swatch-original"),U=J(H,"thumb"),O=J(H,"thumb-image"),K=J(H,"hue-thumb"),E=J(H,"hue-thumb-image"),F=J(H,"trigger"),Y='<div class="'+I+'"></div>',W='<span class="'+b+'"></span>',P='<div class="'+R+'"></div>',d='<div class="'+D+'"></div>',C='<div class="'+X+'"></div>',V='<div class="'+U+'"><div class="'+O+'"></div></div>',Z='<span class="'+K+'"><span class="'+E+'"></span></span>';var c={real2dec:function(e){var A=this;return Math.min(255,Math.round(e*256));},hsv2rgb:function(l,k,n){var r=this;if(N(l)){return r.hsv2rgb.apply(r,l);}else{if(L(l)){k=l.saturation;n=l.value;l=l.hue;}}l=r.constrainTo(l,0,360,0);n=r.constrainTo(n,0,1,0);k=r.constrainTo(k,0,1,0);var g,h,o,j=Math.floor((l/60)%6),m=(l/60)-j,e=n*(1-k),A=n*(1-m*k),u=n*(1-(1-m)*k);switch(j){case 0:g=n;h=u;o=e;break;case 1:g=A;h=n;o=e;break;case 2:g=e;h=n;o=u;break;case 3:g=e;h=A;o=n;break;case 4:g=u;h=e;o=n;break;case 5:g=n;h=e;o=A;break;}var s=r.real2dec;return{red:s(g),green:s(h),blue:s(o)};},rgb2hex:function(h,g,e){var A=this;if(N(h)){return A.rgb2hex.apply(A,h);}else{if(L(h)){g=h.green;e=h.blue;h=h.red;}}var f=A.dec2hex;return f(h)+f(g)+f(e);},dec2hex:function(e){var A=this;e=parseInt(e,10)|0;e=c.constrainTo(e,0,255,0);return("0"+e.toString(16)).slice(-2).toUpperCase();},hex2dec:function(e){var A=this;return parseInt(e,16);},hex2rgb:function(f){var e=this;var g=e.hex2dec;var i=f.slice(0,2);var h=f.slice(2,4);var A=f.slice(4,6);return{red:g(i),green:g(h),blue:g(A)};},rgb2hsv:function(A,j,e){var l=this;if(N(A)){return l.rgb2hsv.apply(l,A);}else{if(L(A)){e=A.green;j=A.blue;A=A.red;}}A/=255;e/=255;j/=255;var h,g,f=Math.min(Math.min(A,e),j),i=Math.max(Math.max(A,e),j),k=i-f;switch(i){case f:h=0;break;case A:h=60*(e-j)/k;if(e<j){h+=360;}break;case e:h=(60*(j-A)/k)+120;break;case j:h=(60*(A-e)/k)+240;break;}g=(i===0)?0:1-(f/i);return{hue:Math.round(h),saturation:g,value:i};},constrainTo:function(g,h,e,f){var A=this;if(g<h||g>e){g=f;}return g;}};var B=S.Component.create({NAME:H,ATTRS:{colors:{value:{},getter:function(){var A=this;var f=A.get("rgb");var g=A.get("hex");var e={};S.mix(e,f);e.hex=g;return e;}},hex:{value:"FFFFFF",getter:function(){var A=this;var e=A.get("rgb");return c.rgb2hex(e);},setter:function(j){var A=this;var h=j.length;if(h==3){var g=j.split("");for(var f=0;f<g.length;f++){g[f]+=g[f];}j=g.join("");}if((/[A-Fa-f0-9]{6}/).test(j)){var e=c.hex2rgb(j);A.set("rgb",e);}else{j=S.Attribute.INVALID_VALUE;}return j;}},hideOn:{value:"click"},hsv:{getter:function(f){var A=this;var e=A.get("rgb");return c.rgb2hsv(e);},setter:function(f){var A=this;if(N(f)){var g=A.get("hsv");var e=c.hsv2rgb(f);A.set("rgb",e);g={hue:f[0],saturation:f[1],value:[2]};}else{if(!L(f)){f=S.Attribute.INVALID_VALUE;}}return f;},value:{hue:0,saturation:0,value:0}},showOn:{value:"click"},pickersize:{value:180},rgb:{value:{blue:255,green:255,red:255},setter:function(e){var A=this;if(N(e)){var f=A.get("rgb");f={blue:e[2],green:e[1],red:[0]};e=f;}else{if(!L(e)){e=S.Attribute.INVALID_VALUE;}}e.red=c.constrainTo(e.red,0,255,255);e.green=c.constrainTo(e.green,0,255,255);e.blue=c.constrainTo(e.blue,0,255,255);return e;}},strings:{value:{R:"R",G:"G",B:"B",H:"H",S:"S",V:"V",HEX:"#",DEG:"\u00B0",PERCENT:"%"}},triggerParent:{value:null},trigger:{lazyAdd:true,getter:function(e){var A=this;if(!e){A._buttonTrigger=new S.ButtonItem({cssClass:F,icon:"pencil"});e=A._buttonTrigger.get("boundingBox");A.set("trigger",e);}return e;}}},EXTENDS:S.OverlayContext,prototype:{renderUI:function(){var A=this;var f=A._buttonTrigger;if(f&&!f.get("rendered")){var e=A.get("triggerParent");if(!e){e=A.get("boundingBox").get("parentNode");}f.render(e);}A._renderContainer();A._renderSliders();A._renderControls();},bindUI:function(){var A=this;B.superclass.bindUI.apply(this,arguments);A._createEvents();A._colorCanvas.on("mousedown",A._onCanvasMouseDown,A);A._colorPicker.on("drag:start",A._onThumbDragStart,A);A._colorPicker.after("drag:drag",A._afterThumbDrag,A);A._hueSlider.after("valueChange",A._afterValueChange,A);var e=A._colorForm.get("contentBox");e.delegate("change",S.bind(A._onFormChange,A),"input");A.after("hexChange",A._updateRGB);A.after("rgbChange",A._updateRGB);A._colorSwatchOriginal.on("click",A._restoreRGB,A);A.after("visibleChange",A._afterVisibleChangeCP);},syncUI:function(){var A=this;A._updatePickerOffset();var e=A.get("rgb");A._updateControls();A._updateOriginalRGB();},_afterThumbDrag:function(e){var A=this;var f=A._translateOffset(e.pageX,e.pageY);if(!A._preventDragEvent){A.fire("colorChange",{ddEvent:e});}A._canvasThumbXY=f;},_afterValueChange:function(e){var A=this;if(e.src!="controls"){A.fire("colorChange",{slideEvent:e});}},_afterVisibleChangeCP:function(e){var A=this;if(e.newVal){A.refreshAlign();A._hueSlider.syncUI();}A._updateOriginalRGB();},_convertOffsetToValue:function(e,g){var A=this;if(N(e)){return A._convertOffsetToValue.apply(A,e);}var f=A.get("pickersize");e=Math.round(((e*f/100)));g=Math.round((f-(g*f/100)));return[e,g];},_convertValueToOffset:function(e,f){var A=this;if(N(e)){return A._convertValueToOffset.apply(A,e);}e=Math.round(e+A._offsetXY[0]);f=Math.round(f+A._offsetXY[1]);return[e,f];},_createEvents:function(){var A=this;A.publish("colorChange",{defaultFn:A._onColorChange});},_getHuePicker:function(){var A=this;var f=A._getPickerSize();var e=(f-A._hueSlider.get("value"))/f;e=Math.round(e*360);return(e===360)?0:e;},_getPickerSize:function(){var A=this;if(!A._pickerSize){var e=A._colorCanvas;var f=e.get("offsetWidth");if(!f){f=e.getComputedStyle("width");}f=parseInt(f,10);var g=A._pickerThumb.get("offsetWidth");f-=g;A._pickerSize=f;}return A._pickerSize;},_getSaturationPicker:function(){var A=this;return A._canvasThumbXY[0]/A._getPickerSize();},_getThumbOffset:function(){var e=this;if(!e._thumbOffset){var f=e._pickerThumb;
var A=f.get("offsetHeight");var g=f.get("offsetWidth");e._thumbOffset=[Math.floor(g/2),Math.floor(A/2)];}return e._thumbOffset;},_getValuePicker:function(){var A=this;var e=A._getPickerSize();return((e-A._canvasThumbXY[1]))/e;},_onCanvasMouseDown:function(e){var A=this;A._setDragStart(e.pageX,e.pageY);e.halt();A.fire("colorChange",{ddEvent:e});},_onColorChange:function(h){var A=this;var e=A._getHuePicker();var g=A._getSaturationPicker();var i=A._getValuePicker();var f=c.hsv2rgb(e,g,i);if(h.src!="controls"){A.set("rgb",f);}A._updateControls();if(!h.ddEvent){if(!h.slideEvent){A._updateHue();A._updatePickerThumb();e=A._getHuePicker();}var j=c.hsv2rgb(e,1,1);A._updateCanvas(j);}A._updateColorSwatch();},_onFormChange:function(f){var A=this;var e=f.currentTarget;var g=e.get("id");if(g!="hex"){g="rgb."+g;}A.set(g,e.val());},_onThumbDragStart:function(e){var A=this;A._updatePickerOffset();},_renderContainer:function(){var A=this;if(!A._pickerContainer){var e=new S.Panel({cssClass:M,icons:[{icon:"close",id:"close",handler:{fn:A.hide,context:A}}]}).render(A.get("contentBox"));var f=e.bodyNode;f.addClass(Q);A._pickerContainer=f;}},_renderControls:function(){var e=this;e._colorSwatch=S.Node.create(P);e._colorSwatchCurrent=S.Node.create(d);e._colorSwatchOriginal=S.Node.create(C);e._colorSwatch.appendChild(e._colorSwatchCurrent);e._colorSwatch.appendChild(e._colorSwatchOriginal);e._pickerContainer.appendChild(e._colorSwatch);var A=e.get("strings");var f=new S.Form({labelAlign:"left"}).render(e._pickerContainer);f.add([{id:"red",labelText:A.R,size:3},{id:"green",labelText:A.G,size:3},{id:"blue",labelText:A.B,size:3},{id:"hex",labelText:A.HEX,size:6}],true);f.get("boundingBox").addClass(T);e._colorForm=f;},_renderSliders:function(){var A=this;A._colorCanvas=S.Node.create(Y);A._pickerThumb=S.Node.create(V);A._colorCanvas.appendChild(A._pickerThumb);A._pickerContainer.appendChild(A._colorCanvas);var e=A.get("pickersize");A._colorPicker=new S.DD.Drag({node:A._pickerThumb}).plug(S.Plugin.DDConstrained,{constrain2node:A._colorCanvas});A._hueSlider=new S.Slider({axis:"y",min:0,max:e,length:A._colorCanvas.get("offsetHeight")});A._hueSlider.RAIL_TEMPLATE=W;A._hueSlider.THUMB_TEMPLATE=Z;A._hueSlider.render(A._pickerContainer);},_restoreRGB:function(e){var A=this;A.set("rgb",A._oldRGB);A._updateHue();A._updatePickerThumb();A._updateColorSwatch();A.fire("colorChange");},_setDragStart:function(f,i){var e=this;if(N(f)){return e._setDragStart.apply(e,f);}var A=e._colorPicker;A._dragThreshMet=true;A._fixIEMouseDown();S.DD.DDM.activeDrag=A;var h=A.get("dragNode").getXY();var g=e._getThumbOffset();h[0]+=g[0];h[1]+=g[1];A._setStartPosition(h);A.set("activeHandle",A.get("dragNode"));A.start();A._alignNode([f,i]);},_translateOffset:function(e,h){var A=this;var f=A._offsetXY;var g=[];g[0]=Math.round(e-f[0]);g[1]=Math.round(h-f[1]);return g;},_updateCanvas:function(e){var A=this;e=e||A.get("rgb");A._colorCanvas.setStyle("backgroundColor","rgb("+[e.red,e.green,e.blue].join(",")+")");},_updateColorSwatch:function(e){var A=this;e=e||A.get("rgb");A._colorSwatchCurrent.setStyle("backgroundColor","rgb("+[e.red,e.green,e.blue].join(",")+")");},_updateControls:function(){var A=this;var e=A.get("colors");A._colorForm.set("values",e);},_updateHue:function(){var A=this;var f=A._getPickerSize();var e=A.get("hsv.hue");e=f-Math.round(e/360*f);if(e===f){e=0;}A._hueSlider.set("value",e,{src:"controls"});},_updateOriginalColorSwatch:function(e){var A=this;e=e||A.get("rgb");A._colorSwatchOriginal.setStyle("backgroundColor","rgb("+[e.red,e.green,e.blue].join(",")+")");},_updateOriginalRGB:function(){var A=this;A._oldRGB=A.get("rgb");A._updateOriginalColorSwatch(A._oldRGB);},_updatePickerOffset:function(){var A=this;A._offsetXY=A._colorCanvas.getXY();},_updatePickerThumb:function(){var e=this;e._updatePickerOffset();var f=e.get("hsv");var g=e.get("pickersize");f.saturation=Math.round(f.saturation*100);var h=f.saturation;f.value=Math.round(f.value*100);var i=f.value;var j=e._convertOffsetToValue(h,i);j=e._convertValueToOffset(j);e._canvasThumbXY=j;var A=e._colorPicker;e._preventDragEvent=true;A._setStartPosition(A.get("dragNode").getXY());A._alignNode(j,true);e._preventDragEvent=false;},_updateRGB:function(e){var A=this;if(e.subAttrName||e.attrName=="hex"){A.fire("colorChange",{src:"controls"});}},_canvasThumbXY:[0,0],_offsetXY:[0,0]}});B.Color=c;S.ColorPicker=B;},"@VERSION@",{requires:["aui-overlay-context","dd","slider","substitute","aui-button-item","aui-form","aui-panel"],skinnable:true});