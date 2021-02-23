// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var allBtn = document.querySelectorAll(".btn"); //获取canvas的宽度和高度

var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 100;
var ctx = canvas.getContext("2d");
var huaban = {
  type: "huabi",
  isDraw: false,
  beginX: 0,
  beginY: 0,
  lineWidth: 8,
  imageData: null,
  color: '#000',
  huabiFn: function huabiFn(e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.strokeStyle = huaban.color;
    ctx.lineWidth = huaban.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
};
var huabiBtn = document.querySelector('#huabi');

huabiBtn.onclick = function () {
  allBtn.forEach(function (item, i) {
    item.classList.remove("active");
  });
  huabiBtn.classList.add("active");
  huaban.type = "huabi";
}; // 设计粗细的按钮


var lineDivs = document.querySelectorAll(".line");
lineDivs.forEach(function (item, i) {
  item.onclick = function () {
    lineDivs.forEach(function (a, b) {
      a.classList.remove("active");
    });
    item.classList.add("active");

    if (i === 0) {
      huaban.lineWidth = 8;
    } else if (i === 1) {
      huaban.lineWidth = 16;
    } else {
      huaban.lineWidth = 32;
    }
  };
}); //监听颜色设置改变

var colorInput = document.querySelector("#color");

colorInput.onchange = function (e) {
  // console.log(e)
  // console.log(colorInput.value)
  huaban.color = colorInput.value;
}; //监听鼠标按下事件


canvas.onmousedown = function (e) {
  huaban.isDraw = true;

  if (huaban.type === "huabi") {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    huaban.beginX = x;
    huaban.beginY = y;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}; //监听鼠标抬起事件


canvas.onmouseup = function () {
  huaban.imageData = ctx.getImageData(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  huaban.isDraw = false;

  if (huaban.type === 'huabi') {
    ctx.closePath();
  }
};

canvas.onmousemove = function (e) {
  if (huaban.isDraw) {
    // console.log(huaban)
    var strFn = huaban.type + 'Fn';
    huaban[strFn](e);
  }
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.814ad0c7.js.map