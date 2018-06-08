@echo *** Start mongo db server ***
cd C:\Program Files\MongoDB\Server\3.6\bin
start cmd /k mongod.exe

cd %~dp0

timeout 5
@echo *** Start node server ***
start cmd /k node server.js

timeout 5
start chrome.exe "http://localhost:8080/"

@PAUSE