import $ from 'jquery';
import './index.less';
/**
 * 类-视图层
 */
class FuFileManageView {
    /**
     * 构造函数
     */
    constructor() {
        this.$This = $('#app');
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
        const dom_layout = document.getElementById(ID);
        this.$This = $(dom_layout);
        this.$This.append(tag);
    }
    /**
     * 公共方法-绘制文件列表
     * @param {Object} filrArr 文件列表数组
     */
    renderFileList(filrArr) {
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
            this.$This.find('.fu-fileManage-list').empty();
            this.$This.find('.fu-fileManage-list').append(tag);
        }, 1000);
    }
}
export default FuFileManageView;