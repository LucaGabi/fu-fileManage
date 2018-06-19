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
     * 公共方法-实例化
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
        this.loadFileList();
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
        this.service.deleteFileById(this.model.find('fileId'))
            .then((res) => {
                this.loadFileList();
                console.log('delete', this.model.find('fileId'))
            });
    }
    /**
     * 公共方法-下载文件
     */
    downloadFile() {
        console.log('download')
        // this.model.download(url)
        //     .then((res) => {
        //         this.loadFileList();
        //     });
    }
    /**
     * 公共方法-上传文件
     */
    uploadFile() {
        console.log('upload')
    }
}

export default FuFileManageController;