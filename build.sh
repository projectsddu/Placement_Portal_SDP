BUILD_FOLDER_NAME="build"
if [ -z "$1" ]
  then
    echo "> No FileName was provided"
else
    BUILD_FOLDER_NAME=$1

fi
echo $BUILD_FOLDER_NAME

MODULES_DIR="node_modules"

echo "> Client: Build folder creating"
cd "./Client"

if [ -d "$MODULES_DIR" ]; then
    echo "> ${MODULES_DIR} installed"
else
    echo "> Installing ${MODULES_DIR} please wait"
    npm i
fi
npm run build

echo "> Client: Frontend build created"
cd "../Server"
cp -R "../Client/build" "."

if [ -d "$MODULES_DIR" ]; then
    echo "> Server: Removing node modules"
    rm -r "node_modules"
fi

echo "> Server: Removing previous build files <Linux Version>"
rm *.zip

echo "> Server: Removing previous build files <Windows Version>"
rm *.tar

echo "> Server: Zipping folder please wait"
tar -cvf "$BUILD_FOLDER_NAME.tar" "."

echo "> Server: Installing node modules back"
npm i

echo "> Moving Zipped File"
cd ".."

VERSION_DIR="Versions"


if [ -d "$VERSION_DIR" ]; then
    echo "> ${VERSION_DIR} exits"
else
    echo "> Making folder $VERSION_DIR"
    mkdir "./${VERSION_DIR}"
fi
mv "./Server/${BUILD_FOLDER_NAME}.tar" "./${VERSION_DIR}"

echo "> All process completed successfully"
echo "> Written and developed by : Jenil Gandhi <jenilgandhi2111@gmail.com>"