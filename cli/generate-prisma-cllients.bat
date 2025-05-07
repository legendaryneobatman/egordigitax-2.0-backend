@echo off
setlocal enabledelayedexpansion

set LOG_FILE=prisma-generation.log
echo Starting Prisma clients generation and migrations... > %LOG_FILE%

set ERROR_OCCURRED=0

:main
for /f "delims=" %%s in ('dir /s /b "apps\schema.prisma" "packages\schema.prisma"') do (
    set "schema=%%s"
    set "service_dir=%%~dps"
    set "service_dir=!service_dir:~0,-1!"
    for %%d in ("!service_dir!") do set "service_name=%%~nxd"
    set "schema_path=prisma\schema.prisma"

    echo Processing !service_name!...
    echo Processing !service_name!... >> %LOG_FILE%

    pushd "%%~dps.."
    call :run_operations !service_name! !schema_path!
    popd
)

if %ERROR_OCCURRED% equ 1 (
    echo Error occurred during processing. Check %LOG_FILE% for details.
    exit /b 1
)

echo All Prisma operations completed successfully!
exit /b 0

:run_operations
setlocal
set service_name=%~1
set schema_path=%~2

echo Generating client for %service_name%
npx dotenv -e ../../.env -- npx prisma generate --schema="%schema_path%" >> %LOG_FILE% 2>&1
if %errorlevel% neq 0 (
    echo Error occurred in %service_name%
    echo Error occurred in %service_name% >> %LOG_FILE%
    endlocal
    set ERROR_OCCURRED=1
    exit /b 1
)

echo Applying migrations for %service_name%
npx dotenv -e ../../.env -- npx prisma db push --schema="%schema_path%" >> %LOG_FILE% 2>&1
if %errorlevel% neq 0 (
    echo Error occurred in %service_name%
    echo Error occurred in %service_name% >> %LOG_FILE%
    endlocal
    set ERROR_OCCURRED=1
    exit /b 1
)

echo ✅ Successfully processed %service_name%
endlocal
exit /b 0
