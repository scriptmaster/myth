# Getting Started

Download From Github Releases page:

# Why Yet Another Frontend framework

Coming from a strong C#.NET and writing my own js-minifier-bundler in the pre-jquery days (Internet Explorer 6), my recent Frontend accomplishments include fullframeworks than libraries. React (17 in production) AngularJS (8 in production), Angular(12 in production) and Vue (4 in production)
- I've also tried React, Blazor.net, ReactJS.NET, Svelte, SolidJS, Marko, Elm, Flutter-Web, and all of them depended on node_modules or produce large bundles.
- If not node_modules, they produced LARGE bundle size: 400KB to 1MB just for a simple Hello. deno package manager caches imported modules cleanly and does not add to the local project disk space.
- Plus there were issues about SSR, SSG and backend framework integration.
- Oh the CICD needs to be fast also.

## Backend Framework Agnostic
I wanted a frontend framework without 1GB node_modules involved.  Backend Framework agnostic.

Design Goals:
--
+ Have Component Architecture.
+ Use TypeScript
+ Separate html from typescript for designers to help/work on.
+ Have Dependency Injection out of the box.
+ Produce .cshtml files during build phase. (SEO Support)

I checked out mithril.js and it is pretty fast for both framework size and dependencies.

Ownership
--
Another reason is ownership. Flutter and Angular are owned by Google.  This repo is owned by the me and any future contributors. If you contribute to this development, and send valid pull requests, your name will be added here.  Contributors welcome.

### License: Proprietary. Owned by me and future contributors only

# Android build
This is in active development.  Although flutter does a great work in creating fast and feature-rich android builds, there are still improvements that can be made.

paddle is a deno alternative for gradle.

With butter_paddle, you could create android apps fast with only web technologies.  No need to learn dart or yet another language.  Only learn the framework and functional parts to build apps fast.

## Focus on delivery than tinkering.
Focus on functionality than performance.  Issues around these are addressed very fast in this repo.  This repo is actively maintained.

## Support
Support required.

# IOS build
This is not planned at the moment.  May be in the future

# Versions:
deno 1.23.3 (release, x86_64-pc-windows-msvc)
v8 10.4.132.8
typescript 4.7.4
