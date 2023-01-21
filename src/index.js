import './index.scss';
import Controller from "./Controller";

const rootEl = document.querySelector('#root main');

const controller = new Controller(rootEl);
controller.renderStudentsTable();
