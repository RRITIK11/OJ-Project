# OJ-Project

## Problem Statement
A coding challenge is a competitive event in which a group of participants solve a set of coding questions within a specified timeframe, typically from few hours to few days. 

Participants who have registered beforehand compete by submitting their solutions, which are evaluated against concealed test cases. Based to the test results, participants are assigned scores. An online judge is a platform that hosts these coding challenges, providing the infrastructure to manage and execute the competitions. 

Example : Codechef, Codeforces etc.

Instead of that there were problem set for user for practice and particular dasboard for it. Like Leetcode.

**Future Add on…**

- **Tech Blog page**: User write a blog on particular tech categories and also read others.
- **Courses:** User can purchase courses from here. And User with creator role can create its particular courses. Include payment methods.
- Discuss Forum

## Overview

Designing a Full Stack Online Judge using React, Express, Postgres, Node.js and many more. Takes code from different users over the server. Evaluates it automatically as accepted or not.

## Features:

### User Registration:

- User Registration as Creator or User
- Another role assigned by super-admin/admin from their admin-panel
- Quick Registration through AuthO support.
- Details Required for regular registration:
    - User ID* → Unique
    - Full Name : First* + Mid + Last
    - E-Mail or Phone Number*
    - DOB
    - Role : CREATOR / USER
    - University
    - Password
- MFA (Multi-Factor Authentication) :
    - OTP for verify phone and email

```
                          ┌────────────────────────────┐
                          │        Super Admin         │
                          │ Full access to all areas   │
                          │ and settings               │
                          └─────────────▲──────────────┘
                                        │
                          ┌─────────────┴──────────────┐
                          │          Admin             │
                          │ Manages specific areas     │
                          │ with extensive access      │
                          └───────▲───────▲────────────┘
                                  │       │
                 ┌────────────────┘       └─────────────────┐
         ┌──────────────┐                          ┌───────────────┐
         │  Moderator   │                          │     Editor    │
         │ Monitors user│                          │ Reviews and   │
         │ behavior and │                          │ approves      │
         │ content      │                          │ content 
		 | - Enforce community guidlines		   |- Manage content publication  schedule									|					      
         └──────▲───────┘                          └───────────────┘
                │
                │
 ┌──────────────┴───────────────┐
 │         Creator              │
 │ Creates and manages content  │
 │                              │
 │ Access:                      │
 │ - All User access            │
 │ - CRUD on their own problems,│
 │   contests, blogs, and       │
 │   courses                    │
 │ - Access to their course     │
 │   subscriber details and     │
 │   permissions                │
 │ Not Access:                  │
 │ - Cannot edit or delete      │
 │   content created by other   │
 │   creators                   │
 └──────────────▲───────────────┘
                │
                │
 ┌──────────────┴───────────────┐
 │            User              │
 │ Consumes content and         │
 │ participates in discussions  │
 │                              │
 │ Access:                      │
 │ - All Guest access           │
 │ - Able to solve and run code │
 │ - Update profile             │
 │ - Participate in contests    │
 │ - Like and comment on blogs  │
 │ - Participate in discussion  │
 │   forums                     │
 │ - Add comments on problems   │
 │   and provide feedback       │
 │ - Rate problems              │
 │ - Purchase courses           │
 │ - Access free courses        │
 │ Not Access:                  │
 │ - Cannot create problems or  │
 │   courses                    │
 │ - Cannot delete problems     │
 │ - Cannot delete other users' │
 │   comments                   │
 │ - Cannot organize contests   │
 └──────────────▲───────────────┘
                │
                │
 ┌──────────────┴───────────────┐
 │           Guest              │
 │ Limited access to view       │
 │ public content               │
 │                              │
 │ Access:                      │
 │ - View problems (excluding   │
 │   live contests)             │
 │ - Read blogs                 │
 │ - View course list but not   │
 │   access them (including     │
 │   free ones)                 │
 │ Not Access:                  │
 │ - Cannot like or comment     │
 │ - Cannot run code or         │
 │   participate in contests    │
 │ - Cannot purchase courses    │
 └──────────────────────────────┘

```

### User Login/Forgot Password or UserId

- User can login directly through Auth0 support.
- Or by UserID/Email/PhoneNo. and password
- Forgot userID can be get by email or phone number verification by OTP to your email/SMS.
- Simlarly, Forgot password can be changed to new password after verification.

### Solution Submission

### Profile Management

### Contest

### Competitive Leaderboard

### Practice Problems

- The platform should provide practice problems that do not contribute to the scoring or rankings. These problems allow participants to hone their skills and gain experience without the
pressure of competition.

[Problems](https://www.notion.so/Problems-143513c424af4c2cacd3d0e5eb85dc3b?pvs=21)

### Solution Evaluation And Scoring

### Other ADD ON features:

- Courses
- Blog
- Discuss

### Problem

### User-Problem Relation

- Status : Solved / Attempted / UnAttempted
- Acceptance Rate
- Status : Solved / Unsolved / Attempted     :     That would be come under user - problem relation

### Users

- Id : String
- Username : String
- Full Name : String
    - First Name : String
    - Last Name : String
- Avatar? : String
- Email : String
- Password : String
- University : String
- Problems : [ list of Problems ]
- Rating : default 0
- Badges : [ list of Badges ]

### Contest