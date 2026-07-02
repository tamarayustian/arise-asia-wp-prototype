FROM wordpress:6.7-php8.3-apache

RUN set -eux; \
    rm -f /etc/apache2/mods-enabled/mpm_*.load /etc/apache2/mods-enabled/mpm_*.conf; \
    a2enmod mpm_prefork; \
    a2enmod rewrite; \
    apt-get update && apt-get install -y wget unzip && rm -rf /var/lib/apt/lists/*; \
    wget --tries=3 --waitretry=5 -O /tmp/polylang.zip https://downloads.wordpress.org/plugin/polylang.latest-stable.zip; \
    unzip /tmp/polylang.zip -d /tmp/polylang; \
    mkdir -p /var/www/html/wp-content/plugins/polylang; \
    cp -r /tmp/polylang/polylang/* /var/www/html/wp-content/plugins/polylang/; \
    rm -rf /tmp/polylang.zip /tmp/polylang; \
    wget --tries=3 --waitretry=5 -O /tmp/acf.zip https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip; \
    unzip /tmp/acf.zip -d /tmp/acf; \
    mkdir -p /var/www/html/wp-content/plugins/advanced-custom-fields; \
    cp -r /tmp/acf/advanced-custom-fields/* /var/www/html/wp-content/plugins/advanced-custom-fields/; \
    rm -rf /tmp/acf.zip /tmp/acf

COPY ./wp-content /var/www/html/wp-content
COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh
ENTRYPOINT ["/usr/local/bin/run.sh"]
CMD ["apache2-foreground"]
