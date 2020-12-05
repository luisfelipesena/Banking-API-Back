const paymentSuccess = (name, valor, id) => {
	return `<!doctype html>
	<html>
	  <head>
		<meta name="viewport" content="width=device-width">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Boleto</title>
		<style>
		@media only screen and (max-width: 620px) {
		  table[class=body] h1 {
			font-size: 28px !important;
			margin-bottom: 10px !important;
		  }
		  table[class=body] p,
				table[class=body] ul,
				table[class=body] ol,
				table[class=body] td,
				table[class=body] span,
				table[class=body] a {
			font-size: 16px !important;
		  }
		  table[class=body] .wrapper,
				table[class=body] .article {
			padding: 10px !important;
		  }
		  table[class=body] .content {
			padding: 0 !important;
		  }
		  table[class=body] .container {
			padding: 0 !important;
			width: 100% !important;
		  }
		  table[class=body] .main {
			border-left-width: 0 !important;
			border-radius: 0 !important;
			border-right-width: 0 !important;
		  }
		  table[class=body] .btn table {
			width: 100% !important;
		  }
		  table[class=body] .btn a {
			width: 100% !important;
		  }
		  table[class=body] .img-responsive {
			height: auto !important;
			max-width: 100% !important;
			width: auto !important;
		  }
		}
		@media all {
		  .ExternalClass {
			width: 100%;
		  }
		  .ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
			line-height: 100%;
		  }
		  .apple-link a {
			color: inherit !important;
			font-family: inherit !important;
			font-size: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
			text-decoration: none !important;
		  }
		  #MessageViewBody a {
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		  }
		  .btn-primary table td:hover {
			background-color: #34495e !important;
		  }
		  .btn-primary a:hover {
			background-color: #34495e !important;
			border-color: #34495e !important;
		  }
		}
		</style>
	  </head>
	  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
		<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
		<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
		  <tr>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
			  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
	
				<!-- START CENTERED WHITE CONTAINER -->
				<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
	
				  <!-- START MAIN CONTENT AREA -->
				  <tr>
					<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
					  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
						<tr>
						  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
							<h1 style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 15px;">Seu Pagamento foi concluído com sucesso, ${name}</h1>
							<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Seu Boleto:</p>
							<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"> ID: #${id}</p>
							<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Valor: ${
								valor / 100
							} reais</p>
							<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
							  <tbody>
								<tr>
								  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
									<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
									  <tbody>
										<tr>
											<img src="https://ml1mpivwayoo.i.optimole.com/w:auto/h:auto/q:auto/https://mearasescoladexadrez.com/wp-content/uploads/2015/12/Pagamento-concluido-com-sucesso.png">
										</tr>
									  </tbody>
									</table>
								  </td>
								</tr>
							  </tbody>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
	
				<!-- END MAIN CONTENT AREA -->
				</table>
	
				<!-- START FOOTER -->
				<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
				  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
					<tr>
					  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
						<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Cubos Banking Agradece</span>
					  </td>
					</tr>
					<tr>
					  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
						Powered by <a href="https://github.com/luisfelipesena" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Luis Felipe Sena</a>.
					  </td>
					</tr>
				  </table>
				</div>
				<!-- END FOOTER -->
	
			  <!-- END CENTERED WHITE CONTAINER -->
			  </div>
			</td>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
		  </tr>
		</table>
	  </body>
	</html>`;
};

const newUser = (name) => {
	return `<!doctype html>
		<html>
		  <head>
			<meta name="viewport" content="width=device-width">
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<title>Boleto</title>
			<style>
			@media only screen and (max-width: 620px) {
			  table[class=body] h1 {
				font-size: 28px !important;
				margin-bottom: 10px !important;
			  }
			  table[class=body] p,
					table[class=body] ul,
					table[class=body] ol,
					table[class=body] td,
					table[class=body] span,
					table[class=body] a {
				font-size: 16px !important;
			  }
			  table[class=body] .wrapper,
					table[class=body] .article {
				padding: 10px !important;
			  }
			  table[class=body] .content {
				padding: 0 !important;
			  }
			  table[class=body] .container {
				padding: 0 !important;
				width: 100% !important;
			  }
			  table[class=body] .main {
				border-left-width: 0 !important;
				border-radius: 0 !important;
				border-right-width: 0 !important;
			  }
			  table[class=body] .btn table {
				width: 100% !important;
			  }
			  table[class=body] .btn a {
				width: 100% !important;
			  }
			  table[class=body] .img-responsive {
				height: auto !important;
				max-width: 100% !important;
				width: auto !important;
			  }
			}
			@media all {
			  .ExternalClass {
				width: 100%;
			  }
			  .ExternalClass,
					.ExternalClass p,
					.ExternalClass span,
					.ExternalClass font,
					.ExternalClass td,
					.ExternalClass div {
				line-height: 100%;
			  }
			  .apple-link a {
				color: inherit !important;
				font-family: inherit !important;
				font-size: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
				text-decoration: none !important;
			  }
			  #MessageViewBody a {
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
			  }
			  .btn-primary table td:hover {
				background-color: #34495e !important;
			  }
			  .btn-primary a:hover {
				background-color: #34495e !important;
				border-color: #34495e !important;
			  }
			}
			</style>
		  </head>
		  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
			<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
			<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
			  <tr>
				<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
				<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
				  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
		
					<!-- START CENTERED WHITE CONTAINER -->
					<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
		
					  <!-- START MAIN CONTENT AREA -->
					  <tr>
						<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
						  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
							<tr>
							  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
								<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Olá ${name}, Seja Bem Vindo a Cubos Banking</p>
								<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Sua Conta foi aberta e o Login já está disponível</p>
								<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
								  <tbody>
									<tr>
									  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
										<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
										  <tbody>
											<tr>
											  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="http://google.com" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Fazer Login</a></td>
											</tr>
											<tr>
												<img src="https://s3.amazonaws.com/gupy5/production/companies/300/images/jobs/479550/20200909092032194_socialPicture.jpg">
											</tr>
										  </tbody>
										</table>
									  </td>
									</tr>
								  </tbody>
								</table>
							  </td>
							</tr>
						  </table>
						</td>
					  </tr>
		
					<!-- END MAIN CONTENT AREA -->
					</table>
		
					<!-- START FOOTER -->
					<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
					  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
						<tr>
						  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
							<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Cubos Banking  Agradece</span>
						  </td>
						</tr>
						<tr>
						  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
							Powered by <a href="https://github.com/luisfelipesena" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Luis Felipe Sena</a>.
						  </td>
						</tr>
					  </table>
					</div>
					<!-- END FOOTER -->
		
				  <!-- END CENTERED WHITE CONTAINER -->
				  </div>
				</td>
				<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			  </tr>
			</table>
		  </body>
		</html>`;
};

const newCharge = (name, cpf, tel) => {
	return `<!doctype html>
	<html>
	  <head>
		<meta name="viewport" content="width=device-width">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Boleto</title>
		<style>
		@media only screen and (max-width: 620px) {
		  table[class=body] h1 {
			font-size: 28px !important;
			margin-bottom: 10px !important;
		  }
		  table[class=body] p,
				table[class=body] ul,
				table[class=body] ol,
				table[class=body] td,
				table[class=body] span,
				table[class=body] a {
			font-size: 16px !important;
		  }
		  table[class=body] .wrapper,
				table[class=body] .article {
			padding: 10px !important;
		  }
		  table[class=body] .content {
			padding: 0 !important;
		  }
		  table[class=body] .container {
			padding: 0 !important;
			width: 100% !important;
		  }
		  table[class=body] .main {
			border-left-width: 0 !important;
			border-radius: 0 !important;
			border-right-width: 0 !important;
		  }
		  table[class=body] .btn table {
			width: 100% !important;
		  }
		  table[class=body] .btn a {
			width: 100% !important;
		  }
		  table[class=body] .img-responsive {
			height: auto !important;
			max-width: 100% !important;
			width: auto !important;
		  }
		}
		@media all {
		  .ExternalClass {
			width: 100%;
		  }
		  .ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
			line-height: 100%;
		  }
		  .apple-link a {
			color: inherit !important;
			font-family: inherit !important;
			font-size: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
			text-decoration: none !important;
		  }
		  #MessageViewBody a {
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		  }
		  .btn-primary table td:hover {
			background-color: #34495e !important;
		  }
		  .btn-primary a:hover {
			background-color: #34495e !important;
			border-color: #34495e !important;
		  }
		}
		</style>
	  </head>
	  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
		<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
		<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
		  <tr>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
			  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
	
				<!-- START CENTERED WHITE CONTAINER -->
				<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
	
				  <!-- START MAIN CONTENT AREA -->
				  <tr>
					<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
					  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
						<tr>
						  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
							<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Olá ${name}, confirme o pagamento do Boleto no Link Abaixo</p>
							<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Identificação: CPF = ${cpf} // Telefone = ${tel}</p>
							<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
							  <tbody>
								<tr>
								  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
									<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
									  <tbody>
										<tr>
										  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;">
											<a href="http://google.com" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Abrir Boleto</a></td>
										</tr>
									  </tbody>
									</table>
								  </td>
								</tr>
							  </tbody>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
	
				<!-- END MAIN CONTENT AREA -->
				</table>
	
				<!-- START FOOTER -->
				<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
				  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
					<tr>
					  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
						<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Cubos Banking  Agradece</span>
					  </td>
					</tr>
					<tr>
					  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
						Powered by <a href="https://github.com/luisfelipesena" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Luis Felipe Sena</a>.
					  </td>
					</tr>
				  </table>
				</div>
				<!-- END FOOTER -->
	
			  <!-- END CENTERED WHITE CONTAINER -->
			  </div>
			</td>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
		  </tr>
		</table>
	  </body>
	</html>`;
};

const resetPassword = (name, id) => {
	return `<!doctype html>
		<html>
		  <head>
			<meta name="viewport" content="width=device-width">
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<title>Boleto</title>
			<style>
			@media only screen and (max-width: 620px) {
			  table[class=body] h1 {
				font-size: 28px !important;
				margin-bottom: 10px !important;
			  }
			  table[class=body] p,
					table[class=body] ul,
					table[class=body] ol,
					table[class=body] td,
					table[class=body] span,
					table[class=body] a {
				font-size: 16px !important;
			  }
			  table[class=body] .wrapper,
					table[class=body] .article {
				padding: 10px !important;
			  }
			  table[class=body] .content {
				padding: 0 !important;
			  }
			  table[class=body] .container {
				padding: 0 !important;
				width: 100% !important;
			  }
			  table[class=body] .main {
				border-left-width: 0 !important;
				border-radius: 0 !important;
				border-right-width: 0 !important;
			  }
			  table[class=body] .btn table {
				width: 100% !important;
			  }
			  table[class=body] .btn a {
				width: 100% !important;
			  }
			  table[class=body] .img-responsive {
				height: auto !important;
				max-width: 100% !important;
				width: auto !important;
			  }
			}
			@media all {
			  .ExternalClass {
				width: 100%;
			  }
			  .ExternalClass,
					.ExternalClass p,
					.ExternalClass span,
					.ExternalClass font,
					.ExternalClass td,
					.ExternalClass div {
				line-height: 100%;
			  }
			  .apple-link a {
				color: inherit !important;
				font-family: inherit !important;
				font-size: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
				text-decoration: none !important;
			  }
			  #MessageViewBody a {
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
			  }
			  .btn-primary table td:hover {
				background-color: #34495e !important;
			  }
			  .btn-primary a:hover {
				background-color: #34495e !important;
				border-color: #34495e !important;
			  }
			}
			</style>
		  </head>
		  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
			<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
			<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
			  <tr>
				<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
				<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
				  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
		
					<!-- START CENTERED WHITE CONTAINER -->
					<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
		
					  <!-- START MAIN CONTENT AREA -->
					  <tr>
						<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
						  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
							<tr>
							  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
								<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Olá ${name}, vejo que você esqueceu sua senha!</p>
								<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Para trocar de senha siga o link abaixo!</p>
								<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
								  <tbody>
									<tr>
									  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
										<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
										  <tbody>
											<tr>
											  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://cubos-banking.herokuapp.com/trocar-senha?id=${id}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Trocar Senha</a></td>
											</tr>
											<tr>
												<img src="https://s3.amazonaws.com/gupy5/production/companies/300/images/jobs/479550/20200909092032194_socialPicture.jpg">
											</tr>
										  </tbody>
										</table>
									  </td>
									</tr>
								  </tbody>
								</table>
							  </td>
							</tr>
						  </table>
						</td>
					  </tr>
		
					<!-- END MAIN CONTENT AREA -->
					</table>
		
					<!-- START FOOTER -->
					<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
					  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
						<tr>
						  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
							<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Cubos Banking  Agradece</span>
						  </td>
						</tr>
						<tr>
						  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
							Powered by <a href="https://github.com/luisfelipesena" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Luis Felipe Sena</a> and <a href="https://github.com/GuiBernal" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Guido Bernal</a>.
						  </td>
						</tr>
					  </table>
					</div>
					<!-- END FOOTER -->
		
				  <!-- END CENTERED WHITE CONTAINER -->
				  </div>
				</td>
				<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			  </tr>
			</table>
		  </body>
		</html>`;
};

module.exports = { newCharge, newUser, paymentSuccess, resetPassword };
