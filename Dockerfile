# Use a Debian-based PostgreSQL image
FROM postgres:17

# Install pg_cron
RUN apt-get update && apt-get install -y postgresql-17-cron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# RUN apk add -U postgresql-17-cron

# Add pg_cron to the PostgreSQL configuration
RUN echo "shared_preload_libraries = 'pg_cron'" >> /usr/share/postgresql/postgresql.conf.sample
# RUN echo "shared_preload_libraries = 'pg_cron'" >> /etc/postgresql/17/main/postgresql.conf
