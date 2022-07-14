#!/bin/bash

# This script makes the following assumptions:
#  1) You have a local copy of the Android SDK
#  2) You have an installed copy of the Java Development Kit (JDK)
#  3) If you are using AAR libraries (such as the AndroidX suite), you have copied/downloaded them to the lib directory and have run export-libs.pl then link.pl
#  4) You have already created a KeyStore file using keytool (comes with the JRE/JDK)

source includes.sh

SEP=":"
OS=`uname -s`
[[ $OS =~ "CYGWIN" || $OS =~ "MINGW" || $OS =~ "MSYS" ]] && SEP=";"

if [ ! -d "build" ]; then
	mkdir build
fi

echo Cleaning build...

# Deletes all folders and APK files inside the build folder
$CMD_DELETE build/*.apk build/*/ 2> /dev/null
$CMD_DELETE gen build *.dex

$CMD_MKDIR gen
# $TOOLS_DIR/aapt2 link -o build/unaligned.apk --manifest AndroidManifest.xml -I $PLATFORM_DIR/android.jar --emit-ids ids.txt $res || exit
$TOOLS_DIR/aapt package -m -J gen/ -M ./AndroidManifest.xml -S res/ -I $PLATFORM_DIR/android.jar

MF=`cat AndroidManifest.xml`
TERM="package=[\'\"]([a-z0-9.]+)"
package_path=""

if [[ "$MF" =~ $TERM ]]
then
	package="${BASH_REMATCH[1]}"
	package_path=${package//\./\/}
else
	echo Could not find a suitable package name inside AndroidManifest.xml
	exit
fi

echo Compiling project source...

java_list=`$CMD_FIND java/ -name "*.java"`
# kt_list=`$CMD_FIND kt -name "*.kt"`

echo $java_list

# If string length of java_list > 2 then we've got some Java source
# I picked '2' in case newlines bump it up from 0, though it's likely overkill
found_src=0
if [ ${#java_list} -gt 2 ]; then
	jars=""
	[ -f "build/R.jar" ] && jars+="build/R.jar${SEP}"
	[ -f "build/libs.jar" ] && jars+="build/libs.jar${SEP}"
	jars+="$PLATFORM_DIR/android.jar"

	java_list+=" gen/com/msheriff/kingdom/R.java"
	#java_list=" gen/com/msheriff/kingdom/R.java"

	# ERROR in his buid.sh --- NO inclusion of R.java
	$CMD_JAVAC -classpath $jars -d build $java_list || exit
	found_src=1
fi
# if [ ${#kt_list} -gt 2 ]; then
# 	$CMD_KOTLINC -d build -cp "build/R.jar${SEP}build/libs.jar${SEP}$PLATFORM_DIR/android.jar" -jvm-target 1.8 $kt_list || exit
# 	found_src=1
# fi

#if (( ! $found_src )); then
#	echo No project sources were found in the 'src' folder.
#	exit
#fi

# echo $CMD_JAR 
$CMD_JAR --create --file build/libs_r.jar -C 'build/' .

echo Compiling classes into DEX bytecode...


# system("$CMD_JAR --create --file build/libs.jar -C '$LIB_CLASS_DIR' .");
# system("$CMD_D8 --intermediate build/libs.jar --classpath $PLATFORM_DIR/android.jar --output build");


dex_list=""
[ -f "build/libs.dex" ] && dex_list+=" build/libs.dex"
[ -f "build/libs_r.dex" ] && dex_list+=" build/libs_r.dex"
[ -f "build/kotlin.dex" ] && dex_list+=" build/kotlin.dex"
class_list=""
[ -d "build/$package_path" ] && class_list="build/$package_path/*"
# $CMD_D8 --classpath $PLATFORM_DIR/android.jar $dex_list $class_list --output build || exit
$CMD_D8 --classpath $PLATFORM_DIR/android.jar $dex_list $class_list --output build || exit

exit

echo Creating APK...

res=""
[ -f "build/res.zip" ] && res+="build/res.zip"
[ -f "build/res_libs.zip" ] && res+=" build/res_libs.zip"
$TOOLS_DIR/aapt2 link -o build/unaligned.apk --manifest AndroidManifest.xml -I $PLATFORM_DIR/android.jar --emit-ids ids.txt $res || exit

# Pack the DEX file into a new APK file
cd build
# NOTE THAT we changed dir to build to ensure classes.dex is added to the root path of .apk (not build/...) it should be in root
$CMD_7Z a -tzip unaligned.apk classes.dex > /dev/null
# similar to aapt add (again we have to be cd'ed into dex/ or build/ or bin/ .dex and .apk should be in the same dir)
cd ..

for t in ${TARGET_ARCHES[@]}; do
	if [ -d $t ]; then
		$CMD_7Z a -tzip build/unaligned.apk $t > /dev/null
		$CMD_7Z rn -tzip build/unaligned.apk $t lib/$t > /dev/null
		# all the target arches should be in lib/??
	fi
done

# Align the APK
# I've seen the next step and this one be in the other order, but the Android reference site says it should be this way...
$TOOLS_DIR/zipalign -f 4 build/unaligned.apk build/aligned.apk || exit

echo Signing APK...

# Sign the APK
$JAR_TOOLS/apksigner.jar sign --ks $KEYSTORE --ks-pass "pass:$KS_PASS" --min-sdk-version 15 --out app.apk build/aligned.apk
