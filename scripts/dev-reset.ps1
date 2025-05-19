docker compose -f docker-compose.dev.yml down -v
docker container prune -f
docker compose -f docker-compose.dev.yml up --build