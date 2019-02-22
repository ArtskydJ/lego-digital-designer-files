@echo off

node "%~dp0readme_generator.js" > "%~dp0/../README.md" || pause
