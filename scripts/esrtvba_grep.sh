#!/bin/bash

## $1 => Working Folder
## $2 => Sitelist File

## drawline function
drawline3 ()
{
dt="->"
	len="${#1} + 4"
	
	declare line=""
	declare char="-"
	for (( i=0; i<$len ; i++ )); do
		line="${line}${char}"
	done
	printf "        %s\n" "$line"
	
	printf '     -->| \e[1;34m%s\e[0m |\n' "$1"
	
	line=""
	char="-"
	for (( i=0; i<$len ; i++ )); do
		line="${line}${char}"
	done
	printf "        %s\n" "$line"
}

## drawline function
drawline4 ()
{
dt="->"
	len="${#1} + 4"
	
	declare line=""
	declare char="-"
	for (( i=0; i<$len ; i++ )); do
		line="${line}${char}"
	done
	printf "          %s\n" "$line"
	
	printf '       -->| \e[1;35m%s\e[0m |\n' "$1"
	
	line=""
	char="-"
	for (( i=0; i<$len ; i++ )); do
		line="${line}${char}"
	done
	printf "          %s\n" "$line"
}

## Enter into working directory

echo "Working Folder: $1"
echo "Sitelist File: $2"

cd "$1"
CURRENT=`pwd`

grep . "$2" > tmpfile


## echo "$CURRENT"
## Create folder in each sitename
while read -r || [[ $REPLY ]]; do

drawline3 "${REPLY}::getting additional information"
## SiteDataId
drawline4 "${REPLY}::siteData"
count=$(ls -ltr | egrep "${REPLY}.*Id" | wc -l)
if [ $count > 1 ]; then
	## RBSType
	egrep '#ManagedElement#productName#|Equipment=1,Cabinet=1#Cabinet#productData.productName#' ${REPLY}*Id > "${REPLY}_SiteData" || true
	## DU Type
	egrep 'Equipment=1,Subrack=1,Slot=1.*#productData.productName#|Equipment=1,FieldReplaceableUnit=1.*#productData.productName#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## SiteName
	egrep '#ManagedElement#site#|networkManagedElementId#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## GPS 
	egrep '#Synchronization#syncReference\[1\]|Transport=1,Synchronization=1,TimeSyncIO=1.*RadioEquipmentClockReference=1' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## OtDoaSupport
	egrep 'LppaBasedOtdoaSupport#OptionalFeatureLicense#featureState#|SystemFunctions=1,Lm=1,FeatureState=CXC4011481#FeatureState#featureState#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## Carrier Aggregation
	egrep '=CarrierAggregation#OptionalFeatureLicense#featureState#|SystemFunctions=1,Lm=1,FeatureState=CXC4011476#FeatureState#featureState#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## ThreeDlCarrierAggregation
	egrep '=ThreeDlCarrierAggregation#OptionalFeatureLicense#featureState|SystemFunctions=1,Lm=1,FeatureState=CXC4011714#FeatureState#featureState#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## eNBId
	egrep '#ENodeBFunction#eNBId' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## PSHO
	egrep '=WcdmaHandover#OptionalFeatureLicense#featureState#|SystemFunctions=1,Lm=1,FeatureState=CXC4011011#FeatureState#featureState#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## DynamicScell
	egrep '=DynamicScellSelection#OptionalFeatureLicense#featureState|SystemFunctions=1,Lm=1,FeatureState=CXC4011559#FeatureState#featureState#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
	## SrvccToUtran
	egrep '=SrvccToUtran#OptionalFeatureLicense#featureState|SystemFunctions=1,Lm=1,FeatureState=CXC4011247#FeatureState#featureState#' ${REPLY}*Id >> "${REPLY}_SiteData" || true
else
	echo "files not found."
fi

## SRT_CHECK
count=$(ls -ltr | egrep "${REPLY}.*SRT_CHECK*.log" | wc -l)
if [ $count -gt 0 ]; then
	## SW Version
	egrep 'Executing:|Current SwVersion' ${REPLY}*SRT_CHECK*.log  >> "${REPLY}_SiteData" || true
	## Alarms
	egrep 'Total.*Alarms' ${REPLY}*SRT_CHECK*.log  >> "${REPLY}_SiteData" || true
	## MME
	egrep 'ENodeBFunction=1,TermPointToMme' ${REPLY}*SRT_CHECK*.log  >> "${REPLY}_SiteData" || true
	## XMU
	egrep 'BXP.*XMU' ${REPLY}*SRT_CHECK*.log  >> "${REPLY}_SiteData" || true

	## IP Version
	egrep "ERBS_NODE_MODEL|MSRBS_NODE_MODEL" ${REPLY}*SRT_CHECK*.log | head -1  >> "${REPLY}_SiteData" || true
	
	## arfcnValueEUtranDl
	## drawline4 "${REPLY}::EUtranFrequency::arfcnValueEUtranDl"
	## egrep 'EUtranFrequency=' ${REPLY}_SRT_CHECK*.log | egrep -iv 'arfcnValueEUtranDl' | awk '{print $1" "$3}' > tmp1
	## egrep 'EUtranFrequency=' ${REPLY}_SRT_CHECK*.log | egrep -iv 'sget' | egrep -i 'arfcnValueEUtranDl' | awk '{print $1" "$3}' > tmp2
	## awk 'NR==FNR{a[$1]=$2;next} {print $1, $2, a[$2]?a[$2]:"NA"}' tmp2 tmp1 > "${REPLY}_arfcnValueEUtranDl"
	
	## rfBranch
	drawline4 "${REPLY}::rfBranch"
	egrep '.*;.*RfPort=' ${REPLY}*SRT_CHECK*.log | awk '{gsub("\\[.\\] = ","");print}' > "${REPLY}_rfPortRef" || true
	egrep 'RfBranch=.*;' ${REPLY}*SRT_CHECK*.log | egrep -iv 'RfPort=' | awk '{gsub("\\[.\\] = ","");print}' > "${REPLY}_dlAttenuation" || true
else
	echo "SRT Check file not found."
fi

## arfcnValueEUtranDl
drawline4 "${REPLY}::UtranFrequency::arfcnValueUtranDl"
if [ -f "${REPLY}_UtranFrequencyId" ]; then
	egrep 'reservedBy.*UtranFreqRelation' "${REPLY}_UtranFrequencyId" | cut -d"#" -f5,2 | awk '{gsub("#.*,EUtranCellFDD="," EUtranCellFDD=");gsub("ENodeBFunction=1,","");print $2,$1}' > tmp1 || true
	egrep 'arfcnValueUtranDl' "${REPLY}_UtranFrequencyId" | awk '{ gsub(".*ENodeBFunction=1,","");gsub("#"," ");print }' | cut -d' ' -f1,4 > tmp2 || true
	## echo "UtranFrequency defined on the node!"
else
	echo "          o-> UtranFrequency is not defined on the node!"
fi
drawline4 "${REPLY}::EUtranFrequency::arfcnValueEUtranDl"
if [ -f "${REPLY}_EUtranFrequencyId" ]; then
	egrep 'reservedBy.*EUtranFreqRelation' "${REPLY}_EUtranFrequencyId" | cut -d"#" -f5,2 | awk '{gsub("#.*,EUtranCellFDD="," EUtranCellFDD=");gsub("ENodeBFunction=1,","");print $2,$1}' >> tmp1 || true
	egrep 'arfcnValueEUtranDl' "${REPLY}_EUtranFrequencyId" | awk '{ gsub(".*ENodeBFunction=1,","");gsub("#"," ");print }' | cut -d' ' -f1,4 >> tmp2 || true
	awk 'NR==FNR{a[$1]=$2;next} {print $1, $2, a[$2]?a[$2]:"NA"}' tmp2 tmp1 > "${REPLY}_arfcnValueEUtranDl"
	## echo "EUtranFrequency defined on the node!"
else
	echo "          o-> EUtranFrequency is not defined on the node!"
fi
	
## qciProfileRef
drawline4 "${REPLY}::UtranFreqRelation::qciProfileRef"
if [ -f "${REPLY}_UtranFreqRelationId" ]; then
	egrep 'qciProfileRef' ${REPLY}_UtranFreqRelationId | awk '{gsub(".qciProfileRef","");gsub("SubNetwork=.*ManagedElement=1,","");print}' | cut -d'|' -f1,2,4,5 > "${REPLY}_qciProfileRef" || true
else
	echo "          o-> UtranFreqRelation is not defined on the node!"
fi
drawline4 "${REPLY}::EUtranFreqRelation::qciProfileRef"
if [ -f "${REPLY}_EUtranFreqRelationId" ]; then
	egrep 'qciProfileRef' ${REPLY}_EUtranFreqRelationId | awk '{gsub(".qciProfileRef","");gsub("SubNetwork=.*ManagedElement=1,","");print}' | cut -d'|' -f1,2,4,5 >> "${REPLY}_qciProfileRef" || true
else
	echo "          o-> EUtranFreqRelation is not defined on the node"
fi

## ExternalEUtranCellFDDId::ExternalFreqBandwidth
drawline4 "${REPLY}::ExternalEUtranCellFDDId::ExternalFreqBandwidth"
if [ -f "${REPLY}_ExternalEUtranCellFDDId" ]; then
	egrep -i 'reservedBy' ${REPLY}*_ExternalEUtranCellFDDId | egrep -iv 'reservedBy\[0\]' | cut -d'#' -f5 | awk '{gsub(".*EUtranFreqRelation=","");gsub(",EUtranCellRelation="," ");print $2" "$1}' > tmp3 || true
	egrep -i 'channel' ${REPLY}*_ExternalEUtranCellFDDId | egrep -iv 'ChannelBandwidth#0' | cut -d'#' -f2,5 | awk '{gsub("#"," ");gsub(".*=","");print}' > tmp4 || true
	awk 'NR==FNR{a[$1]=$2;next} {print $1, $2, a[$1]?a[$1]:"NA"}' tmp4 tmp3 > "${REPLY}_ExternalFreqBandwidth"  || true
else
	echo "          o-> ExternalEUtranCellFDDId is not defined on the node"
fi

## E&UtranFreqRelation
drawline4 "${REPLY}::UtranFreqRelation"
if [ -f "${REPLY}_UtranFreqRelationId" ]; then
	egrep -i 'UtranFreqRelationId' "${REPLY}_UtranFreqRelationId" | awk '{gsub("ENodeBFunction=1,EUtranCellFDD=","");gsub(",UtranFreqRelation.*Id","");print}' > "${REPLY}_UtranFreqRelation" || true
else
	echo "          o-> UtranFreqRelation is not defined on the node"
fi
drawline4 "${REPLY}::EUtranFreqRelation"
if [ -f "${REPLY}_EUtranFreqRelationId" ]; then
	egrep -i 'EUtranFreqRelationId' "${REPLY}_EUtranFreqRelationId" | awk '{gsub("ENodeBFunction=1,EUtranCellFDD=","");gsub(",EUtranFreqRelation.*Id","");print}' > "${REPLY}_EUtranFreqRelation" || true
else
	echo "          o-> EUtranFreqRelation is not defined on the node"
fi

## EUtranCellRelation
drawline4 "${REPLY}::EUtranCellRelation"
if [ -f "${REPLY}_EUtranCellRelationId" ]; then
	egrep 'EUtranCellRelationId' "${REPLY}_EUtranCellRelationId" | cut -d'#' -f1,2 | awk '{gsub("ENodeBFunction=1,EUtranCellFDD="," ");gsub(",EUtranFreqRelation="," ");gsub(",EUtranCellRelation="," ");gsub("#"," ");print $1" "$2" "$3" "$4" "$2"<->"$4}' > "${REPLY}_EUtranCellRelation" || true
	egrep 'eUtranCellRelationId' "${REPLY}_EUtranCellRelationId" | cut -d'#' -f1,2 | awk '{gsub("#.*ENodeBFunction=1,EUtranCellFDD=","# ");gsub(",EUtranFreqRelation="," ");gsub(",EUtranCellRelation="," ");gsub("#"," ");print $1" "$2" "$3" "$4" "$2"<->"$4}' >> "${REPLY}_EUtranCellRelation" || true
else
	echo "          o-> _EUtranCellRelationId is not defined on the node"
fi

## Hicap Setting
drawline4 "${REPLY}::Hicap Setting FGA53RevA"
if [ -f "${REPLY}_EUtranCellFDDId" ]; then
	egrep 'ulSrsEnable|cellRange|pdschTypeBGain|crsGain' "${REPLY}_EUtranCellFDDId" > "${REPLY}_HiCap" || true
fi
#
if [ -f "${REPLY}_DataRadioBearerId" ]; then
	egrep 'dlMaxRetxThreshold|ulMaxRetxThreshold|tPollRetransmitDl|tPollRetransmitUl' "${REPLY}_DataRadioBearerId" >> "${REPLY}_HiCap" || true
fi
#
if [ -f "${REPLY}_SignalingRadioBearerId" ]; then
	egrep 'dlMaxRetxThreshold|ulMaxRetxThreshold|tReorderingUl|tReorderingDl|tPollRetransmitDl|tPollRetransmitUl' "${REPLY}_SignalingRadioBearerId" >> "${REPLY}_HiCap" || true
fi
#
if [ -f "${REPLY}_QciProfilePredefinedId" ]; then
egrep 'tReorderingUl|tReorderingDl' "${REPLY}_QciProfilePredefinedId" | egrep "=qci1|=qci5|=qci8|QciProfilePredefined=default" >> "${REPLY}_HiCap" || true
fi
#
if [ -f "${REPLY}_OptionalFeatureLicenseId" ]; then
egrep 'OptionalFeatureLicense=Pfs#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" >> "${REPLY}_HiCap" || true
egrep 'OptionalFeatureLicense=UlFss#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" >> "${REPLY}_HiCap" || true
egrep 'OptionalFeatureLicense=DlFss#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" >> "${REPLY}_HiCap" || true
fi
if [ -f "${REPLY}_FeatureStateId" ]; then
egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011074#FeatureState#featureState#' "${REPLY}_FeatureStateId" >> "${REPLY}_HiCap" || true
egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011033#FeatureState#featureState#'  "${REPLY}_FeatureStateId" >> "${REPLY}_HiCap"  || true
egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011255#FeatureState#featureState#' "${REPLY}_FeatureStateId" >> "${REPLY}_HiCap" || true
fi
#
if [ -f "${REPLY}_MACConfigurationId" ]; then
egrep 'dlMaxHARQTx|ulMaxHARQTx' "${REPLY}_MACConfigurationId" >> "${REPLY}_HiCap" || true
fi
#
if [ -f "${REPLY}_SystemConstantsId" ]; then
egrep '#1437#|#556#|#306#|#1211#' "${REPLY}_SystemConstantsId" >> "${REPLY}_HiCap" || true
fi

## Hicap Setting
drawline4 "${REPLY}::Hicap Setting FGA53RevB"
if [ -f "${REPLY}_OptionalFeatureLicenseId" ]; then
	egrep 'OptionalFeatureLicense=PrioritizedSrScheduling#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" > "${REPLY}_HiCapFGA53RevB" || true
	egrep 'OptionalFeatureLicense=Pfs#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" >> "${REPLY}_HiCapFGA53RevB" || true
	egrep 'OptionalFeatureLicense=UlFss#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" >> "${REPLY}_HiCapFGA53RevB" || true
## egrep 'OptionalFeatureLicense=DlFss#OptionalFeatureLicense#featureState' "${REPLY}_OptionalFeatureLicenseId" >> "${REPLY}_HiCapFGA53RevB"
fi
count=$(ls -ltr | egrep "${REPLY}_FeatureStateId" | wc -l)
if [ -f "${REPLY}_FeatureStateId" ]; then
	egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011938#FeatureState#featureState#' "${REPLY}_FeatureStateId" >> "${REPLY}_HiCapFGA53RevB" || true
	egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011074#FeatureState#featureState#' "${REPLY}_FeatureStateId" >> "${REPLY}_HiCapFGA53RevB" || true
	egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011033#FeatureState#featureState#'  "${REPLY}_FeatureStateId" >> "${REPLY}_HiCapFGA53RevB"  || true
## egrep 'SystemFunctions=1,Lm=1,FeatureState=CXC4011255#FeatureState#featureState#' "${REPLY}_FeatureStateId" >> "${REPLY}_HiCapFGA53RevB"
fi
if [ -f "${REPLY}_EUtranCellFDDId" ]; then
	egrep 'estimatedE2ERTT' "${REPLY}_EUtranCellFDDId" >> "${REPLY}_HiCapFGA53RevB" || true
fi
if [ -f "${REPLY}_QciProfilePredefinedId" ]; then
	egrep 'srsAllocationStrategy|schedulingAlgorithm' "${REPLY}_QciProfilePredefinedId" | egrep "=qci6|=qci7|=qci8|=qci9" >> "${REPLY}_HiCapFGA53RevB" || true
fi

rm tmp1
rm tmp2
rm tmp3
rm tmp4
 
done < tmpfile

rm tmpfile

# echo "completed" > GREP_DONE.log
