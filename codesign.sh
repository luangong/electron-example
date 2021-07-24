#!/bin/bash

# https://github.com/electron/electron/issues/7476
# https://www.electronjs.org/docs/api/auto-updater#macos
if [ "$(uname)" == "Darwin" ]; then
  codesign --deep --force --verbose --sign - node_modules/electron/dist/Electron.app
fi
