var Config = {};

//base:
Config.debug = false;
Config.framerate = 120;

//piece:
Config.bgColor = '#FFF';
Config.lineColor = '#000';

Config.margin = .1;//overlap of windows outside screen relative to screen dimensions

Config.randomToTopIntervalMin = 0;//set to 0 for no random rects to top
Config.randomToTopIntervalMax = 0;

//min max nr of windows
Config.numRectsMin = 22;
Config.numRectsMax = 30;

Config.rect = {};
//min max ratio windows, ratio = w/h
Config.rect.ratioMin = .5;//portrait
Config.rect.ratioMax = 2;//landscape
//min max size windows (=area, relative to screen area)
Config.rect.areaMin = .1;
Config.rect.areaMax = .2;
//shadow settings
Config.rect.shadowColor = '#777777';
Config.rect.shadowSize = .03;
//interaction
Config.rect.resizeMargin = .02;//relative to screen diagonal

