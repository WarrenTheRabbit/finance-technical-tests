# Questions

Can we use Kafka as the engine that drives an event-driven components?

For our use case, what is good about Kafka?


For our use case, what is bad about Kafka?


# Notes
Kafka has three services:
- the broker that receives messages, stores them and serves them to consumers
- the coordination service that determines which brokers are available
- a web UI for monitoring the activities of the brokers

```yml
services:
    kafka:

    zookeeper:

    kafdrop:
```

# Steps
1. Create docker-compose file that configures the three Kafka services: broker, broker coordinator and web UI. See `docker-compose.yml`.
2. Launch services: `docker-compose up -d`. This took d
3. 

# Problems solved
| Problem | Solution |
| ---- | ---- |
| The command `docker-compose` could not be found in this WSL 2 distro. | Start Docker Desktop. |

# Troubleshooting notes
## All containers exit and never stably run.
Maybe log events like this indicate the problem:
```bash
2024-06-09 11:13:26 zookeeper  | mkdir: cannot create directory '/bitnami/zookeeper/data': Permission denied
```
```bash
kafka  | mkdir: cannot create directory '/bitnami/kafka/config': Permission denied
kafka exited with code 1
```
Apparently [any files or directories used by the appliation should be owned by the root group](https://github.com/bitnami/containers/issues/52630). I'll try adjusting ownership of the local directory. 

Try:
```bash
sudo chown root:root .
sudo rm -r bitnami | yes
```
I now have a new error:
```bash
doc
ker-compose up -d
[+] Running 2/3
 ⠿ Container zookeeper  Starting                                          1.2s 
 ✔ Container kafka      Created                                           0.0s 
 ✔ Container kafdrop    Created                                           0.0s 
Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: error mounting "/run/desktop/mnt/host/wsl/docker-desktop-bind-mounts/Ubuntu/9324ae396053152be966ac63656914019cfb0aae4a67f96aac13c441ac52ce88" to rootfs at "/bitnami/zookeeper": mount /run/desktop/mnt/host/wsl/docker-desktop-bind-mounts/Ubuntu/9324ae396053152be966ac63656914019cfb0aae4a67f96aac13c441ac52ce88:/bitnami/zookeeper (via /proc/self/fd/9), flags: 0x5000: no such file or directory: unknown
```

[Try:](https://stackoverflow.com/a/74662602)
```bash
docker network prune
WARNING! This will remove all custom networks not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Networks:
event-driven-with-kafka_default
```

Now I have:
```bash
docker-compose up -d
[+] Running 3/4
 ✔ Network event-driven-with-kafka_default  Created                       0.2s 
 ⠿ Container zookeeper                      Star...                       0.4s 
 ✔ Container kafka                          Created                       0.0s 
 ✔ Container kafdrop                        Create...                     0.0s 
Error response from daemon: network 6d0b84fb5778c1c5c7d09fc7010ed803575d9862a635a391aea899b7f9bcaac4 not found
```

Command seemed to create a new network but is still looking for old network:
```bash
docker network ls
NETWORK ID     NAME                              DRIVER    SCOPE
7164958e7f6f   bridge                            bridge    local
7b1c3b769ed2   event-driven-with-kafka_default   bridge    local
0641dc78891e   host                              host      local
4fa7e1764e41   none                              null      local
```

[Try restarting Docker engine:](https://stackoverflow.com/a/56373438):
I right-clicked the Docker Desktop icon and selected 'Restart'.
Same problem.


[Try removing the network with rm command:](https://stackoverflow.com/a/67131218):
```bash
 docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
2481a1dbd7bb   bridge    bridge    local
0641dc78891e   host      host      local
4fa7e1764e41   none      null      local
docker-compose up 
```
Going to the Docker Desktop and deleting the network fixed the cannot find problem. But still have immediate exit problem.

[Try adding `user:root` to `docker-compose.yml`:](https://docs.vmware.com/en/VMware-Tanzu-Application-Catalog/services/tutorials/GUID-work-with-non-root-containers-index.html)

zookeeper and kafka are now stably running.
However, kafdrop has a StackOverFlow error.

[Try removing JVM options from `docker-compose.yml`:](      JVM_OPTS: "-Xms16M -Xmx48M -Xss180K -XX:-TieredCompilation -XX:+UseStringDeduplication -noverify")
Removed:
```yml
      JVM_OPTS: "-Xms16M -Xmx48M -Xss180K -XX:-TieredCompilation -XX:+UseStringDeduplication -noverify"
```
Now all three services are stably running.