<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Happychat_Admin {
	private static $_instance = null;
	const VERSION = '0.0.1-dev';

	/**
	 * Create instance of class
	 * @return Happychat_Admin
	 */
	public static function instance( $file ) {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self( $file );
		}
		return self::$_instance;
	}

	public function __construct( $file ) {
		add_action( 'admin_init' , array( $this, 'register_settings' ) );
		add_action( 'admin_menu' , array( $this, 'add_menu_item' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( $file ) , array( $this, 'add_settings_link' ) );
		add_filter( 'option_page_capability_olark', array( $this, 'capability_filter' ) );
	}

	public function add_menu_item() {
		add_options_page( 'Settings' , 'Happychat' , 'edit_posts' , 'happychat' , array( $this, 'settings_page' ) );
	}

	public function add_settings_link( $links ) {
		$settings_link = '<a href="options-general.php?page=happychat">Settings</a>';
		array_push( $links, $settings_link );
		return $links;
	}

	/**
	 * Allows this form to be submitted by Shop Managers.
	 */
	public function capability_filter( $capability ) {
		return 'edit_posts';
	}

	public function register_settings() {
		add_settings_section( 'happychat_settings' , '' , null, 'happychat' );
		add_settings_field( 'happychat_user_eligibility' , 'User eligibility:' , array( $this, 'happychat_user_eligibility_html' )  , 'happychat' , 'happychat_settings' );
		register_setting( 'happychat' , 'happychat_user_eligibility' );
		add_settings_field( 'happychat_fallback_ticket_path' , 'Fallback ticket path:' , array( $this, 'happychat_fallback_ticket_path_html' )  , 'happychat' , 'happychat_settings' );
		register_setting( 'happychat' , 'happychat_fallback_ticket_path' );
	}

	private function enqueue_scripts() {
		wp_register_script(
			'happychat-update-fallback-ticket-path',
			plugins_url( 'assets/update-fallback-ticket-path.js', __FILE__ ),
			array( 'jquery' ),
			self::VERSION,
			true
		);
		wp_enqueue_script( 'happychat-update-fallback-ticket-path' );
	}

	public function happychat_fallback_ticket_path_html() {
		self::enqueue_scripts();
		$fallback_ticket_path = get_option( 'happychat_fallback_ticket_path' );
		$fallback_ticket_path = substr( $fallback_ticket_path, 0, 1 ) == '/' ? $fallback_ticket_path : '/' . $fallback_ticket_path;
		$endpoint = $_SERVER['HTTPS'] ? 'https://' : 'http://';
		$endpoint .= $_SERVER['SERVER_NAME'];
		$endpoint .= $fallback_ticket_path;
		print '<input id="happychat_fallback_ticket_path" name="happychat_fallback_ticket_path" type="text" class="regular-text" value="' . $fallback_ticket_path . '"/>';
		print '<p id="happychat_fallback_ticket_path_desc" class="description">' . $endpoint . '</p>';
	}

	public function happychat_user_eligibility_html() {
		$user_eligibility = get_option( 'happychat_user_eligibility' );
		print '<select id="happychat_user_eligibility" name="happychat_user_eligibility">';
		print '<option value="all" ' . selected( $user_eligibility, 'all' ) . '>All</option>';
		print '<option value="paying_customers" ' . selected( $user_eligibility, 'paying_customers' ) . '>Paying customers</option>';
		print '</select>';
	}

	public function settings_page() {
		wc_get_template(
			'class-happychat-admin-template.php',
			array(),
			'',
			plugin_dir_path( __FILE__ )
		);
	}
}
