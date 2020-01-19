#!/bin/bash

## $1 => Working Folder
## $2 => Kget File
## $3 => .mos script (PREPOST_SRT_OFFLINE_CMD.mos)

## Enter into working directory

echo "Working Folder: $1"
echo "Kget File: $2"
echo "Mos File: $3"

cd "$1"
CURRENT=`pwd`
## echo "$CURRENT"

## run moshell
moshell "${2}" "run $3"

## 0000001 - 0001000
## for (( i=1; i<=1000; i++ ))
## do
## 	## echo $num
## 	num=$(printf "%07d" ${i})
## 	echo "${num}"
## done
