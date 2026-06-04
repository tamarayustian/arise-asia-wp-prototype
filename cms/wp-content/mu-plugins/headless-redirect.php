<?php
/*
Plugin Name: Headless Redirect
Description: Redirects frontend visitors to the Astro site and rewires the WordPress preview link.
*/

add_action('template_redirect', function() {
    if (is_user_logged_in()) return;
    if (strpos($_SERVER['REQUEST_URI'], 'wp-login') !== false) return;
    if (strpos($_SERVER['REQUEST_URI'], 'wp-admin') !== false) return;
    $frontend_url = getenv('FRONTEND_URL') ?: 'http://localhost:4321';
    if (strpos($frontend_url, 'http://') !== 0 && strpos($frontend_url, 'https://') !== 0) {
        $frontend_url = 'https://' . $frontend_url;
    }
    wp_redirect($frontend_url, 302);
    exit;
});
