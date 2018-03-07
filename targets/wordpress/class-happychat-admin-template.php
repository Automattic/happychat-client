<div class="wrap">
	<h2>Happychat Settings</h2>
	<form method="post" action="options.php" enctype="multipart/form-data">

		<?php settings_fields( 'happychat' ); ?>
		<?php do_settings_sections( 'happychat' ); ?>

		<p class="submit">
			<input name="Submit" type="submit" class="button-primary" value="Save" />
		</p>
	</form>
</div>
