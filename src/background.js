"use strict";

import { app, protocol, BrowserWindow, dialog, ipcMain, shell } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
import logger from "electron-log";
import path from "path";
const isDevelopment = process.env.NODE_ENV !== "production";

let win;
const app_scheme = "questions-answers";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } }
]);

function isSafeishURL(url) {
	return url.startsWith("http:") || url.startsWith("https:");
}

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			preload: path.join(__dirname, "preload.js")
		}
	});

	win.webContents.on("new-window", function(event, url) {
		event.preventDefault();
		if (isSafeishURL(url)) {
			shell.openExternal(url);
		}
	});

	win.webContents.openDevTools();

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	} else {
		createProtocol("app");
		// Load the index.html when not in development
		win.loadURL("app://./index.html");
	}

	win.on("closed", () => {
		win = null;
	});
}

function main() {
	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on("ready", async () => {
		if (isDevelopment && !process.env.IS_TEST) {
			// Install Vue Devtools
			try {
				await installExtension(VUEJS_DEVTOOLS);
			} catch (e) {
				console.error("Vue Devtools failed to install:", e.toString());
			}
		}
		createWindow();

		if (!isDevelopment && !process.env.IS_TEST) {
			autoUpdater.checkForUpdates();
		}
	});

	// Quit when all windows are closed.
	app.on("window-all-closed", () => {
		// On macOS it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== "darwin") {
			app.quit();
		}
	});

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (win === null) {
			createWindow();
		}
	});

	autoUpdater.channel = "latest";
	autoUpdater.allowDowngrade = false;
	autoUpdater.logger = logger;
	autoUpdater.logger.transports.file.level = "info";
	autoUpdater.logger.transports.file.appName = "questions-answers";
	autoUpdater.allowPrerelease = false;
	autoUpdater.autoDownload = true;

	autoUpdater.on("update-downloaded", () => {
		win.setProgressBar(1);
		autoUpdater.quitAndInstall();
	});
	autoUpdater.on("download-progress", progressObj => {
		win.setProgressBar(0.5);
		let log_message = "Download speed: " + progressObj.bytesPerSecond;
		log_message =
			log_message + " - Downloaded " + progressObj.percent + "%";
		log_message =
			log_message +
			" (" +
			progressObj.transferred +
			"/" +
			progressObj.total +
			")";
		autoUpdater.logger.debug(log_message);
	});
	autoUpdater.on("update-available", () => {
		dialog.showMessageBox({
			title: "Application Update",
			type: "info",
			message:
				"Une mise à jour est disponible. Le téléchargement commence. (Vous serez averti lorsqu'il sera terminé)."
		});
	});
	autoUpdater.on("error", error => {
		autoUpdater.logger.debug("Error in auto-updater. " + error);
	});

	// Exit cleanly on request from parent process in development mode.
	if (isDevelopment) {
		if (process.platform === "win32") {
			process.on("message", data => {
				if (data === "graceful-exit") {
					app.quit();
				}
			});
		} else {
			process.on("SIGTERM", () => {
				app.quit();
			});
		}
	}

	if (process.defaultApp) {
		if (process.argv.length >= 2) {
			app.setAsDefaultProtocolClient(app_scheme, process.execPath, [
				path.resolve(process.argv[1])
			]);
		}
	} else {
		app.setAsDefaultProtocolClient(app_scheme);
	}
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", (event, commandLine) => {
		if (win) {
			if (win.isMinimized()) win.restore();
			win.focus();
		}
	});

	main();
}
