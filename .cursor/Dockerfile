FROM node:24.16.0-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends git sudo \
    && rm -rf /var/lib/apt/lists/* \
    && (getent passwd ubuntu >/dev/null || useradd --create-home --shell /bin/bash ubuntu) \
    && echo "ubuntu ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/ubuntu \
    && chmod 0440 /etc/sudoers.d/ubuntu

USER ubuntu
WORKDIR /home/ubuntu
