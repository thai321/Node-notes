- `docker container run --publish 80:80 ngix`
1. Downloaded image 'nginx' from Docker Hub
2. Started a new container from that image
3. Opened port 80 on the host IP
4. Routes that traffic to the container IP, port 80



-----
- `What happends in 'docker container run'`
1. Looks for that image locally in image cache, doesn't find anything
2. Then looks in remote image repository(defaults to Docker Hub)
3. Downlaods the latest version (nginx: lastest by default)
4. Create new container based on that iamge and prepares to Start
5. Gives it a virtual IP on a private network inside doecker engine
6. Opens up port 80 on host and forwards to port 80 in container
7. Starts container by using the CMD in the image Dockerfile


-------

- `docker container run -d -p 3306:3306 --name db -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql`
- `docker container logs db`



-----
- What's going on in containers
- `docker container top`: process list in one container
- `docker container inspect`: details of one container config
- `docker container stats`: performance stats for all containers

-------

### Getting a sheel inside containers
- `docker container run -it`: start new container interactively
- `docker container exec -it`: run additional command in existing container
- Different Linux distros in containers
- `docker container run -it --name ubuntu ubuntu`: create a ubuntu container, and name it ubuntu
- `docker container start -ai ubuntu`: run the container ubuntu again
- `docker image ls`: list all the images


-------
