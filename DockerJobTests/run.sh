
sudo docker run -it --name testSocc5  \
--mount type=bind,source="$(pwd)"/unity-volume,target=/unity-volume  \
-p 5005:5005  \
-p 6006:6006  \
clackroe/test-soccer:latest \
mlagents-learn /unity-volume/SoccerTwos.yaml \
--env=unity-volume/test-soccer-twos.x86_64 \
--train \
--run-id=test-run --force --debug --no-graphics