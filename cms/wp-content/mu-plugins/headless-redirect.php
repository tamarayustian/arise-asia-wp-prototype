<?php
/*
Plugin Name: Headless Redirect
Description: Redirects frontend visitors to the Astro site and rewires the WordPress preview link.
*/

add_action('template_redirect', function() {
    if (is_user_logged_in()) return;
    if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost:8080') !== false) {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        $host = $_SERVER['HTTP_HOST'];
        if ($host === 'localhost:8080') {
            wp_redirect('http://localhost:4321', 302);
            exit;
        }
    }
});
