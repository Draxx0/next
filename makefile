.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: restart
restart:
	docker-compose restart

.PHONY: reset
reset:
	docker system prune -a -f 

.PHONY: generate
generate:
 pnpx prisma generate

.PHONY: migrate
migrate:
	pnpx prisma migrate dev