@echo off
SET REPO=C:\Users\SAMPC\repos\lifesystemos.com
SET COMMIT=7d387b0
SET TEMPDIR=%TEMP%\lso-restore
SET COUNT=0
IF NOT EXIST "%TEMPDIR%" MKDIR "%TEMPDIR%"
git -C "%REPO%" ls-tree -r --name-only %COMMIT% > "%TEMPDIR%\files.txt"
for /f "delims=" %%f in ('type "%TEMPDIR%\files.txt"') do (
    SETLOCAL ENABLEDELAYEDEXPANSION
    set "FILE=%%f"
    if /i "!FILE:~-5!"==".html" (
        git -C "%REPO%" show %COMMIT%:"%%f" > "%TEMPDIR%\restore.tmp"
        if !ERRORLEVEL! EQU 0 (
            copy /y "%TEMPDIR%\restore.tmp" "%REPO%\%%f" >nul
            set /a COUNT+=1
        )
    )
    ENDLOCAL
)
echo LSO: Restored %COUNT% files
