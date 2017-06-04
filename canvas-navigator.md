### canvas
*canvas渲染图片*
    -  var img = new Image()
    -  img.src = "xx.jpg"
    -  canvas.getContext('2d').drawImage(img, 0, 0)

*把canvas画布保存成图片*
    - canvas.toDataURL()
    - 第一个参数是保存图片格式   默认是image/png
    - 在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。canvas.toDataURL("image/jpeg", 1.0)
    - 第二个参数越大，图片越清晰，最大为1



### navgiator
*1.包含有关浏览器信息的信息*
    - var isTocuh = ("ontouchstart" in window) || (ua.indexOf( "touch" ) !== -1) || (ua.indexOf( "mobile" ) !== -1);  


*2.获取摄像头等设备*
```
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) { ... })
        .catch(function(error) { ... })

    // 参数constraints:
        // 同时请求不带任何参数的音频和视频：
            { audio: true, video: true }

        // 应用想要使用1280x720的摄像头分辨率:
            { audio: true, video: { width: 1280, height: 720 } }  

    // 在移动设备上面，如下的例子表示优先使用前置摄像头（如果有的话）：
        { audio: true, video: { facingMode: "user" } }

    // 强制使用后置摄像头：
        { audio: true, video: { facingMode: { exact: "environment" } } }

```

*获取摄像头老的写法*
```
    navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia(
            { audio: true, video: { width: 1280, height: 720 } },
            function(stream) {
                var video = document.querySelector('video');
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = function(e) {
                    video.play();
                };
            },
            function(err) {
                console.log("The following error occurred: " + err.name);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
```