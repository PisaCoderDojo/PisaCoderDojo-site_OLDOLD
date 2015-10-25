#!/bin/bash
BASE=bower_components
DEST=lib


if [ ! -d "$DEST" ]; then
  mkdir $DEST
fi
JSLIB=$DEST/js
if [ ! -d "$JSLIB" ]; then
  mkdir $JSLIB
fi
CSSLIB=$DEST/css
if [ ! -d "$CSSLIB" ]; then
  mkdir $CSSLIB
fi
FONT=$DEST/fonts
if [ ! -d "$FONT" ]; then
  mkdir $FONT
fi
bower install
cp $BASE/angular/angular.min.js $JSLIB
cp $BASE/angular-route/angular-route.min.js $JSLIB
cp $BASE/angular-cookies/angular-cookies.min.js $JSLIB
cp $BASE/angular-sanitize/angular-sanitize.min.js $JSLIB
cp $BASE/bootstrap/dist/js/bootstrap.min.js $JSLIB
cp $BASE/bootstrap/dist/css/bootstrap.min.css $CSSLIB
cp $BASE/bootstrap/fonts/* $FONT
cp $BASE/font-awesome/css/font-awesome.min.css $CSSLIB
cp $BASE/font-awesome/fonts/* $FONT
cp $BASE/bootstrap-social/bootstrap-social.css $CSSLIB
cp $BASE/jquery/dist/jquery.min.js $JSLIB
cp $BASE/angulartics/dist/angulartics.min.js $JSLIB
cp $BASE/angulartics-google-analytics/dist/angulartics-google-analytics.min.js $JSLIB
cp $BASE/angulike/angulike.js $JSLIB
cp $BASE/angular-bootstrap/ui-bootstrap-tpls.min.js $JSLIB
cp $BASE/ngprogress/build/ngprogress.min.js $JSLIB
cp $BASE/ngprogress/ngProgress.css $CSSLIB
