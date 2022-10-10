#!/bin/bash

cd ../

projects=$(ls -d */ | cut -f1 -d'/')

set -e

echo "Building all projects"

for project in $projects; do
    cd $project
    if [ -f package.json ]; then
        echo "Building $project"
        yarn install --frozen-lockfile
        yarn run build
    fi
    cd ..
done