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
		return get_user_meta($current_user->ID, 'wp_woocommerce_wpcom_signin_access_token', true);
	}

	public function shortcode_to_happychat_form( $atts ) {
		$happychat_node_id = 'happychat-form';
		return '<span id="'.$happychat_node_id.'">
					<button class="button view"
							onclick="Happychat.open( \''.$happychat_node_id.'\', [ \'woo\' ], \''.self::get_token().'\' )"
					>
					Chat with us
					</button>
				</span>';
	}

	private function should_offer_chat(){
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

		// Display chat box to users at select URLs.
		if ( ! $should_offer_chat && get_option( 'wccom_olark_enable' ) ) {
			if ( in_array( $wp->request, explode( ' ', get_option( 'wccom_olark_display_urls' ) ) )
				|| in_array( $wp->request, explode( ' ', get_option( 'wccom_olark_display_purchaser_urls' ) ) )
				&& wc_get_customer_order_count( get_current_user_id() ) ) {

				$should_offer_chat = true;
			}
		}

		return $should_offer_chat;
	}

	private function is_chat_blitz(){
		global $wp;

		$is_chat_blitz = false;
		// During a Chat Blitz, maybe replace the standard Create Ticket form with a chat box.
		if ( 'my-account/create-a-ticket' === $wp->request
			&& get_option( 'wccom_olark_enable_chat_blitz' )
			&& $this->is_paying_customer( get_current_user_id() ) ) {

			$is_chat_blitz = true;
		}

		return $is_chat_blitz;
	}

	public function get_revenue_share_products() {
		$result = array();
		$page = 0;
		$products_per_page = 500;
		while ( $product_ids = get_posts(
			array(
				'posts_per_page' => $products_per_page,
				'offset' => $products_per_page * $page++,
				'fields' => 'ids',
				'post_type' => 'product',
				'tax_query' => array(
					array(
						'taxonomy' => 'pa_revenue-share',
						'field' => 'slug',
						'terms' => 'true',
					),
				),
			)
		) ) {
			$result = array_merge( $result, $product_ids );
		}

		return $result;
	}

	public function is_paying_customer( $user_id ) {
		global $wpdb;

		// Look up current licenses.
		$statement = $wpdb->prepare(
			"SELECT product_id
			FROM {$wpdb->prefix}woocommerce_product_keys
			WHERE %d = user_id
			AND ( 1 = lifetime
				OR support_expiry_date > NOW() )",
			$user_id
		);
		$product_ids = $wpdb->get_col( $statement, 0 );

		// Check if any of the licensed products are revenue share products.
		if ( ! empty( array_intersect( $this->get_revenue_share_products(), $product_ids ) ) ) {
			// Customer has a revenue share product.
			return true;
		}

		// Check if any of the licensed products cost money.
		foreach ( $product_ids as $product_id ) {
			$product = wc_get_product( $product_id );
			if ( 0 < $product->get_regular_price() ) {
				// User has a paid product.
				return true;
			}
		}

		return false;
	}

	public function enqueue_scripts() {
		if ( self::should_offer_chat() ) {

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

			wp_register_script(
				'happychat-form-js-init',
				plugins_url( 'assets/happychat-init.js', __FILE__ ),
				array( 'jquery-core' ),
				self::VERSION,
				true
			);

			wp_enqueue_style( 'happychat-form-css' );
			wp_enqueue_script( 'happychat-form-js' );

			$happychatSettings = array(
				'token' => self::get_token(),
				'groups' => [ 'woo' ],
				'isChatBliz' => self::is_chat_blitz()
			);

			wp_localize_script( 'happychat-form-js-init', 'happychatSettings', $happychatSettings );
			wp_enqueue_script( 'happychat-form-js-init' );
		}
	}
}
