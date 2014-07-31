#!/bin/bash

rm -rf output
node r.js -o build.js
node r.js -o cssIn=../css/styles.css out=output/css/styles.css
node r.js -o cssIn=../css/ie.css out=output/css/ie.css

cp ../index.html output/index.html
cp -r ../images/ output/images

REQUIRE_VERSION='2.1.5'
SEDCMD='sed -i'
if [[ $OSTYPE == *"darwin"* ]]; then
  SEDCMD=$SEDCMD' .tmp'
fi
SEDCMD=$SEDCMD' s/js\/libs\/require\/require.js/http:\/\/requirejs.org\/docs\/release\/'$REQUIRE_VERSION'\/minified\/require.js/g output/index.html'
$SEDCMD
rm -f output/*.tmp
