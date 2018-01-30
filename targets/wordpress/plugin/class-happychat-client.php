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

	private function get_token() {
		$current_user = wp_get_current_user();
		return get_user_meta( $current_user->ID, 'wp_woocommerce_wpcom_signin_access_token', true );
	}

	public function shortcode_to_happychat_form( $atts ) {
		self::enqueue_scripts();
		return '<div id="' . self::NODE_ID . '"></div>';
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
	* Get all product IDs that have attribute "Revenue Share" = true.
	*
	* @return array
	*/
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

	/**
	 * Returns true if customer has a current license for a non-free product.
	 * If the ticket creation page is loading slowly for customers with many
	 * products while chat blitz is on, this is a likely culprit.
	 *
	 * @return bool
	 */
	public function is_paying_customer() {
		global $wpdb;
		$user_id = get_current_user_id();

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

	/**
	 * Returns true if the user is eligible to show chat support.
	 *
	 * @return bool
	 */
	private function is_user_eligible() {
		$is_eligible = false;
		$eligibility = get_option( 'happychat_user_eligibility' );

		switch ( $eligibility ) {
			case 'paying_customers':
				$is_eligible = $this->is_paying_customer();
				break;
			case 'all':
			default:
				$is_eligible = true;
		}

		return $is_eligible;
	}

	/**
	 * Returns true if chat should be offered.
	 *
	 * @return bool
	 */
	private function should_offer_chat() {

		if ( ! $this->is_happychat_enabled() || ! $this->is_user_eligible() ) {
			return false;
		}
		return true;
	}

	private function enqueue_scripts() {
		if ( self::should_offer_chat() ) {
			// load happychat library
			wp_register_script(
				'happychat-api',
				plugins_url( 'assets/happychat.js', __FILE__ ),
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

			$fallback_ticket_path = get_option( 'happychat_fallback_ticket_path' );
			$fallback_ticket_path = ( substr( $fallback_ticket_path, 0, 1 ) == '/' )
				? $fallback_ticket_path
				: '/' . $fallback_ticket_path;

			$happychat_settings = array(
				'token'  => self::get_token(),
				'groups' => [ 'woo' ],
				'nodeId' => self::NODE_ID,
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
