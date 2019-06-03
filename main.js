/* New name -lupus- */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');

const appInfo = require('./src/node-addons/gtk').gtkAppInfo;

const iconLoader = require('./app/backplate/icon-loader');

var calcWindowSize = function(bounds){
    let size = {};
    let proportion = bounds.width/bounds.height;

    size['height'] = bounds.height * 0.6;

    if (proportion >= 1.77) {
        if (bounds.width <  1900) {
            size['width'] = bounds.width * 0.6;
        } else {
            size['width'] = bounds.width * 0.55;
        }
    } else {
        size['width'] = bounds.width * 3/4;
    }

    return size;
};


let aidebox = {

    mainWindow: undefined,

    shortcut: 'Shift+Space',

    initialize: function(){
        var that = this;

        app.on('window-all-closed', function() {
            if (process.platform != 'darwin') {
                app.quit();
            }
        });

        var display = electron.screen.getDisplayNearestPoint(
            electron.screen.getCursorScreenPoint()
        );

        let wSize = calcWindowSize(display.bounds);

        // Create main window
        that.mainWindow = new BrowserWindow({
            x: display.bounds.x + parseInt((display.bounds.width - wSize.width)/2),
            y: display.bounds.y + parseInt((display.bounds.height - wSize.height)/2),
            width: wSize.width,
            height: wSize.height,
            'min-width': 700,
            'min-height': 400,
            transparent: true,
            frame: false,
            resizable: false,
            backgroundColor: '#2e3037',
            show: false,
            icon: path.join(__dirname, 'icon.png')
        });

        // Load mainWindow content
        that.mainWindow.loadURL('file://' + __dirname + '/src/index.html');
        that.mainWindow.webContents.on('dom-ready', function() {
            setTimeout(function() {
                that.mainWindow.show();
            }, 100);
        });

        // Emitted when the window is closed.
        that.mainWindow.on('closed', function() {
            that.mainWindow = null;
        });

        that.registerShortcat(that.shortcut);

        that.initListeners();
    },

    registerShortcat: function(shortcut){
        var that = this,
            registrationOk;

        registrationOk = electron.globalShortcut.register(shortcut, function() {
            that.shortcatHandler();
        });

        if (!registrationOk || !electron.globalShortcut.isRegistered(shortcut)) {
            console.log('registration failed');
        }

        app.on('will-quit', function() {
            electron.globalShortcut.unregister(shortcut);
        });
    },

    shortcatHandler: function(){
        console.log('egegey');
    },

    initListeners: function(){
        ipcMain.on('updateAppList', function(event){
            var appList = appInfo.getAll();

            iconLoader.loadForObjs(appList, 'appIconStr', 'icon', true)
                .done(function(){
                    event.sender.send('newAppList', appList);
                });

        });

        ipcMain.on('getIcon', function(event, arg) {
            // event.returnValue = that.iconsLoader.get(arg);
            console.log('get icon');
        });
    }
};


app.on('ready', function() {
    aidebox.initialize();
});