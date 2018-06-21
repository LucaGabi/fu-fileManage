import $ from 'jquery';
import './index.less';
/**
 * 类-视图层
 */
class FuFileManageView {
    /**
     * 构造函数
     */
    constructor(ID) {
        this.$This = $(document.getElementById(ID));
    }
    /**
     * 公共方法-根据id在页面绘制出组件的骨架
     * @param {String} ID 挂载点div标签的id
     */
    renderLayout(ID) {
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
        this.$This.append(tag);
    }
    /**
     * 公共方法-绘制文件列表
     * @param {Object} filrArr 文件列表数组
     */
    renderFileList(fileArr) {
        let tag = $.map(fileArr, (item) => {
            return `<li class="fu-fileManage-list-item" title=${item.FileName}>
                        <input name="FuFileCheckbox" type="checkbox" value=${item.FileId}>
                        ${this._renderPreview(item.AllowPreview, item.FileId, item.FileName)}
                    </li>`;
        });
        this.$This.find('.fu-fileManage-list').empty();
        this.$This.find('.fu-fileManage-list').append(tag);
    }
    /**
     * 私有方法-渲染预览选项
     * @param {Boolean} allowPreview 是否可预览
     * @param {String} fileId 文件id
     * @param {String} fileName 文件名称
     * @return {String} html 拼接字符串
     */
    _renderPreview(allowPreview, fileId, fileName) {
        if(allowPreview){
            return `<a target="_Blank" href="http://localhost:54905/FileManage/FilePreview?fileid=${fileId}">${fileName}</a>`;
        } else {
            return `<a href="#">${fileName}</a>`;
        }
    }
    /**
     * 公共方法-为组件绑定点击事件
     * @param {*} type 点击类型
     * @param {*} callback 点击回调
     */
    bindEvent(type, callback) {
        switch (type) {
            case "EVENT_DOWNLOAD":
                this.$This.find('.fu-fileManage-tab-download').on('click', () => {
                    this._switchPanel("DEFAULT");
                    callback();
                })
                break;
            case "EVENT_DELETE":
                this.$This.find('.fu-fileManage-tab-delete').on('click', () => {
                    this._switchPanel("DEFAULT");
                    callback();
                })
                break;
            case "EVENT_UPLOAD":
                this.$This.find('.fu-fileManage-tab-upload').on('click', () => {
                    this._switchPanel("UPLOAD");
                    callback();
                })
                break;
            default:
                break;
        }
    }
    /**
     * 公共方法-获取选中的文件id，并且拼接成字符串
     * @return {String} seletedArr fileId拼接字符串
     */
    getSelectedFileId() {
        let $checkboxArr = this.$This.find('.fu-fileManage-list-item input[type="checkbox"]');
        let seletedArr = '';
        $checkboxArr.each((index, element) => {
            $(element).is(':checked') ? seletedArr = $(element).val() + ',' + seletedArr : seletedArr = seletedArr;
        });
        return seletedArr;
    }
    /**
     * 私有方法-根据点击的控制器，切换面板
     * @param {String} type 根据传入的模式类型，切换视图
     */
    _switchPanel(type) {
        switch (type) {
            case "DEFAULT":
                // 点击删除
                this.$This.find('.fu-fileManage-panel-upload').hide();
                this.$This.find('.fu-fileManage-panel-default').fadeIn();
                break;
            case "UPLOAD":
                // 点击上传
                this.$This.find('.fu-fileManage-panel-default').hide();
                this.$This.find('.fu-fileManage-panel-upload').fadeIn();
                break;
            default:
                break;
        }
    }
}
export default FuFileManageView;