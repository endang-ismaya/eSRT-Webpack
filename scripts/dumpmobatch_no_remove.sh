#!/bin/bash

## $1 => Working Folder
## $2 => .mos script (PREPOST_SRT_OFFLINE_CMD.mos)
## $3 => Mobatch Folder

## Enter into working directory
cd "$1"
## rm -rf "${3}"

## Create sitelist
## ls -1 *modump*zip > getcelldatalist
ls -1 *modump*zip | awk '{ gsub("\*","");print; }' > getcelldatalist

## echo "Working Folder: $1"
## echo "Kget File: $2"
## echo "Mos File: $3"

## run mosbatch
## mobatch sitelist /cygdrive/c/xampp/htdocs/srtwp/scripts/PREPOST_SRT_OFFLINE_CMD.mos kgetdump1
mobatch getcelldatalist "${2}" "${3}"
rm getcelldatalist
cd "$3"
rm *.zip.log
rm mobatch_result.txt
rm *_RATFreqPrio.log