import FuWebUploader from './FuWebUploader.js';
import './index.less';
import $ from 'jquery';

/**
 * 类-小型文件管理器
 */
class FileManage {
    constructor(option) {
        this.config = {

        };
        this.cache = '';
        this.config = $.extend(this.config, option || {});
        this.$Dom = $('#app');
    }
    /**
     * 公共方法-根据id在页面绘制出组件的骨架
     * @param {String} dom 挂载点div标签的id
     */
    renderDOM(dom) {
        let tag =
            `<div class="fu-fileManage">
                <div class="fu-fileManage-control">
                    <ul class="fu-fileManage-tab">
                        <li class="fu-fileManage-tab-item fu-fileManage-tab-download">
                            <i class="fu-iconfont" title="下载">&#xe626;</i>
                        </li>
                        <li class="fu-fileManage-tab-item fu-fileManage-tab-delete">
                            <i class="fu-iconfont" title="删除">&#xe600;</i>
                        </li>
                        <li class="fu-fileManage-tab-item fu-fileManage-tab-upload">
                            <i class="fu-iconfont" title="上传">&#xe642;</i>
                        </li>
                    </ul>
                </div>
                <div class="fu-fileManage-panel">
                    <div class="fu-fileManage-panel-default">
                        <ul class="fu-fileManage-list">
                            
                        </ul>
                    </div>
                    <div class="fu-fileManage-panel-upload" style="display: none;">
                        <span class="fu-fileManage-panel-upload-orgin">+</span>
                        <h1 class="fu-fileManage-panel-upload-rate">0%</h1>
                        <p class="fu-fileManage-panel-upload-progress">上传中</p>
                    </div>
                </div>
            </div>`;
        this.$Dom = $(dom);
        $(dom).append(tag);
    }
    /**
     * 公共方法-组件实例化后的启动入口
     */
    init() {
       this._bindControlEvent();
       this._loadFileList();
    }
    /**
     * 私有方法-绑定事件，当icon被点击时触发
     * @param {Array} controlArr 根据权限数组绑定触发类型
     */
    _bindControlEvent(controlArr) {
        this.$Dom.find('.fu-fileManage-tab-download').on('click', () => {
            this._switchPanel("DOWNLOAD");
            this._downloadFile();
        })
        this.$Dom.find('.fu-fileManage-tab-delete').on('click', () => {
            this._switchPanel("DELETE");
            this._deleteFile();
        })
        this.$Dom.find('.fu-fileManage-tab-upload').on('click', () => {
            this._switchPanel("UPLOAD");
            this._uploadFile('file1');
        })
    }
    /**
     * 私有方法-根据点击的控制器，切换面板
     * @param {String} eventType 根据传入的模式类型，切换视图
     */
    _switchPanel(eventType) {
        switch (eventType) {
            case "DOWNLOAD":
                // 点击下载
                this.$Dom.find('.fu-fileManage-panel-upload').hide();
                this.$Dom.find('.fu-fileManage-panel-default').fadeIn();
                break;
            case "DELETE":
                // 点击删除
                this.$Dom.find('.fu-fileManage-panel-upload').hide();
                this.$Dom.find('.fu-fileManage-panel-default').fadeIn();
                break;
            case "UPLOAD":
                // 点击上传
                this.$Dom.find('.fu-fileManage-panel-default').hide();
                this.$Dom.find('.fu-fileManage-panel-upload').fadeIn();
                break;
            default:
                break;
        }
    }
    /**
     * 私有方法-上传文件
     * @param {Object} config 上传文件所需要的配置项
     */
    _uploadFile(config) {
        // 测试
        let num = 0;
        setInterval(()=>{
            let Num = (num++) + '%'
            num <= 100 ?  this.$Dom.find('.fu-fileManage-panel-upload-rate').html(Num) : console.log()
        }, 10);
        // 实例化文件上传模组
        // let myUploader = new FuWebUploader('#uploader');
        // myUploader.init({
        //     serverUrl: 'UploadFile',
        //     chunkCheckUrl: 'CheckFileChunk',
        //     sourceId: 'sourceId_123456',
        //     sourceName: 'sourceName_123456',
        //     folderPath: '/基金',
        //     allow: () => { 
        //         let folderPath = document.getElementById("fu_filePath").title;
        //         let arr = folderPath.split('/');
        //         if ((folderPath == '') || (arr.length != 4)) {
        //             console.log('上传路径非法');
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     },
        //     success: (res) => {
        //         //this.setState({ loading: !this.state.loading});
        //     }
        // });
    }
    /**
     * 私有方法-发起http请求，刷新加载列表
     * @param {String} url 
     */
    _loadFileList(url) {
        setTimeout(() => {
            let fileArr = [
                {
                    "ID": "9ba39ebf-47ec-4aa9-b5b1-9534c73f6e65",
                    "FileID": "34dda29c-e7ac-472a-af54-6a1fe762c931",
                    "DisplayName": "水浒传.pdf",
                    "SouceRecordID": "115c8390-477e-4e83-a10a-661abe9fe154",
                    "SourceCategory": "ContactEvent",
                    "AllowPreview": true
                }, {
                    "ID": "9ba39ebf-47ec-4aa9-b5b1-9534c73f6e65",
                    "FileID": "34dda29c-e7ac-472a-af54-6a1fe762c931",
                    "DisplayName": "西游记.pdf",
                    "SouceRecordID": "115c8390-477e-4e83-a10a-661abe9fe154",
                    "SourceCategory": "ContactEvent",
                    "AllowPreview": true
                }
            ];
            let tag = $.map(fileArr, (item) => {
                return `<li class="fu-fileManage-list-item" title=${item.DisplayName}>
                            <input name="FuFileCheckbox" type="checkbox" value=${item.FileID}>
                            <a target="_Blank" href="/CRM/FileManage/FilePreview?fileid=3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">${item.DisplayName}</a>
                        </li>`;
            });
            this.$Dom.find('.fu-fileManage-list').empty();
            this.$Dom.find('.fu-fileManage-list').append(tag);
        }, 1000);
    }
    /**
     * 私有方法-获取被选中的文件集合
     * @returns {Array} 文件id数组
     */
    _getSeletedFilesId() {
        let $checkboxArr = this.$Dom.find('.fu-fileManage-list-item input[type="checkbox"]');
        let seletedArr = [];
        $checkboxArr.each((index, element) => {
            $(element).is(':checked') ? seletedArr.push($(element).val()) : console.log();
        });
        return seletedArr;
    }
    /**
     * 私有方法-发送http请求，并操作DOM删除文件
     */
    _deleteFile() {
        setTimeout(()=>{
            if(this._getSeletedFilesId().length > 0){
                // 发起http请求删除文件
                window.alert('已删除文件');
                this._loadFileList();
            }else{
                console.log();
            }
        }, 1000)
    }
    /**
     * 私有方法-发送http请求，并下载文件压缩包
     */
    _downloadFile() {
        setTimeout(()=>{
            if(this._getSeletedFilesId().length > 0){
                // 发起http请求删除文件
                window.alert('已下载文件');
                this._loadFileList();
            }else{
                console.log();
            }
        }, 1000)
    }
}

export default FileManage;