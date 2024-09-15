function p5Draw(id) {
  // TODO: move to webpacker
  let eraseEnable = false;
  const buttons = {};
  const conceptDiv = document.getElementById(id);
  const conceptWidth = conceptDiv.offsetWidth;
  return function (sketch) {
    sketch.setup = function () {
      setupImage("/assets/img/" + id + ".png", sketch, conceptWidth);
      setupSaveButton(id, sketch);
      setupEraseButton(id, sketch);
      setupCanvas(id, sketch);
      setupGraphics(sketch);
    };
    sketch.draw = function () {
      sketch.image(sketch.img, 0, 0, conceptWidth, 400);
      sketch.image(sketch.graphic, 0, 0);
    };
    sketch.mouseDragged = function () {
      if (!eraseEnable) {
        sketch.graphic.fill("black");
        sketch.graphic.noStroke();
        sketch.graphic.ellipse(sketch.mouseX, sketch.mouseY, 5, 5);
      } else {
        sketch.graphic.fill("white");
        sketch.graphic.noStroke();
        sketch.graphic.ellipse(sketch.mouseX, sketch.mouseY, 10, 10);
      }
    };
    function setupImage(imagePath, sketch, conceptWidth) {
      const request = new XMLHttpRequest();
      request.open("GET", imagePath, false);
      request.send();
      if (request.status == 404) {
        sketch.img = sketch.createImage(conceptWidth, 400);
      } else {
        sketch.img = sketch.loadImage(imagePath);
      }
    }
    function setupGraphics(sketch) {
      sketch.graphic = sketch.createGraphics(conceptWidth, 400);
    }
    function setupEraseButton(id, sketch) {
      button_id = id + "_toggle_erase_button";
      buttons[button_id] = sketch.createButton("erase");
      buttons[button_id].parent(id + "_toggle_erase");
      buttons[button_id].addClass("border rounded px-4");
      buttons[button_id].mouseClicked(eraseButtonClicked);
    }
    function eraseButtonClicked() {
      button_id = id + "_toggle_erase_button";
      buttons[button_id].toggleClass("bg-indigo-100");
      buttons[button_id].toggleClass("border");
      if (eraseEnable) {
        sketch.noErase();
        eraseEnable = false;
      } else {
        sketch.erase();
        eraseEnable = true;
      }
    }
    function setupSaveButton(id, sketch) {
      button_id = id + "_image_save_button";
      buttons[button_id] = sketch.createButton("save");
      buttons[button_id].parent(id + "_image_save");
      buttons[button_id].addClass("border rounded px-4");
      buttons[button_id].mouseClicked(saveButtonClicked);
    }
    function setupCanvas(id, sketch) {
      const concept = sketch.createCanvas(conceptWidth, 400);
      concept.parent(id + "_canvas");
    }
    function saveButtonClicked() {
      sketch.saveCanvas(id + ".png");
    }
  };
}
