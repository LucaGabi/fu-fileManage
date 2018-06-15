import FuFileManageView from './FuFileManageView';
import FuFileManageModel from './FuFileManageModel';
import FuFileManageController from './FuFileManageController';

let view = new FuFileManageView("app");
let model = new FuFileManageModel();
let controller = new FuFileManageController(model, view);

controller.init();
