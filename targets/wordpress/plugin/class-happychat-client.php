<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Happychat_Client {
	private static $_instance = null;
	const VERSION = '0.0.1-dev';
	const NODE_ID = 'happychat-form';

	/**
	* Create instance of class
	* @return Happychat_Client
	*/
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct() {
		add_shortcode( 'happychat', array( $this, 'shortcode_to_happychat_form' ) );
	}

	public function shortcode_to_happychat_form( $atts ) {
		$this->enqueue_scripts();
		return '<div id="' . Happychat_Client::NODE_ID . '"></div>';
	}

	private function is_valid_group( $group ) {
		// These are the accepted values for Happychat groups/products
		// https://github.com/Automattic/happychat/blob/staging/src/setup-system-defaults.js#L25-L35
		if ( ( 'WP.com' === $group  ) || ( 'woo' === $group ) || ( 'jpop' === $group ) ) {
			return true;
		}
		return false;
	}

	private function get_user_group() {
		// By default, we'll take what is configured in the Happychat plugin,
		// but we also want to provide an opportunity for the host to
		// have different groups at runtime.
		$group = get_option( 'happychat_user_group' );
		$group = apply_filters( 'happychat_user_group', $group );
		if ( ! $group || ! $this->is_valid_group( $group ) ) {
			$group = 'WP.com'; // default group
		}
		return $group;
	}

	private function get_fallback_ticket_path_create() {
		// If the path is null,
		// this feature will be unavailable in Happychat.
		$fallback_ticket_path_create = apply_filters( 'happychat_create_ticket_endpoint', null );
		if ( ! $fallback_ticket_path_create ) {
			$fallback_ticket_path_create = ( '/' === substr( $fallback_ticket_path_create, 0, 1 ) )
			? $fallback_ticket_path_create
			: '/' . $fallback_ticket_path_create;
		}
		return $fallback_ticket_path_create;
	}

	private function get_fallback_ticket_path_show() {
		// If the path is null,
		// Happychat won't show a ticket link upon success.
		$fallback_ticket_path_show = apply_filters( 'happychat_show_ticket_path', null );
		return $fallback_ticket_path_show;
	}

	private function enqueue_scripts() {
		// The host should provide a valid WordPress.com token
		// for the user, so we can make authenticated requests
		// on its behalf.
		$token = null;
		$token = apply_filters( 'happychat_wpcom_token', $token );
		if ( ! $token ) {
			return;
		}

		$fallback_ticket_path_create = $this->get_fallback_ticket_path_create();
		$fallback_ticket_path_show = $this->get_fallback_ticket_path_show();
		$group = $this->get_user_group();

		// load happychat library
		wp_register_script(
			'happychat-api',
			plugins_url( 'assets/happychat.js', __FILE__ ),
			array(),
			Happychat_Client::VERSION,
			true
		);
		wp_enqueue_script( 'happychat-api' );

		// init happychat
		wp_register_script(
			'happychat-init',
			plugins_url( 'assets/client-happychat-init.js', __FILE__ ),
			array(),
			Happychat_Client::VERSION,
			true
		);

		$happychat_settings = array(
			'token'  => $token,
			'nodeId' => Happychat_Client::NODE_ID,
			'groups' => [ $group ],
			'entryOptions' => [
				'primaryOptions' => [
					array( 'value' => 'before-buy', 'label' => 'Before you buy' ),
					array( 'value' => 'account', 'label' => 'Help with my account' ),
					array( 'value' => 'config', 'label' => 'Help configuring' ),
					array( 'value' => 'order', 'label' => 'Help with an order' ),
					array( 'value' => 'broken', 'label' => 'Something is broken' ),
					],
					'fallbackTicket' => array(
						'pathToCreate' => $fallback_ticket_path_create,
						'pathToShow' => $fallback_ticket_path_show,
						'headers' => array( 'X-WP-Nonce' => wp_create_nonce( 'wp_rest' ) ),
					),
					],
				);

				wp_localize_script( 'happychat-init', 'happychatSettings', $happychat_settings );
				wp_enqueue_script( 'happychat-init' );
			}
		}
