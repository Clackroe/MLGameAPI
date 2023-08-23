sudo docker run -it --name testSocc2      
--mount type=bind,source="$(pwd)"/unity-volume,target=/unity-volume 
-p 5005:5005           
-p 6006:6006            
clackroe/test-soccer:latest            
/unity-volume/test-soccer-twos.x86_64            
--env=/unity-volume/SoccerTwos.yaml            
--train            
--run-id=test-run