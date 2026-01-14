##### MAJOR MERN STUDYNOTION : FRONTEND





###### ***1. go to main.jsx , npm I react-router-dom***



createRoot(document.getElementById('root')).render(

  <BrowserRouter>

      <App />

  </BrowserRouter>

)



---



###### ***2. go to the app.jsx and define route and routes***



import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'



function App() {

  return (

    <div>

      <Routes>

        <Route path='/' element={Home}></Route>

      </Routes>

    </div>

  )

}



export default App



---

###### **3. Moving towards Home.jsx to create homepage**



-> It is observed that we can divide homepage into 4 sections, section1,2,3 and footer





###### ***4. Once reviewing the folder structure***



**->** create components folder inside src and pages folder



src

 |\_ assets (containing images, logos etc)

 |\_ componenets

 |\_ data (containing req links or pre req data)

 |\_ pages

 |\_ App.jsx

 |\_ index.jsx

 |\_ main.jsx





###### ***5. Moving to create firstly homepage frontend part***



**->** 1. first observation, divide into total x parts

-> 2. create Home.jsx inside the pages folder

-> 3. and for all components used during homepage creating will be in folder structure ***components/core/Homepage***



src

 |\_ assets

 |\_ componenets/core/Homepage ***<----***

 |\_ data

 |\_ pages/Home.jsx <----

 |\_ App.jsx

 |\_ index.jsx

 |\_ main.jsx

 |\_

 |\_





###### ***5.1,  Homepage sections, section-1***



-> create function Home() {



   } in Home.jsx, start creating sections inside it



-> In section-1, it is observed that Since in text we see text combination so instead of using span tag, here breaking down into components by creating highlighted text reusable components.... components/core/Homepage/HighLightText.jsx



function HighLightText({text}) {



}



-> In page/Home.jsx since a same styled btn is being used many times so making reusable component for them single function such that work for both btns according to the props (active flag) componenets/core/Homepage/CTAButton.jsx



src

│

├── assets

│

├── components

│   └── core

│       └── Homepage

│           ├── HighLightText.jsx     // reusable highlighted text component

│           └── CTAButton.jsx         // reusable button component (active/inactive)

│

├── data

│

├── pages

│   └── Home.jsx                     // Home page with section-1 using components

│

├── App.jsx

├── index.jsx

├── main.jsx





**-> so on............................**



src

│

├── assets

│

├── components

│   └── core

│       └── HomePage

│           ├── CodeBlocks.jsx

│           ├── CTAButton.jsx

│           ├── ExploreMore.jsx

│           ├── HighLightText.jsx

│           ├── LearningLanguageSection.jsx

│           ├── ProfileDropDown.jsx

│           └── TimeLineSection.jsx

│

├── data

│

├── pages

│   └── Home.jsx

│

├── App.jsx

├── index.jsx

├── main.jsx



## **-> now to create Footer in homepage, create inside new folder 'common' inside 'components'.**



│

├── components

│   ├── common

│   │   └── Footer.jsx          // shared footer across pages <-----------

│   │

│   └── core

│       └── HomePage

│           ├── CodeBlocks.jsx

│           ├── CTAButton.jsx

│           ├── .............

│

├── data

│





###### **-> also just for info, there's a 'ExploreMore.jsx' in components / core / Homepage...\[ Logic of switching Tabs ]**





\### ExploreMore Component



1\. \*\*Initialize State\*\*



   \* `currentTab` → active category (default: first tab)

   \* `courses` → courses of selected tab

   \* `currentCard` → highlighted course card



2\. \*\*Tab Change (`setMyCards`)\*\*



   \* Update active tab

   \* Find matching tab data from `HomePageExplore`

   \* Load its courses

   \* Auto-select first course card



3\. \*\*UI Rendering\*\*



   \* Display heading using `HighLightText`

   \* Render tabs dynamically from data

   \* Render course cards based on selected tab



4\. \*\*Card Selection\*\*



   \* On card click → update `currentCard`

   \* Apply highlight styles to active card





###### ***6. NOW CREATING "NAVBAR" : components/common/Navbar.jsx***



src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx          // shared navbar across pages <--------

│   │   └── Footer.jsx

│   │

│   └── core

│       └── HomePage

│           ├── CodeBlocks.jsx

│           ├── CTAButton.jsx

│           ├── .............

│

├── data

│

├── pages

│   └── Home.jsx

│

├── App.jsx

├── index.jsx

├── main.jsx



-----> now in the Navbar, use of ***data/navbar-links.js*** for navbar links



--> in Navbar, observe a tab of "**catalog",** it takes data from backend to show categories, hence use State will be required.



--> also 'Login', 'Signup' button have a behaviour like if logined then they should be hidden and instead profile account info btn will be shown with the image of person in account.







###### ***6.1,  NOW HERE COMES IN PICTURE : REDUX TOOLKIT***



* **REDUX TOOLKIT :-**



1\. Go to official document [https://react-redux.js.org/introduction/getting-started](https://react-redux.js.org/introduction/getting-started) and run -> npm install @reduxjs/toolkit react-redux





**2. go to the main.jsxt and wrap this Proivder (also pass store):**



import { Provider } from 'react-redux'



<Provider store={store}>

      <BrowserRouter>

          <App />

      </BrowserRouter>

  </Provider>





3\. Now create store.jsx by following this folder structure:

src

 |\_ redux (folder)

 |\_ slices (folder)

 |\_ store.jsx  <---------- create it



***4. insdie store.jsx***



import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({

    reducer:{
(slice name) : (its reducer)

        auth : authReducer,

        profile : profileReducer,

        cart : cartReducer

    }

})



5\. now go to the slices folder to create requried slice (from notebook notes)



src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   └── Footer.jsx

│   │

│   └── core

│       └── HomePage

│           ├── CodeBlocks.jsx

│           ├── CTAButton.jsx

│           ├── .............

│

├── data

│

├── pages

│   └── Home.jsx

│

├── redux                 <-----------------

│   ├── slices

│   └── store.jsx

│

├── App.jsx

├── index.jsx

├── main.jsx







###### ***6.2  SLICE - 1 : authSlice.jsx (redux/slices/authSlice.jsx)***





--> This slice provides a single source of truth for authentication state across the app.



* Redux slice centralizes auth data so it can be accessed by any component.



* Token is persisted using localStorage to keep the user logged in after refresh.



* setToken → updates login/logout state.



* setLoading → controls loaders during async operations.







###### ***6.3  SLICE - 2 : cartSlice.jsx (redux/slices/cartSlice.jsx)***





**Cart Slice**



1\. \*\*Initialize State\*\*



   \* Load `totalItems` from `localStorage`

   \* If not present, set it to `0`



2\. \*\*Set Cart Count\*\*



   \* Directly update `totalItems`

   \* Sync updated value to `localStorage`



3\. \*\*Add to Cart\*\*



   \* Increment `totalItems`

   \* Update `localStorage`



4\. \*\*Remove from Cart\*\*



   \* Decrement `totalItems` (minimum 0)

   \* Update `localStorage`



5\. \*\*Reset Cart\*\*



   \* Set `totalItems` to `0`

   \* Clear cart data from `localStorage`











###### ***6.4  SLICE - 3 : profileSlice.jsx (redux/slices/profileSlice.jsx)***



* Allows any component (Navbar, Profile page, Dashboard) to access user data.
* Avoids prop drilling (passing user data through many components).
* setUser is used to:
* Save user data after login
* Update profile details
* Clear user data on logout









├── pages

│   └── Home.jsx

│

├── redux

│   ├── slices

│   │   ├── authSlice.jsx

│   │   ├── cartSlice.jsx

│   │   └── profileSlice.jsx

│   │

│   └── store.jsx

│











\*\*\*6.4  NOW, SINCE CATELOG IN NAVBAR NEEDS DATA TO SHOW CATEGORIES FROM THE BACKEND, THERFORE BACKEND CONNECTION OF FRONTEND

## --------------------BACKEND - FRONTEND CONNECTION----------------------\*\*\*





-> now since in backend, in server/controllers/Category.jsx we have an API 'showAllCategories' , we need to call it

-> SETUP:



1. **create src/services(folder) -> for all api connections, endpoints and api calls**

---

2. ###### **create new file inside it 'apiconnector.jsx' to create centralized api connector**



// The code creates a centralized API connector so you don’t repeat Axios setup everywhere.

// You can call apiconnector() with just the method, URL, body, headers, and query params and it handles the rest.



###### **3. create one more file inside servies : 'api.jsx'**



// This File contains the base url and all end points

// to access from env in react+vite : import.meta.env.\_\_\_\_





src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   └── Footer.jsx

│   │

│   └── cors

│       └── HomePage

│           ├── CodeBlocks.jsx

│           ├── CTAButton.jsx

│           ├── ExploreMore.jsx

│           ├── HighLightText.jsx

│           ├── LearningLanguageSection.jsx

│           ├── ProfileDropDown.jsx

│           └── TimeLineSection.jsx

│

├── data

│

├── pages

│   └── Home.jsx

│

├── redux

│   ├── slices

│   │   ├── authSlice.jsx

│   │   ├── cartSlice.jsx

│   │   └── profileSlice.jsx

│   │

│   └── store.jsx

│

├── services

│   ├── apiconnector.jsx     // centralized Axios/API handler

│   └── api.jsx              // base URL \& all endpoints (env-based)

│

├── App.jsx

├── index.jsx

├── main.jsx







          \[// src/services/api.jsx](// src/services/api.jsx)



          const BASE\_URL = import.meta.env.VITE\_BASE\_URL;

          console.log("BASE URL:", BASE\_URL);



          // CATEGORIES API



          export const categories = {

            CATEGORIES\_API: `${BASE\\\_URL}/course/showAllCategories`,

          };







          \[// src/services/apiconnector.jsx](// src/services/apiconnector.jsx)



          import axios from "axios";



          export const axiosInstance = axios.create({});



          export const apiConnector = (method, url, bodyData, headers, params) => {

            return axiosInstance({

              method: `${method}`,

              url: `${url}`,

              data: bodyData ? bodyData : null,

              headers: headers ? headers : null,

              params: params ? params : null,

            });

          };





###### **--> AGAIN GO BACK INSIDE NAVBAR.jsx NOW,**



          const \[subLinks, setSubLinks] = useState(\[]);



          useEffect(() => {

            const fetchCategorySublinks = async () => {

              try {

                const result = await apiConnector(

                  "GET", categories.CATEGORIES\_API

                );

                console.log(result.data.data);

                setSubLinks(result.data.data);



              } catch (error) {

                console.log("Could not fetch Categories.", error);

              }

            };

            fetchCategorySublinks();

          }, \[]);





###### ***--> and from backend now we are getting the data successfully in 'sublinks' variable***



     Array(2)

     \[

       {

         description: "Courses that teach frontend, backend, and full-stack web development...",

         name: "Web Development",

         \_id: "68f7be011282b3fb05478a87",

         \[\[Prototype]]: Object

       },

       {

         description: "Yeeeeeeeeeee.",

         name: "Pythonnn",

         \_id: "68f7bef156dca3dc9da41dac",

         \[\[Prototype]]: Object

       }

     ]



     length: 2

     \[\[Prototype]]: Array(0)





###### ***6. NOW CREATED PAGES/LOGIN.jsx and PAGES/SIGNUP.jsx***

###### ***WITH COMPONENTS/CORS/AUTH/LOGINFROM.jsx and TEMPLATE.jsx***



\*\*\*--> THE ABOVE ALL ARE RESPONSIBLE FOR CREATING LOGIN AND SIGNUP PAGE

--> IN LOGIN FORM WE HAVE A CODE PORTION:\*\*\*



&nbsp;   \*\*\*const handleOnSubmit = (e) => {\*\*\*

        \*\*\*e.preventDefault()\*\*\*

        \*\*\*dispatch(login(email, password, navigate))\*\*\*

    \*\*\*}


SO WHEN CLICKED SUBMIT IT WILL DISPATCH, WHICH IS IMPORTED FROM SERVICES/authAPI.jsx (Login API)\*\*\*



src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   └── Footer.jsx

│   │

│   └── cors

│       ├── HomePage

│       │   ├── CodeBlocks.jsx

│       │   ├── CTAButton.jsx

│       │   ├── ExploreMore.jsx

│       │   ├── HighLightText.jsx

│       │   ├── LearningLanguageSection.jsx

│       │   ├── ProfileDropDown.jsx

│       │   └── TimeLineSection.jsx

│       │

│       └── Auth       <--------------

│           ├── LoginForm.jsx     <--------------

│           └── Template.jsx      <--------------

│

├── data

│

├── pages

│   ├── Home.jsx

│   ├── Login.jsx      <--------------

│   └── SignUp.jsx     <--------------

│

├── redux

│   ├── slices

│   │   ├── authSlice.jsx

│   │   ├── cartSlice.jsx

│   │   └── profileSlice.jsx

│   │

│   └── store.jsx

│

├── services

│   ├── apiconnector.jsx

│   └── api.jsx

│

├── App.jsx

├── index.jsx

├── main.jsx







***--> now writing whole logic for login in new folder services/operations/authAPI.jsx***

---

src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   └── Footer.jsx

│   │

│   └── cors

│       ├── HomePage

│       │   ├── CodeBlocks.jsx

│       │   ├── .............

│       │

│       └── auth

│           ├── LoginForm.jsx

│           └── Template.jsx

│

├── data

│

├── pages

│   ├── Home.jsx

│   ├── Login.jsx

│   └── SignUp.jsx

│

├── redux

│   ├── slices

│   │   ├── authSlice.jsx

│   │   ├── cartSlice.jsx

│   │   └── profileSlice.jsx

│   │

│   └── store.jsx

│

├── services

│   ├── apiconnector.jsx

│   ├── api.jsx

│   └── operations  <----

│       └── authAPI.jsx      <----  // login, signup, logout, reset-password logic

│

├── App.jsx

├── index.jsx

├── main.jsx





🔹 What is the use of Tab here?



The Tab component is used to select account type:

* Student or Instructor



*Instead of using:*

* a dropdown
* radio buttons



you are using tabs (buttons) for better UI/UX.



--> signup flow is:



1️⃣ User fills signup form

2️⃣ User selects Student / Instructor (Tab)

3️⃣ User submits form

4️⃣ OTP is sent to email

5️⃣ User enters OTP

6️⃣ Signup completes using stored data



## **flow, - login page, signup page, signup form, their codes, utils, update in authSlice....**





src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   ├── Footer.jsx

│   │   └── Tab.jsx                 // NEW: reusable tab component

│   │

│   └── cors

│       ├── HomePage

│       │   ├── CodeBlocks.jsx

│       │   ├── CTAButton.jsx

│       │   ├── ............

│       │

│       └── auth

│           ├── LoginForm.jsx

│           ├── SignupForm.jsx       // UPDATED / added

│           └── Template.jsx

│

├── data

│

├── pages

│   ├── Home.jsx

│   ├── Login.jsx

│   └── SignUp.jsx

│

├── redux

│   ├── slices

│   │   ├── authSlice.jsx

│   │   ├── cartSlice.jsx

│   │   └── profileSlice.jsx

│   │

│   └── store.jsx

│

├── services

│   ├── apiconnector.jsx

│   ├── api.jsx

│   └── operations

│       └── authAPI.jsx

│

├── utils

│   └── constants.jsx               // NEW: app-wide constants (ACCOUNT\_TYPE, COURSE\_STATUS, etc.)

│

├── App.jsx

├── index.jsx

├── main.jsx



---

##### 

##### 

##### 



## ***7,  now error page in pages/Error.jsx***

##### 

-> including it for all routes which are undefined

function Error() {

  return (

    <div className='grid min-h-\\\[calc(100vh-3.5rem)] place-items-center text-3xl text-white'> <------------

        Error - 404 Not Found

    </div>

  )

}



export default Error;



***IN App.jsx--***



###### ***<Route path="\*" element={<Error />} />***





---

###### 

###### 



***8, Now moving towards next page, ie forgetPassword page that will include two page inside, one for reset password and another for check email as if mail succesfully sent after correct password***





## 9, ***After creating page now moving towards the getPasswordResetToken funcn in authAPI.jsx***









* ###### **-------------- WHOLE WORKING OF SIGN-IN AND SIGNUP PROCESS --------------**



## **-------------- *LOGIN :* --------------**



1. We are in Navbar, Login is Clicked,
2. In Navbar its connected to a Route of Login Page in App.jsx
3. Navbar takes to route [http://localhost:5173/login](http://localhost:5173/login), generating "Login Page"
4. Now this page of sign in consists of 'Login Page' --> 'Template' <-- 'Login Form'
5. i.e. Template imports Login Form
6. Main Logic is in "Logic Form"
7. It takes form data and on Clicking Submit, handleOnSubmit runs, which preventDefault and start first hit by doing ----> dispatch(login(email, password, navigate))
8. now this login is imported, ie. connected to function written in "authAPI.jsx"
9. From here the main logic to give a call to backend API is written and response is given back fron Backend to here in this logic
10. It also updates required slices ie react-redux "dispatch(setUser({ ...response.data.user, image: userImage }));"
11. Here it also contains navigate function to navigate to dashboard on successfully login







**-------------- SIGN IN --> FORGOT PASSWORD?**

---



1. Now sign in also consists one option of forget Password?
2. on clicking it, it takes to route [http://localhost:5173/forgot-password](http://localhost:5173/forgot-password)
3. this routs in App.jsx is linked to "ForgetPassword Page"







###### **-------------- FORGOT PASSWORD PAGE**



1. In this, email is being enter in input from page
2. on clicking submit , “dispatch(getPasswordResetToken(email, setEmailSent))” runs, “setEmailSent” it is here for true of false, if it is true or false acc to both condition ui will render in this page as this page render two differnet ui
3. Again takes to authAPI.jsx where connection logic is defined, in this backend api call will be hit
4. Once call hit successfully, 1. Link will be sent to email, and “setEmailSent” turn true and hence UI will get updated with new option of Resend Email









###### **-------------- PASSWORD-RESET-LINK**





1. [localhost:5173/update-password/7b87b3d2-7e06-44cb-ba1a-211a685505a0](localhost:5173/update-password/7b87b3d2-7e06-44cb-ba1a-211a685505a0)
2. In this Link, first part is of route “<Route path='/update-password/:id' element={<UpdatePassword></UpdatePassword>}></Route>”
3. Next Part of after “update-password/” is token “7b87b3d2-7e06-44cb-ba1a-211a685505a0”
4. On clicking this --> “UpdatePassword.jsx” will hit which is connected to “UpdatePassword Page”









**-------------- UPDATE PASSWORD PAGE**

---



1. it will take in input a password and confirm password
2. on submit, “dispatch(resetPassword(token, password, confirmPassword, navigate))” it will be hit
3. here one important thing about navigae, here the navigate we are sending is a function which is already imported using useNavigate and declared as const navigate = useNavigate();
4. now again control will go back to logic defined in authAPI.jsx and the backend call will be hit
5. hence the password will be reseted.





**---------------------------- SIGN-UP ----------------------------**



1. throught navbar, signup route hit at “.signUp”
2. Now this page of sign in consists of 'SignUp Page' --> 'Template' <-- 'Signup Form'
3. i.e. Template imports SignUp Form
4. Main Logic is in "SignUp Form"
5. It takes form data and on Clicking Submit, handleOnSubmit runs, which preventDefault and by hitting the authAPI functions....
6. Here, imp point that two funcns will be used.
7. (i) dispatch(setSignupData(signupData))
   (ii) dispatch(sendOtp(formData.email, navigate))
8. dispatch(setSignupData(signupData)) --> it is not a authAPI.jsx function, its connected to “auth Slice”
   which will firstly update the whole data in redux-slice
9. dispatch(sendOtp(formData.email, navigate)) --> its main funcn
10. ie. connected to function written in "authAPI.jsx"
11. From here the main logic to give a call to backend API is written and response is given back fron Backend to here in this logic
12. This logic of dispatch(sendOtp(formData.email, navigate)) will send otp.
13. on successfull, it will navigate to route “/verify-email”





###### **-------------- VERIFY - EMAIL --------------**

###### 

1. it will land to a page “VerifyEmail.jsx”.
2. now in this page, a use effect logic will run which on first render will check whether data from signup coming or not, if not then auto back to “/signUp”.
3. now after entering otp and clicking “verify Email” , again a authAPI.jsx route will be hit.
4. dispatch(signUp( accountType, firstName,lastName,email,password,confirmPassword,otp,navigate));
5. now this signUp logic written in “authAPI.jsx” will be hit
6. in that logic, a backend call for signUp will hit and on successfull signup agsin navigation to logic in last.













###### ***10) -------------- NOW CREATING \[ ABOUT-US PAGE ] -----------------***





pages/About.jsx -->

folder About Page : (core/AboutPage) -->



components of About Page :- (i.e. files inside the AboutPage folder) :

1. Stats.jsx

2\. Quote.jsx

3\. LearningGrid.jsx

4\. ContactFormSection.jsx --> connected to “ContactUsForm.jsx” which is inside new folder “ContactPage”





src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   ├── Footer.jsx

│   │   └── Tab.jsx

│   │

│   └── cors

│       ├── HomePage

│       │   ├── CodeBlocks.jsx

│       │   ├── ............

│       │

│       ├── AboutPage                 // NEW

│       │   ├── Stats.jsx

│       │   ├── .........

│       │

│       ├── ContactPage               // NEW

│       │   └── ContactUsForm.jsx     -------------> react-hook-form

│       │

│       └── auth

│           ├── .........

│

├── data

│

├── pages

│   ├── Error.jsx

│   ├── ........

│   └── About.jsx                    // NEW

│

├── redux

│   ├── slices

│   │   ├── ........

│   │

│   └── store.jsx

│

├── services

│   ├── apiconnector.jsx

│   ├── api.jsx

│   └── operations

│       └── authAPI.jsx

│

├── utils

│   └── constants.jsx

│

├── App.jsx

├── index.jsx

├── main.jsx







npm install react-hook-form 🟣🟣🟣🟣✅✅



import { useForm } from "react-hook-form";



isDirty is a boolean flag provided by react-hook-form that tells you:













###### ***11) --------------------- NOW CREATING \[ DASHBOARD PAGE ] ---------------------***







&nbsp;                     \*\*\*11.1) --------- SIDERBAR ----------\*\*\*


1. -> define <Siderbar/> first by creating new folder DashboardPage.



2\. -> import <Outlet/> from react-dom and define it inside Dashboard page.



3\. start creating Siderbar.jsx



4. in Siderbar.jsx, whole siderbar will be there, to map the sider bar info using “data/dashboard-links.js” to get info and map for every “SidebarLink.jsx”.



1. for each Siderbar btn, created using map function in new file “/SiderbarLink.jsx”.



6\. also importing all icons with /vsc prefix.



7\. in “Siderbar.jsx” creating logout btn which runs dynamically as it shows confirmationModal too so creating new file in common/“confirmationModal.jsx”.



8\. now also this “confirmationModal.jsx” will have some btn “IconBtn” which will perform some action on clicking so defining it also in another file “IconBtn.jsx” in common folder only.









&nbsp;                         \*\*\*11.2) --------- MY-PROFILE ----------\*\*\*


---

1. now moving to another dashboard things, which will be rendered in the <outlet>.
2. new page - MyProfile.jsx in DashboardPage folder only, which will be render at route “dashboard/my-profile”
3. this page is for now created to show profile data only, perhaps it has edit btn, but logic of it is not defined yet.







###### ***11.3) --------- SETTINGS ----------***---



1. this is another dashboard siderbar component in which settings will be provided.
2. the main page for settings to render other is “Settings.jsx” in DashboardPage folder.
3. now another folder inside this folder named “SettingsPage” to consist all settings component which all will be imported in “Settings.jsx” to render.
4. and all the api logic for this Settings page will be written in new file “settingsAPI.jsx” in the folder servies/operations





src

│

├── assets

│

├── components

│   ├── common

│   │   ├── Navbar.jsx

│   │   ├── Footer.jsx

│   │   ├── Tab.jsx

│   │   ├── ConfirmationModal.jsx     // NEW

│   │   └── IconBtn.jsx                // NEW

│   │

│   └── cors

│       ├── HomePage

│       │   ├── CodeBlocks.jsx

│       │   ├── CTAButton.jsx

│       │   ├── ExploreMore.jsx

│       │   ├── HighLightText.jsx

│       │   ├── LearningLanguageSection.jsx

│       │   ├── ProfileDropDown.jsx

│       │   └── TimeLineSection.jsx

│       │

│       ├── AboutPage

│       │   ├── Stats.jsx

│       │   ├── Quote.jsx

│       │   ├── LearningGrid.jsx

│       │   └── ContactFormSection.jsx

│       │

│       ├── ContactPage

│       │   └── ContactUsForm.jsx

│       │

│       └── auth

│           ├── LoginForm.jsx

│           ├── SignupForm.jsx

│           └── Template.jsx

│

├── data

│   └── dashboard-links.js            // USED BY SIDEBAR

│

├── pages

│   ├── Error.jsx

│   ├── ForgotPassword.jsx

│   ├── Home.jsx

│   ├── Login.jsx

│   ├── SignUp.jsx

│   ├── UpdatePassword.jsx

│   ├── VerifyEmail.jsx

│   └── About.jsx

│

├── pages

│   └── DashboardPage                 // NEW

│       ├── Dashboard.jsx             // layout with <Outlet />

│       ├── Sidebar.jsx

│       ├── SidebarLink.jsx

│       ├── MyProfile.jsx

│       ├── Settings.jsx

│       │

│       └── SettingsPage

│           ├── ChangeProfilePicture.jsx

│           ├── DeleteAccount.jsx

│           ├── ProfileInformation.jsx

│           └── UpdatePassword.jsx

│

├── redux

│   ├── slices

│   │   ├── authSlice.jsx

│   │   ├── cartSlice.jsx

│   │   └── profileSlice.jsx

│   │

│   └── store.jsx

│

├── services

│   ├── apiconnector.jsx

│   ├── api.jsx

│   └── operations

│       ├── authAPI.jsx

│       └── settingsAPI.jsx           // NEW

│

├── utils

│   └── constants.jsx

│

├── App.jsx

├── index.jsx

├── main.jsx





updating profileSlice

import { createSlice } from "@reduxjs/toolkit";



const initialState = {

    enrolledCourses: \[],

    loading :false,

    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,

};



const profileSlice = createSlice({

    name:"profile",

    initialState:initialState,

    reducers:{

        setUser:(state,value)=>{

            state.user = value.payload;

        },



        setLoading:(state,value)=>{

            state.loading = value.payload;

        },

        setEnrolledCourses(state, action) {

        state.enrolledCourses = action.payload

        },

    }

});



export const {setUser, setLoading, setEnrolledCourses} = profileSlice.actions;

export default profileSlice.reducer;



NOTE :
so here i come to know a new thing, that while using react redux we use it for token and user as on login only it direclty stores tha details so there should no need to again and again backend call as now we have token and user data stored in slices, but now in here, case of enrolled courses, we need to fetch enrolled courses from backend, if i thought of like doing it by same dispatch which means using react-redux , first will be need to create slice of it, so lets imagine we created it, now initially set\[] , now the game begins , if need it to be remain updated not empty like user, token so we have to write its logic in login api (authAPI.jsx), so during login eveytime it will also be fetched but here also making it heavy also illogical, so deciding to fetch normaly using funcn , not using dispatch like all other , as we decide to do it by slice and all, yes its possible but on every fetch we need to ffetch from backkne dthen also update in the slice









-----> Wishlist.jsx

-----> RenderCartCourses

npm install react-rating-stars-component





-----> creating new slice courseSlice as going to make new page “Add Course” for instructor
-----> since new slice is created, also add it in “store.jsx"



npm install react-dropzone

npm install video-react











OpenRoutes and PrivateRoutes 🟣🟣🟣🟣



import \* as Icons from "react-icons/vsc" //importing all icons with vsc prefix 🟣🟣🟣🟣



function SiderbarLink({link}) {



    const Icon = Icons(link.icon) //to fetch that icon using that icon name



  return (

    <div>

 

    </div>

  )

}



export default SiderbarLink;











find new bug, if console.log(user?.additionalDetails); printing some id instead of actual data means backend have some bug as it is forgotten to populate 🟣🟣🟣🟣






const {courseId} = useParams(); 🟣🟣🟣🟣
 //When you define a route in your App.js with a colon (:), like this: <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />

// The :courseId part is a variable placeholder. If the URL is localhost:3000/dashboard/edit-course/12345, then useParams() will grab 12345.




// onClick={ ()=> navigate(`dashboard/edit-course/${course.\_id}`)} , here see "/" is missing in starting so instead of navigating to exactly this same route, it will append this route in existing route 🟣🟣🟣🟣






localStorage.removeItem("token"); 🟣🟣🟣🟣




JSX {} ≠ delayed execution 🟣🟣🟣🟣

They mean “evaluate this now”, not “run later”.







react otp input----  🟣🟣🟣🟣

npm install react-otp-input -------------> oldddd

import OtpInput from 'react-otp-input';



function OTPComponent() {

  const \[otp, setOtp] = useState("");



  return (

    <div>

      <OtpInput

        value={otp}

        onChange={setOtp}

        numInputs={6}

        renderSeparator={<span>-</span>}

        renderInput={(props) => <input {...props} />}

      />



      <p>Entered OTP: {otp}</p>

    </div>

  );

}

-----------------> new



npm install input-otp 🟣🟣🟣🟣
import { InputOTP, InputOTPSlot } from "input-otp";



use of singupData from react state

createdAt:{

            type:Date,

            default:Date.now, //not Date.now()

            expires:5\*60 //5min

        }



---



 {/\* For all Unvalid Routes \*/} 🟣🟣🟣🟣

        <Route path='\*' element={<Error></Error>}></Route>

