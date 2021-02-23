//获取canvas的宽度和高度
let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight-100;
let ctx = canvas.getContext("2d");
// ctx.fillStyle = "black";
// ctx.strokeStyle = "none";
// ctx.lineWidth = 8;
// ctx.lineCap = "round";

let huaban={
  type:"none",
  isDraw:false,
  huabiFn:function(e){
    let x =e.pageX - canvas.offsetLeft
    let y =e.pageY - canvas.offsetTop
    ctx.beginPath()
    ctx.arc(x,y,3,0,2*Math.PI)
    ctx.fill()
  }
}

let huabiBtn = document.querySelector('#huabi')
    huabiBtn.onclick = function(){
    huabiBtn.classList.add("active")
    huaban.type = "huabi"
  }

//监听鼠标按下事件
canvas.onmousedown = function(){
  huaban.isDraw =true
}

//监听鼠标抬起事件
canvas.onmouseup = function(){
  huaban.isDraw =false
}

canvas.onmousemove = function(e){
  if(huaban.isDraw){
    let strFn = huaban.type+'Fn'
    huaban[strFn](e)
  }
}
    
