const nativeImg = require('electron').nativeImage;
const fs        = require('fs');
const utils     = require('../../src/utils');
const Deferred  = require('jquery-deferred').Deferred;

let defaultIcon = nativeImg.createFromPath('app/res/icons/app_icon.png');

let iconLoader = {

    _getDefaultIcon: function(){
        return {
            type: 'png',
            data: defaultIcon.toDataURL(),
            path: "default"
        };
    },

    load: function(iconPath, useDefault){
        var icon = {
            type: undefined,
            data: null,
            path: ""
        };

        useDefault = useDefault || false;

        iconPath = iconPath.trim();

        if (typeof iconPath != 'string' || !iconPath) {
            return useDefault ? iconLoader._getDefaultIcon() : false;
        }

        icon.path = iconPath;
        icon.type = iconPath.split('.');
        if (icon.type.length < 2) {
            return useDefault ? iconLoader._getDefaultIcon() : false;
        }
        icon.type = icon.type[icon.type.length - 1].toLowerCase();

        if (icon.type == "svg") {
            icon.data = fs.readFileSync(icon.path, 'utf8');
        } else if (icon.type == "png") {
            icon.data = nativeImg.createFromPath(icon.path).toDataURL();
        } else {
            icon = iconLoader._getDefaultIcon();
        }

        return icon;
    },

    loadForObj: function(obj, iconPathKey, iconKey, useDefault){

        useDefault = useDefault || false;

        if (!obj || !(iconPathKey in obj)){
            return false;
        }
        var icon = iconLoader.load(obj[iconPathKey], useDefault);

        if (iconKey) {
            obj[iconKey] = icon;
        }
        return icon;
    },

    loadForObjs: function(objArray, iconPathKey, iconKey, useDefault){
        var deferred = Deferred();

        useDefault = useDefault || false;

        if (!objArray || !objArray.length || !iconPathKey){
            return deferred.reject();
        }

        return utils.chunkedForEach(objArray, function(obj){
            iconLoader.loadForObj(obj, iconPathKey, iconKey, useDefault);
        }, iconLoader);
    }
};

module.exports = iconLoader;