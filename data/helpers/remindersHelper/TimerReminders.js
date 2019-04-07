<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const server = express();
const TaskManager =require('./smsEmailSender');
const TimerJob = require( 'timerjobs' ).TimerJobs;
const emailTemplateSample = require('./emailReminderSample')

const smsData = TaskManager.smsHandler;
const emailData = TaskManager.emailHandler;

const reminders = (req,res)=>{
  const {isCheckedEmail,isCheckedSms,comments,Sms_CustomText,Sms_Freq,Email_Subject,Email_CustomText,Email_Template,Email_StartDate,
    Sms_StartDate,Email_Freq, Sms_From,Sms_to,invoicePdfLink,invoiceNumber,UserName,clientName,Email_From,Email_to}=req.body

// for email template
const HtmlSample =emailTemplateSample(invoiceNumber,clientName,invoicePdfLink,UserName)   

//Should start reminders on given date and time
const setToHappenOn = (fn, dateR)=>{
  const now = new Date();
  const nowInNumber = now.getTime();
  const dateReminders = new Date(dateR);
  const dateRemindersInNumber = dateReminders.getTime()
  const diff =  dateRemindersInNumber - nowInNumber;
  return setTimeout(fn, diff);
 }
 
 if(isCheckedEmail){ //user can switch on/off Email reminder
 const timerEmail= new TimerJob({
  interval:Email_Freq, //emailFREQ, //The interval in milliseconds which the job should be performed
=======


// yarn add local-storage and then:
/* if you want to test to retrieve data from local storage db(if you need to keep record a single sms and email) 
with the sqlite3 db we should be able to keep track of all email and sms sent and then cancel a reminder for a paid invoice */
//const ls = require('local-storage');

// yarn add timerjobs and then:
const TimerJob = require( 'timerjobs' ).TimerJobs;


// importing Config for Email and Sms Apis sender
const smsEmailDatasender=require('./smsEmailSender');

// importing a sample email template
const emailTemplateSample = require('./emailReminderSample');



module.exports= (req,res)=>{

// Data from frontend client
const email =req.body.email;
const sms = req.body.sms;

//Catching sms and email sender functionality
const smsDatasender = smsEmailDatasender.smsHandler;
const emailDatasender = smsEmailDatasender.emailHandler;

//const smsFREQ=req.body.smsfreq || 60000 ; //defaut interval of 1 minute
//const emailFREQ=req.body.emailfreq || 60000; //defaut interval of 1 minute

//dummies infos for feeding our Email template
const CustomInvoiceId ='#5001';
const CustomName = 'John Doe';
const CustomInvoiceLink ='#';
const InvoiceSEnderName ='Jane Doe';
const HtmlSample =emailTemplateSample(CustomInvoiceId,CustomName,CustomInvoiceLink,InvoiceSEnderName)

/* unable only when using Localstorage
 store email and sms params in the localstorage **dummy data**
    //email

    ls.set('to', email.to);
    ls.set('from', email.from);
    ls.set('subject', email.subject);
    ls.set('html',HtmlSample );
    ls.set('emailFREQ', email.emailFREQ);

     //sms;
    ls.set('smsFromNumber', sms.smsFromNumber);
    ls.set('smstoNumber', sms.smstoNumber);
    ls.set('smsText', sms.smsText);
    ls.set('smsFREQ', sms.smsFREQ);
  

// retrieve email and sms params from the localstorage ** dummy data**
    //email
    const to =ls.get('to');
    const from =ls.get('from');
    const subject =ls.get('subject');
    const html =ls.get('html');
    const emailFREQ =ls.get('emailFREQ');

     //sms;
     const smsFromNumber = ls.get('smsFromNumber');
     const smstoNumber = ls.get('smstoNumber');
     const  smsText = ls.get('smsText');
     const  smsFREQ = ls.get('smsFREQ');
*/

/*## WARNING !!!, 
reminder will keep sending sms and email :
 Countdown times ,one  after every Interval time ##*/

//Started Config email Reminder params

const emailFREQ =  email.emailFREQ; 
const timerEmail    = new TimerJob({
   
    interval: emailFREQ, //The interval in milliseconds which the job should be performed //from frontend
    /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
    immediate: true,  // runs immediately upon starting the timer
    ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
    infinite: false,//true<boolean> - Should the timer run forever?
    countdown: 2 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
  }, function( done ) {

//Getting email data from front-end Client
const to = email.to;
const from = email.from;
const subject = email.subject;
const html =  HtmlSample; // or email.html


//Magic things are happening here
emailDatasender(to,from,subject,html);

//Necessary for reminding
done()

    });//End email reminder timer

//Start the Timer/reminders for Email
timerEmail .start() 

// timerEmail.stop()  //Stop the Timer ****to set if the Invoice has been paid***.


//-------------------------------------------//

//Started Config email Reminder params
const smsFREQ= sms.smsFREQ;

const timerSms    = new TimerJob({
  interval: smsFREQ, //The interval in milliseconds which the job should be performed
>>>>>>> 86f8dbfffdfa3ba5e662169434802abb7dbc9dd4
  /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
  immediate: true,  // runs immediately upon starting the timer
  ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
  infinite: false,//true<boolean> - Should the timer run forever?
<<<<<<< HEAD
  countdown: 2 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
}, function( done ) {
  console.log('hello Email')
//things are happening
 emailData(Email_to,Email_From,Email_Subject,Email_CustomText);
done()
  });
  
  setToHappenOn(()=>{timerEmail.start()},Email_StartDate) ;
 }

 if(isCheckedSms){//user can switch on/off Sms reminder
  const timerSms    = new TimerJob({
    interval:Sms_Freq, //emailFREQ, //The interval in milliseconds which the job should be performed
    /*ref : 1day=86400000ms /1week =604800000ms /30days or a month = 2592000000ms */
    immediate: true,  // runs immediately upon starting the timer
    ignoreErrors: true,//<boolean> - Should we ignore errors? Stops execution if false.
    infinite: false,//true<boolean> - Should the timer run forever?
    countdown: 1 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what?
  }, function( done ) {
  
  
  //things are happening
  console.log('hello Sms')
  //smsData(Sms_From,Sms_to,Sms_CustomText)
  done()
    });
    
    setToHappenOn(()=>{timerSms.start()},Sms_StartDate)
  }
})



server.listen(5001, () => {
    console.log(`\n** Server is listening on port: ${PORT} **\n`);
})
=======
  countdown: 3 // <number> - The number of times the timer should execute // execute until the invoice is paid? or what? //
}, function( done ) {

//Getting sms data from front-end Client
const smsFromNumber= sms.smsFromNumber
const smstoNumber= sms.smstoNumber
const smsText= sms.smsText

//Magic things are happening here
smsDatasend(smsFromNumber, smstoNumber, smsText); 

//Necessary for reminding
done()

  });

//Start the Timer/reminders for sms 
timerSms.start();

//timerSms.stop()  //Stop the Timer ****to set if the Invoice has been paid***.
res.json({message:'SMS and Email sent to bar foooo'})

}


   

>>>>>>> 86f8dbfffdfa3ba5e662169434802abb7dbc9dd4

     
     
  