"use strict";

/*
 * WebGLコンテキストとページから頂点シェーダーと
 * フラグメントシェーダーのソースコード取り出すための
 * scriptタグのIDを受け取るプログラムのコンストラクタ
 */
class Program {
  constructor(gl, vertexShaderId, fragmentShaderId) {
    this.gl = gl;
    this.program = gl.createProgram();

    if (!(vertexShaderId && fragmentShaderId)) {
      return console.error("No shader IDs were provided");
    }

    gl.attachShader(this.program, utils.getShader(gl, vertexShaderId));
    gl.attachShader(this.program, utils.getShader(gl, fragmentShaderId));
    gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      return console.error("Could not initialize shaders.");
    }

    this.useProgram();
  }

  // 現在のプログラムで使用するためのWebGLコンテキスト
  useProgram() {
    this.gl.useProgram(this.program);
  }

  // 与えられた値から与えられたアトリビュートとユニフォームを読み込む
  load(attributes, uniforms) {
    this.useProgram();
    this.setAttributeLocations(attributes);
    this.setUniformLocations(uniforms);
  }

  // プログラムインスタンスにアトリビュートの参照を設定
  setAttributeLocations(attributes) {
    attributes.forEach((attribute) => {
      this[attribute] = this.gl.getAttribLocation(this.program, attribute);
    });
  }

  // プログラムインスタンスにユニフォームの参照を設定
  setUniformLocations(uniforms) {
    uniforms.forEach((uniform) => {
      this[uniform] = this.gl.getUniformLocation(this.program, uniform);
    });
  }

  // プログラムからユニフォームのロケーションを取得
  getUniform(uniformLocation) {
    return this.gl.getUniform(this.program, uniformLocation);
  }
}
