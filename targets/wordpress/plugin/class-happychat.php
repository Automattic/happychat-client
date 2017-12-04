<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Happychat {
	private static $_instance = null;
	const VERSION = '0.0.1-dev';

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
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_shortcode( 'happychat', array( $this, 'shortcode_to_happychat_form' ) );
	}

	private function get_token() {
		$current_user = wp_get_current_user();
		return get_user_meta( $current_user->ID, 'wp_woocommerce_wpcom_signin_access_token', true );
	}

	public function shortcode_to_happychat_form( $atts ) {
		self::do_enqueue_scripts();

		$happychat_node_id = 'happychat-form';
		return '<span id="' . $happychat_node_id . '">
					<button class="button view"
							onclick="Happychat.open( \'' . $happychat_node_id . '\', [ \'woo\' ], \'' . self::get_token() . '\' )"
					>
					Chat with us
					</button>
				</span>';
	}

	private function should_offer_chat() {
		global $wp;

		// Display on front page not currently supported.
		if ( $wp->request === '' ) {
			return false;
		}

		$should_offer_chat = false;
		// The ticket forms always need the chat scripts
		if ( in_array( $wp->request, array( 'my-account/create-a-ticket', 'my-account/marketplace-ticket-form' ) ) ) {
			$should_offer_chat = true;
		}

		return $should_offer_chat;
	}

	private function do_enqueue_scripts() {
		wp_register_style(
			'happychat-form-css',
			plugins_url( 'assets/happychat.css', __FILE__ ),
			array(),
			self::VERSION
		);

		wp_register_script(
			'happychat-form-js',
			plugins_url( 'assets/happychat.js', __FILE__ ),
			array(),
			self::VERSION,
			true
		);

		wp_enqueue_style( 'happychat-form-css' );
		wp_enqueue_script( 'happychat-form-js' );

	}

	public function enqueue_scripts() {
		if ( self::should_offer_chat() ) {
			self::do_enqueue_scripts();

			wp_register_script(
				'happychat-form-js-init',
				plugins_url( 'assets/happychat-init.js', __FILE__ ),
				array( 'jquery-core' ),
				self::VERSION,
				true
			);

			$happychat_settings = array(
				'token' => self::get_token(),
				'groups' => [ 'woo' ],
			);
			wp_localize_script( 'happychat-form-js-init', 'happychatSettings', $happychat_settings );
			wp_enqueue_script( 'happychat-form-js-init' );
		}
	}
}
