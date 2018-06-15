/**
 * 类-控制层
 */
class FuFileManageController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
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
        this.model.load()
            .then((res) => {
                this.view.renderFileList(res);
            });
    }
    /**
     * 公共方法-删除文件
     */
    deleteFile() {
        console.log('delete')
        // this.model.delete(url)
        //     .then((res) => {
        //         this.loadFileList();
        //     });
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