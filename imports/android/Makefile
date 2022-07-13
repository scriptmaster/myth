ifndef ANDROID_SDK
all: err
endif

APK_NAME:=myth
BUILD_TOOLS_VERSION:=32.0.0
PLATORM_VERSION:=android-32
# To know these versions check the directories manually and put the names above
# dir $(ANDROID_SDK)\build-tools
# dir $(ANDROID_SDK)\platform


BUILD_TOOLS:=$(ANDROID_SDK)\build-tools\$(BUILD_TOOLS_VERSION)
PLATFORM:=$(ANDROID_SDK)\platforms\$(PLATORM_VERSION)
ANDROID_CP:=$(PLATFORM)\android.jar
AAPT:=$(BUILD_TOOLS)\aapt
DX:=$(BUILD_TOOLS)\dx
ZIPALIGN:=$(BUILD_TOOLS)\zipalign
ADB:=$(ANDROID_SDK)\platform-tools\adb

# BUILD_TOOLS_VERSION:=$(dir BUILD_TOOLS) # NOPE
# PLATFORM=$(ls $ANDROID_SDK_ROOT/platforms | sort -nr |tail -1) 
#_ANDROID_CP=$ANDROID_SDK_ROOT/platforms/$PLATFORM/android.jar
#_AAPT=$ANDROID_SDK_ROOT/build-tools/$_BUILD_TOOLS_VERSION/aapt
#_DX=$ANDROID_SDK_ROOT/build-tools/$_BUILD_TOOLS_VERSION/dx
#_ZIPALIGN=$ANDROID_SDK_ROOT/build-tools/$_BUILD_TOOLS_VERSION/zipalign
#_ADB=$ANDROID_SDK_ROOT/platform-tools/adb
#_INTERMEDIATE="bin gen ${APK_NAME}.apk.unaligned"

# TEST=$(dir $(BUILD_TOOLS_VERSION))
WHOAMI:=$(shell whoami)
TEST:=$(dir .)

sdk:
	@echo Starting Android build with:
	@echo 	- APK_NAME=$(APK_NAME)
	@echo 	- ANDROID_SDK=$(ANDROID_SDK)
	@echo 	- BUILD_TOOLS=$(BUILD_TOOLS)
	@echo 	- PLATFORM=$(PLATFORM)
	@echo 	- AAPT=$(AAPT)
	@echo 	- DX=$(DX)
	@echo 	- ZIPALIGN=$(ZIPALIGN)
	@echo 	- ADB=$(ADB)

err:
	@echo One or more env/vars not set:
	@echo.
	@echo ANDROID_SDK=$(ANDROID_SDK)


