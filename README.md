# FuFileManage

## 1. 快速开始

``` html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title>
        首页
    </title>
</head>
<body>
    <div id="app" style="width:200px"></div>
</body>
<script>
    var myFileManage = new FuFileManage({
        initURL: '/CRM/FileCompoent/List',//文件列表加载地址
        previewURL: '/CRM/FileManage/FilePreview',//文件预览地址
        downloadURL: '/CRM/FileCompoent/Download',//文件下载地址
        allowDownloadURL: '/CRM/FileCompoent/AllowDownload',//文件下载预处理
        uploadURL: '/CRM/FileCompoent/UploadBigFile',//文件上传地址
        uploadCheckURL: '/CRM/FileCompoent/CheckFileChunk',//分块校验地址
        deleteURL: '/CRM/FileCompoent/Delete',//文件删除地址
        souceRecordID: '',//文件管理id
        modelName: '',//上传指定模块
        uploadPath: '',//文件保存地址
        getUploadPath: undefined,//默认无需获取页面新上传路径
        beforeUpload: function () {//默认允许上传
            return true;
        },
        authority: {//分项权限
            download: true,
            delete: true,
            upload: true
        },
        disabled: true,//ture为默认模式,false为只读模式
    });
    myFileManage.renderDOM(document.getElementById("app"));
    myFileManage.init();
</script>
</html>
```