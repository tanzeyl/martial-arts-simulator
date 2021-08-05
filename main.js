let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
};

let loadImages = (callback) => {
  let images = { idle: [], kick: [], punch: [] };
  let imageToLoad = 0;
  ["idle", "kick", "punch"].forEach((animation) => {
    let animationFrames = frames[animation];
    imageToLoad = imageToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);
      loadImage(path, (image) => {
        images[animation][frameNumber - 1] = image;
        imageToLoad--;
        if (imageToLoad === 0) callback(images);
      });
    });
  });
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  animate(ctx, images, "punch", () => {
    console.log("Done");
  });
});
