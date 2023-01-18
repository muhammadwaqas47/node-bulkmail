# node-bulkmail
This project use Nodemailer for sending bulk mails, service used is smtp.gmail.com , and xlsx package to read bulk data from excel files
# .env
Create .env file first and set values:
PORT = //port you want to run server
SENDER_EMAIL = // emails send from account
SENDER_PASSWORD = // password for email or 16 character password to avoid 2-factor authentication
FILENAME = // filename with path 
TIMEOUT_SECONDS = // timeout seconds to send email after some interval => 5000 means 5 seconds

#you can use following link to generate 16-characters string
https://security.google.com/settings/security/apppasswords
