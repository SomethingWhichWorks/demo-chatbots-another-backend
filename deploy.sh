  # Turn off warnings about SSH keys:
   echo "   Host heroku.com" >> ~/.ssh/config
   echo "   StrictHostKeyChecking no" >> ~/.ssh/config
   echo "   CheckHostIP no" >> ~/.ssh/config
   echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

  git clone git@heroku.com:demo-chatbots.git dist
  # Build
   gulp-release
  # Commit and Push dist folder to Heroku
   cd dist
   git config --global user.name "$GITHUB_USER"
   git config --global user.email "$GITHUB_EMAIL"
   git add *
   git commit -am "Travis CI"
   git push origin master