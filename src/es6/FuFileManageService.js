import mock_fileLists from '../../mock/GetAttachmentList.json';
import mock_deleteFile from '../../mock/DeleteFile.json';
import $ from 'jquery';
/**
 * 类-服务层
 */
class FuFileManageService {
    constructor() {

    }
    /**
     * http请求-获取文件集合
     * @param {Int} identityId 唯一名称
     * @param {String} tableName 表名称
     */
    getFileList(identityId, tableName) {
        return new Promise((resolve, reject) => {
            $.get('http://localhost:54905/FileManage/GetAttachmentList', {
                identityId: identityId,
                tableName: tableName
            }, (res)=> {
                resolve(res);
                return mock_fileLists;
            })
        })
    }
    /**
     * http请求-根据id删除文件
     * @param {String} fileId 文件id字符串，以逗号，分隔
     */
    deleteFileById(fileId) {
        return new Promise((resolve, reject) => {
            $.get('http://localhost:54905/FileManage/DeleteFile', {
                fileId: fileId,
            }, (res)=> {
                res.Code === 1 ? resolve(res.Code) : reject(res.Code)
            })
        })
    }
    /**
     * http请求-下载前校验
     * @param {String} downloadStr 文件id字符串，以逗号，分隔
     */
    allowDownload(downloadStr) {
        return new Promise((resolve, reject) => {
            $.post('http://localhost:54905/FileManage/AllowDownload', {
                downloadStr: downloadStr
            }, (res)=> {
                res.Code === 1 ? resolve(res.Code) : reject(res.Code)
            })
        })
    }
    /**
     * http请求-根据id下载文件，使用重定向
     * @param {String} downloadStr 文件id字符串，以逗号，分隔
     */
    download(downloadStr) {
        location.href = `http://localhost:54905/FileManage/download?downloadStr=${downloadStr}`;
    }
    CheckFileChunk() {
        $.POST('/FileManage/CheckFileChunk', {
            folderPath: "/任务管理/附件",
            md5: "88841e29ecc88f03136969643c795fbd",
            chunk: 0,
            chunkSize: 113368,
        }, (res)=> {
            resolve(res);
        })
    }
    UploadFile() {
        $.POST('/FileManage/UploadFile', {
            folderPath: "/任务管理/附件",
            md5: "88841e29ecc88f03136969643c795fbd",
            chunk: 0,
            chunkSize: 113368,
        }, (res)=> {
            resolve(res);
        })
    }
}

export default FuFileManageService;