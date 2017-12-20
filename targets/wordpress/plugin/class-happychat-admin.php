<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Happychat_Admin {
	private static $_instance = null;

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

		//Add settings section
		add_settings_section( 'happychat_settings' , '' , null, 'happychat' );

		//Add settings fields
		add_settings_field( 'happychat_enable' , 'Enable Happychat:' , array( $this, 'happychat_enable_html' )  , 'happychat' , 'happychat_settings' );

		//Register settings fields
		register_setting( 'happychat' , 'happychat_enable' );

	}

	public function happychat_enable_html() {
		echo '<input id="happychat_enable" type="checkbox" name="happychat_enable" ' .
			( get_option( 'happychat_enable' ) ? 'checked' : '' ) .
			'> If this box is checked, the "Create Ticket" form will be replaced with a Happychat chat box.' .
			' Happychat will only show if an operator is available, and the customer has purchased products that are either paid or a revenue share.' .
			'<br/><br/><a href="/wp-admin/edit.php?taxonomy=pa_revenue-share&term=true&post_type=product">See all products with attribute Revenue Share = true.';
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
