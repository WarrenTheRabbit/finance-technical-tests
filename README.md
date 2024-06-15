# finance-technical-tests

A repository for doing technical feasability research. 
Create a folder with an appropriate name and do your tests and experiments in there. That way, the whole team can see what you are experimenting with. To make it even easier for your teammates, add an entry to the table.


| Folder | Investigating | Conclusion/Status |
| ------ | ------ | ------ |
|   [event-driven-with-kafka](event-driven-with-kafka/README.md)| Does Kafka allow us to publish and consume events? Does it give us observability into the events? | Can run a Kafka cluster (took 135 minutes). But can I use it? |
| [transaction-storage-with-sqlite](transaction-storage-with-sqlite/README.md) | Can I create a Restful API that can store and retrieve transaction objects - all of them, by category, by date range, user, etc? | Yes. The schema and Transaction class are just placeholders though.|
| [fastapi-backend](fastapi-backend/README.md) | Wiring FastAPI and React together. | Completed. |
