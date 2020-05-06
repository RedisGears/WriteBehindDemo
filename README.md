# RedisGears WriteBehind Demo

## Requirements

* Preferably Debian-based OS
* Docker Compose
* About 64 CPU cores (mainly for simulating virtual users)
* Several GBs of free RAM
* A few GBs of free disk space

## Configuration
The environment can be configured via the settings in 'compose.env'.

## Running it

```sh
git clone https://github.com/RedisGears/WriteBehindDemo
cd WriteBehindDemo
bash run.bash
```

## Dashboards
The environment is set up with Grafana server provisioned with data sources and dashboards. It is accessible via port 3000 of the server, e.g. http://localhost:3000.

## Stopping it

```sh
docker-compose down
```
