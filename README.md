# Project-Tax-Management


NodeJS Assignment:-----------------------------------------------------------------------------------------------------

At Leverage Edu, we like to debate and argue over technology and architecture. There is no 
hierarchy or "boss" system. Even the junior intern has the power to argue with the CTO (politely).

Throughout this assignment, you will be asked to think and make design choices and justify 
them. In addition to the code, we would like you to send a README file with the reasons for 
each of the points mentioned in this assignment. Commit this README file to your codebase 
itself.


Guidelines to complete the assignment:---------------------------------------------------------------------------------

1. You can do this in any language. We don't care - a language is just a tool. Work here is 
done primarily on NodeJS and ReactJS (which you can learn if you join). At no point do we 
argue over the superiority of node over other languages. It's just a tool we ended up using 
and serves us well.

2. You will deliver your work as a Docker project. At Leverage Edu we value seamless 
packaging of software to make it easy to develop and use. We expect you to do the same. 
Learning Docker isn't very hard. It takes an hour at most. You don't need to create an image 
and upload it to a registry, just make sure the Dockerfile works well. We will ONLY run your 
code through Docker. You should also specify how to run your test cases through Docker.

3. Registration and Roles - Different users can have different roles. The three roles are "tax￾payer", "tax-accountant" and "admin". We want to see how you are 
creating/salting/hashing the passwords. Another question to think about is - how will you 
set the role of a user? All of these are questions you should think about. 

4. Your API needs to be protected by authentication. For all the APIs you will build, design 
an auth system. Wword? Are you using JWT? remember that for API, you can't have cookies. 
How will e want to see how you do this. Will you use a token? a 
username/passyou handle roles in an API? Will you only ask for authentication once or will every 
API call be authenticated? All of these are questions you should think about.

5. All data should be stored in a database. Ideally, we would want this in MySQL but for 
purposes of the interview, you can use any database (including MongoDB or SQLite)


Features:---------------------------------------------------------------------------------------------------------------

1. List, view and edit tax-payers - this can only be done by "tax-accountant" and "admin" 
roles

2. One tax accountant can manage different tax-payers.

3. Full tax is dependent on which state the tax-payer belongs to. Total tax = state tax + 
central tax. if it is a union territory, then no state tax (we expect you do some googling on 
your own to understand the GST system)

4. NOTE: we expect you to figure out what a "tax" object will look like. SGST, CGST, state tax, 
arrears, fines, etc. This is domain knowledge that we expect our engineers to figure out by 
themselves. Will you use reducing interest rates, etc? An especially tricky question is how 
will you handle dates - we are especially interested to see this code; since date handling is 
one of the trickiest things here (is it needed to handle timezone information in your 
database ?)

5. Create a tax due - This can be done only by the "tax-accountant" role. The system will 
take certain inputs (PAN card of tax-payer, income from salary, income from share market, 
etc etc) and calculate the total tax due. It also sets status as NEW or DELAYED based on the 
due date.

6. Edit tax due. This can only be done by the "tax accountant". But it cannot be done if the 
tax is already paid. 
IMPORTANT: We want to see how you design this. Can you save the previous history? In an 
extreme situation, can you "roll back" the changes? 
Hint: the best designs here use "double safety" - logic in the code as well as database 
constraints.

7. Mark tax as paid. This can only be done by tax-payer. 
P.S. you don't need to do any UPI integration. Just create a dummy!

8. Ability to list and view tax due based on the filter applied - By "filter" we mean - select by 
date of creation, date of update, state of tax (NEW, PAID, DELAYED), etc. This action can be 
done by all : "tax-payer", "tax-accountant" and "admin" roles. HOWEVER - "tax-payer" can 
only see his own taxes...while "tax-accountant" and "admin" can see everyone's taxes. The 
way you design your data model above will allow you to do this. Make sure there are no 
security loopholes here. (P.S. you have to show us by writing the test cases to illustrate this)
Testcases:
Writing test cases are a cultural value and a hard requirement at Leverage Edu. We wish to 
see the same. We prefer good test cases for less features, rather than no test cases and 
more features.
We don't expect you send a database dump for testing. All frameworks allow you to "mock" 
data (or fixtures). 
Important: You should also specify how to run your test cases through Docker. This is the 
first thing we will try.