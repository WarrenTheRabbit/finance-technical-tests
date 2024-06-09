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

# Problems encountered
| Problem | Solution |
| ---- | ---- |
| The command `docker-compose` could not be found in this WSL 2 distro. | Start Docker Desktop. |