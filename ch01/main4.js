"use strict";
// import { getCanvas, getContext } from "../common/js/utils.js";

let gl;

function updateClearColor(...color) {
  // スプレッド演算子 ...を使用すると配列定義を関数の引数をして利用できる
  gl.clearColor(...color);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, 0, 0);
}

function checkKey(event) {
  switch (event.keyCode) {
    // 1 green
    case 49: {
      updateClearColor(0.2, 0.8, 0.2, 1.0);
      break;
    }
    // 2 blue
    case 50: {
      updateClearColor(0.2, 0.2, 0.8, 1.0);
      break;
    }
    // 3 ramdom
    case 51: {
      updateClearColor(Math.random(), Math.random(), Math.random(), 1.0);
      break;
    }
    // 4 getcolor
    case 52: {
      const color = gl.getParameter(gl.COLOR_CLEAR_VALUE);

      alert(
        `clearColor = (${color[0].toFixed(1)},${color[1].toFixed(
          1
        )},${color[2].toFixed(1)} )`
      );
      window.focus();
      break;
    }
  }
}

function init() {
  const canvas = utils.getCanvas("webgl-canvas");

  if (!canvas) {
    console.error("Sorry! No HTML5 Canvas was found on this page");
    return;
  }

  gl = utils.getGLContext(canvas);

  window.onkeydown = checkKey;
}

window.onload = init;
