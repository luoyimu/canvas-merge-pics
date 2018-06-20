# canvas-merge-pics

父亲节马上就要到了，产品大佬提出要搞一个H5，通过答题测试，最终生成符合爸爸性格的人物图，并在保存至相册时拼上推广的二维码。^

简单分析下需求：答题后生成人物图，页面显示的图片上有提示长按保存图片的按钮。保存至手机相册时，需要拼上二维码，并去掉相关提示信息。^

也就是说，主要做的有2点
1.  **将人物图和二维码这两张图片合并成一张图片**
        解决方案： 可以**利用canvas实现**，具体实现如下
2.  **页面中显示的图片，与长按图片保存的是不一样的**
        解决方案：答题后生成人物图片A，同时用canvas绘制有二维码的人物图片B，通过定位方式将A、B图重叠，并将B置顶,透明度为0.01（不设置为0,在有些机器下有bug)。这样可以做到页面显示的是A图，长按保存的是B图。

### canvas绘图

1. **js文件中动态创建canvas**

    ``` javascript
    let canvas = document.createElement('canvas')
    canvas.width = "700"
    canvas.height = "980"  //创建画布，并设置宽高
    //注意canvas元素本身并没有绘制能力（它仅仅是图形的容器
    //getContext()方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性
    let ctx = canvas.getContext("2d")
    ctx.rect(0,0, 700, 980) //矩形坐标，大小 (距离左上角x坐标,距离左上角y坐标,宽度,高度)
    ctx.fillStyle = "#fff" //矩形的颜色
    ctx.fill() //填充
    ```

2. **画布上绘制图像：context.drawImage(image,x,y,w,h)**
x，y为画布中画图的起始坐标，w,h指绘制出来的图像的宽度与高度，比例与原图宽高最好一致，图像不会变形。

    这里需要注意一下，图片加载完成再调用drawImage绘图
    所以，定义了一个`promise`函数,当图片数据信息都加载完成后再调用drawImage绘图
    ``` javascript
    function loadImg(src) {
        let paths = Array.isArray(src) ? src : [src]
        let promise = paths.map((path) => {
            return new Promise((resolve, reject) => {
                let img = new Image()
                img.setAttribute("crossOrigin", 'anonymous')
                img.src = path
                //只是更新了DOM对象,图片数据信息还未加载完成，加载资源是异步执行的,需要监听load事件的,事件发生后,就能获取资源
                img.onload = () => {
                    resolve(img)
                }
                img.onerror = (err) => {
                    alert('图片加载失败')
                }
            })
        })
        return Promise.all(promise)
    }
    ```
    图片加载完成，调用drawImage绘图
    ``` javascript
    loadImg([
        'https://image.ibb.co/f4Lged/2017072615215296mg_ULNAVisju_Wh_D.jpg',
        'https://image.ibb.co/dkSoQJ/qrcode_for_gh_2039c29e81ca_430.jpg',
    ]).then(([img1, img2])=> {
        ctx.drawImage(img1, 0, 0, 400, 200) //画布上先绘制人物图`
        ctx.drawImage(img2, 250, 130, 60, 60) //再绘制二维码图，根据设计图设置好坐标。`
        imageURL = canvas.toDataURL("image/png") //获取图片合并后的data-URL,参数可选图片格式，图片质量，详自查API`
        let img3 = new Image()
        document.getElementsByClassName("box")[0].append(img3)
        img3.src = imageURL
        canvas.style.display = "none"
    });

    ```

    这样就将两张图片合成为一张图片了，然后可以利用HTML5 a标签 download属性，也可以将其通过img标签展示到页面，然后长按/右键保存到本地。

    [github查看代码](https://github.com/luoyimu/canvas-merge-pics)
