docker build -t webapp . # Build a Docker image named "webapp" from this location "."
# wait for it to build...

# Run the docker container
docker run -t -v `pwd`:/var/www:rw -p 8080:8080 webapp /sbin/my_init
