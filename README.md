# WebLib

Loader Class 
------------
      extends pyz.UI
      base pyz
Loader用法:
-----------
example:
--------
```javascript
var loader = new Loader({
      canvas: canvas,
      ARC: { r: 40, color: '#fff',  width: 15, },
      speed: 6,
      loaderStyle: 'round',
});
// Loader is Start
loader.loader();
// Requset From Server User
loader.OK();
```
Property
---------
```javascript
Color color
Float speed
String loaderStyle
```
Method
-------
```javascript
constructor(Object object)
```
参数  | 类型  | 描述 | 必须
---- | ----- | ------ | -------  
canvas  | Canvas | Canvas对象 | 是 
color  | ARC | ARC对象 | 不
speed | Float | 表示运动速度 | 不
loadStyle | String | 采用哪种动画"round|other" | 不
```javascript
Object ARC 
```
参数  | 类型  | 描述 | 必须
---- | ----- | ------ | -------  
r  | Int | 半径 | 不 
color  | Color | 颜色 | 不
width | Int | 线宽 | 不
```javascript
void loader()
// loader obj start
void OK()
// response http use it, on loader() is pause loader()
void changeColor(Color color)
// changeColor
void pause()
// pause draw, timer is online
void play()
// start draw, timer is online
void stop()
// clear timer || cancelAnimationFrame
void loaded(func_callback)
// is Loader.OK() is end animation to callback
```
Event
-----
```javascript
LoaderEvent onloaded
loader.onloaded = function(){
    // add some code for Loader.OK() animation end
}
```
DownLoad or CDN
--------
      #git https://github.com/PengYiZhen/WebLib/blob/master/Loader.js     
CDN https://cdn.jsdelivr.net/gh/PengYiZhen/WebLib@1.0.0/Loader.js
```html
<script src="https://cdn.jsdelivr.net/gh/PengYiZhen/WebLib@1.0.0/Loader.js" preload></script>
```      
Release 1.0.0
-------------




