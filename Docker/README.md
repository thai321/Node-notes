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
### Docker Networks: Concepts
- Review of `docker contaienr run -p`
- For local dev/testing, networks usually "just work"
- Quick port check with `docker container port <container>`
- Learn concepts of Docker Networking
- Understand how network packets move around Docker
-----
### Docker Networks defaults
- Each container connected to a private virtual network "bridge"
- Each virtual network routes through NAT firewall on host IP
- All containers on a virtual network can talk to each other without -p
- Best practice is to create a new virtual network for each app:
  - network "my_web_app" for mysql and php/apache containers
  - network "my_api" for mongo and nodejs containers
--------

### Docker Networks: CLI Managements
- Show networks `docker network ls`
- Inspect a network `docker network inspect`
- Create a network `docker network create --driver`
- Attach a network to container `docker network connect`
- Detach a network from container `docker network disconnect`
