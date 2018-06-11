import './index.less';
import $ from 'jquery';

export default class FileManage {
    constructor(option) {
        this.config = {

        };
        this.cache = '';
        this.config = $.extend(this.config, option || {});
    }
    // 绘制DOM节点
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
                        
                    </div>
                </div>
            </div>`
        dom.innerHTML = tag;
    }
    // 初始化
    init() {

    }

}