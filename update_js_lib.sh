#!/bin/bash

BASE=bower_components
DEST=js/lib

bower install
cp $BASE/angular/angular.min.js $DEST
cp $BASE/angular-route/angular-route.min.js $DEST
cp $BASE/angular-cookies/angular-cookies.min.js $DEST
cp $BASE/bootstrap/dist/{js/bootstrap.min.js,css/bootstrap.min.css} $DEST
cp $BASE/font-awesome/css/font-awesome.min.css $DEST
cp $BASE/bootstrap-social/bootstrap-social.css $DEST
cp $BASE/jquery/dist/jquery.min.js $DEST
cp $BASE/angulartics/dist/angulartics.min.js $DEST
cp $BASE/angulartics-google-analytics/dist/angulartics-google-analytics.min.js $DEST
cp $BASE/angulike/angulike.js $DEST
