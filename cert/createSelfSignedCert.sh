# Generate self-signed certificate for local development
# Must fill out:
# Common Name (e.g. server FQDN or YOUR name): localhost
openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout ./cert/key.pem -out ./cert/cert.pem -sha256 << INPUT
UK
London
London
ShaMan123
ShaMan123
localhost
contact@shaman123.com
INPUT
openssl rsa -in ./cert/key.pem -out ./cert/key.pem

# More info about how to trust the generated certificates on your machine
# MacOs = https://stackoverflow.com/a/42298344
# Windows = https://stackoverflow.com/a/49784278
