<?php
/**
* Plugin Name: Happychat
* Plugin URI: https://github.com/Automattic/happychat-client
* Description: Adds Happychat as a shortcode, allowing customers to get support via real time chat.
* Version: 0.1.6
* Author: Automattic
* Author URI: http://automattic.com
*
* @package Happychat
* @author Automattic
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( is_admin() ) {
	require_once dirname( __FILE__ ) . '/class-happychat-admin.php';
	Happychat_Admin::instance( __FILE__ );
} else {
	require_once dirname( __FILE__ ) . '/class-happychat-client.php';
	Happychat_Client::instance();
}
