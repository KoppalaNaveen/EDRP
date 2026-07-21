import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_APP_PASSWORD = os.getenv("SMTP_APP_PASSWORD")
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587

def send_otp_email(to_email: str, otp: str):
    """
    Sends a 6-digit OTP to the user's email address using Gmail SMTP.
    Requires SMTP_EMAIL and SMTP_APP_PASSWORD in .env.
    """
    if not SMTP_EMAIL or not SMTP_APP_PASSWORD:
        raise ValueError("SMTP_EMAIL or SMTP_APP_PASSWORD not set in .env")

    subject = "EDRP Registration Verification"
    body_html = f"""
    <html>
    <head></head>
    <body style="font-family: sans-serif; font-size: 14px; color: #333;">
        <p>Hello,</p>
        <p>Thank you for registering on the Expert Decision Replay Platform.</p>
        <p>Your verification code is: <strong>{otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <br>
        <p>Best regards,<br>The EDRP Team</p>
    </body>
    </html>
    """
    body_text = f"Hello,\n\nThank you for registering on the Expert Decision Replay Platform.\n\nYour verification code is: {otp}\n\nThis code will expire in 10 minutes.\n\nBest regards,\nThe EDRP Team"

    import email.utils
    msg = MIMEMultipart("alternative")
    msg['From'] = email.utils.formataddr(('EDRP Platform', SMTP_EMAIL))
    msg['To'] = to_email
    msg['Subject'] = subject
    msg['Date'] = email.utils.formatdate(localtime=True)
    msg['Auto-Submitted'] = 'auto-generated'
    msg['Reply-To'] = SMTP_EMAIL
    
    msg.attach(MIMEText(body_text, 'plain'))
    msg.attach(MIMEText(body_html, 'html'))

    try:
        # Connect to Gmail SMTP server
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

def send_id_email(to_email: str, employee_id: str):
    """
    Sends the generated employee ID to the user's email address.
    """
    if not SMTP_EMAIL or not SMTP_APP_PASSWORD:
        raise ValueError("SMTP_EMAIL or SMTP_APP_PASSWORD not set in .env")

    subject = "EDRP Account Information"
    body_html = f"""
    <html>
    <head></head>
    <body style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <p>Hello,</p>
        <p>Your registration for the Expert Decision Replay Platform has been processed.</p>
        <p>Your generated Login ID is: <strong>{employee_id}</strong></p>
        <p>Please keep this ID safe as you will need it to access your account.</p>
        <br>
        <p>Best regards,<br>The EDRP Team</p>
    </body>
    </html>
    """
    body_text = f"Hello,\n\nYour registration for the Expert Decision Replay Platform has been processed.\n\nYour generated Login ID is: {employee_id}\n\nPlease keep this ID safe as you will need it to access your account.\n\nBest regards,\nThe EDRP Team"

    import email.utils
    msg = MIMEMultipart("alternative")
    msg['From'] = email.utils.formataddr(('EDRP Support', SMTP_EMAIL))
    msg['To'] = to_email
    msg['Subject'] = subject
    msg['Date'] = email.utils.formatdate(localtime=True)
    msg['Auto-Submitted'] = 'auto-generated'
    
    msg.attach(MIMEText(body_text, 'plain'))
    msg.attach(MIMEText(body_html, 'html'))

    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send ID email: {e}")
        return False
