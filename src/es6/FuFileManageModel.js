import GetAttachmentList from '../../mock/GetAttachmentList.json';
/**
 * 类-视图层
 */
class FuFileManageModel {
    constructor() {
        
    }
    /**
     * 异步请求-获取文件列表
     */
    load() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let fileArr = GetAttachmentList;
                resolve(fileArr);
            }, 1000);
            // getAttachmentList()
        });
    }
    getAttachmentList() {
        $.GET('url', {
            identityId: 1,
            tableName: "dbo.Task"
        }, (res)=> {
            resolve(res);
        })
    }
    AllowDownload() {
        $.POST('url', {
            downloadStr: "40fb7eb4-e7d8-47eb-a45e-160a5c2ff8d3"
        }, (res)=> {
            resolve(res);
        })
    }
    DeleteFile() {
        $.POST('url', {
            fileId: "c0340d37-b3bd-41c8-9d6a-48ad9b877c85",
        }, (res)=> {
            resolve(res);
        })
    }
    CheckFileChunk() {
        $.POST('url', {
            folderPath: "/任务管理/附件",
            md5: "88841e29ecc88f03136969643c795fbd",
            chunk: 0,
            chunkSize: 113368,
        }, (res)=> {
            resolve(res);
        })
    }
    UploadFile() {
        $.POST('url', {
            folderPath: "/任务管理/附件",
            md5: "88841e29ecc88f03136969643c795fbd",
            chunk: 0,
            chunkSize: 113368,
        }, (res)=> {
            resolve(res);
        })
    }
}

export default FuFileManageModel;