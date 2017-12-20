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

if ( is_admin() ) {
	$happychat_admin = '/class-happychat-admin.php';
	require_once dirname( __FILE__ ) . $happychat_admin;
	Happychat_Admin::instance( __FILE__ );
} else {
	$happychat_client = '/class-happychat-client.php';
	require_once dirname( __FILE__ ) . $happychat_client;
	Happychat_Client::instance();
}
