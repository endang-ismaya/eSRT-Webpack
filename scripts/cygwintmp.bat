@echo off

C:
chdir C:\cygwin\bin

set USER=endang.ismaya
set HOME=/home/endang.ismaya
set SHELL=/bin/bash
mintty -e /bin/bash --login -i -e /cygdrive/c/eranris/gesrt/scripts/cdrun.sh C:/cygwin/home/endang.ismaya/ts_esrtlog/GeSRT/20170815_POST_CVL02491_CVL09079R_CVL02295/csrt CVL02295_modump.zip C:/eranris/gesrt/Scripts/PREPOST_SRT_OFFLINE_CMD.mos