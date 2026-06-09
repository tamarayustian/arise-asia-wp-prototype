<?php
/**
 * Headless Redirect
 *
 * Redirects non-logged-in frontend visitors to the Astro site.
 * Skips wp-login, wp-admin, and REST API routes.
 */

add_action('init', function () {
    if (is_user_logged_in()) {
        return;
    }

    $uri = $_SERVER['REQUEST_URI'] ?? '';

    if (str_contains($uri, 'wp-login')) {
        return;
    }

    if (str_contains($uri, 'wp-admin')) {
        return;
    }

    if (array_key_exists('rest_route', $_GET)) {
        return;
    }

    $frontend_url = getenv('FRONTEND_URL') ?: 'http://localhost:4321';

    if (!str_starts_with($frontend_url, 'http://') && !str_starts_with($frontend_url, 'https://')) {
        $frontend_url = 'https://' . $frontend_url;
    }

    $path = parse_url($uri, PHP_URL_PATH);
    if ($path && $path !== '/') {
        $frontend_url = rtrim($frontend_url, '/') . $path;
    }

    wp_redirect($frontend_url, 302);
    exit;
});
