let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
async function wearMask() {
  //初始化canvas
  const loading = document.querySelector(".loading");
  loading.style.display = "flex";

  // 人脸检测模型
  await faceapi.nets.ssdMobilenetv1.loadFromUri("models");
  // 人脸地标模型
  await faceapi.nets.faceLandmark68Net.loadFromUri("models");
  // 人脸识别模型

  // // 开始人脸识别，先识别脸，只返回一个最接近的人脸数据
  // // 再识别眼、嘴、鼻的位置，使用68个点坐标模型
  // // 最后获取脸部描述
  const minConfidence = 0.8
  const detection = await faceapi.detectSingleFace(canvas).withFaceLandmarks();;
  console.log(detection)

  const {
    landmarks
  } = detection;
  const {
    imageWidth,
    positions
  } = landmarks;
  // 左耳附近
  const {
    _x: x,
    _y: y
  } = positions[1];
  // 获取鼻子上部到下巴的长度
  const height = Math.sqrt(
    Math.pow(positions[1]._x - positions[8]._x, 2) +
    Math.pow(positions[1]._y - positions[8]._y, 2)
  );
  let mask = document.getElementById("mask")
  ctx.drawImage(mask, x + imageWidth * 0.06, y - height * 0.08, imageWidth, height * 0.8)
  loading.style.display = "none";

}

function reset() {
  let faceImg = new Image()
  faceImg.onload = () => {
    canvas.width = faceImg.width
    canvas.height = faceImg.height
    ctx.drawImage(faceImg, 0, 0)
  }
  faceImg.src = "/人脸识别戴口罩/image/face.jpg"
}
window.onload = () => {
  reset()

}