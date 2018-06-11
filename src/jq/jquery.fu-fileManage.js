/*!
 * @author Dengju Deng from FundUI
 * @version 1.0
 * @date 2017/6/12
 * @description 文件管理组件
 * @usage  $.fileManageComponent({...},function(res){...})
 * @param  {[string]}  initURL           [文件列表加载地址][/CRM/FileCompoent/List]
 * @param  {[string]}  previewURL        [文件预览地址][/CRM/FileManage/FilePreview]
 * @param  {[string]}  downloadURL       [文件下载地址][/CRM/FileCompoent/Download]
 * @param  {[string]}  allowDownloadURL  [文件下载预处理][/CRM/FileCompoent/AllowDownload]
 * @param  {[string]}  uploadURL         [文件上传地址][/CRM/FileCompoent/UploadBigFile]
 * @param  {[string]}  uploadCheckURL    [文件上传分块校验地址][/CRM/FileCompoent/CheckFileChunk]
 * @param  {[string]}  deleteURL         [文件删除地址][/CRM/FileCompoent/Delete]
 * @param  {[string]}  souceRecordID     [文件集合id][DFDFDG-GDFG-F-GFFGDF2L]
 * @param  {[string]}  modelName         [上传指定模块][风控会审议]
 * @param  {[string]}  uploadPath        [设置保存路径][龙之梦地产融资/退出管理/风控会审议]
 * @param  {[fun]}     getUploadPath     [动态获取保存路径][龙之梦地产融资/退出管理/初审][覆盖uploadPath][undefined]
 * @param  {[fun]}     beforeUpload      [外部校验是否允许上传][true|false]
 * @param  {[boolean]} disabled          [只读模式][true|false](已启用)
 * @param  {{object}}  authority         [下载权限][删除权限][上传权限][true|true|true]
 * @callback (fileInfoback)=>{...}       [回调函数][上传成功后返回该文件信息][{fileInfoId,fileInfoName}]
 */
define([
    'jquery',
    'webuploader'
], function ($, WebUploader) {
    $.fn.extend({
        "fileManageComponent": function (options, callback) {
            var opts = $.extend({}, defaults, options)
            $this = $(this)
            _randerDom(opts)
            _init(opts, callback)
            _loadData(opts)
        }
    })
    //组件对象
    var $this = "";
    //默认参数
    var defaults = {
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
    }
    //绘制组件HTML结构
    function _randerDom(opts) {
        var tag = ''
        tag += '<div class="crm-fileManage-right">'
        tag += '<ul class="tab">'
        tag += '<li class="tab-download active ' + (opts.authority.download ? 'show' : 'hide') + '"><i class="iconfont">&#xe626;</i></li>'
        tag += '<li class="tab-delete ' + (opts.authority.delete ? 'show' : 'hide') +'"><i class="iconfont">&#xe600;</i></li>'
        tag += '<li class="tab-upload ' + (opts.authority.upload ? 'show' : 'hide') + '"><i class="iconfont">&#xe642;</i></li>'
        tag += '</ul>'
        tag += '</div>'
        tag += '<div class="crm-fileManage-left">'
        tag += '<div class="pannel-default">'
        tag += '</div>'
        tag += '<div class="pannel-upload" style="display: none;">'
        // 插入上传组件
        tag += '</div>'
        tag += '</div>'
        $this.empty()
        $this.append(tag)
    }
    //初始化请求加载所有文件list
    function _loadData(opts) {
        $.ajax({
            type: 'get',
            url: opts.initURL,
            data: {
                souceRecordID: opts.souceRecordID,
                sourceCategory: opts.modelName
            },
            success: function (data) {
                $this.find('.pannel-default').empty()
                if (data.length != 0) {
                    var fileArr = data
                    for (var i = 0; i < fileArr.length; i++) {
                        var appStr = ''
                        appStr += '<label title=' + fileArr[i].DisplayName + '>'
                        appStr += '<input name="File" type="checkbox" value=' + fileArr[i].FileID + '>'
                        if (fileArr[i].AllowPreview) {
                            appStr += '<a target="_Blank" href=' + opts.previewURL + '?fileid=' + fileArr[i].FileID + '>' + fileArr[i].DisplayName + '<a/>'
                        } else {
                            appStr += fileArr[i].DisplayName
                        }
                        appStr += '</label>'
                        $this.find('.pannel-default').append(appStr)
                    }
                } else {
                  //  console.log('无文件')
                }
            }
        })
    }
    //初始化切换模式
    function _init(opts, callback) {
        var pannelType = "download"//downloadt表示下载界面，delete表示删除界面，upload表示上传界面
        //切换上传界面模式
        if (opts.disabled) {
            upload_Ev()
            download_Ev()
            delete_Ev()
        } else {
            //只读模式
            download_Ev()
            $('.tab-delete').hide()
            $('.tab-upload').hide()
        }
        //点击上传事件
        function upload_Ev() {
            $this.find('.tab-upload').on('click', function () {
                if (opts.beforeUpload()) {
                    //获取新路径合法切换
                    if (checkUploadPath()) {
                        tabCheck(this)
                        $this.find('.pannel-default').hide();
                        $this.find('.pannel-upload').fadeIn();
                        pannelType = "upload";
                        //构建文件上传组件
                        newWebLoader();
                        //切换状态时主动触发选择文件
                        setTimeout(function() {
                            $('#picker .webuploader-element-invisible').click();
                        }, 200);
                    } else {
                        //新上传路径不合法不上传
                    }
                }
            });
        }
        //点击下载事件
        function download_Ev() {
            $this.find('.tab-download').on('click', function () {
                tabCheck(this)
                debugger
                // $this.find('.pannel-default').hide()
                $this.find('.pannel-default').fadeIn()
                $this.find('.pannel-upload').hide()
                if (pannelType == "download" || pannelType == "delete") {
                    var arr = new Array()
                    var checkArr = new Array()
                    var downloadStr = ""
                    arr = $this.find('input[type="checkbox"]')
                    for (var i = 0; i < arr.length; i++) {
                        if ($(arr[i]).is(':checked')) {
                            arr[i] = $(arr[i]).val()
                            checkArr.push(arr[i])
                            var id = arr[i];
                            downloadStr = arr[i] + ',' + downloadStr
                        }
                    }
                    console.log("文件下载集合：" + checkArr)
                    if (hasChecked()) {
                        $.post(opts.allowDownloadURL, { downloadStr: downloadStr }, function (data) {
                            if (data.result == 1) {
                                location.href = opts.downloadURL + "?downloadStr=" + downloadStr
                                console.log("该文件地址：" + location.href)
                            } else {
                                mini.alert(data.Message);
                            }
                        })
                    } else {
                        mini.alert('请勾选要下载的文件');
                    }
                } else {
                    //只是切换
                }
                pannelType = "download"
            });
        }
        //点击删除事件
        function delete_Ev() {
            $this.find('.tab-delete').on('click', function () {
                tabCheck(this)
                // $this.find('.pannel-default').hide()
                $this.find('.pannel-default').fadeIn()
                $this.find('.pannel-upload').hide()
                if (pannelType == "delete" || pannelType == "download") {
                    if (hasChecked()) {
                        mini.confirm("确定要删除文件吗？", "删除", function (action) {
                            if (action == "ok") {
                                var arr = new Array()
                                var checkArr = new Array()
                                var deleteStr = ""
                                arr = $this.find('input[type="checkbox"]')
                                for (var i = 0; i < arr.length; i++) {
                                    if ($(arr[i]).is(':checked')) {
                                        arr[i] = $(arr[i]).val()
                                        checkArr.push(arr[i])
                                        deleteStr = arr[i] + "," + deleteStr
                                    }
                                }
                                console.log("文件删除：" + checkArr)
                                $.post(opts.deleteURL, { deleteStr: deleteStr }, function (result) {
                                    if (result.result == 1) {
                                        for (var i = 0; i < checkArr.length; i++) {
                                            var ss = checkArr[i]
                                            $('input[value=' + ss + ']').parent().remove()
                                        }
                                    }
                                    else {
                                        mini.alert('文件不存在')
                                    }
                                })
                            }
                        })
                    } else {
                        mini.alert('请选择要删除的文件')
                    }
                } else {
                    //只是切换
                }
                pannelType = "delete"
            });
        }
        //切换iconUI颜色
        function tabCheck(element) {
            $this.find('.tab li').each(function () {
                $(this).removeClass('active')
            })
            $(element).addClass('active')
        }
        //判断用户是否已作出选择
        function hasChecked() {
            var arr = new Array()
            var checkArr = new Array()
            arr = $(app).find('input[type="checkbox"]')
            for (var i = 0; i < arr.length; i++) {
                if ($(arr[i]).is(':checked')) {
                    arr[i] = $(arr[i]).val()
                    checkArr.push(arr[i])
                }
            }
            if (checkArr[0]) {
                return true
            } else {
                return false
            }
        }
        //判断是否合法，如果合法请重置上传路径,
        function checkUploadPath() {
            var newP = opts.getUploadPath;
            if ("undefined" != typeof newP) {//有定义
                if (opts.getUploadPath() != "") {//且不为空
                    opts.uploadPath = opts.getUploadPath()
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
            console.log("上传文件路径：" + opts.uploadPath)
        }
        //截取过滤IE下带路径的文件名
        function filterIEPath(path) {
            var test1 = path.lastIndexOf("/");  //对路径进行截取
            var test2 = path.lastIndexOf("\\");  //对路径进行截取
            var test = Math.max(test1, test2)
            if (test < 0) {
                return path;
            } else {
                return path.substring(test + 1); //赋值文件名
            }
        }
        //WebUploader插件初始化--------------------------------------------------
        function newWebLoader() {
            //插入基础结构
            var tag = ''
            tag += '<div id="uploader" class="wu-example">'//上传组件
            tag += '<div id="thelist" class="uploader-list"></div>'
            tag += '<div class="btns">'
            tag += '<div id="picker">+</div>'
            tag += '<i id="ctlBtn" class="btn btn-default iconfont" style="display:none">&#xe628;</i>'
            tag += '<span id="utip" style="text-align: center;display:block">*点此上传文件<span>'
            tag += '<div style="clear: both;"></div>'
            tag += '</div>'
            tag += '</div>'
            $this.find('.pannel-upload').empty()
            $this.find('.pannel-upload').append(tag)
            //初始化参数
            var $ = jQuery,
                $list = $('#thelist'),//文件列表
                $btn = $('#ctlBtn'),//开始上传按钮
                state = 'pending',//分块上传状态
                uploader;//上传组件对象
            //当前文件MD5
            var fileMd5;
            //重写插件方法
            WebUploader.Uploader.register({
                "before-send-file": "beforeSendFile",//整个文件上传前
                "before-send": "beforeSend",  //每个分片上传前 
            }, {
                    //时间点1：所有分块进行上传之前调用此函数  
                    beforeSendFile: function (file) {
                        //创建一个异步对象
                        var deferred = WebUploader.Deferred();
                        (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024)
                            .progress(function (percentage) {
                                $('#' + file.id).find('p.state').text('正在读取文件信息...');
                            })
                            .then(function (val) {
                                $('#' + file.id).find("p.state").text("成功获取文件信息...");
                                fileMd5 = val
                                //添加参数---文件路径
                                uploader.option('formData', {
                                    md5: fileMd5
                                })
                                //获取文件信息后进入下一步  
                                deferred.resolve();
                            });
                        return deferred.promise();
                    },
                    //时间点2：如果有分块上传，则每个分块上传之前调用此函数    
                    beforeSend: function (block) {
                        var deferred = WebUploader.Deferred();
                        $.ajax({
                            type: "POST",
                            url: opts.uploadCheckURL,  //ajax验证每一个分片  
                            data: {
                                folderPath: opts.uploadPath,
                                md5: fileMd5,  //文件唯一标记    
                                chunk: block.chunk,  //当前分块下标    
                                chunkSize: block.end - block.start//当前分块大小    
                            },
                            cache: false,
                            async: false,  // 与js同步  
                            timeout: 1000, //todo 超时的话，只能认为该分片未上传过  
                            dataType: "json",
                            success: function (response) {
                                if (response.result == 1) {
                                    //分块存在，跳过  
                                    deferred.reject();
                                } else {
                                    //分块不存在或不完整，重新发送该分块内容    
                                    deferred.resolve();
                                }
                            }
                        });
                        this.owner.options.formData.fileMd5 = fileMd5;
                        deferred.resolve();
                        return deferred.promise();
                    }
                });
            //实例化上传插件--------------------------------------------------------------------------
            uploader = WebUploader.create({
                auto: true,//选择文件后是否自动上传
                swf: '/CommonResource/scripts/Uploader.swf',
                server: opts.uploadURL,
                pick: '#picker',
                formData: {
                    folderPath: opts.uploadPath,
                    projectNodeId: opts.souceRecordID,
                    modelName: opts.modelName
                },
                chunked: true,//开启分片上传
                chunkSize: 5 * 1024 * 1024,// 如果要分片，分多大一片？默认大小为5M
                chunkRetry: 3,//如果某个分片由于网络问题出错，允许自动重传多少次
                prepareNextFile: true,//上传当前分片时预处理下一分片 
                threads: 3,//上传并发数。允许同时最大上传进程数[默认值：3]
                duplicate: false,//是否重复上传（同时选择多个一样的文件），true可以重复上传
                fileSizeLimit: 6 * 1024 * 1024 * 1024,//6G 验证文件总大小是否超出限制, 超出则不允许加入队列
                fileSingleSizeLimit: 3 * 1024 * 1024 * 1024,  //3G 验证单个文件大小是否超出限制, 超出则不允许加入队列
                pick: {
                    id: '#picker', //这个id是你要点击上传文件按钮的外层div的id
                    multiple: false //是否可以批量上传，true可以同时选择多个文件
                },
                resize: false,//不压缩image, 默认如果是jpeg，文件上传前会先压缩再上传！
                accept: {
                    //允许上传的文件后缀，不带点，多个用逗号分割
                    // extensions: "pdf,doc,docx",  
                    // mimeTypes: '.pdf,.doc,.docx',  
                    extensions: "",
                    mimeTypes: '',
                }
            });
            // 当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
                //限制单个文件的大小 超出了提示  
                if (file.size > 3 * 1024 * 1024 * 1024) {
                    alert("单个文件大小不能超过3G");
                    return false;
                }
                var tag = ''
                tag += '<div id="' + file.id + '" class="item">'
                tag += '<h4 class="info">' + file.name + '</h4>'
                tag += '<p class="state">等待上传...</p>'
                tag += '</div>'
                $list.append(tag);
                $this.find('#picker').hide()
                $this.find('#utip').hide()
                $this.find('#ctlBtn').show()
            });
            // 文件上传过程中创建进度条实时显示。
            uploader.on('uploadProgress', function (file, percentage) {
                var $percent = $('#' + file.id).find('.progress .progress-bar');
                if (!$percent.length) {
                    var ss = ''
                    ss += '<div class="progress progress-striped active">'
                    ss += '<div class="progress-bar" role="progressbar" style="width: 0%">'
                    ss += '</div>'
                    ss += '</div>'
                    $('#' + file.id).append(ss)
                }
                //进度条长度改变
                $percent.css('width', percentage * 100 + '%');
                //100%合并延迟
                if (Math.floor(percentage * 100) == 100) {
                    $('#' + file.id).find('p.state').text('文件处理中...');
                } else {
                    $('#' + file.id).find('p.state').text('上传进度：' + Math.floor(percentage * 100) + '%');
                }
            });
            uploader.on('uploadSuccess', function (file, response) {
                $('#' + file.id).find('p.state').text('上传成功');
                var fileInfoback = {//上传成功后回调
                    fileInfoId: response.FileID,
                    fileInfoName: response.DisplayName,
                }
                //将上传文件后返回的id回调
                callback(fileInfoback)
                console.log(fileInfoback)
                mini.alert('上传成功')
                //清空上传组件
                $this.find('.pannel-upload').empty()
                uploader.destroy()
                //插入新上传的数据
                var appStr_file = ''
                appStr_file += '<label title="' + response.DisplayName + '">'
                appStr_file += '<input name="File" type="checkbox" value="' + response.FileID + '"/>'
                if (response.AllowPreview) {
                    appStr_file += '<a target="_Blank" href=' + opts.previewURL + '?fileid=' + response.FileID + '>' + response.DisplayName + '<a/>'
                } else {
                    appStr_file += response.DisplayName
                }
                appStr_file += '</label>'
                $this.find('.pannel-default').append(appStr_file)
                //上传成功后跳转
                tabCheck($this.find('.tab-download'))
                $this.find('.pannel-default').fadeIn()
                $this.find('.pannel-upload').hide()
                pannelType = "download"
            });
            uploader.on('uploadError', function (file, reason) {
                $('#' + file.id).find('p.state').text('上传出错');
            });
            uploader.on('uploadComplete', function (file) {
                $('#' + file.id).find('.progress').fadeOut();
            });
            uploader.on('all', function (type) {
                if (type === 'startUpload') {
                    state = 'uploading';
                    // window.onbeforeunload=function (event){
                    //     if(state === 'uploading' || state === 'paused'){
                    //         if(document.body.clientWidth-event.clientX< 170&&event.clientY< 0||event.altKey){
                    //             return "你要放弃本次上传,离开页面吗?"
                    //         }else{
                    //             return "你要放弃本次上传,离开页面吗?";
                    //         }
                    //     }
                    // }                 
                } else if (type === 'stopUpload') {
                    state = 'paused';
                } else if (type === 'uploadFinished') {
                    state = 'done';
                } else {
                    //其他状态
                }
                //改变停止icon
                if (state === 'uploading') {
                    $btn.html('&#xe628;');
                } else {
                    $btn.html('&#xe629;');
                }
                //失去焦点则销毁上传对象
                $this.find('.tab-download').on('click', function () {
                    $this.find('.pannel-upload').empty()
                    uploader.stop(true);
                    uploader.destroy()
                })
                $this.find('.tab-delete').on('click', function () {
                    $this.find('.pannel-upload').empty()
                    uploader.stop(true);
                    uploader.destroy()
                })
            });
            //上传前验证
            $btn.click(function (e) {
                if (state === 'uploading') {
                    uploader.stop(true);
                } else {
                    if (opts.uploadPath != "") {
                        uploader.upload();
                    } else {
                        mini.alert('请确认信息完整')
                    }
                }
            });
        }
    }
});



