FROM python:3.5-slim

# Install libraries
COPY ./requirements.txt ./
RUN apt update
RUN apt install -y wget gcc git ffmpeg espeak espeak-data libespeak1 libespeak-dev build-essential festival* flac libasound2-dev libsndfile1-dev vorbis-tools libxml2-dev libxslt-dev zlib1g-dev python-dev
RUN pip install -r requirements.txt && \
    rm ./requirements.txt
RUN git clone https://github.com/ReadBeyond/aeneas.git
WORKDIR /aeneas
RUN pip install -r ./requirements.txt
RUN python setup.py build_ext --inplace
RUN python aeneas_check_setup.py

# Setup container directories
# Copy local code to the container
COPY ./app /app

# launch server with gunicorn
WORKDIR /app
RUN mv ../aeneas/aeneas ./
EXPOSE 8080
CMD ["gunicorn", "app:app", "--timeout=0", "--preload", \
     "--workers=1", "--threads=4", "--bind=0.0.0.0:8080"]