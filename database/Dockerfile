FROM postgres

# Copy the database initialize script: 
# Contents of /docker-entrypoint-initdb.d are run on startup
RUN mkdir -p /images/

COPY pg_hba.conf /usr/share/postgresql/9.6/
COPY postgresql.conf /usr/share/postgresql/9.6/
#RUN ["mkdir", "/docker-entrypoint-initdb.d"]
#COPY init-db.sql /docker-entrypoint-initdb.d/
#ADD  docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/

# Default values for passwords and database name. Can be overridden on docker run
ENV POSTGRES_USER gordonuser
ENV POSTGRES_DB atsea
