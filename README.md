# Happychat client

Currently, customer facing code for Happychat lives in Calypso. This project intends to extract it and prepare the Happychat client to be embeddable in any environment.

## Running

    npm install
    npm run start

Visit localhost:9000 and click the Happychat button to start a chat. The first time, you'll be redirected to the WordPress.com token approval screen.

By default, it will connect to Happychat staging SocketIO server, so make sure you are connected as an available operator.
