let myFunction = () => {
  var person = prompt("Please enter your name", "Harry Potter");
  if (person != null) {
    document.getElementById("demo").innerHTML =
      "Hello " +
      person +
      "! Let's start. Click on the buttons below to learn some cool moves! ";
  }
};

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
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
    block: [],
  };
  let imageToLoad = 0;
  ["idle", "kick", "punch", "backward", "block", "forward"].forEach(
    (animation) => {
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
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(500, 50, 250, 300);
      ctx.drawImage(image, 500, 50, 250, 300);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimation = [];
  let aux = () => {
    let selectedAnimation;
    if (queuedAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimation.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimation.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimation.push("punch");
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimation.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimation.push("backward");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimation.push("block");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      queuedAnimation.push("backward");
    } else if (key === "ArrowRight") {
      queuedAnimation.push("forward");
    } else if (key === "ArrowUp") {
      queuedAnimation.push("kick");
    } else if (key === "ArrowDown") {
      queuedAnimation.push("punch");
    } else if (key === "Enter") {
      queuedAnimation.push("block");
    }
  });
});
