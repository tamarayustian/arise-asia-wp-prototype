FROM wordpress:6.7-php8.3-apache

RUN set -eux; \
	a2dismod mpm_event; \
	a2enmod mpm_prefork; \
	a2enmod rewrite

COPY ./wp-content /var/www/html/wp-content
