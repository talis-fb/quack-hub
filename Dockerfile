## ---------------------------------------------------------------------
## ---------------------------------------------------------------------
## This Dockerfile is to setup app in only ONE Container 
## ---------------------------------------------------------------------
## ---------------------------------------------------------------------

# -------------------
# BUILD - Frontend
# -------------------
FROM node:20.11.1-bullseye-slim AS build-frontend

WORKDIR /app/frontend

COPY frontend/package.json .
COPY frontend/yarn.lock .

RUN yarn install

COPY frontend/ .
RUN yarn build-only

# -----------------------------
# BUILD AND RUNNER - Backend
# -----------------------------
FROM node:20.11.1-bullseye-slim AS backend

WORKDIR /app/backend

COPY backend/package.json .
COPY backend/yarn.lock .

RUN yarn install

COPY backend/ .
RUN yarn build

COPY --from=build-frontend /app/frontend/dist client/

EXPOSE 8080

CMD ["yarn", "start:migrate:prod"]
