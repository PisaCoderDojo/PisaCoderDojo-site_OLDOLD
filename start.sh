sudo docker build -t webapp . # Build a Docker image named "webapp" from this location "."
# wait for it to build...

# Run the docker container
sudo docker run -v `pwd`:/var/www:rw -p 8080:80 webapp /sbin/my_init
