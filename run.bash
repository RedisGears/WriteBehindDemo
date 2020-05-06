# run.bash: runs RedisGears WriteBehind Demo

# The application endpoints to test
ENDPOINTS="null redis cluster db wbredis wbcluster"

# The number of test iterations on each endpoint
ITERATIONS=1

# The test scenarios can be:
# * dynamic - simulates a sine-like peak
# * anthing else - stepped increase in load
SCENARIOS="dynamic"

# The number of seconds to sleep between iterations
SLEEP=60
# -- end of configrable stuff --

# Boot the environment
echo "Use Ctrl-C to break or wait until the end... preparing the environment"
docker-compose pull
docker-compose build --pull
docker-compose up -d

# Various initializations (we naively try repeating these until ready)
declare -a INITS=(
    "/app/init/writebehind.js redis"
    "/app/init/writebehind.js cluster"
    "/app/init/database.js"
)
for INIT in "${INITS[@]}"; do
    EXIT_CODE=1
    while [ $EXIT_CODE -ne 0 ]; do
        echo -n "Executing $INIT: "
        OUT=`docker-compose exec app node $INIT`
        EXIT_CODE=$?
        echo $OUT
        if [ $EXIT_CODE -ne 0 ]; then
            echo -n "Retrying in 1 second..."
            sleep 1
        fi
    done
done

# Run it
echo "Starting run"
for SCENARIO in $SCENARIOS; do
    for ENDPOINT in $ENDPOINTS; do
        for ITERATION in $(seq 1 $ITERATIONS); do
            echo "Scenario: $SCENARIO, endpoint: $ENDPOINT, iteration: $ITERATION";
            docker-compose run --rm -e scenario=$SCENARIO -e target=$ENDPOINT k6 run /scripts/script.js;
            sleep $SLEEP
        done;
    done;
done;
