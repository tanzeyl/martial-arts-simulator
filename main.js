let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let img = document.createElement("img");

img.onload = () => {
  ctx.drawImage(img, 0, 0, 500, 500);
};
img.src = "images/idle.png";
