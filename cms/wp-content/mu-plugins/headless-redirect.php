<?php
/*
Plugin Name: Headless Redirect
Description: Redirects frontend visitors to the Astro site and rewires the WordPress preview link.
*/

add_action('template_redirect', function() {
    if (is_user_logged_in()) return;
    $frontend_url = getenv('FRONTEND_URL') ?: 'http://localhost:4321';
    if (wp_redirect($frontend_url, 302)) {
        exit;
    }
});
