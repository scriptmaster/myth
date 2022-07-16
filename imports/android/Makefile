all: compile install

run: 
	deno run -A paddle.ts

compile:
	deno compile -A --unstable paddle.ts

install:
	cp -R paddle.exe ~/.deno/bin/paddle.exe
