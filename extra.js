var workers = [new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js'),
               new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js'), new Worker('worker.js')];

var dering_map = [0, 0.5, 0.707, 1, 1.41, 2];

var cq_map = [0x0000,
0x0009, 0x000A, 0x000B, 0x000C, 0x000D, 0x000F,
0x0011, 0x0013, 0x0015, 0x0018, 0x001B, 0x001E,
0x0021, 0x0024, 0x0029, 0x002E, 0x0034, 0x003A,
0x0041, 0x0048, 0x0051, 0x005A, 0x0064, 0x0070,
0x007D, 0x008C, 0x009C, 0x00AE, 0x00C3, 0x00D9,
0x00F3, 0x010F, 0x012F, 0x0152, 0x0179, 0x01A5,
0x01D6, 0x020D, 0x0249, 0x028E, 0x02DA, 0x032E,
0x038D, 0x03F7, 0x046D, 0x04F0, 0x0583, 0x0627,
0x06De, 0x07AA, 0x088E, 0x098D, 0x0AA9, 0x0BE6,
0x0D48, 0x0ED3, 0x108C, 0x1278, 0x149D, 0x1702,
0x19AE, 0x1CAA, 0x1FFF];

var N = 0;
function init_image() {
  var canvas = document.getElementById('canvas');
  var srcimage = document.getElementById('srcimage');
  var w = srcimage.width;
  var h = srcimage.height;
  if (w * h > 4096 * 2169) {
    var scale = Math.sqrt(4096.0 * 2169.0 / (w * h));
    w = w * scale | 0;
    h = h * scale | 0;
    w = w - (w & 7);
    h = h - (h & 7);
  }
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(srcimage, 0, 0, srcimage.width, srcimage.height, 0, 0, w, h);
  var imagedata = ctx.getImageData(0, 0, w, h);
  var data = new ArrayBuffer(w*h*4);
  new Uint8ClampedArray(data).set(imagedata.data);
  workers[N&7].postMessage({image: {width: w, height: h, data: data}}, [data]);
  //document.getElementById('status').innerText = 'Loaded image...';
  if (N < 7) {
    N = N + 1;
    srcimage.src = 'subset3-mono/' + (1000+N+'').substr(1,3) + '.png';
  }
}

var stats = [new Float64Array(16*1024), new Float64Array(16*1024), new Float64Array(16*1024), new Float64Array(16*1024)];
function recvMessage(e) {
  var message = e.data;
  var i, j;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 16*1024; j++) {
      stats[i][j] += message.stats[i][j];
    }
  }
  document.getElementById('status').innerText = '[['+stats[0].join(',')+'],['+stats[1].join(',')+'],['+stats[2].join(',')+'],['+stats[3].join(',')+']]';
  var srcimage = document.getElementById('srcimage');
  N = N + 1;
  if (N < 1000) srcimage.src = 'subset3-mono/' + (1000+N+'').substr(1,3) + '.png';
}
workers[0].addEventListener('message', recvMessage);
workers[1].addEventListener('message', recvMessage);
workers[2].addEventListener('message', recvMessage);
workers[3].addEventListener('message', recvMessage);
workers[4].addEventListener('message', recvMessage);
workers[5].addEventListener('message', recvMessage);
workers[6].addEventListener('message', recvMessage);
workers[7].addEventListener('message', recvMessage);

function loadUserImage(event) {
  var file = event.target.files[0];
  var reader  = new FileReader();
  reader.addEventListener("load", function () {
    document.getElementById('srcimage').src = reader.result;
  }, false);
  if (file) reader.readAsDataURL(file);
}

function changeStrength(strength, post) {
  var value = dering_map[strength.value];
  document.getElementById('strengthVal').innerText = value;
  //if (post) worker.postMessage({strength: value});
}

function changeLapping(lapping) {
  var value = !!(lapping.checked);
  //worker.postMessage({lapping: value});
}

function changeScale(scale, post) {
  var value = cq_map[scale.value];
  document.getElementById('scaleVal').innerText = (value / 16.).toPrecision(4);
  //if (post) worker.postMessage({scale: value});
}

function changeBeta(beta, post) {
  var value = beta.value / 12.;
  document.getElementById('betaVal').innerText = value.toPrecision(4);
  //if (post) worker.postMessage({beta: value});
}

function changeCfL(cfl) {
  var value = !!(cfl.checked);
  //worker.postMessage({cfl: value});
}

function changeMethod(method) {
  var value = method.value;
  //worker.postMessage({method: value});
}
