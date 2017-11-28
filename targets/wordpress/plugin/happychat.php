<?php
/**
 * Plugin Name: Happychat
 * Plugin URI: https://github.com/Automattic/happychat-client
 * Description: Adds Happychat as a shortcode, allowing customers to get support via real time chat.
 * Version: 0.0.1-dev
 * Author: Automattic
 * Author URI: http://automattic.com
 *
 * @package Happychat
 * @category Core
 * @author Automattic
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$happychat_class = '/class-happychat.php';
require_once dirname( __FILE__ ) . $happychat_class;
Happychat::instance();
