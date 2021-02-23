let allBtn = document.querySelectorAll(".btn")
//获取canvas的宽度和高度
let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight-100;
let ctx = canvas.getContext("2d");

let huaban={
  type:"huabi",
  isDraw:false,
  beginX:0,
  beginY:0,
  lineWidth:8,
  imageData:null,
  color:'#000',

  huabiFn:function(e){
    let x =e.pageX - canvas.offsetLeft
    let y =e.pageY - canvas.offsetTop
    ctx.lineTo(x,y)
    ctx.strokeStyle = huaban.color
    ctx.lineWidth = huaban.lineWidth
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
  },
}

let huabiBtn = document.querySelector('#huabi')
    huabiBtn.onclick = function(){
      allBtn.forEach(function(item,i){
        item.classList.remove("active")
        })
    huabiBtn.classList.add("active")
    huaban.type = "huabi"
  }

  // 设计粗细的按钮
  let lineDivs = document.querySelectorAll(".line")
  lineDivs.forEach(function(item,i){
    item.onclick = function(){
      lineDivs.forEach(function(a,b){
        a.classList.remove("active")
      })
      item.classList.add("active")
      if(i===0){
        huaban.lineWidth = 8
      }else if(i===1){
        huaban.lineWidth = 16
      }else{
        huaban.lineWidth = 32
      }
    }
  })

//监听颜色设置改变
let colorInput = document.querySelector("#color")
colorInput.onchange = function(e){
  // console.log(e)
  // console.log(colorInput.value)
  huaban.color = colorInput.value
}

//监听鼠标按下事件
canvas.onmousedown = function(e){
  huaban.isDraw =true
  if(huaban.type==="huabi"){
    let x =e.pageX - canvas.offsetLeft
    let y =e.pageY - canvas.offsetTop
    huaban.beginX = x
    huaban.beginY = y
    ctx.beginPath()
    ctx.moveTo(x,y)
  }
}

//监听鼠标抬起事件
canvas.onmouseup = function(){
  huaban.imageData = ctx.getImageData(0,0,canvas.offsetWidth,canvas.offsetHeight)
  huaban.isDraw =false

  if(huaban.type==='huabi'){
    ctx.closePath()
  }
}

canvas.onmousemove = function(e){
  if(huaban.isDraw){
    // console.log(huaban)
    let strFn = huaban.type+'Fn'
    huaban[strFn](e)
  }
}