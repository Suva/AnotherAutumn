#!/bin/bash
rm -f cybercat-another_autumn.zip
mkdir cybercat-another_autumn

cp -r bower_components images lib models music src index.html cybercat-another_autumn

zip cybercat-another_autumn.zip -9 -r cybercat-another_autumn

rm -rf cybercat-another_autumn/