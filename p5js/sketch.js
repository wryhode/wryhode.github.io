
const youtubeButton = document.getElementById("youtubeButton")

const phi = Math.PI * (Math.sqrt(5) - 1)

elements = document.getElementsByClassName("enter_zoom_trigger");
elements.forEach(element => {
    element.addEventListener("mouseenter", function() {
        sphereDistanceTarget = -200; 
        lookAtMouse = false;
        lookAtTargetX = 0;
        lookAtTargetY = 0;
        pointScaleTarget = 2.5;
    })
    element.addEventListener("mouseleave", function() {
        sphereDistanceTarget = -250; 
        lookAtMouse = true;
        pointScaleTarget = 1;
    })
});

function loadImage(url) {
    let icanvas = document.createElement('canvas');
    let context = icanvas.getContext('2d');
    let img = new Image();
    img.src = url;
    img.decode();

    icanvas.width = img.width;
    icanvas.height = img.height;
    context.drawImage(img, 0, 0 );
    let imageData = context.getImageData(0, 0, img.width, img.height);
    return imageData;
}

function distributePoints(nPoints) {
    let points = new Array();

    for(let i = 0; i < nPoints; i++) {
        y = 1 - (i / (nPoints - 1.) * 2);
        radius = Math.sqrt(1. - Math.pow(y, 2));
        theta = phi * i;

        x = Math.cos(theta) * radius;
        z = Math.sin(theta) * radius;

        points.push([x, y, z]);
    }

    return points;
}

function getPixel(data, x, y) {
    const redComponent = data.data[y * (data.width * 4) + x * 4];
    const greenComponent = data.data[y * (data.width * 4) + x * 4 + 1];
    const blueComponent = data.data[y * (data.width * 4) + x * 4 + 2];
    const alphaComponent = data.data[y * (data.width * 4) + x * 4 + 3];
    return [redComponent, greenComponent, blueComponent, alphaComponent];
}

let points;
let camera;
let rotX;
let rotY;
let lookAtTargetX;
let lookAtTargetY;
let distanceToSphere;
let sphereDistanceTarget;
let lookAtMouse;
let normMouseX;
let normMouseY;
let pointScale;
let pointScaleTarget;
let shape;

let githubLogoImageData;
let youtubeLogoImageData;
let showYoutubeLogo = false;

youtubeButton.onmouseenter = function() {
    showYoutubeLogo = true;
}

youtubeButton.onmouseleave = function() {
    showYoutubeLogo = false;
}

function preload() {
    githubLogoImageData = loadImage("./p5js/assets/githublogo_.png"); 
    youtubeLogoImageData = loadImage("./p5js/assets/youtubelogo_.png"); 
}


function setup() {
    setAttributes({ antialias: true });
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('sketch_container');
    
    camera = createCamera();
    setCamera(camera);
    
    rotX = 0;
    rotY = 0;
    sphereDistanceTarget = -250;
    distanceToSphere = 0;
    lookAtMouse = true;
    lookAtTargetX = 0;
    lookAtTargetY = 0;
    normMouseX = 0.5;
    normMouseY = 0.5;
    pointScale = 0;
    pointScaleTarget = 1;

    // Inform user of loading here, also do loading stuffx
    
    points = distributePoints(1024);
    youtubeLogoImageData.loadPixels();
    githubLogoImageData.loadPixels();
    shape = buildGeometry(function() {
        for(let i = 0; i < points.length; i++) {
            let point = points[i];    
            push();
            stroke(120, 120, 120);
            fill(160)
            strokeWeight(1);
            translate(point[0] *100, point[1] * 100, point[2] * 100);
            box(5);
            pop();
        }
      });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(209);

    normMouseX = (0.5 - (mouseX / windowWidth)) * 2;
    normMouseY = ((mouseY / windowHeight) - 0.5) * 2;
    
    distanceToSphere += (sphereDistanceTarget - distanceToSphere) / 10;
    camera.setPosition(0, 0, distanceToSphere);

    if(lookAtMouse == true) {
        rotX += ((normMouseX * 100) - rotX) / 10;
        rotY += ((normMouseY * 100) - rotY) / 10;
    }
    else {
        rotX += (lookAtTargetX - rotX) / 10;
        rotY += (lookAtTargetY - rotY) / 10;        
    }
    camera.lookAt(rotX, rotY, 0);
    
    if (showYoutubeLogo) {
        push();
        rotateY(Math.sin(radians(frameCount)) + Math.PI);
        fill(240, 200, 100);
        for(let i = 0; i < youtubeLogoImageData.pixels.length; i = i + 4) {
            if (youtubeLogoImageData.pixels[i] > 0) {
                push();
                translate((i % 128) - 64, (i / 32) - 64, 0);
                let s = Math.pow(Math.sin(radians(frameCount * 5 + (i % 128) * 2)), 3);
                translate(0, (s > 0) ? 0 : s * 10, 0);
                box(3);
                pop();
            }
        }
        pop();
    }

    pointScale += (pointScaleTarget - pointScale) / 20;
    scale(pointScale);
    stroke(120, 120, 120);
    fill(160)
    strokeWeight(0.1);
    rotateX(radians(frameCount) / 20);
    rotateY(radians(frameCount) / 20.2);
    rotateZ(radians(frameCount) / 20.1);
    model(shape);

    /*for(let i = 0; i < points.length; i++) {
        let point = points[i];    
        push();
        rotateX(radians(frameCount) / 20);
        rotateY(radians(frameCount) / 20.2);
        rotateZ(radians(frameCount) / 20.1);
        translate(point[0] * pointScale, point[1] * pointScale, point[2] * pointScale);
        box(5);
        pop();
    }*/
}