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
            // $.get('/FileManage/GetAttachmentList', {
            //     identityId: identityId,
            //     tableName: tableName
            // }, (res)=> {
            //     resolve(res);
            //     return mock_fileLists;
            // })
            setTimeout(() => {
                resolve(mock_fileLists);
            }, 1000)
        })
    }
    /**
     * http请求-根据id删除文件
     * @param {String} fileId 
     */
    deleteFileById(fileId) {
        return new Promise((resolve, reject) => {
            // $.get('/FileManage/DeleteFile', {
            //     fileId: fileId,
            // }, (res)=> {
            //     mock_deleteFile.Code === 1 ? resolve(mock_deleteFile.Code) : reject(mock_deleteFile.Code)
            // })
            setTimeout(() => {
                if(mock_deleteFile.Code === 1) {
                    resolve(mock_deleteFile.Code)
                } else {
                    reject('删除失败')
                }
            }, 1000)
        })
    }
    AllowDownload() {
        $.POST('/FileManage/AllowDownload', {
            downloadStr: "40fb7eb4-e7d8-47eb-a45e-160a5c2ff8d3"
        }, (res)=> {
            resolve(res);
        })
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