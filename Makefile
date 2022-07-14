start:
	denon run -A myth-cli.ts

install:
	deno run -A myth-cli.ts install

build:
	deno run -A myth-cli.ts build

android:
	deno run -A myth-cli.ts build android

help:
	deno run -A myth-cli.ts help

clean:
	del /Q lib\js\*

test2:
	cp -R src/android/* builds/android/
