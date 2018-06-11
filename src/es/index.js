import './index.less';
import $ from 'jquery';

export default class FileManage {
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
                        <li class="fu-fileManage-tab-item fu-fileManage-tab-download fu-fileManage-tab-item-active">
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
                            <li class="fu-fileManage-list-item" title="redux-in-chinese">
                                <input name="File" type="checkbox" value="3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">
                                <a target="_Blank" href="/CRM/FileManage/FilePreview?fileid=3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">redux-in-chinese (1).pdf</a>
                            </li>
                            <li class="fu-fileManage-list-item" title="redux-in-chinese">
                                <input name="File" type="checkbox" value="3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">
                                <a target="_Blank" href="/CRM/FileManage/FilePreview?fileid=3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">redux-in-chinese (1).pdf</a>
                            </li>
                            <li class="fu-fileManage-list-item" title="redux-in-chinese">
                                <input name="File" type="checkbox" value="3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">
                                <a target="_Blank" href="/CRM/FileManage/FilePreview?fileid=3b0c3e6e-698a-4d6c-a79c-7a9dec7fec10">redux-in-chinese (1).pdf</a>
                            </li>
                        </ul>
                    </div>
                    <div class="fu-fileManage-panel-upload" style="display: none;">
                        <p>文件上传中</p>
                    </div>
                </div>
            </div>`;
        dom.innerHTML = tag;
        this.$Dom = $(dom);
    }
    /**
     * 公共方法-组件实例化后的启动入口
     */
    init() {
       this._bindControlEvent();
    }
    /**
     * 事件-当icon被点击时触发
     * @param {Array} controlArr 根据权限数组绑定触发类型
     */
    _bindControlEvent(controlArr) {
        this.$Dom.find('.fu-fileManage-tab-download').on('click', () => {
            this._checkPanel("DOWNLOAD");
        })
        this.$Dom.find('.fu-fileManage-tab-delete').on('click', () => {
            this._checkPanel("DELETE");
        })
        this.$Dom.find('.fu-fileManage-tab-upload').on('click', () => {
            this._checkPanel("UPLOAD");
        })
    }
    /**
     * 方法-根据点击的控制器，切换面板
     * @param {String} eventType 根据传入的模式类型，切换视图
     */
    _checkPanel(eventType) {
        switch (eventType) {
            case "DOWNLOAD":
                // 点击下载
                this.$Dom.find('.fu-fileManage-panel-upload').hide();
                this.$Dom.find('.fu-fileManage-panel-default').fadeIn();
                this.$Dom.find('.fu-fileManage-tab-item').removeClass('fu-fileManage-tab-item-active');
                this.$Dom.find('.fu-fileManage-tab-download').addClass('fu-fileManage-tab-item-active');
                break;
            case "DELETE":
                // 点击删除
                this.$Dom.find('.fu-fileManage-panel-upload').hide();
                this.$Dom.find('.fu-fileManage-panel-default').fadeIn();
                this.$Dom.find('.fu-fileManage-tab-item').removeClass('fu-fileManage-tab-item-active');
                this.$Dom.find('.fu-fileManage-tab-delete').addClass('fu-fileManage-tab-item-active');
                break;
            case "UPLOAD":
                // 点击上传
                this.$Dom.find('.fu-fileManage-panel-default').hide();
                this.$Dom.find('.fu-fileManage-panel-upload').fadeIn();
                this.$Dom.find('.fu-fileManage-tab-item').removeClass('fu-fileManage-tab-item-active');
                this.$Dom.find('.fu-fileManage-tab-upload').addClass('fu-fileManage-tab-item-active');
                break;
            default:
                break;
        }
    }
    // 加载列表
    loadFileList() {

    }
    // 上传文件
    upload() {

    }
}