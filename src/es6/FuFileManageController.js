/**
 * 类-控制层
 */
class FuFileManageController {
    constructor(model, view, service) {
        this.model = model;
        this.view = view;
        this.service = service;
    }
    /**
     * 公共方法-初始化组件
     */
    init() {
        this.view.renderLayout('app');
        this.view.bindEvent('EVENT_DELETE', () => {
            this.deleteFile();
        });
        this.view.bindEvent('EVENT_DOWNLOAD', () => {
            this.downloadFile();
        });
        this.view.bindEvent('EVENT_UPLOAD', () => {
            this.uploadFile();
        });
        // 加载文件列表
        this.loadFileList();
        // 初始化文件上传控件
    }
    /**
     * 公共方法-加载文件列表
     */
    loadFileList() {
        this.service.getFileList(this.model.find('identityId'), this.model.find('tableName'))
            .then((res) => {
                this.view.renderFileList(res);
                this.model.save('fileList', res);
                console.log('load', this.model.find('fileList'))
            });
    }
    /**
     * 公共方法-删除文件
     */
    deleteFile() {
        this.model.save('fileId', this.view.getSelectedFileId());
        if(this.view.getSelectedFileId() != ""){
            this.service.deleteFileById(this.model.find('fileId'))
            .then((res) => {
                console.log('delete', '删除成功');
                this.loadFileList();
            }, ()=>{
                console.log('delete', '删除失败');
            });
        }
    }
    /**
     * 公共方法-下载文件
     */
    downloadFile() {
        this.model.save('downloadStr', this.view.getSelectedFileId());
        if(this.view.getSelectedFileId() != ""){
            this.service.allowDownload(this.model.find('downloadStr'))
            .then((res) => {
                console.log('download', '下载文档');
                this.service.download(this.model.find('downloadStr'))
            }, ()=>{
                console.log('download', '文件不存在');
            });
        }
    }
    /**
     * 公共方法-上传文件
     */
    uploadFile() {
        this.loadFileList(); // 重置文件列表

    }
}

export default FuFileManageController;