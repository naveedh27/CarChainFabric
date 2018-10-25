# CarChainFabric
Implementation of CarChain in Fabric

# Navigate to dist
cd dist

# Create the archive  
composer archive create  --sourceType dir --sourceName ../

# Install the network 
composer network install -a .\carchain@0.0.1.bna -c PeerAdmin@hlfv1

# Start the network
composer network start -c PeerAdmin@hlfv1 -n carchain -V 0.0.1  -A admin -S adminpw


