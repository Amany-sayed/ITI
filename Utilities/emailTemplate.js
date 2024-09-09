emailTemplate = ({ link, linkData, subject }) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (min-width: 481px) {
h1,img,p{margin:0;Margin:0}.t18,.t5,.t75,.t9{width:480px!important}img,p{font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t74,.t77{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.t75{padding:60px!important;border-radius:8px!important;overflow:hidden!important}.t62,.t66,.t70,.t72{width:400px!important}.t60{text-align:left!important}.t57{padding-bottom:10px!important}.t31,.t37,.t43,.t55{width:19.75%!important}.t49{width:21%!important}.t25{mso-line-height-alt:21px!important;line-height:21px!important}.t23{padding-right:5px!important;width:68px!important}.t22{Margin-left:0px!important}
}
</style>
<style type="text/css">@media (min-width: 481px) {[class~="x_t74"]{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important;} [class~="x_t77"]{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important;} [class~="x_t75"]{padding-left:60px!important;padding-top:60px!important;padding-bottom:60px!important;padding-right:60px!important;border-top-left-radius:8px!important;border-top-right-radius:8px!important;border-bottom-right-radius:8px!important;border-bottom-left-radius:8px!important;overflow:hidden!important;width:480px!important;} [class~="x_t5"]{width:480px!important;} [class~="x_t9"]{width:480px!important;} [class~="x_t18"]{width:480px!important;} [class~="x_t72"]{width:400px!important;} [class~="x_t62"]{width:400px!important;} [class~="x_t60"]{text-align:left!important;} [class~="x_t57"]{padding-bottom:10px!important;} [class~="x_t31"]{width:19.75%!important;} [class~="x_t37"]{width:19.75%!important;} [class~="x_t43"]{width:19.75%!important;} [class~="x_t49"]{width:21%!important;} [class~="x_t55"]{width:19.75%!important;} [class~="x_t66"]{width:400px!important;} [class~="x_t70"]{width:400px!important;} [class~="x_t25"]{mso-line-height-alt:21px!important;line-height:21px!important;} [class~="x_t23"]{padding-right:5px!important;width:68px!important;} [class~="x_t22"]{Margin-left:0px!important;}}</style>
<style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t74,.moz-text-html .t77{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.moz-text-html .t75{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.moz-text-html .t18,.moz-text-html .t5,.moz-text-html .t9{width:480px!important}.moz-text-html .t62,.moz-text-html .t72{width:400px!important}.moz-text-html .t60{text-align:left!important}.moz-text-html .t57{padding-bottom:10px!important}.moz-text-html .t31,.moz-text-html .t37,.moz-text-html .t43{width:19.75%!important}.moz-text-html .t49{width:21%!important}.moz-text-html .t55{width:19.75%!important}.moz-text-html .t66,.moz-text-html .t70{width:400px!important}.moz-text-html .t25{mso-line-height-alt:21px!important;line-height:21px!important}.moz-text-html .t23{padding-right:5px!important;width:68px!important}.moz-text-html .t22{Margin-left:0px!important}</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;700;800&amp;family=Inter+Tight:wght@500;900&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t74,div.t77{mso-line-height-alt:60px !important;line-height:60px !important;display:block !important}td.t75{padding:60px !important;border-radius:8px !important;overflow:hidden !important}div.t60{text-align:left !important}td.t57{padding-bottom:10px !important}div.t31,div.t37,div.t43{width:19.75% !important}div.t49{width:21% !important}div.t55{width:19.75% !important}div.t25{mso-line-height-alt:21px !important;line-height:21px !important}td.t23{padding-right:5px !important}table.t22{Margin-left:0px !important}
</style>
<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id="body" class="t80" style="min-width:100%;Margin:0px;padding:0px;background-color:#FFFFFF;"><div class="t79" style="background-color:#FFFFFF;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t78" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#FFFFFF;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#FFFFFF"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t74" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t76" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="600" class="t75" style="background-color:#EFABCF;padding:40px 40px 40px 40px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t75" style="background-color:#EFABCF;width:400px;padding:40px 40px 40px 40px;">
<!--<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%!important;"><tr><td align="left">
<table class="t2" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="90" class="t1" style="padding:0 15px 3px 0;">
<![endif]-->
<!--[if !mso]>-->
<td class="t1" style="width:75px;padding:0 15px 3px 0;">
<!--<![endif]-->
<div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="75" height="75" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/79dec686-2421-4a93-b7fc-1cc424377325.png"/></div></td>
</tr></table>
</td></tr><tr><td><div class="t3" style="mso-line-height-rule:exactly;mso-line-height-alt:23px;line-height:23px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t6" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="480" class="t5">
<![endif]-->
<!--[if !mso]>-->
<td class="t5" style="width:400px;">
<!--<![endif]-->
<h1 class="t4" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Confirm your account</h1></td>
</tr></table>
</td></tr><tr><td><div class="t7" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="480" class="t9">
<![endif]-->
<!--[if !mso]>-->
<td class="t9" style="width:400px;">
<!--<![endif]-->
<p class="t8" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Please click the button below to confirm your email address and finish setting up your account. This link is valid for 48 hours.</p></td>
</tr></table>
</td></tr><tr><td><div class="t12" style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
<table class="t14" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
<tr>
    <td class="t13" style="background-color:#000000;overflow:hidden;width:105px;text-align:center;line-height:34px;mso-line-height-rule:exactly;mso-text-raise:6px;border-radius:40px 40px 40px 40px;">
        <a href="http://localhost:3000" style="display:block;text-decoration:none;">
            <span class="t11" style="display:block;margin:0;Margin:0;font-family:Inter Tight,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:900;font-style:normal;font-size:13px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:6px;">Confirm</span>
        </a>
    </td>
</tr>
</table>
</td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t19" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="480" class="t18">
<![endif]-->
<!--[if !mso]>-->
<td class="t18" style="width:400px;">
<!--<![endif]-->
<p class="t16" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Didn&#39;t register on Home Shopping.com? <a class="t15" href="http//localhost:3000/api/signup" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#2F353D;mso-line-height-rule:exactly;" target="http//localhost:3000/api/signup">Click here to Register.</a></p></td>
</tr></table>
</td></tr><tr><td align="center">
<table class="t73" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="480" class="t72" style="background-color:#EFABCF;padding:20px 40px 20px 40px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t72" style="background-color:#EFABCF;width:320px;padding:20px 40px 20px 40px;">
<!--<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%!important;"><tr><td align="center">
<table class="t24" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="73" class="t23">
<![endif]-->
<!--[if !mso]>-->
<td class="t23" style="width:73px;">
<!--<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%!important;"><tr><td align="left">
<table class="t22" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="65" class="t21">
<![endif]-->
<!--[if !mso]>-->
<td class="t21" style="width:65px;">
<!--<![endif]-->
<div style="font-size:0px;"><img class="t20" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="65" height="65" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/257e38fd-33af-4866-96a9-0b82d473a122.png"/></div></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t25" style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td><div class="t61" style="mso-line-height-rule:exactly;mso-line-height-alt:4px;line-height:4px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t63" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="400" class="t62" style="padding:0 0 15px 0;">
<![endif]-->
<!--[if !mso]>-->
<td class="t62" style="width:320px;padding:0 0 15px 0;">
<!--<![endif]-->
<div class="t60" style="display:inline-table;width:100%;text-align:center;vertical-align:middle;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="middle" width="400"><tr><td width="400" valign="middle"><![endif]-->
<div class="t59" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:757px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t58" style="width:100%!important;"><tr>
<td class="t57" style="padding:10px 0 11px 0;"><div class="t56" style="display:inline-table;width:100%;text-align:right;vertical-align:middle;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="right" valign="middle" width="400"><tr><td class="t27" style="width:25px;" width="25"></td><td width="29" valign="middle"><![endif]-->
<div class="t31" style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.43593%;max-width:79px;"><div class="t30" style="padding:0 25px 0 25px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t29" style="width:100%!important;"><tr>
<td class="t28"><div style="font-size:0px;"><img class="t26" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="29" height="29" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/fbfa8f41-6333-46fc-8750-6314162aae56.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t27" style="width:25px;" width="25"></td><td class="t33" style="width:25px;" width="25"></td><td width="29" valign="middle"><![endif]-->
<div class="t37" style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.43593%;max-width:79px;"><div class="t36" style="padding:0 25px 0 25px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t35" style="width:100%!important;"><tr>
<td class="t34"><div style="font-size:0px;"><img class="t32" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="29" height="28.34375" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/72b83bfb-8834-4f9e-a149-2b53a93af2e8.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t33" style="width:25px;" width="25"></td><td class="t39" style="width:25px;" width="25"></td><td width="29" valign="middle"><![endif]-->
<div class="t43" style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.43593%;max-width:79px;"><div class="t42" style="padding:0 25px 0 25px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t41" style="width:100%!important;"><tr>
<td class="t40"><div style="font-size:0px;"><img class="t38" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="29" height="34.265625" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/e6bcec59-275a-4491-be18-2f9ca1001ead.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t39" style="width:25px;" width="25"></td><td class="t45" style="width:25px;" width="25"></td><td width="34" valign="middle"><![endif]-->
<div class="t49" style="display:inline-table;text-align:initial;vertical-align:inherit;width:11.09643%;max-width:84px;"><div class="t48" style="padding:0 25px 0 25px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t47" style="width:100%!important;"><tr>
<td class="t46"><div style="font-size:0px;"><img class="t44" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="34" height="23.734375" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/2e2f43a3-a3e1-4a1c-a7c6-8d0d8638788a.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t45" style="width:25px;" width="25"></td><td class="t51" style="width:25px;" width="25"></td><td width="29" valign="middle"><![endif]-->
<div class="t55" style="display:inline-table;text-align:initial;vertical-align:inherit;width:10.43593%;max-width:79px;"><div class="t54" style="padding:0 25px 0 25px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t53" style="width:100%!important;"><tr>
<td class="t52"><div style="font-size:0px;"><img class="t50" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="29" height="23.1875" alt="" src="https://72a0445d-205c-46db-80c8-6e15d880e55e.b-cdn.net/e/bffc84f3-c3c3-40a1-b5a1-074e2b66d717/abf22203-e853-43b8-835e-368a736395b9.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t51" style="width:25px;" width="25"></td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</div>
<!--[if mso]>
</td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</td></tr><tr><td><div class="t65" style="mso-line-height-rule:exactly;mso-line-height-alt:4px;line-height:4px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t67" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="400" class="t66">
<![endif]-->
<!--[if !mso]>-->
<td class="t66" style="width:320px;">
<!--<![endif]-->
<p class="t64" style="margin:0;Margin:0;font-family:Inter Tight,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#777777;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">6075, We value your experience,Dear</p></td>
</tr></table>
</td></tr><tr><td><div class="t69" style="mso-line-height-rule:exactly;mso-line-height-alt:4px;line-height:4px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="left">
<table class="t71" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
<tr>
<!--[if mso]>
<td width="400" class="t70">
<![endif]-->
<!--[if !mso]>-->
<td class="t70" style="width:320px;">
<!--<![endif]-->
<p class="t68" style="margin:0;Margin:0;font-family:Inter Tight,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#777777;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Copyright © 2022 All rights reserved.</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t77" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div></body>
</html>`;
};
module.exports = emailTemplate;



