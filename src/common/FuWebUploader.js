import $ from 'jquery';
import WebUploader from 'Webuploader';
/**
 * 类-基于百度开源的文件上传组件封装
 */
class FuWebUploader {
    constructor(ID) {
        this.ID = ID;
        this.config = '';
        this.uploader = '';
    }
    // 初始化
    init(config) {
        this.config = config;
        this.renderDom();
        this.registerWebUploader(this.config.chunkCheckUrl, this.config.sourceId, this.config.allow);
        this.createWebUploader(this.config);
        this.circleWebUploader(this.config);
    }
    // 绘制组件
    renderDom() {
        $(this.ID).append(
            `<div class="fu-fileUploadSimple-btns fu-clearfix">
                <span id="fu_fileUploadSimple_info" class="fu-fileUploadSimple-info"></span>
                <div id="picker" class="fu-fileUploadSimple-picker">
                    <span class="fu-fileUploadSimple-picker-text">上传</span>
                </div>
            </div>`
        );
    }
    // 重写控件
    registerWebUploader(chunkCheckUrl, sourceId, allow) {
        let fileMd5;
        let folderPath;
        WebUploader.Uploader.register({
            "before-send-file": "beforeSendFile",//整个文件上传前
            "before-send": "beforeSend",  //每个分片上传前 
        }, {
                //时间点1：所有分块进行上传之前调用此函数  
                beforeSendFile: function (file) {
                    //创建一个异步对象
                    var deferred = WebUploader.Deferred();
                    let uploader = (new WebUploader.Uploader());
                    uploader.md5File(file, 0, 10 * 1024 * 1024)
                        .progress(function (percentage) {
                            $('#' + file.id).find('p.state').text('正在读取文件信息...');
                        })
                        .then(function (val) {
                            $('#' + file.id).find("p.state").text("成功获取文件信息...");
                            // 动态获取携带参数
                            fileMd5 = val;
                            // 动态获取文件路径并且校验上传路径是否合法
                            folderPath = $('#fu_filePath').attr('title');
                            // 判断是否有权限上传
                            return allow()? deferred.resolve() : deferred.reject();
                        });
                    return deferred.promise();
                },
                //时间点2：如果有分块上传，则每个分块上传之前调用此函数    
                beforeSend: function (block) {
                    var deferred = WebUploader.Deferred();
                    $.ajax({
                        type: "POST",
                        url: chunkCheckUrl,  //ajax验证每一个分片  
                        data: {
                            folderPath: folderPath,
                            md5: fileMd5,
                            chunk: block.chunk,
                            chunkSize: block.end - block.start
                        },
                        cache: false,
                        async: false,  // 与js同步  
                        timeout: 1000, //todo 超时的话，只能认为该分片未上传过  
                        dataType: "json",
                        success: function (response) {
                            if (response.Code == 1) {
                                //分块不存在或不完整，重新发送该分块内容    
                                deferred.resolve();
                            } else {
                                //分块存在，跳过  
                                deferred.reject();
                            }
                        }
                    });
                    // 为大文件上传携带参数
                    this.owner.options.formData.md5 = fileMd5;
                    this.owner.options.formData.folderPath = folderPath;
                    this.owner.options.formData.sourceId = sourceId;
                    deferred.resolve();
                    return deferred.promise();
                }
            });
    }
    // 创建控件
    createWebUploader(config) {
        this.uploader = WebUploader.create({
            auto: true,//选择文件后是否自动上传
            swf: '/CommonResource/scripts/Uploader.swf',
            server: config.serverUrl,
            formData: {
                sourceName: config.sourceName
            },
            chunked: true,//开启分片上传
            chunkSize: 3 * 1024 * 1024,// 如果要分片，分多大一片？默认大小为5M
            chunkRetry: 3,//如果某个分片由于网络问题出错，允许自动重传多少次
            prepareNextFile: true,//上传当前分片时预处理下一分片 
            threads: 3,//上传并发数。允许同时最大上传进程数[默认值：3]
            duplicate: false,//是否重复上传（同时选择多个一样的文件），true可以重复上传
            fileSizeLimit: 6 * 1024 * 1024 * 1024,//6G 验证文件总大小是否超出限制, 超出则不允许加入队列
            fileSingleSizeLimit: 3 * 1024 * 1024 * 1024,  //3G 验证单个文件大小是否超出限制, 超出则不允许加入队列
            //fileNumLimit: 10,//可上传的文件数量
            pick: {
                id: '#picker', //这个id是你要点击上传文件按钮的外层div的id
                multiple: true //是否可以批量上传，true可以同时选择多个文件
            },
            resize: false,//不压缩image, 默认如果是jpeg，文件上传前会先压缩再上传！
            // accept: {
            //     extensions: "pdf,doc,docx",  //允许上传的文件后缀，不带点，多个用逗号分割
            //     mimeTypes: '.pdf,.doc,.docx',  
            // }
        });
    }
    // 上传生命周期
    circleWebUploader(config) {
        let filesArr = new Array();
        let state = 'pending';//分块上传状态
        // 周期-文件序列
        this.uploader.on('fileQueued', (file) => {
            //清空文件数组
            filesArr = [];
            //限制单个文件的大小 超出了提示  
            if (file.size > 3 * 1024 * 1024 * 1024) {
                alert("单个文件大小不能超过3G");
                return false;
            }
            $('#fu_fileUploadSimple_info').text(file.name);
            console.log(file)
        });
        // 周期-进度条实时显示
        this.uploader.on('uploadProgress', (file, percentage) => {
            //100%合并延迟
            if (Math.floor(percentage * 100) == 100) {
                $('#picker .fu-fileUploadSimple-picker-text').text('文件处理中');
            } else {
                $('#picker .fu-fileUploadSimple-picker-text').text(Math.floor(percentage * 100) + '%');
            }
        });
        // 周期-上传成功
        this.uploader.on('uploadSuccess', (file, response) => {
            if (response.Code == 0) {
                $('#fu_fileUploadSimple_info').text(file.name + '【上传成功】');
                config.success(response);
            } else if (response.Code == 1) {
                $('#fu_fileUploadSimple_info').text(file.name + '【服务器响应失败】');
            } else {
                $('#fu_fileUploadSimple_info').text(file.name + '【服务其响应失败-code2】');
            }
        });
        // 周期-上传失败
        this.uploader.on('uploadError', (file, reason) => {
            $('#fu_fileUploadSimple_info').text(file.name + '【请检查文件夹路径】');
            // 上传失败重置队列
            this.uploader.reset();
        });
        // 周期-上传完成
        this.uploader.on('uploadComplete', (file) => {
            $('#picker .fu-fileUploadSimple-picker-text').text('上传');
        });
        // 周期-所有文件上传成功后清空队列
        this.uploader.on('uploadFinished', () => {
            this.uploader.reset();
        });
    }
}

export default FuWebUploader;

