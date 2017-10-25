up:
	docker-compose up -d
stop:
	docker-compose stop
	docker rm -f $(docker ps -a | grep phoenixforum_app | awk '{print $1}') || echo "\n\n >bash stoped before\n\n"
app:
	docker rm -f phoenixforum_app; docker-compose run --name phoenixforum_app --rm -p 9000:4000 phoenix iex -S mix phx.server
bash:
	docker-compose run phoenix bash
