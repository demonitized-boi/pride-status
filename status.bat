@echo off

if exist installCompleted.ini ( goto rpc ) else if not exist installCompleted.ini ( goto install )

:install
echo Installing required dependencies. Please wait...
npm i
echo Install successful! Creating record of install...
type NUL > installCompleted.ini
goto rpc

:rpc
echo Starting RPC. Please wait
npm start