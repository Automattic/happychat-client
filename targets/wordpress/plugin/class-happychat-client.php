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

	/**
	* Returns whether Happychat is enabled or not.
	*
	* @return bool
	*/
	private function is_happychat_enabled() {
		return get_option( 'happychat_enable' );
	}

	/**
	 * Returns true if chat should be offered.
	 *
	 * @return bool
	 */
	private function should_offer_chat() {
		$is_user_eligible = apply_filters( 'happychat_is_user_eligible', true );
		if ( $this->is_happychat_enabled() && $is_user_eligible ) {
			return true;
		}
		return false;
	}

	private function is_valid_group( $group ) {
		// These are the accepted values for Happychat groups/products
		// https://github.com/Automattic/happychat/blob/staging/src/setup-system-defaults.js#L25-L35
		if ( ( $group === 'WP.com' ) || ( $group === 'woo' ) || ( $group === 'jpop' ) ) {
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

	private function enqueue_scripts() {
		if ( $this->should_offer_chat() ) {

			// The host should provide a valid WordPress.com token
			// for the user, so we can make authenticated requests
			// on its behalf.
			$token = null;
			$token = apply_filters( 'happychat_wpcom_token', $token );
			if ( ! $token ) {
				error_log( 'happychat: token not provided' );
				return;
			}

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

			$fallback_ticket_path = get_option( 'happychat_fallback_ticket_path' );
			$fallback_ticket_path = ( substr( $fallback_ticket_path, 0, 1 ) == '/' )
				? $fallback_ticket_path
				: '/' . $fallback_ticket_path;

			$happychat_settings = array(
				'token'  => $token,
				'groups' => [ $group ],
				'nodeId' => Happychat_Client::NODE_ID,
				'howCanWeHelpOptions' => [
					array( 'value' => 'before-buy', 'label' => 'Before you buy' ),
					array( 'value' => 'account',    'label' => 'Help with my account' ),
					array( 'value' => 'config',     'label' => 'Help configuring' ),
					array( 'value' => 'order',      'label' => 'Help with an order' ),
					array( 'value' => 'broken',     'label' => 'Something is broken' ),
					],
				'fallbackTicketPath' => $fallback_ticket_path,
			);

			wp_localize_script( 'happychat-init', 'happychatSettings', $happychat_settings );
			wp_enqueue_script( 'happychat-init' );
		}
	}
}
