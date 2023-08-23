#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <container_name>"
  exit 1
fi

container_name="$1"

sudo docker run -d -it --name "$container_name" \
  --mount type=bind,source="$(pwd)"/unity-volume,target=/unity-volume \
  -p 6006:6006 \
  clackroe/test-soccer:latest \
  mlagents-learn /unity-volume/Walker.yaml  --run-id=testRun --no-graphics --force \
  --env=/unity-volume/walker-exec.x86_64