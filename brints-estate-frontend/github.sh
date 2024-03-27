#! /usr/bin/bash

# This script is used to push the code to the github repository

# Change the directory to the repository
cd /var/www/brints-estate-frontend-vue/brints-estate-frontend

# Pull the changes from the repository
git pull origin main --ff-only

# Run the build script
yarn build