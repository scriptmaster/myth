# Getting Started

Download From Github Releases page:

# Why Yet Another Frontend framework

Coming from a strong C#.NET and writing my own js-minifier-bundler in the pre-jquery days (Internet Explorer 6), my Frontend accomplishments have been with Fullframeworks like AngularJS, Angular and Vue.
- I've also tried React, Blazor.net, ReactJS.NET, Svelte, SolidJS, Marko, Elm, Flutter-Web, and all of them depended on node_modules or produce large bundles.
- If not node_modules, they produced LARGE bundle size: 400KB to 1MB just for a simple Hello.
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


# Android build
# IOS build
This is not planned at the moment.  May be in the future

# Versions:
deno 1.23.3 (release, x86_64-pc-windows-msvc)
v8 10.4.132.8
typescript 4.7.4
