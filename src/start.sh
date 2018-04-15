
# Wait for a clean health check
until [ $(curl --write-out %{http_code} --silent --output /dev/null http://elasticsearch:9200/_cat/health?h=st) = 200 ]; do
  sleep 1
done

echo 'ElasticSearch found. Starting server.'
exec yarn start
