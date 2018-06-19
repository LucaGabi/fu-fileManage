import FuFileManageView from './FuFileManageView';
import FuFileManageModel from './FuFileManageModel';
import FuFileManageService from './FuFileManageService';
import FuFileManageController from './FuFileManageController';

let view = new FuFileManageView("app");
let model = new FuFileManageModel();
let service = new FuFileManageService();
let controller = new FuFileManageController(model, view, service);

controller.init();
