docker compose -f docker-compose.prod.yml down -v
docker container prune -f
docker compose -f docker-compose.prod.yml up --build -d