/**
 * 类-模型层
 */
class FuFileManageModel {
    constructor() {
        this.fileId = '';
        this.fileName = '';
        this.fileList = []; // 文件集合
        this.identityId = 1;
        this.tableName = "dbo.Task";
    }
    /**
     * 模型-取值
     * @param {*} key 
     */
    find(key) {
        return this[key];
    }
    /**
     * 模型-设值
     * @param {*} key 
     * @param {*} value 
     */
    save(key, value) {
        this[key] = value;
    }
}

export default FuFileManageModel;