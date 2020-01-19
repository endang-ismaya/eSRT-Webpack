#!/bin/bash

echo "Working Folder: $1"
# echo "Sitelist File: $2"

cd "$1"

echo "sample01" > sample_01_UtranFreqRelation_Exist.mos
echo "sample02" > sample_02_UtranCellRelation_Exist.mos
echo "sample03" > sample_03_EUtranFreqRelation_Exist.mos
echo "sample04" > sample_04_EUtranCellRelation_Exist.mos

egrep "crn" *_EUtranFreqRelation_Exist.mos | egrep "EUtranFreqRelation=" | awk '{ gsub("_.*=C",";C");gsub(",EUtranFreqRelation=",";");print }' > ../mobatch_celldata/oss_eutranfreq.log
egrep "crn" *_UtranFreqRelation_Exist.mos | egrep "UtranFreqRelation=" | awk '{ gsub("_.*=C",";C");gsub(",UtranFreqRelation=",";");print }' > ../mobatch_celldata/oss_utranfreq.log
egrep "crn" *_EUtranCellRelation_Exist.mos | egrep ',EUtranCellRelation=' | awk '{gsub("_.*EUtranCellFDD=", " ");gsub(",EUtranFreqRelation=", " ");gsub(",EUtranCellRelation="," ");print $1";"$2";"$3";"$4";"$2"->"$4}' > ../mobatch_celldata/oss_colo.log

rm sample_01_UtranFreqRelation_Exist.mos
rm sample_02_UtranCellRelation_Exist.mos
rm sample_03_EUtranFreqRelation_Exist.mos
rm sample_04_EUtranCellRelation_Exist.mos
