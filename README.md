## Setting environment variables
다음은 루트 디렉터리에 있어야 하는 .env 파일입니다.
```env
DATABASE_URL='mysql://user:user@localhost:3306/tour'
REDIS_URI="http://127.0.0.1:6379"
PORT=3000
```

## Installation & Running the app
1. database를 위한 docker-compose 실행 및 패키지 설치
```bash
$ docker-compose up
$ yarn install
```
2. MySQL migration 실행
```bash
$ yarn run typeorm migration:run
```
3. NestJS 서버 실행
```bash
$ yarn start
```
4. [Swagger](http://localhost:3000/api/docs) 접속하여 API 확인