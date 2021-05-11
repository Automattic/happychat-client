<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Happychat_Client {
	private static $_instance = null;
	const VERSION             = '0.0.14';

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
		$happychat_settings = $this->get_happychat_settings();

		// The host should provide a valid WordPress.com token
		// for the user, so we can make authenticated requests
		// on its behalf.
		if ( ! $happychat_settings['accessToken'] ) {
			return '';
		}

		// If there is a canchat shortcode attribute, override the value.
		if ( is_array( $atts ) && array_key_exists( 'canchat', $atts ) ) {
			$happychat_settings['canChat'] = $atts['canchat'];
		}

		$this->enqueue_scripts( $happychat_settings );
		return '<div id="' . $happychat_settings['nodeId'] . '"></div>';
	}

	private function is_valid_group( $group ) {
		// These are the accepted values for Happychat groups/products
		// https://github.com/Automattic/happychat/blob/staging/src/setup-system-defaults.js#L25-L35
		if ( ( 'WP.com' === $group ) || ( 'woo' === $group ) || ( 'jpop' === $group ) ) {
			return true;
		}
		return false;
	}

	private function is_valid_entry( $entry ) {
		// These are the accepted values for Happychat entries
		// https://github.com/Automattic/happychat-client/blob/master/src/form.js#L62
		if ( ( 'form' === $entry ) || ( 'chat' === $entry ) ) {
			return true;
		}
		return false;
	}

	private function validate_group( $group ) {
		if ( ! $group || ! $this->is_valid_group( $group ) ) {
			$group = 'WP.com';
		}
		return $group;
	}

	private function validate_entry( $entry ) {
		if ( ! $entry || ! $this->is_valid_entry( $entry ) ) {
			$entry = 'form';
		}
		return $entry;
	}

	private function validate_path( $path ) {
		$new_path = null;
		if ( $path ) {
			$new_path = ( '/' === substr( $path, 0, 1 ) )
			? $path
			: '/' . $path;
		}
		return $new_path;
	}

	private function get_happychat_settings() {
		$happychat_settings = [
			'accessToken'  => null,
			'entry'        => 'ENTRY_FORM',
			'entryOptions' => [],
			'plugins'      => [],
			'groups'       => [ get_option( 'happychat_user_group' ) ],
			'canChat'      => 'true',
			'nodeId'       => 'happychat-form',
		];

		$happychat_settings = apply_filters( 'happychat_settings', $happychat_settings );

		$happychat_settings['entry'] = $this->validate_entry( $happychat_settings['entry'] );

		$url = isset( $happychat_settings['entryOptions']['fallbackTicket']['url'] ) ? $happychat_settings['entryOptions']['fallbackTicket']['url'] : null;
		$happychat_settings['entryOptions']['fallbackTicket']['url'] = $this->validate_path( $url );

		$happychat_settings['groups'] = [ $this->validate_group( $happychat_settings['groups'][0] ) ];

		return $happychat_settings;
	}

	private function enqueue_scripts( $happychat_settings ) {
		// load happychat library
		wp_register_script(
			'happychat-api',
			'//widgets.wp.com/happychat/v1/happychat.js',
			array(),
			self::VERSION,
			true
		);
		wp_enqueue_script( 'happychat-api' );

		// init happychat
		wp_register_script(
			'happychat-init',
			plugins_url( 'assets/client-happychat-init.js', __FILE__ ),
			array(),
			self::VERSION,
			true
		);
		wp_localize_script( 'happychat-init', 'happychatSettings', $happychat_settings );
		wp_enqueue_script( 'happychat-init' );
	}
}
