cd /home/www/ans-forum/

echo "Pulling from Master" 

git pull origin master

echo "Pulled successfully from master"

npm run stop

echo "stop"

npm run compareBuild

echo "builded"

nohup npm start &

echo "start"