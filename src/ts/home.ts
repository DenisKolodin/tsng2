import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ipcRenderer} from 'electron';

@Component({
	selector: 'home',
	templateUrl: 'home.html',
	directives: [NgIf],
})

export class HomePage {

	private has_ipc: boolean;

	constructor() {
		this.has_ipc = (typeof ipcRenderer != 'undefined');
		// Set listener
		if (this.has_ipc) {
			ipcRenderer.on('asynchronous-reply', (event, arg) => {
				console.log(arg); // prints "pong"
			});
		}
	}

	do_ping() {
		if (this.has_ipc) {
			console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping')); // prints "pong"
			ipcRenderer.send('asynchronous-message', 'async ping');
		} else {
			console.log("There isn't Electron main process.");
		}
	}

	do_alert() {
		alert("Do you see this message?");
	}

}
