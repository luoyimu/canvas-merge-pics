/*
* @Author: luominting
* @Date:   2018-06-13 14:00:12
* @Last Modified by:   luominting
* @Last Modified time: 2018-06-19 19:23:02
*/

// http://chuantu.biz/t6/330/1529396014x-1566673201.jpg
// http://chuantu.biz/t6/330/1529395949x-1566673201.jpg

let person_img = document.getElementsByClassName('person-img')[0].getAttribute('src')
let code_img = document.getElementsByClassName('code-img')[0].getAttribute('src')

function merge() {
	drawImage(person_img)
}

//============绘制图片
function drawImage(img1_src) {
	//canvas必须设定确定的宽高,设置为图片大小
	let canvas = document.createElement('canvas')
	canvas.width = "400"
	canvas.height = "200"
	let ctx = canvas.getContext("2d")
	ctx.rect(0,0, 400, 200) //矩形坐标，大小 (距离左上角x坐标,距离左上角y坐标,宽度,高度)
	ctx.fillStyle = "#fff"  //矩形的颜色
	ctx.fill() //填充
	
	
	loadImg([
	    person_img,
	    code_img,
	]).then(([img1, img2])=> {
	    ctx.drawImage(img1, 0, 0, 400, 200)
	    ctx.drawImage(img2, 250, 130, 60, 60)
	    imageURL = canvas.toDataURL("image/png")
	    let img3 = new Image()
	    document.getElementsByClassName("box")[0].append(img3)
	    img3.src = imageURL
	    canvas.style.display = "none"
	});
}

function loadImg(src) {
	const paths = Array.isArray(src) ? src : [src];
	const promise = [];
  paths.forEach((path) => {
      promise.push(new Promise((resolve, reject) => {
          let img = new Image();
			    img.setAttribute("crossOrigin", 'anonymous');
			    img.src = path;
          img.onload = () => {
              resolve(img);
          };
          img.onerror = (err) => {
              alert('图片加载失败')
          }
      }))
  });
  return Promise.all(promise);
}