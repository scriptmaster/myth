if [ $# -lt 2 ]; then
	echo "AndroidX Package Downloader"
	echo "usage:   $0 <package> <version>"
	echo "example: $0 core 1.2.0"
	exit
fi

# REPO="https://dl.google.com/dl/android/maven2"
REPO="https://maven.google.com"

#Should we even download TEMI robot or other kind of lib?
SDK_DIR=$ANDROID_SDK
TOOLS_DIR="$SDK_DIR/build-tools/32.0.0"

PKG_OUTPUT="lib"
LIB_RES_DIR="lib/res"
LIB_CLASS_DIR="lib/classes"

JAR_TOOLS="java -Xmx1024M -Xss1m -jar $TOOLS_DIR/lib"

CMD_MKDIR="mkdir"
CMD_CURL="curl -L "

[ ! -d "$PKG_OUTPUT" ] && mkdir -p "$PKG_OUTPUT"

download_package() {
	path="$1/$2/$3"
	name="$2-$3"
	download_aar_or_jar $path $name
}

download_androidx() {
	# path="androidx/$1/$1/$2"
	# name="$1-$2"
	download_package androidx/$1 $1 $2
}

download_aar_or_jar() {
	fname="$2.aar"
	echo -n "$2: "
	$CMD_CURL -s "$REPO/$1/$fname" -o "$PKG_OUTPUT/$fname"
	if [ $? -eq 0 ]; then
		echo Downloaded $fname
        echo "$REPO/$1/$fname" >> downloads.log
	else
		fname="$2.jar"
		$CMD_CURL -s "$REPO/$1/$fname" -o "$PKG_OUTPUT/$fname"

		if [ $? -eq 0 ]; then
			echo Downloaded $fname
		else
			echo "ERROR ($?)"
		fi
	fi
}

if [ $# -eq 2 ]; then
	download_androidx $1 $2
	exit
fi

if [ $# -eq 3 ]; then
	download_package $1 $2 $3
	exit
fi
