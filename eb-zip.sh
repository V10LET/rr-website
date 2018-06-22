set -e
export APP_NAME='rr-website'
export APP_VERSION=`git rev-parse --short HEAD`

npm run build
mkdir -p builds
zip -x *.git* -x "node_modules/**" -x ".env" -r "./builds/${APP_NAME}-${APP_VERSION}.zip" .
