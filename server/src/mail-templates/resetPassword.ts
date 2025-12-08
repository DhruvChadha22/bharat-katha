export const resetPasswordTemplate = (url: string, name: string) => {
	return (`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reset Password Link</title>
                <style>
                    body {
                        background-color: #ffffff;
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.4;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        text-align: center;
                    }
            
                    .message {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
            
                    .body {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                    
                    .support {
                        font-size: 14px;
                        color: #999999;
                        margin-top: 20px;
                    }
            
                    .highlight {
                        font-weight: bold;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <div class="message">Reset Password Link</div>
                    <div class="body">
                        <p>Dear ${name}</p>
                        <p>
                            Please go to the given url and follow the provided steps to reset your password:
                        </p>
                        <h2 class="highlight">${url}</h2>
                        <p>
                            This link is valid for 5 minutes. If you did not initiate this request, please disregard this email.
                        </p>
                    </div>
                    <div class="support">
                        If you have any questions or need assistance, please feel free to reach out to us at 
                        <a href="mailto:dhruvchadha212@gmail.com">dhruvchadha212@gmail.com</a>. We are here to help!
                    </div>
                </div>
            </body>
        </html>
    `);
};
