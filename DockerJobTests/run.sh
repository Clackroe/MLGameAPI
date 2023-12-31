#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <container_name>"
  exit 1
fi

container_name="$1"

docker run -d --rm --runtime=nvidia --gpus all -it --name "$container_name" \
  --mount type=bind,source="$(pwd)"/unity-volume,target=/unity-volume \
  -p 6006:6006 \
  -p 5005:5005 \
  clackroe/test-soccer:latest \
  mlagents-learn /unity-volume/Walker.yaml  --run-id=testRun --no-graphics --force --env=/unity-volume/walker-exec.x86_64

docker exec -d -it $container_name tensorboard --logdir results/testRun --host 0.0.0.0 