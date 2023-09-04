# From https://gitlab.com/nvidia/container-images/cuda/blob/master/doc/supported-tags.md
FROM nvidia/cuda:11.0.3-base-ubuntu20.04

ENV DEBIAN_FRONTEND noninteractive

RUN yes | unminimize

RUN apt-get update && apt-get install -y wget


RUN echo "deb http://packages.cloud.google.com/apt cloud-sdk-xenial main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN wget https://packages.cloud.google.com/apt/doc/apt-key.gpg && apt-key add apt-key.gpg
RUN apt-get update && \
  apt-get install -y --no-install-recommends wget curl tmux vim git gdebi-core \
  build-essential python3-pip unzip google-cloud-sdk htop mesa-utils xorg-dev xorg \
  libglvnd-dev libgl1-mesa-dev libegl1-mesa-dev libgles2-mesa-dev xvfb && \
  wget http://security.ubuntu.com/ubuntu/pool/main/libx/libxfont/libxfont1_1.5.1-1ubuntu0.16.04.4_amd64.deb && \
  yes | gdebi libxfont1_1.5.1-1ubuntu0.16.04.4_amd64.deb
RUN python3.8 -m pip install --upgrade pip
RUN pip install setuptools==41.0.0

ENV LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH

#checkout ml-agents for SHA
RUN mkdir /ml-agents
WORKDIR /ml-agents
ARG SHA
RUN python3.8 -m pip install absl-py==1.4.0 \
attrs==23.1.0 \
cachetools==5.3.1 \
cattrs==1.5.0 \
certifi==2023.5.7 \
charset-normalizer==3.2.0 \
cloudpickle==2.2.1 \
Farama-Notifications==0.0.4 \
filelock==3.12.2 \
google-auth==2.22.0 \
google-auth-oauthlib==1.0.0 \
grpcio==1.56.0 \
gym==0.26.2 \
gym-notices==0.0.8 \
gymnasium==0.29.0 \
h5py==3.9.0 \
idna==3.4 \
importlib-metadata==6.8.0 \
Jinja2==3.1.2 \
Markdown==3.4.3 \
MarkupSafe==2.1.3 \
mlagents==0.29.0 \
mlagents-envs==0.29.0 \
mpmath==1.3.0 \
networkx==3.1 \
numpy==1.21.2 \
oauthlib==3.2.2 \
onnx==1.14.0 \
pettingzoo==1.23.1 \
Pillow==10.0.0 \ 
protobuf==3.20.3 \
pyasn1==0.5.0 \
pyasn1-modules==0.3.0 \
pypiwin32==223 \
pywin32==306 \
PyYAML==6.0 \
requests==2.31.0 \
requests-oauthlib==1.3.1 \
rsa==4.9 \ 
six==1.16.0 \
sympy==1.12 \
tensorboard==2.13.0 \
tensorboard-data-server==0.7.1 \
torch==2.0.1 \
torchaudio==2.0.2 \
torchvision==0.15.2 \
typing_extensions==4.7.1 \
urllib3==1.26.16 \
Werkzeug==2.3.6 \
zipp==3.16.2 